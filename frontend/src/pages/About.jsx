import { useState } from 'react';
import { Link } from 'react-router-dom';
import workshopImg from '../assets/workshop_fabrication.png';
import cadImg from '../assets/cad_engineering.png';
import weldingImg from '../assets/welding_precision.png';
import reactorImg from '../assets/industrial_reactor.png';

export default function About() {
  // States
  const [activeCapId, setActiveCapId] = useState(1);
  const [activeYearIndex, setActiveYearIndex] = useState(4); // Default to 2026 (last milestone)

  const capabilities = [
    {
      id: 1,
      title: "Design & Engineering",
      short: "Mechanical Layout & FEA Simulation",
      desc: "Our design team uses advanced 3D CAD modeling and Finite Element Analysis (FEA) to verify stress points, structural integrity, and seismic stability before production begins.",
      image: cadImg,
      details: [
        { label: "Modeling Software", value: "AutoCAD / SolidWorks / ANSYS" },
        { label: "Compliance Standard", value: "ASME Section VIII Div 1 & 2" },
        { label: "Stress Testing", value: "FEA Seismic & Wind Load Simulation" },
        { label: "CAD Export Formats", value: "STEP, IGES, DWG, PDF" }
      ]
    },
    {
      id: 2,
      title: "Advanced Welding & Forming",
      short: "ASME Sec IX Certified Fabrication",
      desc: "Equipped with automatic plate bending rollers, dished end forming presses, and skilled weld technicians certified to ASME Section IX for high-integrity TIG, MIG, and Submerged Arc Welding.",
      image: weldingImg,
      details: [
        { label: "Weld Standards", value: "ASME Section IX / EN 287" },
        { label: "Thickness Capacity", value: "Up to 24mm plate thickness" },
        { label: "Processes Used", value: "TIG (GTAW) / MIG (GMAW) / SAW" },
        { label: "End Forming Press", value: "Torispherical up to 3000mm diameter" }
      ]
    },
    {
      id: 3,
      title: "Surface Finish & Polishing",
      short: "Mirror Polishing & Acid Passivation",
      desc: "Complete surface treatment facilities including automatic inside-mirror polishing (Ra < 0.4 microns) for pharmaceutical/dairy vessels, and external shot blasting or chemical passivation.",
      image: workshopImg,
      details: [
        { label: "Interior Surface Finish", value: "Ra < 0.4 microns (Mirror Finish)" },
        { label: "Exterior Finish", value: "Shot blasted / Acid passivated / Matte finish" },
        { label: "Treatments Available", value: "Pickling, Passivation, Electro-polishing" },
        { label: "Sanitary Grade", value: "USDA / FDA food & dairy compliant" }
      ]
    },
    {
      id: 4,
      title: "Testing & NDT Facility",
      short: "In-house Hydro & Radiography Checks",
      desc: "In-house quality verification containing hydrostatic testing up to 50 Bar, pneumatic testing, weld radiography (X-ray), dye-penetrant inspection (DPI), and ultrasonic thickness tests.",
      image: reactorImg,
      details: [
        { label: "Hydrostatic Testing", value: "Up to 50 Bar working rating" },
        { label: "Non-Destructive Testing", value: "Radiography (RT) / Ultrasonic (UT)" },
        { label: "Quality Checks", value: "Dye-penetrant (DP) / Magnetic particle (MP)" },
        { label: "Inspection Certs", value: "TC (Test Certificate) & Third-Party Inspect" }
      ]
    }
  ];

  const timeline = [
    {
      year: "2011",
      title: "Company Foundation",
      subtitle: "Saharanpur, UP",
      desc: "Founded as a regional custom fabrication unit specializing in steel structures and basic industrial silos in Saharanpur, Uttar Pradesh.",
      stats: { "Team Size": "10 fabricators", "Facility Area": "5,000 sq ft", "Initial Focus": "Agricultural storage" }
    },
    {
      year: "2015",
      title: "Heavy Equipment Expansion",
      subtitle: "Machinery Upgrades",
      desc: "Upgraded workshop machinery by installing automated plate bending rollers and a dedicated dished-end hydraulic forming press.",
      stats: { "Equipment Added": "Auto Rollers & Press", "Max Tank Capacity": "50,000 Liters", "Active Clients": "40+ regional industries" }
    },
    {
      year: "2018",
      title: "ASME Compliance & Growth",
      subtitle: "National Certifications",
      desc: "Upgraded quality management systems. Welding operators certified under ASME Section IX, expanding supply lines across North India.",
      stats: { "Weld Certs": "ASME Section IX", "States Reached": "12+ Indian states", "Annual Production": "80+ vessels" }
    },
    {
      year: "2021",
      title: "Silo & Reactor Leadership",
      subtitle: "Dairy & Chemical focus",
      desc: "Established leadership in fabricating milk storage silos (with dimple cooling jackets) and high-pressure chemical reactors.",
      stats: { "Silos Installed": "150+", "High-Pressure Rating": "Up to 35 Bar", "Completed Projects": "500+" }
    },
    {
      year: "2026",
      title: "Digital Integration & 800+ Tanks",
      subtitle: "Modern Engineering Era",
      desc: "Embraced smart engineering with advanced CAD simulation workflows, achieving over 800+ completed installations nationwide.",
      stats: { "Completed Tanks": "800+ nationwide", "Design Workflow": "Fully 3D & FEA simulation", "Quality Audits": "Zero-defect pass rate" }
    }
  ];

  const values = [
    { name: "Engineering Precision", desc: "Every millimeter and weld joint is scrutinized to ensure it complies with ASME, API, or ISO codes." },
    { name: "Safety First", desc: "All vessels undergo strict safety testing to operate under high pressure and vacuum without risk." },
    { name: "Customer Centricity", desc: "We fabricate bespoke custom equipment tailored exactly to your floor space and process requirements." },
    { name: "Long-term Durability", desc: "We select the highest grade SS and MS metals, guaranteeing an extended operational lifecycle." }
  ];

  const activeCapability = capabilities.find(c => c.id === activeCapId) || capabilities[0];
  const activeTimeline = timeline[activeYearIndex];

  return (
    <div className="py-16 bg-brand-obsidian min-h-screen relative overflow-hidden">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fadeIn text-left">
        
        {/* Page Header */}
        <div className="border-b border-white/[0.04] pb-10 mb-16">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/5 border border-brand-accent/20 px-3 py-1.5 rounded-sm font-mono">
            ESTABLISHED IN SAHARANPUR, UP // EST. 2011
          </span>
          <h1 className="heading-font text-4xl sm:text-5xl font-extrabold text-white mt-4 uppercase">
            About GRF Dynamic Engineering
          </h1>
          <div className="h-0.5 w-12 bg-brand-accent mt-4"></div>
        </div>

        {/* Company Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block font-bold">
              // COMPANY OVERVIEW
            </span>
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-black uppercase leading-tight">
              Fabricating Excellence Since 2011
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Based in the industrial hub of Saharanpur, Uttar Pradesh, G R F Dynamic Engineering has grown from a regional custom fabrication unit to a national supplier of process equipment and storage systems. We specialize in engineering high-integrity stainless steel (SS) and mild steel (MS) structures, tailored specifically for sanitary dairy products, corrosive chemicals, and high-pressure steam environments.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              With a state-of-the-art workshop and team of qualified engineers, we handle the entire equipment lifecycle—from mechanical design and thermal calculations to sheet metal forming, welding, polish finish, testing, and transport logistics.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm">
                <span className="text-slate-500 font-mono text-[9px] block uppercase">PROJECT RECORD</span>
                <span className="text-xl font-bold text-white font-mono mt-1 block">800+ Vessels</span>
              </div>
              <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm">
                <span className="text-slate-500 font-mono text-[9px] block uppercase">QUALITY AUDITS</span>
                <span className="text-xl font-bold text-brand-accent font-mono mt-1 block">ASME Certified</span>
              </div>
            </div>
          </div>
          
          {/* Interactive Workshop Floor Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative border border-white/10 bg-[#0a0d18] rounded-sm overflow-hidden p-3 group shadow-2xl">
              <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none"></div>
              <div className="absolute top-2 left-2 text-[7px] font-mono text-slate-500">SYS_LOC: 29.96N 77.55E // SAHARANPUR</div>
              <div className="absolute top-2 right-2 text-[7px] font-mono text-slate-500">DWG: GRF-ABOUT-01</div>
              <div className="absolute bottom-2 right-2 text-[7px] font-mono text-slate-500">SCALE: NOT TO SCALE</div>

              <img 
                src={workshopImg} 
                alt="GRF Workshop Floor" 
                className="w-full h-72 object-cover rounded-xs border border-white/5 opacity-70 group-hover:opacity-90 transition-opacity duration-300 select-none"
              />
              
              <div className="absolute bottom-5 left-5 right-5 bg-brand-obsidian/95 border border-brand-accent/30 p-3 rounded-xs backdrop-blur-md">
                <div className="flex justify-between items-center text-[9px] font-mono mb-1 text-slate-400">
                  <span>FACILITY: SAHARANPUR WORKSHOP</span>
                  <span className="text-brand-accent font-bold animate-pulse">● ACTIVE</span>
                </div>
                <p className="heading-font text-white font-bold text-xs uppercase tracking-wide">
                  Main Production Workshop Floor
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
          {/* Mission */}
          <div className="bg-[#0a0d18]/45 p-6 sm:p-8 rounded-sm border border-white/5 border-l-[3px] border-l-brand-accent/60 hover:border-brand-accent/40 transition-all duration-300 relative group overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 border-t-2 border-r-2 border-brand-accent/20 w-8 h-8 group-hover:border-brand-accent/40 transition-colors"></div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="bg-brand-accent/10 p-2.5 rounded-sm text-brand-accent border border-brand-accent/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="heading-font text-lg text-white font-bold uppercase tracking-wider">
                Our Mission
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              To design, fabricate, and install exceptionally reliable industrial equipment that maximizes operational efficiency, ensures process safety, and fulfills sanitary or pressure compliance standards without compromise.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#0a0d18]/30 p-6 sm:p-8 rounded-sm border border-white/5 border-r-[3px] border-r-blue-500/60 hover:border-blue-500/40 transition-all duration-300 relative group overflow-hidden shadow-xl">
            <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-blue-500/20 w-8 h-8 group-hover:border-blue-500/40 transition-colors"></div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="bg-blue-500/10 p-2.5 rounded-sm text-blue-400 border border-blue-500/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="heading-font text-lg text-white font-bold uppercase tracking-wider">
                Our Vision
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              To be recognized as India's premier engineering partner for custom industrial systems, constantly innovating in shell welding automation and sanitary surface finishes while maintaining roots in Saharanpur.
            </p>
          </div>
        </section>

        {/* Interactive Milestone Timeline */}
        <section className="mb-28 bg-[#0a0d18]/45 border border-white/5 rounded-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-white/[0.04] pb-6 relative z-10">
            <div>
              <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// CHRONOLOGICAL PROGRESS</span>
              <h2 className="heading-font text-2xl text-white font-bold uppercase">
                Interactive Journey & Milestones
              </h2>
            </div>
            <div className="text-[10px] font-mono text-slate-500 bg-brand-obsidian px-3 py-1.5 border border-white/10 rounded-sm">
              CLICK A YEAR TO LOAD RECORD DATA
            </div>
          </div>

          {/* Timeline Selector Track */}
          <div className="relative mb-12 px-4 z-10">
            <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-white/10 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute left-4 top-1/2 h-0.5 bg-brand-accent -translate-y-1/2 pointer-events-none transition-all duration-300" 
                 style={{ width: `${(activeYearIndex / (timeline.length - 1)) * 95}%` }}></div>
            
            <div className="relative flex justify-between items-center">
              {timeline.map((item, index) => {
                const isActive = index === activeYearIndex;
                return (
                  <button
                    key={item.year}
                    onClick={() => setActiveYearIndex(index)}
                    className="group flex flex-col items-center focus:outline-none cursor-pointer"
                  >
                    <span className={`text-xs font-mono font-bold transition-all duration-300 pb-2 block ${isActive ? 'text-brand-accent scale-110' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {item.year}
                    </span>
                    <span className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10 ${
                      isActive 
                        ? 'bg-brand-accent border-brand-accent shadow-md shadow-brand-accent/50 scale-125' 
                        : index < activeYearIndex 
                          ? 'bg-brand-accent/30 border-brand-accent'
                          : 'bg-brand-charcoal border-white/20 group-hover:border-brand-accent/50'
                    }`}></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Details Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
            
            {/* Description Area */}
            <div className="lg:col-span-7 bg-brand-obsidian/60 border border-white/5 p-6 rounded-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="inline-block bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest font-mono">
                  {activeTimeline.subtitle}
                </span>
                <h3 className="heading-font text-white text-lg font-bold uppercase tracking-wider">
                  {activeTimeline.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  {activeTimeline.desc}
                </p>
              </div>
              <div className="text-[9px] font-mono text-slate-500 pt-3 border-t border-white/5 flex items-center gap-1.5">
                <span>YEAR OF FABRICATION: {activeTimeline.year}</span>
                <span>//</span>
                <span>STATUS: ARCHIVED</span>
              </div>
            </div>

            {/* Spec Sheet Panel */}
            <div className="lg:col-span-5 bg-brand-charcoal/80 border border-white/5 p-6 rounded-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-2 left-2 border-t border-l border-white/10 w-2.5 h-2.5"></div>
              <div className="absolute top-2 right-2 border-t border-r border-white/10 w-2.5 h-2.5"></div>
              <div className="absolute bottom-2 left-2 border-b border-l border-white/10 w-2.5 h-2.5"></div>
              <div className="absolute bottom-2 right-2 border-b border-r border-white/10 w-2.5 h-2.5"></div>

              <div className="space-y-4">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block border-b border-white/[0.04] pb-2">
                  RECORD_METADATA_SHEET
                </span>
                
                <div className="space-y-2.5 font-mono text-[10px]">
                  {Object.entries(activeTimeline.stats).map(([label, val]) => (
                    <div key={label} className="flex justify-between border-b border-white/[0.03] pb-1.5">
                      <span className="text-slate-500 uppercase">{label}:</span>
                      <span className="text-white font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 text-center">
                <span className="text-[7px] tracking-widest text-brand-accent font-bold font-mono">
                  VERIFIED CAD DATA SHEET // GRF-SYS-{activeTimeline.year}
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Manufacturing Capabilities Showroom */}
        <section className="mb-28">
          <div className="mb-10">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// CAPABILITIES CONSOLE</span>
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-bold uppercase mt-1">
              Industrial Manufacturing Capabilities
            </h2>
            <div className="h-px bg-white/[0.04] w-full mt-3"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Capability Selectors */}
            <div className="lg:col-span-5 space-y-3">
              {capabilities.map((cap) => {
                const isActive = cap.id === activeCapId;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveCapId(cap.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-sm border transition-all duration-300 cursor-pointer flex gap-4 ${
                      isActive 
                        ? 'bg-brand-accent/5 border-brand-accent text-brand-accent shadow-md shadow-brand-accent/[0.02]' 
                        : 'bg-brand-steel/10 border-white/5 hover:border-white/20 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className={`heading-font font-bold text-xs font-mono shrink-0 ${isActive ? 'text-brand-accent' : 'text-slate-600'}`}>
                      [0{cap.id}]
                    </div>
                    <div className="space-y-1">
                      <h3 className={`heading-font text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {cap.title}
                      </h3>
                      <p className="text-[10px] opacity-75 line-clamp-1 leading-normal font-light">
                        {cap.short}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Capability Details */}
            <div className="lg:col-span-7 bg-[#0a0d18]/45 border border-white/5 rounded-sm p-6 sm:p-8 relative overflow-hidden flex flex-col gap-6 shadow-2xl">
              <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
              
              {/* CAD blueprint style corner markers */}
              <div className="absolute top-2 left-2 border-t border-l border-brand-accent/20 w-3 h-3"></div>
              <div className="absolute top-2 right-2 border-t border-r border-brand-accent/20 w-3 h-3"></div>
              <div className="absolute bottom-2 left-2 border-b border-l border-brand-accent/20 w-3 h-3"></div>
              <div className="absolute bottom-2 right-2 border-b border-r border-brand-accent/20 w-3 h-3"></div>

              {/* Photo Area */}
              <div className="relative aspect-[16/9] w-full rounded-xs overflow-hidden border border-white/5 group" style={{ backgroundColor: '#0a0d18' }}>
                <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none"></div>
                <img 
                  key={activeCapability.id}
                  src={activeCapability.image} 
                  alt={activeCapability.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 select-none animate-fadeIn"
                />
                <div className="absolute top-3 left-3 border border-white/10 px-2 py-1 rounded-xs text-[8px] font-mono text-slate-400" style={{ backgroundColor: 'rgba(5, 6, 11, 0.9)' }}>
                  REF_DWG: GRF-CAP-0{activeCapability.id}
                </div>
              </div>

              {/* Details & Specs Sheet */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="heading-font text-white text-lg font-bold uppercase tracking-wider">
                    {activeCapability.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    {activeCapability.desc}
                  </p>
                </div>

                <div className="border-t border-white/[0.04] pt-4 mt-2">
                  <span className="text-[8px] font-mono text-brand-accent uppercase tracking-widest block mb-3">
                    // TECHNICAL SPECIFICATIONS PARAMETERS
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCapability.details.map((detail, dIndex) => (
                      <div key={dIndex} className="p-3 bg-brand-charcoal/50 border border-white/5 rounded-xs font-mono text-[9px] sm:text-[10px]">
                        <span className="text-slate-500 uppercase block mb-1">{detail.label}</span>
                        <span className="text-white font-bold block">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Core Values Section */}
        <section className="glass-panel p-8 rounded-sm shadow-2xl relative mb-20 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 border-b-2 border-r-2 border-brand-accent/15 w-16 h-16 pointer-events-none"></div>
          
          <div className="mb-8 relative z-10">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// QUALITY INTEGRITY</span>
            <h2 className="heading-font text-2xl text-white font-bold uppercase mt-1">
              Our Core Values
            </h2>
            <div className="h-0.5 bg-brand-accent w-12 mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {values.map((val, index) => (
              <div key={index} className="bg-brand-charcoal/80 p-5 rounded-sm border border-white/5 hover:border-brand-accent/20 transition-all duration-300 group">
                <h3 className="heading-font text-brand-accent group-hover:text-white font-bold text-xs sm:text-sm mb-2.5 uppercase tracking-wide transition-colors">
                  {val.name}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action: Inquiry Link */}
        <section className="text-center bg-brand-charcoal/30 border border-dashed border-white/10 rounded-sm p-10 relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
          <div className="absolute top-2 left-2 border-t border-l border-white/10 w-3 h-3"></div>
          <div className="absolute top-2 right-2 border-t border-r border-white/10 w-3 h-3"></div>
          <div className="absolute bottom-2 left-2 border-b border-l border-white/10 w-3 h-3"></div>
          <div className="absolute bottom-2 right-2 border-b border-r border-white/10 w-3 h-3"></div>

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h3 className="heading-font text-white text-xl font-bold uppercase tracking-wider">
              Need a Custom Process Vessel Solution?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
              Get in touch with our engineering team based in Saharanpur. We will work with your process calculations to design and fabricate the exact reactor or storage system required.
            </p>
            <div className="pt-2">
              <Link 
                to="/contact" 
                className="inline-block bg-brand-accent hover:bg-brand-accent/90 text-black font-bold py-3 px-8 rounded-sm text-xs uppercase tracking-widest transition-all shadow-md shadow-brand-accent/15 cursor-pointer active:scale-95"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
