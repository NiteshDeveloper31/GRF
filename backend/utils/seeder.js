import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const initialProducts = [
    {
        name: "Industrial Industrial Storage Tank",
        category: "Storage Tank",
        description: "Heavy-duty vertical and horizontal chemical storage tanks fabricated to international standards. Built with corrosion-resistant grades of stainless steel and carbon steel. Our Storage Tanks are designed for long-term storage of chemical, water, oil, and liquid materials. Engineered to withstand high load pressures, environmental conditions, and corrosive materials.",
        specifications: [
            { key: "Capacity Range", value: "5,000 Litres to 100,000 Litres" },
            { key: "Material Preference", value: "Stainless Steel (SS 304 / SS 316) / Mild Steel (MS)" },
            { key: "Shell Thickness", value: "6 mm to 12 mm" },
            { key: "Operating Pressure", value: "Atmospheric pressure" },
            { key: "Corrosion Allowance", value: "2.0 mm" },
            { key: "Compliance", value: "ASME Sec VIII Div 1 / API 650" },
            { key: "Key Applications", value: "Chemical Storage, Petroleum Storage, Process Water holding" }
        ],
        material: ["Stainless Steel", "Mild Steel"],
        capacityRange: { min: 5000, max: 100000, unit: "Litres" },
        isFeatured: true,
        isActive: true,
        order: 1
    },
    {
        name: "Sanitary Milk Storage Tank",
        category: "Milk Storage Tank",
        description: "Insulated milk storage tanks with integrated agitation and cooling jackets. Keeps dairy products at optimal temperatures under strict sanitary conditions. Specifically engineered for the dairy industry, maintaining products at 4°C to prevent bacterial growth. Featuring high-efficiency dimple jacket cooling, polyurethane foam insulation, and a sanitary agitation system.",
        specifications: [
            { key: "Capacity Range", value: "2,000 Litres to 50,000 Litres" },
            { key: "Material Preference", value: "Stainless Steel SS 304 / SS 316L (Sanitary Grade)" },
            { key: "Finishing / Polish", value: "Inner surface mirror finish (Ra < 0.4 microns)" },
            { key: "Insulation", value: "Polyurethane Foam (PUF) - 75 mm to 100 mm" },
            { key: "Cooling Method", value: "Dimple Jacket for chilled water / Glycol circulation" },
            { key: "Agitation System", value: "Horizontal or vertical slow-speed paddle agitator" },
            { key: "Compliance", value: "ISO 22000, 3A Dairy Standards" }
        ],
        material: ["Stainless Steel"],
        capacityRange: { min: 2000, max: 50000, unit: "Litres" },
        isFeatured: true,
        isActive: true,
        order: 2
    },
    {
        name: "Bulk Grain Silo System",
        category: "Silo System",
        description: "Complete bulk storage silo systems for industrial grains, cement, and chemical powders. Includes load cells, level sensors, and pneumatic discharge. Custom fabricated to withstand seismic and wind loads. Equipped with advanced safety venting, dust collection systems, level transmitters, load cells for weight monitoring, and fluidizing cones.",
        specifications: [
            { key: "Capacity Range", value: "10 Tons to 500 Tons" },
            { key: "Material Preference", value: "Stainless Steel / Mild Steel with epoxy coating" },
            { key: "Discharge Type", value: "Pneumatic or Screw conveyor based" },
            { key: "Venting System", value: "Integrated dust filter with reverse pulse jet cleaning" },
            { key: "Safety Devices", value: "Pressure/Vacuum relief valve, explosion vent panel" },
            { key: "Control System", value: "PLC-compatible weight and level transmitters" },
            { key: "Key Applications", value: "Grain storage, Cement storage, Plastic pellets, Fly ash" }
        ],
        material: ["Stainless Steel", "Mild Steel"],
        capacityRange: { min: 10000, max: 500000, unit: "kg" },
        isFeatured: true,
        isActive: true,
        order: 3
    },
    {
        name: "Bright Beer Tank (BBT)",
        category: "Brewery Tank",
        description: "Sanitary bright beer tanks for carbonation, conditioning, and storage. Fully insulated and pressure-rated for beverage applications. Engineered for conditioning, carbonation, and packaging preparation of beer. These pressure-rated vessels feature a highly polished sanitary interior, dual-zone cooling jackets, carbonation stone assembly, and CIP (Clean-in-Place) spray balls.",
        specifications: [
            { key: "Capacity Range", value: "1,000 Litres to 20,000 Litres" },
            { key: "Material Preference", value: "Stainless Steel SS 304 / SS 316" },
            { key: "Working Pressure", value: "1.5 Bar to 3.0 Bar" },
            { key: "Interior Polish", value: "Sanitary Mirror Finish (Ra < 0.4 microns)" },
            { key: "Cooling Jacket", value: "Dimple jacket on cone and shell for Glycol cooling" },
            { key: "Insulation", value: "PUF insulated with fully welded outer cladding" },
            { key: "Standard Accessories", value: "Carbonation stone, CIP arm, pressure gauge, sample valve" }
        ],
        material: ["Stainless Steel"],
        capacityRange: { min: 1000, max: 20000, unit: "Litres" },
        isFeatured: false,
        isActive: true,
        order: 4
    },
    {
        name: "Chemical Reactor Vessel",
        category: "Reactor Vessel",
        description: "High-performance chemical reactors with high-speed shear agitators, heating/cooling jackets, and complete control systems. Designed for complex synthesis, mixing, and reactions under controlled temperature and pressure. Featuring customizable agitator types (anchor, turbine, propeller, or high-shear), internal coils or outer dimple/limpet jackets.",
        specifications: [
            { key: "Capacity Range", value: "500 Litres to 25,000 Litres" },
            { key: "Material Preference", value: "Stainless Steel SS 316L / SS 316 / Hastelloy" },
            { key: "Operating Pressure", value: "Full Vacuum to 10 Bar" },
            { key: "Jacket Type", value: "Limpet Coil (half pipe) / Dimple Jacket / Plain Jacket" },
            { key: "Agitator Speed", value: "Variable speed drive (10 RPM to 300 RPM)" },
            { key: "Shaft Seal", value: "Double mechanical seal with thermosiphon cooling" },
            { key: "Compliance", value: "ASME Section VIII Div 1" }
        ],
        material: ["Stainless Steel", "Custom"],
        capacityRange: { min: 500, max: 25000, unit: "Litres" },
        isFeatured: true,
        isActive: true,
        order: 5
    },
    {
        name: "High Pressure Air Receiver",
        category: "High Pressure Vessel",
        description: "Certified pressure vessels for compressed air, steam, and gases. Designed and tested under ASME standard codes. Custom manufactured for storage of high-pressure compressed air, gases, and steam. Each vessel undergoes rigorous non-destructive testing (NDT), including radiographic testing and hydrostatic testing, to ensure maximum safety.",
        specifications: [
            { key: "Capacity Range", value: "500 Litres to 10,000 Litres" },
            { key: "Material Preference", value: "Carbon Steel ASTM A516 Gr 70 / Stainless Steel SS 304" },
            { key: "Design Pressure", value: "10 Bar to 40 Bar" },
            { key: "Testing Methods", value: "100% Radiography, Hydrostatic testing at 1.5x design pressure" },
            { key: "Surface Treatment", value: "Sandblasting to Sa 2.5 and anti-corrosive epoxy painting" },
            { key: "Nozzles", value: "Inlet, outlet, safety valve port, drain valve port, pressure gauge" },
            { key: "Compliance", value: "ASME Boiler and Pressure Vessel Code (BPVC)" }
        ],
        material: ["Stainless Steel", "Mild Steel"],
        capacityRange: { min: 500, max: 10000, unit: "Litres" },
        isFeatured: false,
        isActive: true,
        order: 6
    },
    {
        name: "Homogenizing Mixing Tank",
        category: "Mixing Tank",
        description: "Versatile mixing tanks for pharmaceuticals, cosmetics, and food ingredients. Equipped with anchor and high-shear agitators. Built for uniform blending of liquids, emulsions, and solids. Can be equipped with contra-rotating anchor agitators, Teflon scrapers, and bottom high-shear homogenizers to handle high-viscosity products.",
        specifications: [
            { key: "Capacity Range", value: "100 Litres to 15,000 Litres" },
            { key: "Material Preference", value: "Stainless Steel SS 316L for all contact parts" },
            { key: "Heating Media", value: "Steam / Hot Water / Thermic Oil / Electric Heaters" },
            { key: "Scraper System", value: "PTFE (Teflon) wall scrapers on anchor agitator" },
            { key: "Speed Range", value: "Anchor: 10-60 RPM | Bottom Homogenizer: 1440-2880 RPM" },
            { key: "Discharge Valve", value: "Pneumatic flush bottom outlet valve (zero dead-leg)" },
            { key: "Key Applications", value: "Syrup manufacturing, Cream/Lotion blending, Sauce preparation" }
        ],
        material: ["Stainless Steel"],
        capacityRange: { min: 100, max: 15000, unit: "Litres" },
        isFeatured: false,
        isActive: true,
        order: 7
    },
    {
        name: "Jacketed Limpet Reactor",
        category: "Jacketed Vessel",
        description: "High-efficiency jacketed vessels with outer limpet coils. Provides rapid heat transfer and precise temperature control. Optimized for processes requiring thermal regulation. The outer limpet coil layout allows zoned heating and cooling, which improves efficiency and minimizes thermal stress. Popular in chemical processing.",
        specifications: [
            { key: "Capacity Range", value: "1,000 Litres to 30,000 Litres" },
            { key: "Material Preference", value: "Stainless Steel (SS 304, 316, 316L)" },
            { key: "Limpet Type", value: "Double start or single start half-pipe limpet coil" },
            { key: "Working Temperature", value: "-20°C to 250°C" },
            { key: "Insulation Jacket", value: "Glass wool / Rockwool insulation with outer SS cladding" },
            { key: "Agitation Option", value: "Pitch blade turbine, hydrofoil, or anchor" },
            { key: "Compliance", value: "ISO 9001:2015, ASME design standards" }
        ],
        material: ["Stainless Steel"],
        capacityRange: { min: 1000, max: 30000, unit: "Litres" },
        isFeatured: false,
        isActive: true,
        order: 8
    },
    {
        name: "Underground Fuel Storage Tank",
        category: "Underground Oil Storage Tank",
        description: "Double-walled underground tanks for petroleum and fuel storage. Features leakage monitoring ports and anti-corrosive coatings. Manufactured with double-walled construction to comply with strict environmental safety regulations. The space between the inner and outer shells acts as a leak detection zone.",
        specifications: [
            { key: "Capacity Range", value: "10,000 Litres to 60,000 Litres" },
            { key: "Material Preference", value: "High-tensile carbon steel / IS 2062 Grade" },
            { key: "Leak Detection", value: "Dry or wet interstitial monitoring sensor system" },
            { key: "External Protection", value: "Coal tar epoxy or FRP (Fiberglass Reinforced Plastic) wrap" },
            { key: "Testing Standards", value: "Pneumatic testing of both chambers, vacuum testing" },
            { key: "Installation Accessories", value: "Saddles, anchor straps, manhole chambers, fill pipes" },
            { key: "Key Applications", value: "Petrol pumps, Diesel generator fuel storage, Chemical parks" }
        ],
        material: ["Mild Steel", "Custom"],
        capacityRange: { min: 10000, max: 60000, unit: "Litres" },
        isFeatured: false,
        isActive: true,
        order: 9
    },
    {
        name: "Custom Process Skid System",
        category: "Custom Equipment",
        description: "Turnkey custom fabrication solutions and process skids engineered for specialized dairy, chemical, and pharma applications. GRF designs and builds Custom Process Equipment and pre-piped modular Skid Systems. Our engineering team works directly from your P&ID and process flow diagrams to deliver plug-and-play modules.",
        specifications: [
            { key: "Capacity / Size", value: "Fully customized based on process requirements" },
            { key: "Materials Available", value: "SS 304, SS 316, SS 316L, Mild Steel, Hastelloy, Duplex SS" },
            { key: "Modularization", value: "Skid-mounted on structural steel frames for easy placement" },
            { key: "Engineering Services", value: "3D CAD modeling, FEA analysis, Piping stress analysis" },
            { key: "Documentation Provided", value: "FAT/SAT protocols, Weld maps, NDT reports, Material TC" },
            { key: "Key Features", value: "Pre-wired, pre-tested, plug-and-play utility connections" }
        ],
        material: ["Stainless Steel", "Mild Steel", "Custom"],
        capacityRange: { min: 0, max: 0, unit: "Custom" },
        isFeatured: true,
        isActive: true,
        order: 10
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing product records
        console.log("Clearing existing products...");
        await Product.deleteMany();
        console.log("Existing products cleared.");

        // Insert initial seed products
        console.log("Seeding products...");
        await Product.insertMany(initialProducts);
        console.log("Database seeded successfully with 10 industrial categories!");

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

// If command line arguments contain '--clear', just clear the db
if (process.argv.includes("--clear")) {
    const clearDatabase = async () => {
        try {
            await connectDB();
            console.log("Clearing all products to test empty states...");
            await Product.deleteMany();
            console.log("All products deleted successfully.");
            mongoose.connection.close();
            process.exit(0);
        } catch (error) {
            console.error("Error clearing database:", error);
            mongoose.connection.close();
            process.exit(1);
        }
    };
    clearDatabase();
} else {
    seedDatabase();
}
