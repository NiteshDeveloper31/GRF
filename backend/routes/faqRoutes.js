import express from "express";
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  queryChatbot,
} from "../controllers/faqController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public chatbot query matching endpoint
router.post("/query", queryChatbot);

// Protected Admin CRUD endpoints
router.get("/", protect, getFAQs);
router.post("/", protect, createFAQ);
router.put("/:id", protect, updateFAQ);
router.delete("/:id", protect, deleteFAQ);

export default router;
