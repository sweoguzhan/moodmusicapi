import express from "express";
import { getMusicRecommendationsController } from "../controllers/musicController";

const router = express.Router();

// @ts-ignore
router.post("/recommendations", getMusicRecommendationsController);

export default router;
