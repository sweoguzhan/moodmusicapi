import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_GEMINI_API_KEY}`;

export const getMusicRecommendationsFromAI = async (message: string): Promise<string[]> => {
    try {
        console.log("🚀 AI Service çağrıldı, mesaj:", message);

        const response = await axios.post(GEMINI_API_URL, {
            contents: [
                {
                    parts: [{ text: `Sadece şarkı isimlerini liste halinde ver, açıklama yapma. 
            Örnek format: 
            1. Şarkı Adı - Sanatçı
            2. Şarkı Adı - Sanatçı
            3. Şarkı Adı - Sanatçı
            4. Şarkı Adı - Sanatçı
            5. Şarkı Adı - Sanatçı
            Şimdi bu kişinin ruh haline uygun 5 şarkı öner: "${message}"`}]
                }
            ]
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("🎵 Google Gemini'den gelen response:", response.data);

        if (response.data && response.data.candidates && response.data.candidates.length > 0) {

            return response.data.candidates[0].content.parts[0].text.split("\n")
                .map((song: string) => song.replace(/^\d+\.\s*/, "").trim()) // "1. Şarkı" gibi numaraları temizle
                .filter((song: string | any[]) => song.length > 0);
        }

        return [];
    } catch (error) {
        // @ts-ignore
        console.error("🚨 Google Gemini API error:", error.response ? error.response.data : error);
        return [];
    }
};
