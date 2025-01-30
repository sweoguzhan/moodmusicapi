import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * YouTube Music'ten ilk şarkının linkini getir
 */
export const getYoutubeMusicUrl = async (songName: string) => {
    try {
        const query = encodeURIComponent(songName);
        const apiKey = process.env.YOUTUBE_API_KEY;
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}&maxResults=5`;

        const response = await axios.get(searchUrl);

        console.log("YouTube API response:", response);

        const items = response.data.items;

        if (items.length > 0) {


            let bestMatch = items[0]; // İlk sonucu varsayılan al


            const videoId = bestMatch.id.videoId;
            return `https://music.youtube.com/watch?v=${videoId}`;
        }

        return null;
    } catch (error) {
        console.error("YouTube API error:", error);
        return null;
    }
};
/**
 * Spotify API ile ilk şarkının linkini getir (TOKEN GEREKİYOR!)
 */
export const getSpotifyUrl = async (songName: string) => {
    const query = encodeURIComponent(songName);
    return `https://open.spotify.com/search/${query}`; // Şimdilik sadece arama linki
};

/**
 * Apple Music API ile ilk şarkının linkini getir (TOKEN GEREKİYOR!)
 */
export const getAppleMusicUrl = async (songName: string) => {
    const query = encodeURIComponent(songName);
    return `https://music.apple.com/search?term=${query}`; // Şimdilik sadece arama linki
};
