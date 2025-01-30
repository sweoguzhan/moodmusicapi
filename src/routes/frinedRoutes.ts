import express from "express";
import { addFriend, removeFriend, getFriends } from "../controllers/friendController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Arkadaş ekleme (friendCode ile)
// @ts-ignore
router.post("/add", protect, addFriend);

// Arkadaşları listeleme
// @ts-ignore
router.get("/", protect, getFriends);

// Arkadaş çıkarma
// @ts-ignore
router.delete("/:friendId", protect, removeFriend);

export default router;
