import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const IMAGES_DIR = path.join(__dirname, "../../frontend/Fwd_ SS LIMPE REACTOR VESSEL");

const seedProducts = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/grf_dynamic";
        console.log(`Connecting to MongoDB at: ${mongoUri}`);
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully");

        // Read all files in the directory
        if (!fs.existsSync(IMAGES_DIR)) {
            console.error(`Images directory does not exist: ${IMAGES_DIR}`);
            process.exit(1);
        }

        const files = fs.readdirSync(IMAGES_DIR);
        console.log(`Found ${files.length} files in images directory`);

        let count = 0;
        let whatsappCount = 1;

        // Keep track of file sizes to skip duplicates
        const processedSizes = new Set();

        for (const file of files) {
            const filePath = path.join(IMAGES_DIR, file);
            const stat = fs.statSync(filePath);

            if (!stat.isFile()) continue;

            // Simple duplicate file size detection to avoid exact duplicate images
            if (processedSizes.has(stat.size)) {
                console.log(`Skipping duplicate file (by size): ${file}`);
                continue;
            }
            processedSizes.add(stat.size);

            const ext = path.extname(file).toLowerCase();
            if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
                console.log(`Skipping non-image file: ${file}`);
                continue;
            }

            // Determine mimetype
            let contentType = "image/jpeg";
            if (ext === ".png") contentType = "image/png";
            if (ext === ".webp") contentType = "image/webp";

            // Base64 encode the image
            const fileBuffer = fs.readFileSync(filePath);
            const base64Data = fileBuffer.toString("base64");

            // Extract info from filename
            let name = "";
            let category = "Reactor Vessel";
            let material = ["Stainless Steel"];
            let desc = "";
            let specs = [];

            const lowerFile = file.toLowerCase();

            if (lowerFile.includes("whatsapp image")) {
                name = `Custom SS Limpet Reactor (Spec ${whatsappCount++})`;
                category = "Reactor Vessel";
                desc = "Custom fabricated Stainless Steel Limpet Coil Reactor Vessel, designed for high-efficiency heating and cooling in industrial chemical/pharmaceutical processes.";
                specs = [
                    { key: "Type", value: "Limpet Coil Reactor" },
                    { key: "Material of Construction", value: "Stainless Steel 304/316" },
                    { key: "Limpet Coil Type", value: "Half-Pipe Welded" },
                    { key: "Capacity", value: "Custom (as per client spec)" },
                    { key: "Agitator/Stirrer", value: "Optional / Customizable" }
                ];
            } else if (lowerFile.includes("chemical pressure vessel")) {
                name = "Chemical Pressure Vessel";
                category = "High Pressure Vessel";
                desc = "Heavy-duty Chemical Pressure Vessel designed to withstand high pressure and temperature requirements. Ideal for chemical synthesis and industrial reactions.";
                specs = [
                    { key: "Vessel Type", value: "Pressure Vessel" },
                    { key: "Material", value: "Stainless Steel / Carbon Steel" },
                    { key: "Design Pressure", value: "Up to 50 Bar (Customizable)" },
                    { key: "Capacity Range", value: "100L - 10,000L" }
                ];
            } else if (lowerFile.includes("chemical-reactor") || lowerFile.includes("chemical reactor")) {
                name = "Process Chemical Reactor";
                category = "Reactor Vessel";
                desc = "Standard industrial chemical reactor vessel. Features precise temperature control, robust sealing, and custom agitation mechanism.";
                specs = [
                    { key: "Type", value: "Chemical Reactor" },
                    { key: "Material", value: "Stainless Steel 316L" },
                    { key: "Heating/Cooling", value: "Limpet or Dimple Jacket" },
                    { key: "Agitator Type", value: "Anchor, Turbine, or Propeller" }
                ];
            } else if (lowerFile.includes("high pressure reactor vessel")) {
                name = "High Pressure Reactor Vessel";
                category = "High Pressure Vessel";
                desc = "High Pressure Reactor Vessel engineered for severe service environments. Certified welding and testing ensure maximum safety.";
                specs = [
                    { key: "Type", value: "High Pressure Reactor" },
                    { key: "Material", value: "SS316 / Hastelloy" },
                    { key: "Pressure Rating", value: "Up to 100 Bar" },
                    { key: "Standards", value: "ASME Section VIII Div 1" }
                ];
            } else if (lowerFile.includes("homogenrous") || lowerFile.includes("homogeneous")) {
                name = "Homogeneous Mixing Tank";
                category = "Mixing Tank";
                desc = "Homogeneous Mixing Tank equipped with high-shear emulsifiers or agitating systems for uniform mixing of liquids and viscous products.";
                specs = [
                    { key: "Type", value: "Homogenizing / Mixing Tank" },
                    { key: "Material", value: "Stainless Steel 304 / 316" },
                    { key: "Mixing Speed", value: "Variable Speed Drive" },
                    { key: "Jacket type", value: "Optional heating jacket" }
                ];
            } else if (lowerFile.includes("jacketed reactor") || lowerFile.includes("jacketed-reactor")) {
                name = "Jacketed Reactor Vessel";
                category = "Jacketed Vessel";
                desc = "Double-walled Jacketed Reactor Vessel for thermal management. Allows hot water, steam, or coolant to circulate around the vessel.";
                specs = [
                    { key: "Type", value: "Jacketed Vessel" },
                    { key: "Jacket Type", value: "Conventional / Dimple Jacket" },
                    { key: "Material", value: "SS 304 / SS 316" },
                    { key: "Insulation", value: "Glasswool/Cladding available" }
                ];
            } else if (lowerFile.includes("ss-limpeted-coil") || lowerFile.includes("limpeted coil") || lowerFile.includes("limpet")) {
                name = "SS Limpet Coil Reactor Vessel";
                category = "Reactor Vessel";
                desc = "Premium Stainless Steel Limpet Coil Reactor Vessel. Highly recommended for thermal reactions requiring fast heating/cooling cycles.";
                specs = [
                    { key: "Type", value: "Limpet Coil Reactor" },
                    { key: "Material", value: "Stainless Steel 316" },
                    { key: "Coil Type", value: "Half-pipe Limpet" },
                    { key: "Capacity", value: "500 Liters to 25,000 Liters" }
                ];
            } else if (lowerFile.includes("low vessel tank")) {
                name = "Low Profile Storage Vessel";
                category = "Storage Tank";
                desc = "Low-profile Stainless Steel Storage Tank designed for space-constrained installations without compromising storage capacity.";
                specs = [
                    { key: "Type", value: "Horizontal Storage Tank" },
                    { key: "Material", value: "SS 304" },
                    { key: "Capacity", value: "Custom (1,000L - 10,000L)" }
                ];
            } else if (lowerFile.includes("mild-steel") || lowerFile.includes("ms chemical")) {
                name = "Mild Steel Chemical Reactor";
                category = "Reactor Vessel";
                material = ["Mild Steel"];
                desc = "Cost-effective Mild Steel Chemical Reactor Vessel for non-corrosive chemical processing. Coated internally/externally for durability.";
                specs = [
                    { key: "Type", value: "Mild Steel Reactor" },
                    { key: "Material", value: "Mild Steel (IS 2062)" },
                    { key: "Coating", value: "Epoxy paint / Anti-corrosive primer" },
                    { key: "Stirrer", value: "Anchor type Agitator" }
                ];
            } else if (lowerFile.includes("pressure digestion vessel")) {
                name = "Pressure Digestion Vessel";
                category = "High Pressure Vessel";
                desc = "Specialized Pressure Digestion Vessel designed for sample preparation, acid digestion, and hydrothermal synthesis.";
                specs = [
                    { key: "Type", value: "Digestion Vessel" },
                    { key: "Material", value: "SS 316 with PTFE lining option" },
                    { key: "Max Temp", value: "250°C" },
                    { key: "Max Pressure", value: "60 Bar" }
                ];
            } else if (lowerFile.includes("reaction vesel") || lowerFile.includes("reaction vessel")) {
                name = "Chemical Reaction Vessel";
                category = "Reactor Vessel";
                desc = "High performance Chemical Reaction Vessel designed for synthesis, crystallization, and polymerization processes.";
                specs = [
                    { key: "Type", value: "Reaction Vessel" },
                    { key: "Material", value: "Stainless Steel 304 / 316" },
                    { key: "Shaft Sealing", value: "Mechanical Seal / Stuffing Box" }
                ];
            } else {
                name = "Industrial SS Limpet Reactor";
                category = "Reactor Vessel";
                desc = "Heavy duty Industrial Stainless Steel Limpet Reactor. Engineered for reliable chemical reactions and heat exchange performance.";
                specs = [
                    { key: "Type", value: "Limpet Coil Reactor" },
                    { key: "Material", value: "Stainless Steel 304/316" },
                    { key: "Limpet Type", value: "Half-Pipe Welded" }
                ];
            }

            // Create product document
            await Product.create({
                name,
                category,
                description: desc,
                specifications: specs,
                images: [{ data: base64Data, contentType }],
                material,
                capacityRange: { min: 500, max: 25000, unit: "Liters" },
                isActive: true,
                isFeatured: count < 6, // Make first 6 products featured
                order: count,
            });

            console.log(`Successfully added product: ${name} (File: ${file}, Category: ${category})`);
            count++;
        }

        console.log(`\nAll done! Successfully seeded ${count} products.`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

seedProducts();
