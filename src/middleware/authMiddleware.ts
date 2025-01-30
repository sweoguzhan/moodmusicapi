import {Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
