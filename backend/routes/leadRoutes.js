import express from "express";
import {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
    getLeadStats,
} from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", protect, getAllLeads);
router.get("/stats", protect, getLeadStats);
router.get("/:id", protect, getLeadById);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

export default router;