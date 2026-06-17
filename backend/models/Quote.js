import mongoose from "mongoose";

const quoteItemSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    quantity: {
        type: Number,
        required: true,
        default: 1,
    },

    unitPrice: {
        type: Number,
        required: true,
    },

    totalPrice: {
        type: Number,
        required: true,
    },
});

const quoteSchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: [true, "Lead reference is required"],
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: [true, "Admin reference is required"],
        },

        quoteNumber: {
            type: String,
            unique: true,
        },

        items: [quoteItemSchema],

        subtotal: {
            type: Number,
            required: true,
        },

        gst: {
            type: Number,
            default: 18,
        },

        gstAmount: {
            type: Number,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        validUntil: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["draft", "sent", "accepted", "rejected", "revised"],
            default: "draft",
        },

        notes: {
            type: String,
            trim: true,
        },

        deliveryTerms: {
            type: String,
            trim: true,
        },

        paymentTerms: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

quoteSchema.pre("save", async function (next) {
    if (!this.quoteNumber) {
        const count = await mongoose.model("Quote").countDocuments();
        this.quoteNumber = `GRF-Q-${String(count + 1).padStart(4, "0")}`;
    }

    this.gstAmount = (this.subtotal * this.gst) / 100;
    this.totalAmount = this.subtotal + this.gstAmount;

    next();
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;