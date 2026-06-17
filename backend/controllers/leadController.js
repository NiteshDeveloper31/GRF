import Lead from "../models/Lead.js";

// @desc    Create a new lead/quote inquiry
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            whatsapp,
            companyName,
            designation,
            productInterest,
            capacityRequired,
            materialPreference,
            message
        } = req.body;

        // Basic validations
        if (!fullName || !email || !phone) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, email, and phone number are required." 
            });
        }

        // Map frontend fields to backend schema
        let mappedMaterial = "Not Sure";
        if (materialPreference === "SS") {
            mappedMaterial = "Stainless Steel";
        } else if (materialPreference === "MS") {
            mappedMaterial = "Mild Steel";
        } else if (materialPreference === "Not Sure") {
            mappedMaterial = "Not Sure";
        } else if (materialPreference) {
            mappedMaterial = "Custom";
        }

        // Validate productInterest enum
        const validCategories = [
            "Storage Tank",
            "Milk Storage Tank",
            "Silo System",
            "Brewery Tank",
            "Reactor Vessel",
            "High Pressure Vessel",
            "Mixing Tank",
            "Jacketed Vessel",
            "Underground Oil Storage Tank",
            "Custom Equipment"
        ];
        
        let mappedProductInterest = "Custom Equipment";
        if (productInterest && validCategories.includes(productInterest)) {
            mappedProductInterest = productInterest;
        }

        const newLead = new Lead({
            name: fullName,
            email: email,
            phone: phone,
            whatsapp: whatsapp || "",
            company: companyName || "",
            designation: designation || "",
            productInterest: mappedProductInterest,
            capacityRequired: capacityRequired || "",
            material: mappedMaterial,
            message: message || "",
            source: "website",
            status: "new",
            priority: "warm"
        });

        await newLead.save();

        res.status(201).json({
            success: true,
            message: "Your inquiry has been successfully submitted.",
            lead: newLead
        });
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error registering lead. Please try again later." 
        });
    }
};
