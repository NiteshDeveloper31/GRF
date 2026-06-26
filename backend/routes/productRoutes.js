import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    getRelatedProducts,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.array("images", 5), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/:id/related", getRelatedProducts);
router.put("/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;