import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        let {
            name,
            category,
            description,
            specifications,
            brochureUrl,
            material,
            capacityRange,
            isFeatured,
            order,
            isActive,
        } = req.body;

        if (typeof specifications === "string") {
            try { specifications = JSON.parse(specifications); } catch (e) { }
        }
        if (typeof material === "string") {
            try { material = JSON.parse(material); } catch (e) { }
        }
        if (typeof capacityRange === "string") {
            try { capacityRange = JSON.parse(capacityRange); } catch (e) { }
        }

        if (!name || !category) {
            return res.status(400).json({ message: "Please provide name and category" });
        }

        let images = [];

        if (req.files && req.files.length > 0) {
            images = req.files.map((file) => ({
                data: file.buffer.toString("base64"),
                contentType: file.mimetype,
            }));
        }

        const isActiveBool = isActive === "false" || isActive === false ? false : true;
        const isFeaturedBool = isFeatured === "true" || isFeatured === true ? true : false;

        const product = await Product.create({
            name,
            category,
            description,
            specifications,
            images,
            brochureUrl,
            material,
            capacityRange,
            isActive: isActiveBool,
            isFeatured: isFeaturedBool,
            order,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { category, isFeatured, all } = req.query;

        const filter = {};
        if (all !== "true") {
            filter.isActive = true;
        }

        if (category) filter.category = category;
        if (isFeatured) filter.isFeatured = isFeatured === "true";

        const products = await Product.find(filter).sort({ order: 1, createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRelatedProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id },
            isActive: true,
        }).limit(4);

        res.status(200).json(relatedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = req.body.name || product.name;
        product.category = req.body.category || product.category;
        product.description = req.body.description || product.description;

        let specifications = req.body.specifications;
        if (typeof specifications === "string") {
            try { specifications = JSON.parse(specifications); } catch (e) { }
        }
        product.specifications = specifications || product.specifications;

        product.brochureUrl = req.body.brochureUrl || product.brochureUrl;

        let material = req.body.material;
        if (typeof material === "string") {
            try { material = JSON.parse(material); } catch (e) { }
        }
        product.material = material || product.material;

        let capacityRange = req.body.capacityRange;
        if (typeof capacityRange === "string") {
            try { capacityRange = JSON.parse(capacityRange); } catch (e) { }
        }
        product.capacityRange = capacityRange || product.capacityRange;

        if (req.body.isActive !== undefined) {
            product.isActive = req.body.isActive === "false" || req.body.isActive === false ? false : true;
        }
        if (req.body.isFeatured !== undefined) {
            product.isFeatured = req.body.isFeatured === "true" || req.body.isFeatured === true ? true : false;
        }
        product.order = req.body.order ?? product.order;

        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => ({
                data: file.buffer.toString("base64"),
                contentType: file.mimetype,
            }));
            product.images = [...product.images, ...newImages];
        }

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne();

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};