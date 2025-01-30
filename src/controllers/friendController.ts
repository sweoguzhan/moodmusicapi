import { Response } from "express";
import friendService from "../services/friendService";
import { AuthRequest } from "../types/express"; // Custom tipi import et

// Arkadaş ekleme
export const addFriend = async (req: AuthRequest, res: Response) => {
    try {
        const { friendCode } = req.body;
        const userId = req.user?.id; // Hata almayalım diye optional chaining ekledik

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const result = await friendService.addFriend(userId, friendCode);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const removeFriend = async (req: AuthRequest, res: Response) => {
    try {
        const { friendId } = req.params;
        // @ts-ignore
        const userId = req.user.id;

        const result = await friendService.removeFriend(userId, friendId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// Kullanıcının arkadaşlarını getir
export const getFriends = async (req: AuthRequest, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const friends = await friendService.getFriends(userId);
        res.status(200).json(friends);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
