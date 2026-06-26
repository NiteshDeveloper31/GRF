import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import { seedFAQs } from "./controllers/faqController.js";
import { seedProducts } from "./controllers/productSeeder.js";

dotenv.config();

// Connect to database and seed defaults
connectDB().then(() => {
    seedFAQs();
    seedProducts();
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/faqs", faqRoutes);

app.get("/", (req, res) => {
    res.json({ message: "GRF Dynamic Engineering API Running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});