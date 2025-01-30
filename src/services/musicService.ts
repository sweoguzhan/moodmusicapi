import { getMusicRecommendationsFromAI } from "./aiService";
import { getYoutubeMusicUrl, getSpotifyUrl, getAppleMusicUrl } from "./musicPlatformService";

export const getMusicRecommendations = async (message: string) => {
    try {
        const songList = await getMusicRecommendationsFromAI(message);

        console.log("🎵 AI'dan Gelen Şarkılar:", songList);

        const enrichedSongs = await Promise.all(
            songList?.map(async (song: any) => ({
                title: song,
                youtube: await getYoutubeMusicUrl(song),
                spotify: await getSpotifyUrl(song),
                appleMusic: await getAppleMusicUrl(song),
            }))
        );

        console.log("🔥 Enriched Şarkılar:", enrichedSongs);
        return enrichedSongs;
    } catch (error) {
        console.error("❌ Error fetching music recommendations:", error);
        return [];
    }
};
