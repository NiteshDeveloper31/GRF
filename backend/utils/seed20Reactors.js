import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const IMAGES_DIR = path.join(__dirname, "../../Fwd_ SS LIMPE REACTOR VESSEL");

const seed20Reactors = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.error("Error: MONGO_URI is not defined in the backend/.env file.");
            process.exit(1);
        }

        console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:([^@]+)@/, ":****@")}...`);
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully.");

        if (!fs.existsSync(IMAGES_DIR)) {
            console.error(`Images directory does not exist: ${IMAGES_DIR}`);
            process.exit(1);
        }

        const files = fs.readdirSync(IMAGES_DIR);
        console.log(`Found ${files.length} files in images directory.`);

        // Filter for valid image files
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            const stat = fs.statSync(path.join(IMAGES_DIR, file));
            return stat.isFile() && [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
        });

        console.log(`Found ${imageFiles.length} valid image files.`);

        // Select up to 20 unique images to avoid duplicates and limit to exactly 20 products
        const processedSizes = new Set();
        const selectedFiles = [];

        for (const file of imageFiles) {
            if (selectedFiles.length >= 20) break;

            const filePath = path.join(IMAGES_DIR, file);
            const stat = fs.statSync(filePath);

            // Skip duplicate image sizes
            if (processedSizes.has(stat.size)) {
                continue;
            }
            processedSizes.add(stat.size);
            selectedFiles.push(file);
        }

        console.log(`Selected ${selectedFiles.length} unique images for seeding.`);

        // Clear existing products
        console.log("Clearing all existing products in database...");
        await Product.deleteMany({});
        console.log("Database products cleared.");

        let count = 0;
        let whatsappCount = 1;

        for (const file of selectedFiles) {
            const filePath = path.join(IMAGES_DIR, file);
            const ext = path.extname(file).toLowerCase();

            // Determine mimetype
            let contentType = "image/jpeg";
            if (ext === ".png") contentType = "image/png";
            if (ext === ".webp") contentType = "image/webp";

            // Base64 encode the image
            const fileBuffer = fs.readFileSync(filePath);
            const base64Data = fileBuffer.toString("base64");

            // Extract metadata from filename to create realistic products
            let name = "";
            let category = "Reactor Vessel";
            let material = ["Stainless Steel"];
            let desc = "";
            let specs = [];
            let capacityMin = 500;
            let capacityMax = 15000;

            const lowerFile = file.toLowerCase();

            if (lowerFile.includes("whatsapp image")) {
                name = `SS Limpet Reactor (Model GRF-${100 + whatsappCount})`;
                category = "Reactor Vessel";
                desc = `Sanitary Stainless Steel Limpet Coil Reactor (GRF-${100 + whatsappCount}) engineered for pharmaceutical and chemical processes. Features external half-pipe coil welding for high thermal efficiency.`;
                specs = [
                    { key: "Structure Type", value: "Limpet Coil Reactor" },
                    { key: "Agitator Type", value: "Motorized Anchor Agitator" },
                    { key: "Shell Material", value: "Stainless Steel 316L (Contact Part)" },
                    { key: "Limpet Coil Material", value: "Stainless Steel 304" },
                    { key: "Design Temperature", value: "Up to 250°C" }
                ];
                capacityMin = 1000;
                capacityMax = 20000;
                whatsappCount++;
            } else if (lowerFile.includes("chemical pressure vessel")) {
                name = "High-Pressure Gas & Chemical Vessel";
                category = "High Pressure Vessel";
                desc = "Industrial-grade high-pressure storage and reaction vessel designed to safely handle compressed gases and volatile chemical compounds. Certified under ASME Section VIII specifications.";
                specs = [
                    { key: "Vessel Rating", value: "ASME Section VIII Div 1" },
                    { key: "Design Pressure", value: "Up to 35 Bar" },
                    { key: "Testing Check", value: "100% Radiography on all joints" },
                    { key: "Shell Thickness", value: "16mm Carbon Steel" }
                ];
                capacityMin = 2000;
                capacityMax = 10000;
            } else if (lowerFile.includes("high pressure reactor")) {
                name = "High Pressure Synthesis Reactor";
                category = "High Pressure Vessel";
                desc = "Heavy-wall synthesis reactor built for high temperature and pressure hydrothermal chemical reactions. Equipped with double mechanical seals and safety release valves.";
                specs = [
                    { key: "Operating Pressure", value: "50 Bar max" },
                    { key: "Material of Construction", value: "SS 316 / Hastelloy lined" },
                    { key: "Shaft Sealing", value: "Sanitary Double Mechanical Seal" },
                    { key: "Safety Fittings", value: "Rupture disc & analog pressure gauge" }
                ];
                capacityMin = 500;
                capacityMax = 5000;
            } else if (lowerFile.includes("homogenrous") || lowerFile.includes("homogeneous")) {
                name = "High Shear Emulsifier & Homogenizer Tank";
                category = "Mixing Tank";
                desc = "High-speed sanitary mixing tank equipped with bottom-entry high shear emulsifier and top anchor agitator with Teflon scrapers. Ideal for cosmetics and sauces blending.";
                specs = [
                    { key: "Agitation Type", value: "Top Anchor + Bottom High-Shear Emulsifier" },
                    { key: "Emulsifier Speed", value: "Variable up to 2800 RPM" },
                    { key: "Internal Surface", value: "Electropolished Ra < 0.25 microns" },
                    { key: "CIP Spray Ball", value: "Yes, dual rotating nozzles" }
                ];
                capacityMin = 500;
                capacityMax = 3000;
            } else if (lowerFile.includes("jacketed reactor") || lowerFile.includes("jacketed-reactor")) {
                name = "Double-Wall Jacketed Reaction Vessel";
                category = "Jacketed Vessel";
                desc = "Conventional double-walled jacketed reactor designed for steam heating or glycol cooling cycles. Fully insulated with mineral wool and finished with a polished SS outer cladding.";
                specs = [
                    { key: "Jacket Type", value: "Conventional plain jacket" },
                    { key: "Utility Support", value: "Steam, hot water, or chilled glycol" },
                    { key: "Insulation Material", value: "50mm high-density Rockwool" },
                    { key: "Drive Unit", value: "Helical gearbox with 5 HP flameproof motor" }
                ];
                capacityMin = 1000;
                capacityMax = 12000;
            } else if (lowerFile.includes("ss-limpeted-coil") || lowerFile.includes("limpeted coil") || lowerFile.includes("limpet")) {
                name = "Stainless Steel Limpeted Processing Vessel";
                category = "Reactor Vessel";
                desc = "Precision fabricated chemical reactor with external half-pipe coil channels (limpet). Provides rapid and efficient heat transfer for polymerization and blending processes.";
                specs = [
                    { key: "Limpet Coil Type", value: "Half-pipe 2.5 inch channels" },
                    { key: "Material Specification", value: "SS 316L Internal, SS 304 Coil" },
                    { key: "Discharge Profile", value: "Flush bottom ball valve (zero dead-space)" },
                    { key: "Design Standard", value: "IS 2825 / ASME Sec VIII" }
                ];
                capacityMin = 1500;
                capacityMax = 25000;
            } else if (lowerFile.includes("low vessel tank")) {
                name = "Low-Profile Storage Tank";
                category = "Storage Tank";
                desc = "Low height storage vessel built from premium grade Stainless Steel 304. Optimized for facilities with low ceiling height constraints.";
                specs = [
                    { key: "Orientation", value: "Horizontal Cylindrical" },
                    { key: "Support Design", value: "Two structural MS saddles with SS lining" },
                    { key: "Outlet Flange", value: "3 inch sanitary TC fitting" }
                ];
                capacityMin = 2000;
                capacityMax = 15000;
            } else if (lowerFile.includes("mild-steel") || lowerFile.includes("ms chemical")) {
                name = "Carbon Steel Process Reactor";
                category = "Reactor Vessel";
                material = ["Mild Steel"];
                desc = "Heavy duty carbon steel reaction vessel designed for non-corrosive chemical storage, oil processing, and paint formulation. Coated with anti-rust primers.";
                specs = [
                    { key: "Shell Material", value: "Mild Steel IS 2062 Grade B" },
                    { key: "Agitator Drive", value: "Heavy-duty gear reducer with 3 phase motor" },
                    { key: "Internal Coating", value: "Epoxy primer (2 coats)" }
                ];
                capacityMin = 2000;
                capacityMax = 30000;
            } else if (lowerFile.includes("pressure digestion")) {
                name = "Hydrothermal Pressure Digestion Vessel";
                category = "High Pressure Vessel";
                desc = "Autoclave-grade high pressure vessel designed for hydrothermal synthesis, digestion, and chemical testing under strict temperature and pressure controls.";
                specs = [
                    { key: "Internal Lining", value: "Removable thick PTFE cup (inert)" },
                    { key: "Closure Design", value: "Threaded cap with heavy bolt clamping" },
                    { key: "Maximum Temperature", value: "240°C" },
                    { key: "Pressure Rating", value: "60 Bar" }
                ];
                capacityMin = 100;
                capacityMax = 1000;
            } else if (lowerFile.includes("reaction vesel") || lowerFile.includes("reaction vessel")) {
                name = "Industrial Chemical Reaction Vessel";
                category = "Reactor Vessel";
                desc = "High-performance processing reactor featuring structural support brackets, multiple flanged inlet nozzles, and heavy duty agitator paddles for uniform mixing.";
                specs = [
                    { key: "MOC Details", value: "Stainless Steel 316L (Contact parts)" },
                    { key: "Shaft Support", value: "Pedestal bearing housing for stability" },
                    { key: "Manhole Size", value: "500mm dia with quick release clamps" }
                ];
                capacityMin = 1000;
                capacityMax = 15000;
            } else {
                // General fallback if no keyword matches
                name = `GRF Industrial Equipment (Item ${count + 1})`;
                category = "Reactor Vessel";
                desc = "Custom-fabricated industrial process vessel built to heavy-duty engineering standards. Features sanitary welds, robust structural support, and custom connections.";
                specs = [
                    { key: "Equipment MOC", value: "Stainless Steel 304 / 316L" },
                    { key: "Jacket Configuration", value: "Optional / Built to client spec" },
                    { key: "Testing Done", value: "Hydro-tested at 1.5x design pressure" }
                ];
                capacityMin = 500;
                capacityMax = 10000;
            }

            // Create product in MongoDB
            await Product.create({
                name,
                category,
                description: desc,
                specifications: specs,
                images: [{ data: base64Data, contentType }],
                material,
                capacityRange: { min: capacityMin, max: capacityMax, unit: "Liters" },
                isActive: true,
                isFeatured: count < 6, // Make first 6 products featured
                order: count,
            });

            console.log(`[${count + 1}/20] Added product: "${name}" using file: ${file}`);
            count++;
        }

        console.log(`\nSuccess! Fully seeded ${count} custom products using images from: Fwd_ SS LIMPE REACTOR VESSEL`);
        process.exit(0);
    } catch (error) {
        console.error("Seeding operation failed:", error);
        process.exit(1);
    }
};

seed20Reactors();
