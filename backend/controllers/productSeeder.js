import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Product from "../models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGE_PATHS = [
  path.join(__dirname, "../../frontend/src/assets/industrial_reactor.png"),
  path.join(__dirname, "../../frontend/src/assets/welding_precision.png"),
  path.join(__dirname, "../../frontend/src/assets/workshop_fabrication.png"),
  path.join(__dirname, "../../frontend/src/assets/cad_engineering.png"),
  path.join(__dirname, "../../frontend/src/assets/logo1.jpeg")
];

const PRODUCTS_DATA = [
  // --- Category: Storage Tank (3) ---
  {
    name: "Vertical SS Water Storage Tank",
    category: "Storage Tank",
    description: "High-grade Stainless Steel 304 vertical storage tank designed for clean water storage in food, beverage, and chemical processing facilities. Features a sanitary mirror polish finish.",
    material: ["Stainless Steel"],
    capacityRange: { min: 1000, max: 20000, unit: "Liters" },
    specifications: [
      { key: "Material Grade", value: "SS 304 / SS 316" },
      { key: "Orientation", value: "Vertical Cylindrical" },
      { key: "Shell Thickness", value: "3mm to 6mm" },
      { key: "Internal Finish", value: "Mirror Polish (Ra < 0.4 microns)" }
    ]
  },
  {
    name: "Horizontal Chemical Storage Tank",
    category: "Storage Tank",
    description: "Heavy-duty horizontal storage vessel built for chemical raw materials. Engineered with structural saddle supports and optional safety containment coatings.",
    material: ["Stainless Steel", "Mild Steel"],
    capacityRange: { min: 5000, max: 50000, unit: "Liters" },
    specifications: [
      { key: "Material Options", value: "SS 316L or Carbon Steel" },
      { key: "Orientation", value: "Horizontal with Saddles" },
      { key: "Design Standard", value: "ASME Section VIII / API 650" },
      { key: "Testing Pressure", value: "Hydrostatic tested at 1.5 times design" }
    ]
  },
  {
    name: "Insulated Product Storage Tank",
    category: "Storage Tank",
    description: "Insulated storage tank wrapped in high-density mineral wool or PUF, sealed with a mirror-finish stainless steel cladding to maintain constant liquid temperatures.",
    material: ["Stainless Steel"],
    capacityRange: { min: 2000, max: 30000, unit: "Liters" },
    specifications: [
      { key: "Insulation Material", value: "PUF / Rockwool (50mm thickness)" },
      { key: "Cladding Material", value: "SS 304 Mirror Finish Sheet" },
      { key: "Accessories", value: "Digital Temp Transmitter, Level Indicator" }
    ]
  },

  // --- Category: Milk Storage Tank (3) ---
  {
    name: "Sanitary Milk Storage Tank",
    category: "Milk Storage Tank",
    description: "Insulated vertical storage tank specifically designed for dairy plants to store chilled milk. Features zero dead-leg valves and automated CIP cleaning nozzles.",
    material: ["Stainless Steel"],
    capacityRange: { min: 5000, max: 25000, unit: "Liters" },
    specifications: [
      { key: "Material Contact", value: "SS 316L (Food Grade)" },
      { key: "Insulation Type", value: "Polyurethane Foam (PUF)" },
      { key: "CIP Systems", value: "Dual Rotating Spray Balls" },
      { key: "Sanitary Rating", value: "3-A Dairy Certified construction" }
    ]
  },
  {
    name: "Direct Expansion (DX) Milk Cooling Tank",
    category: "Milk Storage Tank",
    description: "Direct Expansion milk cooling tank equipped with dimple cooling plates on the inner shell to cool milk from 35°C to 4°C rapidly using eco-friendly refrigerants.",
    material: ["Stainless Steel"],
    capacityRange: { min: 1000, max: 10000, unit: "Liters" },
    specifications: [
      { key: "Cooling Evaporator", value: "Dimple Plate Jacket" },
      { key: "Agitator Speed", value: "Slow speed (30 RPM) to prevent fat separation" },
      { key: "Refrigerant", value: "R404a / R134a" }
    ]
  },
  {
    name: "High Capacity Dairy Silo",
    category: "Milk Storage Tank",
    description: "Large vertical outdoor dairy silo designed for large-scale milk receiving stations, built to withstand environmental loads and preserve milk quality.",
    material: ["Stainless Steel"],
    capacityRange: { min: 30000, max: 100000, unit: "Liters" },
    specifications: [
      { key: "Installation", value: "Outdoor Foundation Mounted" },
      { key: "Agitation", value: "Horizontal Mechanical & Air Agitator" },
      { key: "Alcove Panel", value: "Fully integrated sampling valve and controls" }
    ]
  },

  // --- Category: Silo System (3) ---
  {
    name: "Industrial Powder Silo",
    category: "Silo System",
    description: "High capacity vertical silo engineered for dry bulk powders, flour, cement, or plastic granules. Features fluidizing cones to ensure uniform mass flow discharge.",
    material: ["Mild Steel", "Stainless Steel"],
    capacityRange: { min: 10000, max: 150000, unit: "Liters" },
    specifications: [
      { key: "Discharge Cone Angle", value: "60 Degrees (Fluidized)" },
      { key: "Accessories", value: "Bag filter, safety relief valve, load cells" },
      { key: "Finishing", value: "Epoxy coated internal, polyurethane external" }
    ]
  },
  {
    name: "Stainless Steel Grain Silo",
    category: "Silo System",
    description: "Sanitary vertical silo designed for food-grade grains, sugar, and dry food ingredients. Features smooth internal welds to prevent product sticking.",
    material: ["Stainless Steel"],
    capacityRange: { min: 5000, max: 50000, unit: "Liters" },
    specifications: [
      { key: "Material Grade", value: "SS 304 food-grade" },
      { key: "Inner Finish", value: "Smooth ground welds, clean design" },
      { key: "Inlet/Outlet", value: "Pneumatic conveying line compatible" }
    ]
  },
  {
    name: "Fly Ash Storage Silo",
    category: "Silo System",
    description: "Heavy-duty carbon steel silo designed for ash and cement utility plants. Equipped with top bag filters and aeration pads for smooth discharge.",
    material: ["Mild Steel"],
    capacityRange: { min: 20000, max: 200000, unit: "Liters" },
    specifications: [
      { key: "Shell Material", value: "Carbon Steel IS 2062 Grade B" },
      { key: "Aeration System", value: "Multi-point air pad fluidization" },
      { key: "Level Sensing", value: "Radar type continuous level sensor" }
    ]
  },

  // --- Category: Brewery Tank (3) ---
  {
    name: "Cylindroconical Beer Fermenter",
    category: "Brewery Tank",
    description: "Double-walled cylindroconical fermentation tank (CCT) featuring a 60-degree cone angle, dimple cooling jackets, and mirror-polished sanitary welds.",
    material: ["Stainless Steel"],
    capacityRange: { min: 500, max: 15000, unit: "Liters" },
    specifications: [
      { key: "Cone Angle", value: "60 Degrees standard" },
      { key: "Cooling Jacket", value: "Dual-zone dimple cooling jackets" },
      { key: "Internal Finish", value: "Mirror Polish Ra < 0.4 microns" },
      { key: "Pressure Rating", value: "1.5 Bar to 3.0 Bar" }
    ]
  },
  {
    name: "Bright Beer Tank (BBT)",
    category: "Brewery Tank",
    description: "Sanitary conditioning and storage vessel for carbonated beer. Equipped with carb stones, sample valves, and high-efficiency cooling jackets.",
    material: ["Stainless Steel"],
    capacityRange: { min: 500, max: 10000, unit: "Liters" },
    specifications: [
      { key: "Carbonation", value: "Stainless Steel Carbonation Stone" },
      { key: "Jacket Type", value: "Glycol dimple cooling jacket" },
      { key: "Sight Glass", value: "External level tube with safety shield" }
    ]
  },
  {
    name: "Brewery Hot Liquor Tank",
    category: "Brewery Tank",
    description: "Insulated hot water storage tank for mashing and sparging cycles in beer brewing processes. Heated via internal steam coils or electric elements.",
    material: ["Stainless Steel"],
    capacityRange: { min: 1000, max: 20000, unit: "Liters" },
    specifications: [
      { key: "Heating Method", value: "Steam Dimple Jacket / Internal Coil" },
      { key: "Insulation", value: "80mm Mineral Wool cladding" },
      { key: "Control Interface", value: "RTD PT100 temperature probe fitting" }
    ]
  },

  // --- Category: Reactor Vessel (3) ---
  {
    name: "SS 316L Chemical Reactor",
    category: "Reactor Vessel",
    description: "Standard industrial chemical reactor with mechanical seals and motorized agitator. Designed for chemical synthesis and paint formulation plants.",
    material: ["Stainless Steel"],
    capacityRange: { min: 500, max: 15000, unit: "Liters" },
    specifications: [
      { key: "Material", value: "SS 316L for maximum chemical resistance" },
      { key: "Shaft Sealing", value: "Double mechanical seal with thermosyphon" },
      { key: "Agitator Type", value: "Anchor / Pitch Blade Turbine" }
    ]
  },
  {
    name: "SS Half-Pipe Limpet Coil Reactor",
    category: "Reactor Vessel",
    description: "Chemical processing reactor wrapped in half-pipe limpet coils. Best suited for high-pressure steam heating and rapid cooling cycles.",
    material: ["Stainless Steel"],
    capacityRange: { min: 1000, max: 20000, unit: "Liters" },
    specifications: [
      { key: "Coil Construction", value: "Half-pipe limpet coils (SS 304)" },
      { key: "Design Temperature", value: "Up to 300°C" },
      { key: "Coil Test Pressure", value: "15 Bar pneumatic / hydrostatic" }
    ]
  },
  {
    name: "Mild Steel Chemical Reactor",
    category: "Reactor Vessel",
    description: "Cost-effective carbon steel chemical reactor vessel for non-corrosive chemical storage and reactions, coated internally and externally with industrial primers.",
    material: ["Mild Steel"],
    capacityRange: { min: 2000, max: 10000, unit: "Liters" },
    specifications: [
      { key: "Shell Material", value: "Carbon Steel IS 2062 Grade B" },
      { key: "Heating Jacket", value: "Conventional MS Jacket" },
      { key: "Stirrer Drive", value: "Gearbox with Flameproof Motor" }
    ]
  },

  // --- Category: High Pressure Vessel (3) ---
  {
    name: "ASME Air Receiver Tank",
    category: "High Pressure Vessel",
    description: "Vertical compressed air receiver vessel. Built to store compressed air utility reserves under strict ASME Section VIII specifications.",
    material: ["Mild Steel", "Stainless Steel"],
    capacityRange: { min: 500, max: 5000, unit: "Liters" },
    specifications: [
      { key: "Design Pressure", value: "Up to 50 Bar" },
      { key: "Standards", value: "ASME Sec VIII Div 1 / IS 2825" },
      { key: "Inspection", value: "TUV / Bureau Veritas third-party signoff" }
    ]
  },
  {
    name: "Pressure Digestion Vessel",
    category: "High Pressure Vessel",
    description: "Specialized digestion and synthesis vessel engineered to contain chemical digests under high temperature and high pressures.",
    material: ["Stainless Steel"],
    capacityRange: { min: 100, max: 1000, unit: "Liters" },
    specifications: [
      { key: "Max Temperature", value: "250°C" },
      { key: "Max Design Pressure", value: "70 Bar" },
      { key: "PTFE Lining", value: "Optional 3mm fluoropolymer insert" }
    ]
  },
  {
    name: "Industrial Gas Storage Vessel",
    category: "High Pressure Vessel",
    description: "Thick-walled high-pressure storage container designed to safely hold compressed gases and volatile solvents.",
    material: ["Mild Steel", "Stainless Steel"],
    capacityRange: { min: 1000, max: 15000, unit: "Liters" },
    specifications: [
      { key: "Plate Thickness", value: "12mm to 24mm rolling" },
      { key: "Testing Check", value: "100% Radiography on all butt welds" },
      { key: "Fittings", value: "Flanged nozzles for safety valve assemblies" }
    ]
  },

  // --- Category: Mixing Tank (3) ---
  {
    name: "Homogeneous Mixing Tank",
    category: "Mixing Tank",
    description: "Stainless steel blending vessel equipped with high-speed shear emulsifiers, ideal for uniform cosmetics, lotions, and chemical blends.",
    material: ["Stainless Steel"],
    capacityRange: { min: 500, max: 5000, unit: "Liters" },
    specifications: [
      { key: "Shear Speed", value: "Variable speed up to 2800 RPM" },
      { key: "Vessel Type", value: "Sanitary open top / closed dome" },
      { key: "Internal Baffles", value: "Removable SS 316 baffles" }
    ]
  },
  {
    name: "SS Paint Blending Vessel",
    category: "Mixing Tank",
    description: "Heavy-duty mixing tank designed for high viscosity paint and pigment blending. Features dual-shaft agitating systems.",
    material: ["Stainless Steel", "Mild Steel"],
    capacityRange: { min: 1000, max: 15000, unit: "Liters" },
    specifications: [
      { key: "Agitator Configuration", value: "Dual shaft (Anchor + High speed disc)" },
      { key: "Gearbox Type", value: "Helical bevel gear reducer" },
      { key: "Safety", value: "Flameproof terminal box for motor" }
    ]
  },
  {
    name: "Liquid Detergent Mixing Tank",
    category: "Mixing Tank",
    description: "Stainless steel vessel with paddle type mixers, used for mixing soaps, liquid detergents, and shampoos under mild heat.",
    material: ["Stainless Steel"],
    capacityRange: { min: 2000, max: 10000, unit: "Liters" },
    specifications: [
      { key: "Agitator Design", value: "Paddle stirrer with Teflon scraper blades" },
      { key: "Heating Option", value: "Conventional glycol heating jacket" },
      { key: "Discharge Valve", value: "Zero dead-leg flush bottom ball valve" }
    ]
  },

  // --- Category: Jacketed Vessel (3) ---
  {
    name: "Steam Jacketed Processing Vessel",
    category: "Jacketed Vessel",
    description: "Double-walled processing vessel with a conventional jacket designed for high-pressure steam circulation. Insulated and clad in polished SS.",
    material: ["Stainless Steel"],
    capacityRange: { min: 500, max: 8000, unit: "Liters" },
    specifications: [
      { key: "Jacket Type", value: "Conventional Plain Utility Jacket" },
      { key: "Steam Pressure", value: "Tested at 6 Bar" },
      { key: "Outer Insulation", value: "Polyurethane foam with SS 304 cladding" }
    ]
  },
  {
    name: "Dimple Jacketed Cooling Vessel",
    category: "Jacketed Vessel",
    description: "Cooling and holding vessel with laser-welded dimple sheets. Best for low pressure chilling media like glycol or cold water.",
    material: ["Stainless Steel"],
    capacityRange: { min: 1000, max: 20000, unit: "Liters" },
    specifications: [
      { key: "Evaporator", value: "Dimple cooling jacket" },
      { key: "Design Pressure", value: "Jacket tested up to 4 Bar" },
      { key: "Application", value: "Beverage cooling, syrup storage" }
    ]
  },
  {
    name: "Hot Water Coil Jacketed Vessel",
    category: "Jacketed Vessel",
    description: "Thermal processing vessel with spiral outer half-pipe limpet coils for hot water circulation, offering excellent heat transfer efficiency.",
    material: ["Stainless Steel"],
    capacityRange: { min: 500, max: 10000, unit: "Liters" },
    specifications: [
      { key: "Limpet Coil Type", value: "Spiral half-pipe channels" },
      { key: "Material", value: "SS 304 / SS 316" },
      { key: "Inner Surface finish", value: "Matte polish / electropolished option" }
    ]
  },

  // --- Category: Underground Oil Storage Tank (3) ---
  {
    name: "Double-Walled Underground Fuel Tank",
    category: "Underground Oil Storage Tank",
    description: "Double-walled underground fuel and petroleum tank with leak-detection ports, sandblasted and protected with thick anti-corrosive coal-tar epoxy.",
    material: ["Mild Steel"],
    capacityRange: { min: 10000, max: 50000, unit: "Liters" },
    specifications: [
      { key: "Structure", value: "Double-walled (Inner MS shell + Outer MS wrap)" },
      { key: "Corrosion Shield", value: "Coal-tar epoxy coating (600 microns)" },
      { key: "Safety Port", value: "Interstitial leak monitoring nozzle" },
      { key: "Standards", value: "IS 10987 / BS EN 12285" }
    ]
  },
  {
    name: "Underground Diesel Storage Tank",
    category: "Underground Oil Storage Tank",
    description: "Single or double walled underground storage tank for industrial diesel generators, engineered for high soil load resistance.",
    material: ["Mild Steel"],
    capacityRange: { min: 5000, max: 30000, unit: "Liters" },
    specifications: [
      { key: "Shell Material", value: "Structural Carbon Steel (IS 2062)" },
      { key: "Corrosion Barrier", value: "FRP (Fiberglass Reinforced Plastic) wrapping" },
      { key: "Manhole Access", value: "600mm dia manhole with bolt-down lid" }
    ]
  },
  {
    name: "Underground Lube Oil Storage Tank",
    category: "Underground Oil Storage Tank",
    description: "Heavy duty underground lube oil storage container equipped with containment sump rings and high level alarm nozzles.",
    material: ["Mild Steel", "Stainless Steel"],
    capacityRange: { min: 2000, max: 20000, unit: "Liters" },
    specifications: [
      { key: "Wall Type", value: "Thick single wall steel construction" },
      { key: "Finish Options", value: "Bituminous external coat, zinc chromate internal" },
      { key: "Anchors", value: "Holding-down straps for high water tables" }
    ]
  },

  // --- Category: Custom Equipment (3) ---
  {
    name: "SS Process Piping Skid",
    category: "Custom Equipment",
    description: "Bespoke stainless steel process piping and valve control skid, pre-fabricated, hydro-tested, and pre-wired on a transportable frame.",
    material: ["Stainless Steel"],
    capacityRange: { min: 500, max: 5000, unit: "Liters" },
    specifications: [
      { key: "Type", value: "Modular Piping Skid" },
      { key: "Valves Integrated", value: "Pneumatic butterfly & check valves" },
      { key: "Testing Check", value: "Piping hydro-tested at 10 Bar" }
    ]
  },
  {
    name: "Custom Sanitary Valve Manifold",
    category: "Custom Equipment",
    description: "Bespoke mix-proof valve matrix skid designed for sanitary food, milk, or beverage route distribution, fully automated via PLC inputs.",
    material: ["Stainless Steel"],
    capacityRange: { min: 100, max: 1000, unit: "Liters" },
    specifications: [
      { key: "Piping Polish", value: "Sanitary electro-polished (Ra < 0.25)" },
      { key: "Valves Type", value: "Double-seat mixproof valves" },
      { key: "Integration", value: "AS-i bus control panel" }
    ]
  },
  {
    name: "Mobile CIP (Clean-in-Place) System",
    category: "Custom Equipment",
    description: "Two-tank mobile CIP skid featuring a detergent tank and rinse water tank, mounted on heavy-duty wheels with integral dosing pumps.",
    material: ["Stainless Steel"],
    capacityRange: { min: 200, max: 1000, unit: "Liters" },
    specifications: [
      { key: "Skid Mounting", value: "Mobile trolley with castors & brakes" },
      { key: "Pumps", value: "Sanitary centrifugal feed & return pump" },
      { key: "Heater", value: "Integral electrical heating elements" }
    ]
  }
];

