import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/grf_dynamic");
        console.log("MongoDB connected for seeding");

        const hashedPassword = await bcrypt.hash("admin123", 12);
        const existingAdmin = await Admin.findOne({ email: "admin@grfdynamicengineering.com" });

        if (existingAdmin) {
            existingAdmin.password = hashedPassword;
            await existingAdmin.save();
            console.log("Admin password updated successfully:", existingAdmin.email);
            process.exit(0);
        }

        const admin = await Admin.create({
            name: "GRF Admin",
            email: "admin@grfdynamicengineering.com",
            password: hashedPassword,
            phone: "9557530193",
        });

        console.log("Admin created successfully");
        console.log("Email:", admin.email);
        console.log("Password: admin123");

        process.exit(0);
    } catch (error) {
        console.log("Error seeding admin:", error.message);
        process.exit(1);
    }
};

seedAdmin();