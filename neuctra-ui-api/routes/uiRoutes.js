import { Router } from "express";
import { generateUI } from "../controllers/uiController.js";

const router = Router();

// Define routes for UI Agent
router.post("/generate", generateUI);

export default router;
