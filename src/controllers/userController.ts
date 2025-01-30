import { Request, Response } from "express";
import User from "../models/User";
import userService from "../services/userService";
import generateToken from "../utils/generateToken";
import {AuthRequest} from "../types/express";

// Kullanıcı kaydı (Register)
export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// Kullanıcı girişi (Login)
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);

        res.json({
            id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(401).json({ message: (error as Error).message });
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        console.log(req.user);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await userService.getProfile(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
