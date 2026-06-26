import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: [true, "Key is required"],
            unique: true,
            trim: true,
        },
        count: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
