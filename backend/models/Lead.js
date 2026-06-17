import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: [true, "Phone is required"],
            trim: true,
        },

        whatsapp: {
            type: String,
            trim: true,
        },

        company: {
            type: String,
            trim: true,
        },

        designation: {
            type: String,
            trim: true,
        },

        productInterest: {
            type: String,
            enum: [
                "Storage Tank",
                "Milk Storage Tank",
                "Silo System",
                "Brewery Tank",
                "Reactor Vessel",
                "High Pressure Vessel",
                "Mixing Tank",
                "Jacketed Vessel",
                "Underground Oil Storage Tank",
                "Custom Equipment",
                "Other",
            ],
            required: [true, "Product interest is required"],
        },

        capacityRequired: {
            type: String,
            trim: true,
        },

        material: {
            type: String,
            enum: ["Stainless Steel", "Mild Steel", "Custom", "Not Sure"],
            default: "Not Sure",
        },

        message: {
            type: String,
            trim: true,
        },

        source: {
            type: String,
            enum: ["website", "meta_ads", "whatsapp", "referral", "other"],
            default: "website",
        },

        status: {
            type: String,
            enum: ["new", "contacted", "in_progress", "closed", "lost"],
            default: "new",
        },

        priority: {
            type: String,
            enum: ["hot", "warm", "cold"],
            default: "warm",
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        },

        city: {
            type: String,
            trim: true,
        },

        state: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;