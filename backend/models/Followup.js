import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: [true, "Lead reference is required"],
        },

        doneBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: [true, "Admin reference is required"],
        },

        action: {
            type: String,
            enum: ["called", "emailed", "whatsapp", "meeting", "site_visit", "other"],
            required: [true, "Action type is required"],
        },

        note: {
            type: String,
            trim: true,
            required: [true, "Note is required"],
        },

        outcome: {
            type: String,
            enum: [
                "interested",
                "not_interested",
                "call_back_later",
                "deal_in_progress",
                "deal_closed",
                "no_response",
            ],
        },

        nextFollowUpDate: {
            type: Date,
        },

        nextFollowUpNote: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const FollowUp = mongoose.model("FollowUp", followUpSchema);

export default FollowUp;