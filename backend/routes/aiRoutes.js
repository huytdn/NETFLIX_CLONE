import express from "express";
import { aiRecommendations } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ai-recommendations", aiRecommendations);

export default router;
