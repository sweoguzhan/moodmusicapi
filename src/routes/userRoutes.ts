import express from "express";
import {getProfile, loginUser, registerUser} from "../controllers/userController";
import {protect} from "../middleware/authMiddleware";

const router = express.Router();

// Kullanıcı kayıt
router.post("/register", registerUser);
router.post("/login", loginUser);
// @ts-ignore
router.get("/profile",protect,getProfile);


export default router;
