import Product from "../models/Product.js";

/**
 * Maps a MongoDB Product document to the JSON schema expected by the frontend.
 */
const mapProductToFrontend = (product) => {
    const specs = {};
    
    // Parse specifications array into key-value map
    if (product.specifications && Array.isArray(product.specifications)) {
        product.specifications.forEach(spec => {
            if (spec.key) specs[spec.key] = spec.value;
        });
    }

    // Default fallbacks if specs are empty
    if (Object.keys(specs).length === 0) {
        if (product.capacityRange) {
            specs["Capacity Range"] = `${product.capacityRange.min || 0} to ${product.capacityRange.max || 0} ${product.capacityRange.unit || 'Litres'}`;
        }
        if (product.material && product.material.length > 0) {
            specs["Material Preference"] = product.material.join(" / ");
        }
    }

    return {
        id: product._id,
        name: product.name,
        category: product.category,
        description: product.description || "",
        longDescription: product.description || "",
        specs: specs,
        isFeatured: product.isFeatured || false,
        isActive: product.isActive !== false,
        images: product.images || []
    };
};

// @desc    Get all active products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        const mappedProducts = products.map(mapProductToFrontend);
        res.status(200).json(mappedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error fetching products." });
    }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Equipment not found." });
        }
        res.status(200).json(mapProductToFrontend(product));
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        // If it's a CastError (invalid ObjectId), return 404
        if (error.name === "CastError") {
            return res.status(404).json({ message: "Equipment not found." });
        }
        res.status(500).json({ message: "Server error fetching equipment details." });
    }
};
