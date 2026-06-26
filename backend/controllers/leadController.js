import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            whatsapp,
            company,
            designation,
            productInterest,
            capacityRequired,
            material,
            message,
            source,
            city,
            state,
        } = req.body;

        if (!name || !email || !phone || !productInterest) {
            return res.status(400).json({
                message: "Please provide name, email, phone and product interest",
            });
        }

        const lead = await Lead.create({
            name,
            email,
            phone,
            whatsapp,
            company,
            designation,
            productInterest,
            capacityRequired,
            material,
            message,
            source,
            city,
            state,
        });

        res.status(201).json({ message: "Your inquiry has been submitted successfully", lead });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllLeads = async (req, res) => {
    try {
        const { status, priority, productInterest } = req.query;

        const filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (productInterest) filter.productInterest = productInterest;

        const leads = await Lead.find(filter)
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id).populate("assignedTo", "name email");

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        lead.status = req.body.status || lead.status;
        lead.priority = req.body.priority || lead.priority;
        lead.assignedTo = req.body.assignedTo || lead.assignedTo;
        lead.capacityRequired = req.body.capacityRequired || lead.capacityRequired;
        lead.material = req.body.material || lead.material;
        lead.message = req.body.message || lead.message;

        const updatedLead = await lead.save();

        res.status(200).json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        await lead.deleteOne();

        res.status(200).json({ message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLeadStats = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: "new" });
        const contactedLeads = await Lead.countDocuments({ status: "contacted" });
        const closedLeads = await Lead.countDocuments({ status: "closed" });
        const lostLeads = await Lead.countDocuments({ status: "lost" });

        res.status(200).json({
            totalLeads,
            newLeads,
            contactedLeads,
            closedLeads,
            lostLeads,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};