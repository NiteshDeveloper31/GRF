import Analytics from "../models/Analytics.js";

// @desc    Increment WhatsApp click count
// @route   POST /api/analytics/whatsapp-click
// @access  Public
export const trackWhatsAppClick = async (req, res) => {
    try {
        const record = await Analytics.findOneAndUpdate(
            { key: "whatsapp_clicks" },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        );
        res.status(200).json({ success: true, count: record.count });
    } catch (error) {
        console.error("Error tracking WhatsApp click:", error);
        res.status(500).json({ success: false, message: "Server error tracking click" });
    }
};

// @desc    Get total WhatsApp click count
// @route   GET /api/analytics/whatsapp-click
// @access  Public
export const getWhatsAppClicks = async (req, res) => {
    try {
        const record = await Analytics.findOne({ key: "whatsapp_clicks" });
        const count = record ? record.count : 0;
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error("Error fetching WhatsApp click count:", error);
        res.status(500).json({ success: false, message: "Server error fetching count" });
    }
};
