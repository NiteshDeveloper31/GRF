export const mockProducts = [
  {
    id: 1,
    name: "Industrial Industrial Storage Tank",
    category: "Storage Tank",
    description: "Heavy-duty vertical and horizontal chemical storage tanks fabricated to international standards. Built with corrosion-resistant grades of stainless steel and carbon steel.",
    longDescription: "Our Storage Tanks are designed for long-term storage of chemical, water, oil, and liquid materials. Engineered to withstand high load pressures, environmental conditions, and corrosive materials, these tanks are built to last. They are available in both vertical and horizontal configurations with customizations for capacity, insulation, heating/cooling coils, and level indicators.",
    specs: {
      "Capacity Range": "5,000 Litres to 100,000 Litres",
      "Material Preference": "Stainless Steel (SS 304 / SS 316) / Mild Steel (MS)",
      "Shell Thickness": "6 mm to 12 mm",
      "Operating Pressure": "Atmospheric pressure",
      "Corrosion Allowance": "2.0 mm",
      "Compliance": "ASME Sec VIII Div 1 / API 650",
      "Key Applications": "Chemical Storage, Petroleum Storage, Process Water holding"
    }
  },
  {
    id: 2,
    name: "Sanitary Milk Storage Tank",
    category: "Milk Storage Tank",
    description: "Insulated milk storage tanks with integrated agitation and cooling jackets. Keeps dairy products at optimal temperatures under strict sanitary conditions.",
    longDescription: "Our Milk Storage Tanks are specifically engineered for the dairy industry, maintaining products at 4°C to prevent bacterial growth. Featuring high-efficiency dimple jacket cooling, polyurethane foam insulation, and a sanitary agitation system to maintain uniform fat distribution without damaging milk fat globules.",
    specs: {
      "Capacity Range": "2,000 Litres to 50,000 Litres",
      "Material Preference": "Stainless Steel SS 304 / SS 316L (Sanitary Grade)",
      "Finishing / Polish": "Inner surface mirror finish (Ra < 0.4 microns)",
      "Insulation": "Polyurethane Foam (PUF) - 75 mm to 100 mm",
      "Cooling Method": "Dimple Jacket for chilled water / Glycol circulation",
      "Agitation System": "Horizontal or vertical slow-speed paddle agitator",
      "Compliance": "ISO 22000, 3A Dairy Standards"
    }
  },
  {
    id: 3,
    name: "Bulk Grain Silo System",
    category: "Silo System",
    description: "Complete bulk storage silo systems for industrial grains, cement, and chemical powders. Includes load cells, level sensors, and pneumatic discharge.",
    longDescription: "Our Silo Systems offer high-capacity bulk storage for powdered and granular materials. Each silo is custom fabricated to withstand seismic and wind loads. Equipped with advanced safety venting, dust collection systems, level transmitters, load cells for weight monitoring, and fluidizing cones for smooth, bridge-free discharge.",
    specs: {
      "Capacity Range": "10 Tons to 500 Tons",
      "Material Preference": "Stainless Steel / Mild Steel with epoxy coating",
      "Discharge Type": "Pneumatic or Screw conveyor based",
      "Venting System": "Integrated dust filter with reverse pulse jet cleaning",
      "Safety Devices": "Pressure/Vacuum relief valve, explosion vent panel",
      "Control System": "PLC-compatible weight and level transmitters",
      "Key Applications": "Grain storage, Cement storage, Plastic pellets, Fly ash"
    }
  },
  {
    id: 4,
    name: "Bright Beer Tank (BBT)",
    category: "Brewery Tank",
    description: "Sanitary bright beer tanks for carbonation, conditioning, and storage. Fully insulated and pressure-rated for beverage applications.",
    longDescription: "Our Brewery Tanks (Bright Beer Tanks) are engineered for conditioning, carbonation, and packaging preparation of beer. These pressure-rated vessels feature a highly polished sanitary interior, dual-zone cooling jackets, carbonation stone assembly, CIP (Clean-in-Place) spray balls, and safety valves, ensuring optimum quality and carbonation retention.",
    specs: {
      "Capacity Range": "1,000 Litres to 20,000 Litres",
      "Material Preference": "Stainless Steel SS 304 / SS 316",
      "Working Pressure": "1.5 Bar to 3.0 Bar",
      "Interior Polish": "Sanitary Mirror Finish (Ra < 0.4 microns)",
      "Cooling Jacket": "Dimple jacket on cone and shell for Glycol cooling",
      "Insulation": "PUF insulated with fully welded outer cladding",
      "Standard Accessories": "Carbonation stone, CIP arm, pressure gauge, sample valve"
    }
  },
  {
    id: 5,
    name: "Chemical Reactor Vessel",
    category: "Reactor Vessel",
    description: "High-performance chemical reactors with high-speed shear agitators, heating/cooling jackets, and complete control systems.",
    longDescription: "GRF Chemical Reactor Vessels are designed for complex synthesis, mixing, and reactions under controlled temperature and pressure. Featuring customizable agitator types (anchor, turbine, propeller, or high-shear), internal coils or outer dimple/limpet jackets for temperature control, and robust mechanical seals for pressure and vacuum operations.",
    specs: {
      "Capacity Range": "500 Litres to 25,000 Litres",
      "Material Preference": "Stainless Steel SS 316L / SS 316 / Hastelloy",
      "Operating Pressure": "Full Vacuum to 10 Bar",
      "Jacket Type": "Limpet Coil (half pipe) / Dimple Jacket / Plain Jacket",
      "Agitator Speed": "Variable speed drive (10 RPM to 300 RPM)",
      "Shaft Seal": "Double mechanical seal with thermosiphon cooling",
      "Compliance": "ASME Section VIII Div 1"
    }
  },
  {
    id: 6,
    name: "High Pressure Air Receiver",
    category: "High Pressure Vessel",
    description: "Certified pressure vessels for compressed air, steam, and gases. Designed and tested under ASME standard codes.",
    longDescription: "Our High Pressure Vessels are custom manufactured for storage of high-pressure compressed air, gases, and steam. Each vessel undergoes rigorous non-destructive testing (NDT), including radiographic testing and hydrostatic testing, to ensure maximum safety and structural integrity under demanding industrial environments.",
    specs: {
      "Capacity Range": "500 Litres to 10,000 Litres",
      "Material Preference": "Carbon Steel ASTM A516 Gr 70 / Stainless Steel SS 304",
      "Design Pressure": "10 Bar to 40 Bar",
      "Testing Methods": "100% Radiography, Hydrostatic testing at 1.5x design pressure",
      "Surface Treatment": "Sandblasting to Sa 2.5 and anti-corrosive epoxy painting",
      "Nozzles": "Inlet, outlet, safety valve port, drain valve port, pressure gauge",
      "Compliance": "ASME Boiler and Pressure Vessel Code (BPVC)"
    }
  },
  {
    id: 7,
    name: "Homogenizing Mixing Tank",
    category: "Mixing Tank",
    description: "Versatile mixing tanks for pharmaceuticals, cosmetics, and food ingredients. Equipped with anchor and high-shear agitators.",
    longDescription: "Our Mixing Tanks are built for uniform blending of liquids, emulsions, and solids. They can be equipped with contra-rotating anchor agitators, Teflon scrapers, and bottom high-shear homogenizers to handle high-viscosity products while preventing burning or sticking on the heated vessel walls.",
    specs: {
      "Capacity Range": "100 Litres to 15,000 Litres",
      "Material Preference": "Stainless Steel SS 316L for all contact parts",
      "Heating Media": "Steam / Hot Water / Thermic Oil / Electric Heaters",
      "Scraper System": "PTFE (Teflon) wall scrapers on anchor agitator",
      "Speed Range": "Anchor: 10-60 RPM | Bottom Homogenizer: 1440-2880 RPM",
      "Discharge Valve": "Pneumatic flush bottom outlet valve (zero dead-leg)",
      "Key Applications": "Syrup manufacturing, Cream/Lotion blending, Sauce preparation"
    }
  },
  {
    id: 8,
    name: "Jacketed Limpet Reactor",
    category: "Jacketed Vessel",
    description: "High-efficiency jacketed vessels with outer limpet coils. Provides rapid heat transfer and precise temperature control.",
    longDescription: "Our Jacketed Vessels are optimized for processes requiring thermal regulation. The outer limpet coil layout allows zoned heating and cooling, which improves efficiency and minimizes thermal stress. Popular in chemical processing where fast heat-up and cool-down times are critical for production cycles.",
    specs: {
      "Capacity Range": "1,000 Litres to 30,000 Litres",
      "Material Preference": "Stainless Steel (SS 304, 316, 316L)",
      "Limpet Type": "Double start or single start half-pipe limpet coil",
      "Working Temperature": "-20°C to 250°C",
      "Insulation Jacket": "Glass wool / Rockwool insulation with outer SS cladding",
      "Agitation Option": "Pitch blade turbine, hydrofoil, or anchor",
      "Compliance": "ISO 9001:2015, ASME design standards"
    }
  },
  {
    id: 9,
    name: "Underground Fuel Storage Tank",
    category: "Underground Oil Storage Tank",
    description: "Double-walled underground tanks for petroleum and fuel storage. Features leakage monitoring ports and anti-corrosive coatings.",
    longDescription: "Our Underground Oil Storage Tanks are manufactured with double-walled construction to comply with strict environmental safety regulations. The space between the inner and outer shells acts as a leak detection zone. The outer shell is coated with solvent-free polyurethane or FRP cladding to protect against galvanic corrosion from the soil.",
    specs: {
      "Capacity Range": "10,000 Litres to 60,000 Litres",
      "Material Preference": "High-tensile carbon steel / IS 2062 Grade",
      "Leak Detection": "Dry or wet interstitial monitoring sensor system",
      "External Protection": "Coal tar epoxy or FRP (Fiberglass Reinforced Plastic) wrap",
      "Testing Standards": "Pneumatic testing of both chambers, vacuum testing",
      "Installation Accessories": "Saddles, anchor straps, manhole chambers, fill pipes",
      "Key Applications": "Petrol pumps, Diesel generator fuel storage, Chemical parks"
    }
  },
  {
    id: 10,
    name: "Custom Process Skid System",
    category: "Custom Equipment",
    description: "Turnkey custom fabrication solutions and process skids engineered for specialized dairy, chemical, and pharma applications.",
    longDescription: "For unique manufacturing requirements that don't fit standard products, GRF designs and builds Custom Process Equipment and pre-piped modular Skid Systems. Our engineering team works directly from your P&ID and process flow diagrams to deliver plug-and-play modules complete with piping, valves, instrumentation, and controls.",
    specs: {
      "Capacity / Size": "Fully customized based on process requirements",
      "Materials Available": "SS 304, SS 316, SS 316L, Mild Steel, Hastelloy, Duplex SS",
      "Modularization": "Skid-mounted on structural steel frames for easy placement",
      "Engineering Services": "3D CAD modeling, FEA analysis, Piping stress analysis",
      "Documentation Provided": "FAT/SAT protocols, Weld maps, NDT reports, Material TC",
      "Key Features": "Pre-wired, pre-tested, plug-and-play utility connections"
    }
  }
];

export const mockLeads = [];
