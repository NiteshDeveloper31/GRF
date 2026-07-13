import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import workshopImg from '../assets/workshop_fabrication.png';
import cadImg from '../assets/cad_engineering.png';
import weldingImg from '../assets/welding_precision.png';
import reactorImg from '../assets/industrial_reactor.png';
import abadMalikImg from '../assets/Abad Malik.jpeg';
import shahzadMalikImg from '../assets/Sahjad Malik .jpeg';
import zainulAbidinImg from '../assets/Zainul Abidin.jpeg';
import zrRamanImg from '../assets/ZR raman.jpeg';
import sajidMalikImg from '../assets/Sajid Malik.jpeg';

export default function About() {
  // States
  const [activeCapId, setActiveCapId] = useState(1);
  const [activeYearIndex, setActiveYearIndex] = useState(4); // Default to 2026 (last milestone)
  const [activeMember, setActiveMember] = useState(null);

  // Prevent background page scrolling and GPU re-renders when modal is open
  useEffect(() => {
    if (activeMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMember]);

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

  const team = [
    {
      name: "Aabad Malik",
      image: abadMalikImg,
      role: "Chief Executive Officer (CEO) | Technical Expert",
      experience: "17+ Years",
      shortBio: "Aabad Malik is the Chief Executive Officer of GRF Dynamic Engineering, bringing over 17 years of experience in industrial engineering, technical design, fabrication, inspection, quality assurance, and project management.",
      fullBio: [
        "I am Aabad Malik, the Chief Executive Officer (CEO) of GRF Dynamic Engineering, with over 17 years of professional experience in industrial engineering, process equipment manufacturing, technical design, fabrication, inspection, quality assurance, and project management. Throughout my career, I have been committed to delivering innovative engineering solutions while maintaining the highest standards of quality, safety, and operational excellence.",
        "My engineering journey has been built on extensive practical experience, technical expertise, and a passion for solving complex industrial challenges. Over the years, I have developed comprehensive knowledge in the design, engineering, manufacturing, installation, and commissioning of industrial process equipment for a wide range of industries. My experience enables me to transform customer requirements into efficient, reliable, and cost-effective engineering solutions.",
        "As the Chief Executive Officer of GRF Dynamic Engineering, I lead the company's overall strategic direction, technical operations, business development, and manufacturing excellence. I work closely with our engineering, production, quality assurance, procurement, finance, and project management teams to ensure that every project is completed with precision, efficiency, and complete customer satisfaction.",
        "My core responsibilities include technical consultation, engineering design review, project planning, production management, quality assurance, inspection, fabrication supervision, cost optimization, client relationship management, and continuous improvement of manufacturing processes. I strongly believe that technical excellence, innovation, integrity, and teamwork are the key drivers of long-term business success.",
        "With more than 17 years of hands-on industry experience, I have successfully managed numerous industrial projects involving the design and manufacturing of customized process equipment. My expertise includes engineering calculations, fabrication drawings, welding standards, pressure vessel manufacturing, stainless steel fabrication, quality inspection, testing procedures, and project execution in accordance with national and international engineering standards.",
        "At GRF Dynamic Engineering, we specialize in the design and manufacturing of high-performance industrial process equipment, including MS & SS Reactors, Limpeted & Jacketed Reactors, Pressure Vessels, Heat Exchangers, Storage Tanks, Mixing Tanks, Air Receivers, Dairy Processing Equipment, Chemical Process Equipment, Pharmaceutical Equipment, Stainless Steel Fabrication, and Customized Industrial Process Equipment.",
        "My vision is to establish GRF Dynamic Engineering as one of the most trusted and respected manufacturers of industrial process equipment by delivering world-class engineering solutions, adopting advanced manufacturing technologies, and maintaining uncompromising standards of quality, safety, and reliability.",
        "I firmly believe that every successful project is built on technical expertise, innovation, customer trust, and continuous improvement. My mission is to provide customized engineering solutions that enhance productivity, improve operational efficiency, and create long-term value for our clients. Through strong leadership, engineering excellence, and a customer-focused approach, I remain dedicated to driving the continued growth and success of GRF Dynamic Engineering while building lasting partnerships with customers across diverse industrial sectors."
      ],
      specialties: [
        "Engineering Calculations",
        "Fabrication Drawings & Welding Standards",
        "Pressure Vessel Manufacturing",
        "Stainless Steel Fabrication",
        "Quality Inspection & Testing Procedures",
        "Project Execution",
        "Technical Consultation",
        "Production Management"
      ],
      productsSpecialty: [
        "MS & SS Reactors",
        "Limpeted & Jacketed Reactors",
        "Pressure Vessels",
        "Heat Exchangers",
        "Storage Tanks",
        "Mixing Tanks",
        "Air Receivers",
        "Dairy Processing Equipment",
        "Chemical Process Equipment",
        "Pharmaceutical Equipment",
        "Stainless Steel Fabrication",
        "Customized Industrial Process Equipment"
      ]
    },
    {
      name: "ZR Raman",
      image: zrRamanImg,
      role: "Manager | Finance Manager | M.Tech Engineer | Inspection & Drawing Engineer",
      experience: "10+ Years",
      shortBio: "ZR Raman is a Manager and Finance Manager with over 10 years of experience in engineering, manufacturing, inspection, technical drawing, quality assurance, and project management.",
      fullBio: [
        "I am ZR Rahan, an M.Tech Engineer with over 10 years of professional experience in engineering, manufacturing, inspection, technical drawing, finance management, quality assurance, and project management. Throughout my career, I have been committed to delivering innovative engineering solutions while maintaining the highest standards of quality, operational excellence, and customer satisfaction.",
        "I completed my engineering education in Aligarh and earned my Master of Technology (M.Tech) from Delhi AFU University. My academic background provided me with a strong foundation in engineering principles, technical design, manufacturing processes, industrial management, quality assurance, and advanced engineering applications. This combination of education and practical experience has enabled me to successfully manage complex engineering projects and lead multidisciplinary teams.",
        "My professional journey began at Manaskriti School & Institute, Faridabad, where I gained valuable experience in engineering drawings, drawing analysis, technical documentation, inspection, quality control, operations management, and project coordination. This experience strengthened my technical expertise, analytical thinking, leadership abilities, and problem-solving skills.",
        "For the past three years, I have been serving as the Manager and Finance Manager at GRF Dynamic Engineering, a trusted manufacturer of industrial process equipment and customized engineering solutions. In this role, I oversee engineering design, inspection, fabrication drawings, production planning, budgeting, financial management, procurement, project execution, quality assurance, client coordination, and overall business operations. My responsibilities include ensuring cost-effective manufacturing, maintaining high-quality standards, optimizing production efficiency, and delivering projects on time while building long-term relationships with clients.",
        "As an Inspection & Drawing Engineer, I specialize in preparing and reviewing fabrication drawings, interpreting technical specifications, conducting dimensional inspections, verifying material quality, monitoring fabrication activities, and ensuring compliance with engineering codes and international quality standards. My focus is on delivering technically accurate, reliable, and innovative engineering solutions.",
        "At GRF Dynamic Engineering, we specialize in the design and manufacturing of MS & SS Reactors, Limpeted & Jacketed Reactors, Pressure Vessels, Heat Exchangers, Storage Tanks, Mixing Tanks, Air Receivers, Dairy Processing Equipment, Chemical Process Equipment, and Custom Stainless Steel Fabrication.",
        "I believe that quality, integrity, innovation, financial discipline, and customer satisfaction are the foundation of every successful engineering organization. My mission is to deliver reliable, cost-effective, and customized engineering solutions while continuously improving manufacturing processes and exceeding customer expectations.",
        "With over a decade of professional experience, advanced technical knowledge, strong leadership capabilities, and practical expertise in engineering and financial management, I remain committed to driving the growth of GRF Dynamic Engineering and delivering world-class engineering solutions that create lasting value for our customers and business partners."
      ],
      specialties: [
        "Engineering & Project Management",
        "Financial Planning & Budgeting",
        "Fabrication Drawing Preparations",
        "Dimensional Inspections",
        "Material Quality Verification",
        "Operations & Procurement Management",
        "Quality Assurance",
        "Client Coordination"
      ],
      productsSpecialty: [
        "MS & SS Reactors",
        "Limpeted & Jacketed Reactors",
        "Pressure Vessels",
        "Heat Exchangers",
        "Storage Tanks",
        "Mixing Tanks",
        "Air Receivers",
        "Dairy Processing Equipment",
        "Chemical Process Equipment",
        "Custom Stainless Steel Fabrication"
      ]
    },
    {
      name: "Sahjad Malik",
      image: shahzadMalikImg,
      role: "Project Execution & Installation Expert",
      experience: "14+ Years",
      shortBio: "Sahjad Malik is a Project Execution and Installation Expert with over 14 years of hands-on experience in site management, equipment installation, testing, commissioning, and quality assurance.",
      fullBio: [
        "I am Shahzad, the Site Incharge at GRF Dynamic Engineering, with more than 14 years of professional experience in industrial project execution, equipment installation, fabrication supervision, site management, quality assurance, and commissioning. Throughout my career, I have been dedicated to delivering safe, efficient, and high-quality project execution while ensuring complete customer satisfaction and compliance with engineering standards.",
        "With over fourteen years of hands-on industrial experience, I have developed extensive expertise in managing complex installation projects, supervising fabrication and erection activities, coordinating multidisciplinary teams, and ensuring that every project is completed on schedule and within the required quality standards. My practical knowledge of industrial processes, combined with strong leadership and problem-solving abilities, enables me to successfully manage projects from initial planning to final commissioning.",
        "As the Site Incharge at GRF Dynamic Engineering, I am responsible for planning, organizing, and supervising all on-site activities. My role includes coordinating with clients, engineers, contractors, and project teams to ensure seamless project execution. I oversee equipment installation, fabrication, erection, alignment, testing, commissioning, quality inspections, safety compliance, manpower management, and project documentation while ensuring strict adherence to engineering drawings and technical specifications.",
        "My expertise includes interpreting engineering drawings, supervising fabrication and welding activities, monitoring installation procedures, conducting site inspections, ensuring dimensional accuracy, managing resources efficiently, resolving technical challenges, and maintaining project timelines. I am committed to implementing best engineering practices that improve productivity, enhance operational efficiency, and deliver reliable industrial solutions.",
        "Throughout my career, I have successfully managed the installation and commissioning of a wide range of industrial process equipment for chemical, pharmaceutical, dairy, food processing, cosmetic, water treatment, and other manufacturing industries. My technical knowledge and practical experience enable me to handle challenging site conditions while maintaining the highest standards of quality, safety, and performance.",
        "At GRF Dynamic Engineering, we specialize in the design, manufacturing, installation, and commissioning of premium industrial process equipment, including MS & SS Reactors, Limpeted & Jacketed Reactors, Pressure Vessels, Heat Exchangers, Storage Tanks, Mixing Tanks, Air Receivers, Dairy Processing Equipment, Chemical Process Equipment, Pharmaceutical Equipment, Stainless Steel Fabrication, and Customized Industrial Process Equipment.",
        "I firmly believe that safety, discipline, teamwork, quality, and customer satisfaction are the cornerstones of every successful industrial project. My mission is to ensure that every installation is executed with precision, every project is delivered on time, and every customer receives dependable engineering solutions that meet the highest industry standards.",
        "With 14+ years of professional experience, I remain committed to supporting the continued growth of GRF Dynamic Engineering through exceptional site management, technical expertise, and dedicated project execution. My goal is to contribute to the successful completion of every project by delivering excellence, reliability, and long-term value to our clients while upholding the company's reputation for quality and professionalism."
      ],
      specialties: [
        "Industrial Equipment Installation",
        "Site Management & Coordination",
        "Equipment Alignment & Leveling",
        "Fabrication & Welding Supervision",
        "Testing & Commissioning Procedures",
        "Safety Compliance & Resource Management",
        "Manpower Management",
        "Site Inspections"
      ],
      productsSpecialty: [
        "MS & SS Reactors",
        "Limpeted & Jacketed Reactors",
        "Pressure Vessels",
        "Heat Exchangers",
        "Storage Tanks",
        "Mixing Tanks",
        "Air Receivers",
        "Dairy Processing Equipment",
        "Chemical Process Equipment",
        "Pharmaceutical Equipment",
        "Stainless Steel Fabrication",
        "Customized Industrial Process Equipment"
      ]
    },
    {
      name: "Zainul Abidin",
      image: zainulAbidinImg,
      role: "Technical & Drawing Engineer",
      experience: "15+ Years",
      shortBio: "Zainul Abidin is a Technical & Drawing Engineer with over 15 years of experience in engineering design, technical drawing, industrial manufacturing, fabrication, quality assurance, and project execution.",
      fullBio: [
        "I am Zainul Abidin, serving as the Technical & Drawing Engineer at GRF Dynamic Engineering, with more than 15 years of professional experience in engineering design, technical drawing, industrial manufacturing, fabrication, quality assurance, and project execution. Throughout my career, I have been dedicated to delivering technically accurate engineering solutions, innovative designs, and high-quality manufacturing support while maintaining the highest standards of precision, safety, and operational excellence.",
        "With over 15 years of hands-on industrial experience, I have developed extensive expertise in engineering design, fabrication drawings, process equipment manufacturing, technical documentation, production planning, inspection, and engineering coordination. My practical knowledge and technical capabilities enable me to transform complex engineering concepts into efficient, reliable, and cost-effective manufacturing solutions that meet customer requirements and international engineering standards.",
        "As the Technical & Drawing Engineer at GRF Dynamic Engineering, I play a vital role in the design and development of industrial process equipment. My responsibilities include preparing and reviewing engineering drawings, developing fabrication and assembly drawings, creating General Arrangement (GA) drawings, interpreting technical specifications, coordinating with production teams, and providing complete technical support throughout the manufacturing process. I ensure that every drawing is accurate, practical for fabrication, and fully compliant with project specifications and engineering standards.",
        "I work closely with project managers, production engineers, quality assurance teams, and clients to ensure smooth coordination between design and manufacturing. My responsibilities also include design verification, material estimation, bill of materials (BOM) preparation, production planning support, technical problem-solving, drawing revisions, and engineering documentation. Through careful planning and attention to detail, I help ensure that every project is completed with maximum efficiency, accuracy, and quality.",
        "Throughout my professional career, I have successfully contributed to the design, engineering, and manufacturing of customized industrial equipment for the chemical, pharmaceutical, dairy, food processing, cosmetic, water treatment, paints, petrochemical, and other process industries. My expertise enables me to optimize designs for better manufacturing efficiency, reduce production costs, improve product performance, and maintain strict quality standards throughout every stage of production.",
        "My core areas of expertise include: Engineering Design & Development, Technical & Fabrication Drawings, General Arrangement (GA) Drawings, Manufacturing & Production Support, Material Estimation & Bill of Materials (BOM), Equipment Detailing & Assembly Drawings, Inspection & Quality Assurance, Technical Documentation, Engineering Coordination, Process Equipment Design, Problem Solving & Design Optimization, Production Planning & Manufacturing Support.",
        "At GRF Dynamic Engineering, we specialize in the design and manufacturing of premium industrial process equipment, including MS & SS Reactors, Limpeted & Jacketed Reactors, Pressure Vessels, Heat Exchangers, Storage Tanks, Mixing Tanks, Air Receivers, Chemical Process Equipment, Pharmaceutical Equipment, Dairy Processing Equipment, Stainless Steel Fabrication, and Customized Industrial Process Equipment.",
        "I firmly believe that precision, innovation, technical excellence, and continuous improvement are the cornerstones of successful engineering. Every engineering drawing serves as the foundation of a successful manufacturing project, and I am committed to ensuring that every design is technically sound, practical, and optimized for efficient production. My objective is to develop engineering solutions that enhance productivity, improve equipment reliability, and deliver long-term value to our clients.",
        "With 15+ years of professional experience, I continue to contribute to the growth and success of GRF Dynamic Engineering by combining technical expertise, practical industry knowledge, and innovative thinking. I remain committed to delivering world-class engineering drawings, customized technical solutions, and manufacturing excellence while supporting our clients with reliable, efficient, and high-performance industrial process equipment. My dedication to engineering quality, customer satisfaction, and continuous innovation drives me to achieve excellence in every project and strengthen the reputation of GRF Dynamic Engineering as a trusted name in industrial process equipment manufacturing."
      ],
      specialties: [
        "Engineering Design & Development",
        "Technical & Fabrication Drawings",
        "General Arrangement (GA) Drawings",
        "Manufacturing & Production Support",
        "Material Estimation & Bill of Materials (BOM)",
        "Equipment Detailing & Assembly Drawings",
        "Inspection & Quality Assurance",
        "Technical Documentation",
        "Engineering Coordination",
        "Process Equipment Design",
        "Problem Solving & Design Optimization",
        "Production Planning"
      ],
      productsSpecialty: [
        "MS & SS Reactors",
        "Limpeted & Jacketed Reactors",
        "Pressure Vessels",
        "Heat Exchangers",
        "Storage Tanks",
        "Mixing Tanks",
        "Air Receivers",
        "Chemical Process Equipment",
        "Pharmaceutical Equipment",
        "Dairy Processing Equipment",
        "Stainless Steel Fabrication",
        "Customized Industrial Process Equipment"
      ]
    },
    {
      name: "Sajid Malik",
      image: sajidMalikImg,
      role: "Supervisor | Project & Erection Specialist",
      experience: "10 Years",
      shortBio: "Sajid Malik is a dedicated and experienced Supervisor with 10 years of expertise in the fabrication, erection, installation, testing, and commissioning of industrial process equipment.",
      fullBio: [
        "I am Sajid Malik, a dedicated and experienced Supervisor at GRF Dynamic Engineering, with 10 years of expertise in the fabrication, erection, installation, testing, and commissioning of industrial process equipment. I have successfully supervised projects involving SS/MS storage tanks, pressure vessels, reactors, mixing vessels, condensers, milk processing plants, dairy equipment, and process piping systems.",
        "As a Supervisor, he is responsible for overseeing daily site activities, supervising skilled manpower, ensuring work is executed according to approved drawings and technical specifications, and maintaining the highest standards of quality and safety. He coordinates closely with site engineers and project teams to ensure smooth project execution and timely completion.",
        "With strong technical knowledge, practical problem-solving skills, and a commitment to quality workmanship, Sajid Malik has earned a reputation for reliability and professionalism. His dedication to delivering projects safely, efficiently, and on schedule makes him a valuable member of the GRF Dynamic Engineering team."
      ],
      specialties: [
        "Site Activity Supervision",
        "Manpower Coordination",
        "Drawing Compliance Verification",
        "Quality & Safety Control",
        "Process Piping Installation",
        "Equipment Testing & Commissioning",
        "Project Coordination",
        "Technical Problem-Solving"
      ],
      productsSpecialty: [
        "SS/MS Storage Tanks",
        "Pressure Vessels",
        "MS & SS Reactors",
        "Mixing Vessels",
        "Condensers",
        "Milk Processing Plants & Dairy Equipment",
        "Process Piping Systems",
        "Customized Industrial Process Equipment"
      ]
    }
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
                    <span className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10 ${isActive
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
                    className={`w-full text-left p-4 sm:p-5 rounded-sm border transition-all duration-300 cursor-pointer flex gap-4 ${isActive
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

        {/* Our Leadership & Technical Experts Section */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// CORE TEAM LEADERSHIP</span>
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-bold uppercase mt-1">
              Leadership & Technical Experts
            </h2>
            <div className="h-px bg-white/[0.04] w-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-brand-charcoal/80 p-6 rounded-sm border border-white/5 hover:border-brand-accent/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="aspect-square w-full bg-[#0a0d18] border border-white/5 rounded-xs flex flex-col items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <svg className="w-12 h-12 text-slate-700 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-2 block">
                          Photo Coming Soon
                        </span>
                      </>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="heading-font text-white font-extrabold text-sm sm:text-base uppercase tracking-wide group-hover:text-brand-accent transition-colors">
                        {member.name}
                      </h3>
                      {index === 0 && (
                        <span className="bg-brand-accent/15 text-brand-accent border border-brand-accent/20 text-[7px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest shrink-0 font-mono">
                          CEO
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider line-clamp-1">
                      {member.role.split('|')[0].trim()}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed font-light line-clamp-3">
                      {member.shortBio}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <button
                    onClick={() => setActiveMember(member)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-white uppercase tracking-wider transition-colors font-mono cursor-pointer"
                  >
                    Read Full Bio
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Biography Modal */}
        {activeMember && createPortal(
          <div 
            onClick={() => setActiveMember(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-[2px] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn cursor-pointer"
          >
            <div
              className="bg-brand-charcoal border border-brand-accent/20 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl animate-scaleUp text-left cursor-default transform-gpu will-change-transform overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner Borders */}
              <div className="absolute top-2 left-2 border-t border-l border-brand-accent/30 w-3 h-3"></div>
              <div className="absolute top-2 right-2 border-t border-r border-brand-accent/30 w-3 h-3"></div>
              <div className="absolute bottom-2 left-2 border-b border-l border-brand-accent/30 w-3 h-3"></div>
              <div className="absolute bottom-2 right-2 border-b border-r border-brand-accent/30 w-3 h-3"></div>
              <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={() => setActiveMember(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-white/[0.04] p-1.5 rounded-sm border border-transparent hover:border-white/5 transition-all duration-200 cursor-pointer"
                title="Close biography"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono text-brand-accent uppercase tracking-widest block mb-1">
                    GRF TECHNICAL TEAM MEMBER PROFILE // EXP: {activeMember.experience}
                  </span>
                  <h2 className="heading-font text-xl sm:text-2xl text-white font-extrabold uppercase">
                    {activeMember.name}
                  </h2>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-1 border-b border-white/[0.04] pb-3">
                    {activeMember.role}
                  </p>
                </div>

                {/* Biography Text */}
                <div className="space-y-4 text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  {activeMember.fullBio.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Grid: Core Areas of Expertise */}
                <div className="border-t border-white/[0.04] pt-5">
                  <span className="text-[8px] font-mono text-brand-accent uppercase tracking-widest block mb-3">
                    // CORE AREAS OF EXPERTISE & SPECIALTIES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeMember.specialties.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                        <span className="text-brand-accent text-xs">■</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid: Specialized Process Equipment */}
                <div className="border-t border-white/[0.04] pt-5">
                  <span className="text-[8px] font-mono text-brand-accent uppercase tracking-widest block mb-3">
                    // SPECIALIZED PROCESS EQUIPMENT EXPERTISE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeMember.productsSpecialty.map((prod, prIdx) => (
                      <span key={prIdx} className="bg-brand-charcoal/80 border border-white/5 text-[9px] sm:text-[10px] text-slate-300 px-2.5 py-1 rounded-sm uppercase tracking-wide font-mono">
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Manufacturing Excellence Section */}
        <section className="mb-28">
          <div className="mb-12">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// FABRICATION STANDARD</span>
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-bold uppercase mt-1">
              Manufacturing Excellence
            </h2>
            <div className="h-px bg-white/[0.04] w-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left side: Context and Description */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <span className="inline-block bg-brand-accent/5 border border-brand-accent/25 text-brand-accent text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm font-mono">
                  Precision Engineering // Saharanpur UP
                </span>
                <p className="text-slate-350 text-sm leading-relaxed font-light">
                  At GRF Dynamic Engineering, manufacturing excellence is the result of technical expertise, precision engineering, and a highly dedicated workforce. Based in Saharanpur, Uttar Pradesh, we are a trusted manufacturer of premium industrial process equipment, serving the chemical, pharmaceutical, dairy, food processing, cosmetic, water treatment, edible oil, and allied industries with reliable and customized engineering solutions.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  Our manufacturing facility is equipped to fabricate a wide range of MS and SS Reactors, Limpeted & Jacketed Reactors, Pressure Vessels, Heat Exchangers, Storage Tanks, Mixing Tanks, Air Receivers, Dairy Processing Equipment, Pharmaceutical Equipment, Chemical Process Equipment, and Customized Stainless Steel Fabrication. Every product is engineered with a strong focus on structural integrity, process efficiency, durability, and long service life to meet diverse industrial requirements.
                </p>
                <p className="text-slate-450 text-xs sm:text-sm leading-relaxed font-light">
                  The strength of GRF Dynamic Engineering lies in its experienced team of engineers, project managers, inspection professionals, technical drawing specialists, and 15 highly skilled fabrication professionals, supported by a dedicated team of helpers and installation personnel. Together, they execute every stage of manufacturing—from engineering design and material inspection to fabrication, welding, machining, polishing, testing, assembly, installation, and commissioning—with strict adherence to approved engineering standards and quality procedures.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  We believe that every successful project begins with detailed engineering and ends with complete customer satisfaction. Our manufacturing processes emphasize precision, quality control, safety, timely delivery, and continuous improvement. By combining modern engineering practices with practical industry experience, we consistently deliver equipment that offers reliable performance, operational efficiency, and long-term value.
                </p>
                <p className="text-slate-450 text-xs sm:text-sm leading-relaxed font-light">
                  At GRF Dynamic Engineering, our mission is to build lasting relationships through engineering excellence, innovative manufacturing, and dependable after-sales support. Every reactor, vessel, tank, and customized process system that leaves our facility reflects our commitment to quality, reliability, integrity, and customer satisfaction, making us a trusted partner for industrial process equipment across India.
                </p>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 font-mono text-[9px]">
                <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm relative">
                  <div className="absolute top-1 right-2 text-brand-accent/40 font-bold">01</div>
                  <span className="text-slate-500 block uppercase mb-1">Testing</span>
                  <span className="text-white font-bold block uppercase">Hydro & Radiography</span>
                </div>
                <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm relative">
                  <div className="absolute top-1 right-2 text-brand-accent/40 font-bold">02</div>
                  <span className="text-slate-500 block uppercase mb-1">Standard</span>
                  <span className="text-white font-bold block uppercase">ASME SEC VIII DIV 1</span>
                </div>
                <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm relative">
                  <div className="absolute top-1 right-2 text-brand-accent/40 font-bold">03</div>
                  <span className="text-slate-500 block uppercase mb-1">Quality</span>
                  <span className="text-white font-bold block uppercase">Zero-Defect Goal</span>
                </div>
              </div>
            </div>

            {/* Right side: Detailed Scope Sheet */}
            <div className="lg:col-span-5 bg-brand-charcoal/80 border border-white/5 p-6 rounded-sm relative overflow-hidden flex flex-col justify-between">
              {/* Drafting grid outline marks */}
              <div className="absolute top-2 left-2 border-t border-l border-white/10 w-2.5 h-2.5"></div>
              <div className="absolute top-2 right-2 border-t border-r border-white/10 w-2.5 h-2.5"></div>
              <div className="absolute bottom-2 left-2 border-b border-l border-white/10 w-2.5 h-2.5"></div>
              <div className="absolute bottom-2 right-2 border-b border-r border-white/10 w-2.5 h-2.5"></div>
              <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none"></div>

              <div className="space-y-4">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block border-b border-white/[0.04] pb-2">
                  APPROVED_FABRICATION_SPECTRUM
                </span>

                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Our manufacturing facility is fully equipped to fabricate a wide range of custom vessels and pressure components designed for structural integrity, process efficiency, and long service life:
                </p>

                <div className="space-y-2 font-mono text-[10px] sm:text-[11px] text-slate-350">
                  {[
                    "MS & SS Reactors (Jacketed & Limpeted)",
                    "High-Integrity Pressure Vessels",
                    "Shell & Tube Heat Exchangers",
                    "Milk Storage & Dairy Processing Tanks",
                    "Custom Storage & Mixing Tanks",
                    "Industrial Air Receivers",
                    "Customized Stainless Steel Fabrication",
                    "Sanitary Food & Chemical Piping"
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-white/[0.03] pb-1.5">
                      <span className="text-slate-500 uppercase tracking-wide">{(idx + 1).toString().padStart(2, '0')}. {item.split(' (')[0]}</span>
                      <span className="text-brand-accent font-bold">READY</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 text-center border-t border-white/[0.04] mt-6">
                <span className="text-[7.5px] tracking-widest text-brand-accent font-bold font-mono uppercase">
                  GRF SYSTEM CATALOGUE ID // GRF-MFG-EXCELLENCE-2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Skilled Workforce Section */}
        <section className="mb-28">
          <div className="mb-12">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// HUMAN CAPITAL & CRAFTSMANSHIP</span>
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-bold uppercase mt-1">
              Our Skilled Workforce
            </h2>
            <div className="h-px bg-white/[0.04] w-full mt-3"></div>
          </div>

          {/* Grid Layout of Workforce */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
            {/* Left: General Introduction & Stats */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <span className="inline-block bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 text-[#0ea5e9] text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm font-mono">
                  Operational Safety & Work Culture
                </span>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  At GRF Dynamic Engineering, our greatest strength is our highly skilled and dedicated workforce. Backed by a team of experienced engineers, supervisors, and technical professionals, we have built a reputation for delivering high-quality industrial process equipment with precision, reliability, and efficiency.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  Safety, discipline, teamwork, and continuous skill development are integral to our work culture. We regularly promote safe working practices, quality awareness, and technical improvement to ensure our workforce remains aligned with the latest industry standards and customer expectations.
                </p>
                <p className="text-slate-450 text-xs sm:text-sm leading-relaxed font-light">
                  Our experienced engineers, fabrication specialists, welders, fitters, machinists, polishers, installers, and support staff work together with a shared commitment to delivering durable, high-performance, and cost-effective engineering solutions.
                </p>
              </div>

              {/* Counter Row */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm relative group overflow-hidden">
                  <div className="absolute top-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-300"></div>
                  <span className="text-brand-accent font-mono text-3xl font-extrabold block">15</span>
                  <span className="text-slate-500 font-mono text-[8px] block uppercase mt-1">Fabrication Specialists</span>
                </div>
                <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm relative group overflow-hidden">
                  <div className="absolute top-0 left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-300"></div>
                  <span className="text-white font-mono text-3xl font-extrabold block">100%</span>
                  <span className="text-slate-500 font-mono text-[8px] block uppercase mt-1">Supervised Quality</span>
                </div>
                <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm relative group overflow-hidden">
                  <div className="absolute top-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-300"></div>
                  <span className="text-brand-accent font-mono text-3xl font-extrabold block">ASME</span>
                  <span className="text-slate-500 font-mono text-[8px] block uppercase mt-1">IX Certified Welders</span>
                </div>
              </div>
            </div>

            {/* Right Panels: Pillars of Workforce */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pillar 1: Fabrication Specialists */}
                <div className="bg-brand-charcoal/80 p-5 rounded-sm border border-white/5 hover:border-brand-accent/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">// SPECIALIST_GRP: 01</span>
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping"></span>
                    </div>
                    <h3 className="heading-font text-white font-bold text-sm uppercase tracking-wide group-hover:text-brand-accent transition-colors">
                      Skilled Technical Team
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">
                      Supported by 15 highly skilled fabrication professionals, fitters, welders, and polishers with extensive hands-on experience in SS & MS setups.
                    </p>
                    <ul className="space-y-1.5 pt-2 text-[10px] font-mono text-slate-350">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-brand-accent rounded-full"></span>
                        High-Pressure Vessel Welding
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-brand-accent rounded-full"></span>
                        Mirror Finishes (Ra &lt; 0.4 microns)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-brand-accent rounded-full"></span>
                        GTAW & GMAW Qualified Joints
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Pillar 2: Supervision & Engineering */}
                <div className="bg-brand-charcoal/80 p-5 rounded-sm border border-white/5 hover:border-brand-accent/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">// CONTROL_GRP: 02</span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></span>
                    </div>
                    <h3 className="heading-font text-white font-bold text-sm uppercase tracking-wide group-hover:text-white transition-colors">
                      Engineers & Supervisors
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">
                      Our workforce operates under the direct guidance of experienced design engineers, project managers, and quality inspectors.
                    </p>
                    <ul className="space-y-1.5 pt-2 text-[10px] font-mono text-slate-350">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                        Detailed Fabrication Drawings
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                        Dimensional & Quality Inspections
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                        On-Site Erection Oversight
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Support Operations & Helpers */}
              <div className="bg-brand-charcoal/80 p-5 rounded-sm border border-white/5 hover:border-blue-500/20 transition-all duration-300 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.04] pb-4 mb-4">
                  <div>
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">// SUPPORT_GRP: 03</span>
                    <h3 className="heading-font text-white font-bold text-sm uppercase tracking-wide mt-1">
                      Dedicated Helpers & Support Staff
                    </h3>
                  </div>
                  <span className="text-[8px] font-mono text-[#0ea5e9] bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 px-2 py-0.5 rounded-sm uppercase tracking-wide">
                    Workflow Logistics
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  A dedicated team of semi-skilled and unskilled helpers who play a vital role in supporting fabrication, material handling, machine operations, assembly, loading, finishing, housekeeping, and on-site installation activities. Their continuous support enables smooth workflow management, timely project execution, and enhanced productivity across all departments.
                </p>
              </div>
            </div>
          </div>

          {/* Workflow Sequence Lifecycle */}
          <div className="mb-12 bg-[#05060b] border border-white/5 p-6 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 border-t border-r border-white/10 w-2.5 h-2.5"></div>
            <div className="absolute bottom-0 left-0 border-b border-l border-white/10 w-2.5 h-2.5"></div>
            <span className="text-[9px] font-mono text-brand-accent uppercase tracking-widest block mb-5 border-b border-white/[0.04] pb-2">// WORKFORCE QUALITY LIFECYCLE & EXECUTION STAGES</span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { step: "01", name: "Material Verification", desc: "Chemical tests & thickness logs" },
                { step: "02", name: "Precision Cutting", desc: "CAD drawing alignment layout" },
                { step: "03", name: "Fit-Up Alignment", desc: "Nozzle & shell orientation" },
                { step: "04", name: "ASME Welding", desc: "GTAW / GMAW process execution" },
                { step: "05", name: "Hydro Inspections", desc: "Pressure & load checks" },
                { step: "06", name: "Mirror Polishing", desc: "Sanding & safe logistics packing" }
              ].map((item, idx) => (
                <div key={idx} className="bg-brand-charcoal/40 p-4 rounded-sm border border-white/5 relative group hover:border-brand-accent/20 transition-all duration-300">
                  <span className="text-brand-accent font-mono text-xs font-bold block mb-1">{item.step}</span>
                  <span className="text-white text-xs font-bold block uppercase tracking-wide mb-1 group-hover:text-brand-accent transition-colors">{item.name}</span>
                  <span className="text-slate-500 text-[10px] leading-tight block">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Scope Catalog */}
          <div className="bg-brand-charcoal/30 border border-white/5 p-6 sm:p-8 rounded-sm relative overflow-hidden">
            {/* Drafting grids on corners */}
            <div className="absolute top-2 left-2 border-t border-l border-white/10 w-2.5 h-2.5"></div>
            <div className="absolute top-2 right-2 border-t border-r border-white/10 w-2.5 h-2.5"></div>
            <div className="absolute bottom-2 left-2 border-b border-l border-white/10 w-2.5 h-2.5"></div>
            <div className="absolute bottom-2 right-2 border-b border-r border-white/10 w-2.5 h-2.5"></div>
            
            <div className="mb-8 border-b border-white/[0.04] pb-6">
              <span className="text-[9px] font-mono text-brand-accent uppercase tracking-widest block">// FABRICATION SPECTRUM CATALOG</span>
              <h3 className="heading-font text-white font-extrabold text-lg uppercase tracking-wider mt-1">
                Collective Equipment Scope
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light mt-2 max-w-3xl">
                The collective expertise of our workforce enables us to manufacture and install a wide range of custom industrial process equipment:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "MS & SS Reactors",
                "Limpeted & Jacketed Reactors",
                "Pressure Vessels",
                "Heat Exchangers",
                "Storage Tanks",
                "Mixing Tanks",
                "Air Receivers",
                "Dairy Processing Equipment",
                "Chemical Process Equipment",
                "Pharmaceutical Equipment",
                "Stainless Steel Fabrication",
                "Customized Process Systems"
              ].map((tag, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#0a0d18] border border-white/5 hover:border-brand-accent/30 p-4 rounded-sm transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600 font-mono text-[9px] group-hover:text-brand-accent transition-colors">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-slate-300 text-xs font-mono uppercase tracking-wide group-hover:text-white transition-colors">
                      {tag}
                    </span>
                  </div>
                  <span className="w-1.5 h-1.5 bg-brand-accent/40 rounded-full group-hover:bg-brand-accent transition-colors"></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality & Compliance Certificates Section */}
        <section className="mb-24">
          <div className="mb-10">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// REGULATORY COMPLIANCE</span>
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-bold uppercase mt-1">
              Quality & Compliance Certificates
            </h2>
            <div className="h-px bg-white/[0.04] w-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ISO Certificate */}
            <div className="bg-brand-charcoal/80 p-6 rounded-sm border border-white/5 hover:border-brand-accent/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-full h-full text-brand-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-sm bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="heading-font text-white font-bold text-sm sm:text-base uppercase tracking-wide group-hover:text-brand-accent transition-colors">
                    ISO 9001:2015 Certificate
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Quality Management Systems certification verifying our adherence to strict manufacturing, design, and welding standards.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-auto">
                <a
                  href="/certificates/GRF DYNAMIC ENGINEERING 9001 2015 Q2A.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-white uppercase tracking-wider transition-colors font-mono"
                >
                  View Certificate PDF
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* GST Certificate */}
            <div className="bg-brand-charcoal/80 p-6 rounded-sm border border-white/5 hover:border-brand-accent/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-full h-full text-brand-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-sm bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="heading-font text-white font-bold text-sm sm:text-base uppercase tracking-wide group-hover:text-brand-accent transition-colors">
                    GST Certificate
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Official Goods and Services Tax registration certificate issued by the Government of India for legal business operations.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-auto">
                <a
                  href="/certificates/1.GST CERTIFICATE  NEW.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-white uppercase tracking-wider transition-colors font-mono"
                >
                  View Certificate PDF
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* MSME Udyam */}
            <div className="bg-brand-charcoal/80 p-6 rounded-sm border border-white/5 hover:border-brand-accent/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-full h-full text-brand-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-sm bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="heading-font text-white font-bold text-sm sm:text-base uppercase tracking-wide group-hover:text-brand-accent transition-colors">
                    Udyam Certificate
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Ministry of Micro, Small & Medium Enterprises registration certificate confirming national compliance and recognition.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-auto">
                <a
                  href="/certificates/Udhyam GRF Dynamic Engineering En (1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-white uppercase tracking-wider transition-colors font-mono"
                >
                  View Certificate PDF
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* IEC Certificate */}
            <div className="bg-brand-charcoal/80 p-6 rounded-sm border border-white/5 hover:border-brand-accent/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-full h-full text-brand-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-sm bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V8a2 2 0 00-2-2h-1.5a3 3 0 01-3-3V3.055M11 12a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="heading-font text-white font-bold text-sm sm:text-base uppercase tracking-wide group-hover:text-brand-accent transition-colors">
                    IEC Code Certificate
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Import Export Code (IEC) certificate issued by the DGFT, enabling global commercial process equipment distribution.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-auto">
                <a
                  href="/certificates/certificateOfIEC (1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-white uppercase tracking-wider transition-colors font-mono"
                >
                  View Certificate PDF
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
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
