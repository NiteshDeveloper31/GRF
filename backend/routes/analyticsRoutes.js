import express from "express";
import {
    trackWhatsAppClick,
    getWhatsAppClicks,
} from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/analytics/whatsapp-click - Public route triggered by visitor clicks
router.post("/whatsapp-click", trackWhatsAppClick);

// GET /api/analytics/whatsapp-click - Protected route for admin dashboard
router.get("/whatsapp-click", protect, getWhatsAppClicks);

export default router;