export const seedProducts = async () => {
  try {
    const count = await Product.countDocuments({});
    if (count > 0) {
      console.log(`Database already has ${count} products. Skipping auto-seeding.`);
      return;
    }

    console.log("No products found in the database. Auto-seeding 30 products...");

    // Load available images as Base64 if present, else fallback
    const base64Images = [];
    IMAGE_PATHS.forEach(imgPath => {
      if (fs.existsSync(imgPath)) {
        try {
          const fileBuffer = fs.readFileSync(imgPath);
          const base64Data = fileBuffer.toString("base64");
          let contentType = "image/png";
          if (imgPath.endsWith(".jpeg") || imgPath.endsWith(".jpg")) {
            contentType = "image/jpeg";
          }
          base64Images.push({ data: base64Data, contentType });
        } catch (e) {
          console.warn(`Failed to read image at ${imgPath}:`, e.message);
        }
      }
    });

    const fallbackImage = {
      contentType: "image/png",
      data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    };

    const seedList = PRODUCTS_DATA.map((prod, idx) => {
      let selectedImage = fallbackImage;
      if (base64Images.length > 0) {
        selectedImage = base64Images[idx % base64Images.length];
      }

      return {
        ...prod,
        images: [{ data: selectedImage.data, contentType: selectedImage.contentType }],
        isActive: true,
        isFeatured: idx < 6,
        order: idx
      };
    });

    const inserted = await Product.insertMany(seedList);
    console.log(`Successfully auto-seeded ${inserted.length} products into the production database!`);
  } catch (error) {
    console.error("Auto-seeding products failed:", error.message);
  }
};
