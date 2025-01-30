import { Request, Response } from "express";
import { getMusicRecommendations } from "../services/musicService";

export const getMusicRecommendationsController = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: "Message is required." });

        const songs = await getMusicRecommendations(message);
        res.status(200).json({ songs });
    } catch (error) {
        console.error("Error fetching music recommendations:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
