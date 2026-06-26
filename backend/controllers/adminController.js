import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const admin = await Admin.findOne({ email }).select("+password");

        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (!admin.isActive) {
            return res.status(403).json({ message: "Your account has been deactivated" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        admin.lastLogin = new Date();
        await admin.save();

        res.status(200).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        admin.name = req.body.name || admin.name;
        admin.phone = req.body.phone || admin.phone;

        if (req.body.password) {
            admin.password = await bcrypt.hash(req.body.password, 12);
        }

        const updatedAdmin = await admin.save();

        res.status(200).json({
            _id: updatedAdmin._id,
            name: updatedAdmin.name,
            email: updatedAdmin.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().sort({ createdAt: -1 });

        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};