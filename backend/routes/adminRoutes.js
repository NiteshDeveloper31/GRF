import express from "express";
import {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllAdmins,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", protect, registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protect, getAdminProfile);
router.put("/profile", protect, updateAdminProfile);
router.get("/all", protect, getAllAdmins);

export default router;