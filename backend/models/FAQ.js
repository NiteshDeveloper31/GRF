import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to clean keywords (ensure they are lowercase)
faqSchema.pre("save", function (next) {
  if (this.keywords && this.keywords.length > 0) {
    this.keywords = this.keywords.map((kw) => kw.toLowerCase().trim());
  }
  next();
});

const FAQ = mongoose.model("FAQ", faqSchema);

export default FAQ;
