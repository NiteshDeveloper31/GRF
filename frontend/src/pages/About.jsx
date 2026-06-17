export default function About() {
  const capabilities = [
    {
      title: "Design & Engineering",
      desc: "Our design team uses advanced 3D CAD modeling and Finite Element Analysis (FEA) to verify stress points, structural integrity, and seismic stability before production begins."
    },
    {
      title: "Advanced Welding & Forming",
      desc: "Equipped with automatic plate bending rollers, dished end forming presses, and skilled weld technicians certified to ASME Section IX for high-integrity TIG, MIG, and Submerged Arc Welding."
    },
    {
      title: "Surface Finish & Polishing",
      desc: "Complete surface treatment facilities including automatic inside-mirror polishing (Ra < 0.4 microns) for pharmaceutical/dairy vessels, and external shot blasting or chemical passivation."
    },
    {
      title: "Testing & NDT Facility",
      desc: "In-house quality verification containing hydrostatic testing up to 50 Bar, pneumatic testing, weld radiography (X-ray), dye-penetrant inspection (DPI), and ultrasonic thickness tests."
    }
  ];

  const values = [
    { name: "Engineering Precision", desc: "Every millimeter and weld joint is scrutinized to ensure it complies with ASME, API, or ISO codes." },
    { name: "Safety First", desc: "All vessels undergo strict safety testing to operate under high pressure and vacuum without risk." },
    { name: "Customer Centricity", desc: "We fabricate bespoke custom equipment tailored exactly to your floor space and process requirements." },
    { name: "Long-term Durability", desc: "We select the highest grade SS and MS metals, guaranteeing an extended operational lifecycle." }
  ];

  return (
    <div className="py-16 bg-brand-obsidian min-h-screen relative overflow-hidden">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fadeIn text-left">
        
        {/* Page Header */}
        <div className="border-b border-white/[0.04] pb-10 mb-16">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/5 border border-brand-accent/20 px-3 py-1.5 rounded-sm">
            ESTABLISHED IN SAHARANPUR, UP
          </span>
          <h1 className="heading-font text-4xl sm:text-5xl font-extrabold text-white mt-4 uppercase">
            About GRF Dynamic Engineering
          </h1>
          <div className="h-0.5 w-12 bg-brand-accent mt-4"></div>
        </div>

        {/* Company Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="heading-font text-xl sm:text-2xl text-white font-bold uppercase">
              Fabricating Excellence Since 2011
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Based in the industrial hub of Saharanpur, Uttar Pradesh, G R F Dynamic Engineering has grown from a regional custom fabrication unit to a national supplier of process equipment and storage systems. We specialize in engineering high-integrity stainless steel (SS) and mild steel (MS) structures, tailored specifically for sanitary dairy products, corrosive chemicals, and high-pressure steam environments.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              With a state-of-the-art workshop and team of qualified engineers, we handle the entire equipment lifecycle—from mechanical design and thermal calculations to sheet metal forming, welding, polish finish, testing, and transport logistics.
            </p>
          </div>
          
          {/* Dashboard-like Experience card */}
          <div className="lg:col-span-5 bg-brand-charcoal/50 border border-white/[0.04] p-8 rounded-sm relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
            
            <span className="text-brand-accent heading-font text-6xl font-extrabold tracking-tight relative">
              15+
              <span className="absolute left-0 bottom-1 w-full h-[3px] bg-brand-accent/40 blur-[4px] opacity-40"></span>
            </span>
            <span className="text-white font-bold uppercase text-xs tracking-wider mt-3 block">Years of Industry Experience</span>
            
            <div className="h-px bg-white/[0.04] my-5"></div>
            
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
              Having manufactured over 800+ tanks, reactors, and skids for clients across India, we have the specialized capability required to execute complex custom mechanical layouts.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Mission */}
          <div className="glass-panel p-6 sm:p-8 rounded-sm border border-white/[0.03] hover:border-brand-accent/20 transition-all duration-300">
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
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              To design, fabricate, and install exceptionally reliable industrial equipment that maximizes operational efficiency, ensures process safety, and fulfills sanitary or pressure compliance standards without compromise.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-panel p-6 sm:p-8 rounded-sm border border-white/[0.03] hover:border-brand-accent/20 transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="bg-brand-accent/10 p-2.5 rounded-sm text-brand-accent border border-brand-accent/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="heading-font text-lg text-white font-bold uppercase tracking-wider">
                Our Vision
              </h2>
            </div>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              To be recognized as India's premier engineering partner for custom industrial systems, constantly innovating in shell welding automation and sanitary surface finishes while maintaining roots in Saharanpur.
            </p>
          </div>
        </section>

        {/* Manufacturing Capabilities */}
        <section className="mb-24">
          <div className="mb-10">
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-bold uppercase">
              Manufacturing Capabilities
            </h2>
            <div className="h-px bg-white/[0.04] w-full mt-3"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, index) => (
              <div 
                key={index} 
                className="bg-brand-steel/30 border border-white/[0.03] hover:border-brand-accent/20 p-6 rounded-sm transition-all duration-300 flex gap-4"
              >
                <div className="text-brand-accent heading-font font-bold text-base mt-0.5 font-mono">
                  [0{index + 1}]
                </div>
                <div>
                  <h3 className="heading-font text-white text-md font-semibold mb-2 uppercase tracking-wide">
                    {cap.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values Section */}
        <section className="glass-panel p-8 rounded-sm shadow-2xl relative">
          <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none"></div>
          <div className="mb-8 relative z-10">
            <h2 className="heading-font text-2xl text-white font-bold uppercase">
              Our Core Values
            </h2>
            <div className="h-0.5 bg-brand-accent w-12 mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {values.map((val, index) => (
              <div key={index} className="bg-brand-charcoal/80 p-5 rounded-sm border border-white/5 hover:border-brand-accent/10 transition-colors duration-300">
                <h3 className="heading-font text-brand-accent font-bold text-sm mb-2.5 uppercase tracking-wide">
                  {val.name}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
