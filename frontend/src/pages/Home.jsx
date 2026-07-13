import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/axios';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import reactorImg from '../assets/industrial_reactor.png';


const CATEGORIES_SHOWCASE = [
  {
    name: "Storage Tank",
    desc: "Vertical & horizontal chemical, oil, and liquid storage tank systems.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m12 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2m12 0H5"
  },
  {
    name: "Milk Storage Tank",
    desc: "Insulated sanitary dairy silos featuring dimple cooling jackets.",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
  },
  {
    name: "Silo System",
    desc: "High-capacity dry powder, cement, and bulk grain storage systems.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5"
  },
  {
    name: "Brewery Tank",
    desc: "Condensation-regulated fermentation and bright beer conditioning vessels.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
  },
  {
    name: "Reactor Vessel",
    desc: "High-pressure chemical reactors complete with motorized agitation.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
  },
  {
    name: "High Pressure Vessel",
    desc: "ASME certified air receivers, steam headers, and gas storage tanks.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    name: "Mixing Tank",
    desc: "Pharmaceutical and food homogenizing tanks with high-shear blenders.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 6H16"
  },
  {
    name: "Jacketed Vessel",
    desc: "Heat-transfer vessels fitted with outer limpet steam coils.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    name: "Underground Oil Storage Tank",
    desc: "Double-walled fuel and oil tanks with leakage monitoring ports.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  },
  {
    name: "Custom Equipment",
    desc: "Bespoke engineering skids, structural frames, and module pipes.",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 100-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
  }
];

export default function Home({ products, setProducts, loading, setLoading, error, setError }) {
  const [activeHotspot, setActiveHotspot] = useState(1);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        if (products.length === 0) {
          setLoading(true);
          const data = await getProducts();
          setProducts(data);
        }
      } catch (err) {
        if (products.length === 0) {
          setError('Failed to fetch featured products. Please try again later.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [products.length, setProducts, setLoading, setError]);

  const hotspots = [
    {
      id: 1,
      title: "Agitator Drive Assembly",
      desc: "Top-entry heavy-duty drive unit featuring an energy-efficient ABB motor and a gear box. Equipped with double mechanical seals to maintain vacuum or high pressure ratings up to 15 Bar.",
      x: "50%",
      y: "12%",
      specs: { "Power Range": "3 HP to 30 HP", "Sealing": "Double Mechanical", "Agitation Speed": "Variable 10 - 250 RPM" }
    },
    {
      id: 2,
      title: "Flanged Inlet Nozzle",
      desc: "Raised-face flange process connection (ANSI Class 150/300) fabricated from premium SS 316L. The inner surface is mirror-finished (Ra < 0.4μm) to align with pharmaceutical hygiene standards.",
      x: "33%",
      y: "22%",
      specs: { "Size": "2 inch to 6 inch", "Flange Std": "ANSI B16.5", "Finish Polish": "Ra < 0.4 microns" }
    },
    {
      id: 3,
      title: "Limpet Half-Pipe Jacket",
      desc: "Precision double-start half-pipe limpet coil wrapped around the reactor body shell. Engineered for rapid circulation of steam, cooling glycol, or hot thermic oil to support thermal reaction profiles.",
      x: "68%",
      y: "50%",
      specs: { "Coil Material": "SS 304 / Carbon Steel", "Working Temp": "-20°C to 280°C", "Testing Pressure": "1.5x Design Pressure" }
    },
    {
      id: 4,
      title: "ASME Torispherical End",
      desc: "Spun and formed dished ends designed under ASME Section VIII parameters. Formed using hydraulic press rolling to ensure even pressure dispersion across vertical head boundaries.",
      x: "50%",
      y: "85%",
      specs: { "Head Type": "Torispherical / Ellipsoidal", "Crown Radius": "0.9 D", "Shell thickness": "8 mm to 24 mm" }
    },
    {
      id: 5,
      title: "Flush Bottom Discharge Valve",
      desc: "Pneumatic-actuated bottom outlet discharge valve designed with a zero-dead-leg plug. Seals flush with the interior tank shell boundary to prevent material residue or reaction bypass.",
      x: "50%",
      y: "92%",
      specs: { "Operation": "Pneumatic / Manual", "Dead-leg": "0 mm (True Flush)", "Seat Material": "PTFE / Metal-to-Metal" }
    }
  ];

  const usps = [
    {
      title: "15+ Years Experience",
      description: "Dedicated to designing and manufacturing industrial systems with absolute engineering precision since 2011.",
      icon: (
        <svg className="h-7 w-7 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Custom Fabrication",
      description: "Bespoke storage vessels and piping modules engineered in-house to integrate with your floor layout.",
      icon: (
        <svg className="h-7 w-7 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Pan India Delivery",
      description: "Heavy logistics management delivering oversized shells and skids securely to industrial sites nationwide.",
      icon: (
        <svg className="h-7 w-7 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    },
    {
      title: "ISO Certified Quality",
      description: "Rigorous quality controls complying strictly with ASME boiler codes and global sanitary finishing parameters.",
      icon: (
        <svg className="h-7 w-7 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const industries = [
    { name: "Dairy", desc: "Insulated milk silos, processing tanks, and sanitary blending equipment.", code: "DY" },
    { name: "Pharma", desc: "SS 316L sterile vessels, pure steam reactors, and zero-dead-leg mixing tanks.", code: "PH" },
    { name: "Chemical", desc: "Corrosion-resistant limpet reactors and hazardous chemical storage tank systems.", code: "CH" },
    { name: "Food & Beverage", desc: "Mixing and storage equipment matching strict food-grade sanitary standards.", code: "FB" },
    { name: "Oil & Gas", desc: "Certified high-pressure air receivers and double-walled underground fuel tanks.", code: "OG" },
    { name: "Brewery", desc: "Polished conditioning tanks, bright beer tanks, and fermentation vessels.", code: "BR" }
  ];

  const activeHotspotInfo = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <div className="flex flex-col bg-brand-obsidian text-slate-300 animate-fadeIn">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 border-b border-white/[0.03]">
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-accent/[0.03] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/[0.03] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent"></span>
                <span className="text-[10px] tracking-widest text-brand-accent uppercase font-bold">
                  HEAVY INDUSTRIAL MANUFACTURING &bull; SAHARANPUR, INDIA
                </span>
              </div>

              <h1 className="heading-font text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 uppercase">
                Precision Engineered.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-500 font-extrabold relative">
                  Built to Last.
                  <span className="absolute left-0 bottom-0.5 w-full h-[3px] bg-brand-accent blur-[3px] opacity-40"></span>
                </span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg md:text-lg mb-10 max-w-2xl leading-relaxed font-light">
                G R F Dynamic Engineering designs, builds, and delivers high-capacity storage silos, double-jacketed chemical reactors, milk tanks, and custom process equipment complying with ASME and ISO sanitary codes.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white px-9 py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-brand-accent/10 hover:shadow-brand-accent/25 active:scale-[0.98] cursor-pointer"
                >
                  View Products
                </Link>
                <Link
                  to="/contact"
                  className="border border-white/10 hover:border-white text-slate-300 hover:text-white hover:bg-white/[0.02] px-9 py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98]"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Right Column: Premium Product Showcase Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative w-full max-w-[420px] aspect-square group flex items-center justify-center">
                {/* Solid dark circle background to prevent smudge in light theme (using inline style to prevent class overrides) */}
                <div className="absolute inset-4 rounded-full border border-brand-accent/15 shadow-2xl pointer-events-none" style={{ backgroundColor: '#0b0d16' }}></div>

                {/* Tech background grids & rings to blend it */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                {/* Concentric rotating grids & blueprint guides */}
                <div className="absolute h-[85%] w-[85%] rounded-full border border-dashed border-slate-800/40 flex items-center justify-center pointer-events-none">
                  <div className="h-[75%] w-[75%] rounded-full border border-dashed border-brand-accent/20 flex items-center justify-center animate-pulse">
                    <div className="h-[60%] w-[60%] rounded-full border border-dotted border-slate-700/30"></div>
                  </div>
                </div>

                {/* Floating technical corner lines */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-accent/30 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-accent/30 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand-accent/30 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-accent/30 pointer-events-none"></div>

                {/* Image itself with blending and radial mask */}
                <img
                  src={reactorImg}
                  alt="Industrial Double Jacketed Chemical Reactor"
                  className="w-[85%] h-[85%] object-contain relative z-10 opacity-80 mix-blend-screen transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  style={{
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)',
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)'
                  }}
                />

                {/* Floating status tag */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 border border-brand-accent/30 px-3 py-1.5 rounded-sm shadow-xl" style={{ backgroundColor: '#0b0d16' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[9px] font-mono tracking-wider text-slate-300 uppercase font-semibold">GRF-RX-2000L</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Showcase 10 Categories Section */}
      <section className="py-16 border-b border-white/[0.03] bg-brand-charcoal/20 relative">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/5 border border-brand-accent/20 px-3 py-1.5 rounded-sm">
              MANUFACTURING DIVISIONS
            </span>
            <h2 className="heading-font text-3xl sm:text-4xl text-white font-extrabold mt-4 uppercase">
              Our Equipment Categories
            </h2>
            <div className="h-px w-16 bg-brand-accent mx-auto mt-4"></div>
            <p className="text-slate-500 mt-4 text-sm font-light">
              Browse our 10 core engineering and custom fabrication divisions. Select a category to see technical specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CATEGORIES_SHOWCASE.map((cat, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="glass-panel glass-panel-hover p-6 rounded-sm flex flex-col justify-between text-left transition-all duration-300 group hover:border-brand-accent/40 hover:bg-[#0d101e]"
              >
                <div>
                  {/* Category icon */}
                  <div className="text-brand-accent mb-4 bg-brand-obsidian p-2.5 rounded-sm border border-white/5 inline-block group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3">
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                  </div>
                  <h3 className="heading-font text-white text-sm font-bold tracking-wide mb-2 uppercase group-hover:text-brand-accent transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                <div className="text-[10px] text-brand-accent group-hover:text-white font-bold uppercase tracking-widest mt-4 flex items-center gap-1">
                  <span>View Catalog</span>
                  <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* CAD Blueprint Tank Inspector */}
      <section className="py-16 border-b border-white/[0.03] bg-brand-charcoal/30 relative">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/5 border border-brand-accent/20 px-3 py-1.5 rounded-sm">
              INTERACTIVE VESSEL SPECIFICATIONS
            </span>
            <h2 className="heading-font text-3xl sm:text-4xl text-white font-extrabold mt-4 uppercase">
              CAD Blueprint Inspector
            </h2>
            <div className="h-px w-16 bg-brand-accent mx-auto mt-4"></div>
            <p className="text-slate-500 mt-4 text-sm font-light">
              Hover over the highlighted hotspots on the CAD schematic diagram below to inspect the heavy-duty engineering details of a GRF Reactor Vessel.
            </p>
          </div>

          {/* Interactive Card Board */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-charcoal/60 border border-white/5 rounded-sm p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

            {/* Left: The CAD Diagram */}
            <div className="lg:col-span-6 relative aspect-[3/4] max-w-[400px] mx-auto w-full bg-[#060810]/95 border border-white/5 rounded-sm p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none"></div>
              <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brand-accent/40"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brand-accent/40"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brand-accent/40"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brand-accent/40"></div>

              <svg viewBox="0 0 100 130" className="w-full h-full text-brand-accent/35 font-mono select-none">
                <line x1="50" y1="5" x2="50" y2="125" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2,2" />
                <rect x="42" y="8" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <rect x="46" y="20" width="8" height="6" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <line x1="42" y1="14" x2="58" y2="14" stroke="currentColor" strokeWidth="0.4" />
                <path d="M 25 35 Q 50 22 75 35" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <line x1="25" y1="35" x2="25" y2="95" stroke="currentColor" strokeWidth="0.8" />
                <line x1="75" y1="35" x2="75" y2="95" stroke="currentColor" strokeWidth="0.8" />
                <path d="M 25 95 Q 50 108 75 95" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <line x1="50" y1="26" x2="50" y2="92" stroke="currentColor" strokeWidth="0.8" />
                <rect x="35" y="60" width="30" height="3" fill="none" stroke="currentColor" strokeWidth="0.4" />
                <rect x="38" y="80" width="24" height="3" fill="none" stroke="currentColor" strokeWidth="0.4" />
                <line x1="26" y1="90" x2="20" y2="115" stroke="currentColor" strokeWidth="0.7" />
                <line x1="74" y1="90" x2="80" y2="115" stroke="currentColor" strokeWidth="0.7" />
                <line x1="20" y1="115" x2="80" y2="115" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,2" />
                <path d="M 23 42 Q 20 45 23 48 M 23 54 Q 20 57 23 60 M 23 66 Q 20 69 23 72 M 23 78 Q 20 81 23 84 M 23 90 Q 20 93 23 96" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M 77 42 Q 80 45 77 48 M 77 54 Q 80 57 77 60 M 77 66 Q 80 69 77 72 M 77 78 Q 80 81 77 84 M 77 90 Q 80 93 77 96" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <rect x="18" y="44" width="7" height="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="18" y1="42" x2="18" y2="50" stroke="currentColor" strokeWidth="0.6" />
                <line x1="32" y1="25" x2="32" y2="30" stroke="currentColor" strokeWidth="0.5" />
                <rect x="29" y="24" width="6" height="2" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <rect x="46" y="105" width="8" height="6" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <line x1="44" y1="111" x2="56" y2="111" stroke="currentColor" strokeWidth="0.8" />
              </svg>

              {/* Hotspots */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onMouseEnter={() => {
                    if (activeHotspot !== spot.id) setActiveHotspot(spot.id);
                  }}
                  onClick={() => setActiveHotspot(spot.id)}
                  style={{ left: spot.x, top: spot.y }}
                  className={`absolute h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 ${activeHotspot === spot.id
                      ? 'bg-brand-accent text-white scale-110 shadow-[0_0_15px_#0ea5e9]'
                      : 'bg-brand-charcoal border border-brand-accent/40 text-brand-accent hover:bg-brand-accent/20'
                    }`}
                >
                  <span className={`absolute inset-0 rounded-full bg-brand-accent/30 pointer-events-none ${activeHotspot === spot.id ? 'hotspot-glow' : ''
                    }`}></span>
                  <span className="text-[10px] font-bold font-mono">{spot.id}</span>
                </button>
              ))}
            </div>

            {/* Right: Technical Inspector Data card */}
            <div className="lg:col-span-6 text-left flex flex-col justify-between h-full space-y-6">

              <div className="bg-brand-obsidian/60 border border-white/5 p-6 sm:p-8 rounded-sm shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-brand-accent text-white heading-font text-xs font-bold px-2 py-0.5 rounded-sm font-mono">
                    COMPONENT 0{activeHotspotInfo.id}
                  </span>
                  <span className="text-slate-500 font-mono text-xs">CAD-LAYER-V{activeHotspotInfo.id}</span>
                </div>

                <h3 className="heading-font text-white text-2xl font-extrabold mb-3 tracking-wide uppercase border-b border-brand-accent/25 pb-2">
                  {activeHotspotInfo.title}
                </h3>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light mb-6">
                  {activeHotspotInfo.desc}
                </p>

                <h4 className="text-slate-300 heading-font font-bold text-xs uppercase tracking-wider mb-2">Technical Properties</h4>
                <div className="overflow-hidden border border-white/[0.04] rounded-sm bg-brand-charcoal/40">
                  <table className="min-w-full divide-y divide-white/[0.04] text-xs">
                    <tbody className="divide-y divide-white/[0.04]">
                      {Object.entries(activeHotspotInfo.specs).map(([key, val]) => (
                        <tr key={key} className="hover:bg-white/[0.01]">
                          <td className="px-4 py-2 bg-white/[0.02] font-bold text-slate-400 w-1/3 uppercase tracking-wider">{key}</td>
                          <td className="px-4 py-2 text-slate-300">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/contact?product=Reactor+Vessel`}
                  className="bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
                >
                  Configure Custom Reactor
                </Link>
                <a
                  href="tel:+919557530193"
                  className="border border-white/10 hover:border-white text-slate-300 hover:text-white px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/[0.02]"
                >
                  Call Lead Fabricator
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/5 border border-brand-accent/20 px-3.5 py-1.5 rounded-sm">
            PROVEN ENGINEERING SOLUTIONS
          </span>
          <h2 className="heading-font text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mt-4 uppercase">
            Featured Products
          </h2>
          <div className="h-px w-16 bg-brand-accent mx-auto mt-4"></div>
          <p className="text-slate-500 mt-4 text-sm font-light">
            Explore our line of heavy-duty, certified industrial equipment fabricated from high-grade stainless steel (SS) and mild steel (MS).
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <div className="text-center py-16 bg-brand-charcoal/30 rounded-sm border border-white/5 max-w-md mx-auto shadow-2xl">
            <p className="text-red-500 font-semibold mb-4 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-steel border border-white/10 hover:border-white text-white px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 text-brand-accent hover:text-white font-bold uppercase text-xs tracking-widest border border-brand-accent/20 hover:border-white/20 bg-brand-accent/5 px-6 py-3 rounded-sm transition-all duration-300"
          >
            <span>Browse Full Catalogue</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Why GRF / USP Section */}
      <section className="bg-brand-charcoal/20 py-16 border-t border-b border-white/[0.03] relative">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">
              OUR MANUFACTURE STANDARDS
            </span>
            <h2 className="heading-font text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mt-3 uppercase">
              Why Partner With GRF
            </h2>
            <div className="h-px w-16 bg-brand-accent mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp, index) => (
              <div
                key={index}
                className="glass-panel glass-panel-hover p-7 rounded-sm flex flex-col justify-between relative group text-left"
              >
                <div className="absolute top-0 right-0 w-4 h-[1px] bg-brand-accent/30 group-hover:bg-brand-accent transition-colors"></div>
                <div className="absolute top-0 right-0 h-4 w-[1px] bg-brand-accent/30 group-hover:bg-brand-accent transition-colors"></div>

                <div>
                  <div className="bg-brand-obsidian p-3.5 rounded-sm border border-white/5 inline-block mb-6 text-brand-accent shadow-inner">
                    {usp.icon}
                  </div>
                  <h3 className="heading-font text-white text-md font-bold mb-3 tracking-wide uppercase">
                    {usp.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {usp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">
            OPERATIONAL BOUNDARIES
          </span>
          <h2 className="heading-font text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mt-3 uppercase">
            Industries We Serve
          </h2>
          <div className="h-px w-16 bg-brand-accent mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, index) => (
            <div
              key={index}
              className="bg-brand-steel/30 p-7 rounded-sm border border-white/[0.03] hover:border-brand-accent/20 flex items-start gap-5 transition-all duration-300 group shadow-md hover:shadow-xl text-left"
            >
              <div className="bg-brand-obsidian text-brand-accent heading-font font-bold text-md h-12 w-12 rounded-sm flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-gradient-to-br group-hover:from-brand-accent group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-inner font-mono">
                {ind.code}
              </div>
              <div>
                <h3 className="heading-font text-white text-md font-bold mb-2 group-hover:text-brand-accent transition-colors">
                  {ind.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {ind.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-brand-charcoal via-brand-steel to-brand-charcoal py-14 relative overflow-hidden border-t border-b border-white/[0.03]">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
        <div className="absolute right-10 bottom-0 w-80 h-80 opacity-5 text-white select-none pointer-events-none hidden md:block">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="heading-font text-3xl sm:text-4xl md:text-5xl text-white font-extrabold uppercase tracking-wide leading-none">
            Have a project in mind? Let's talk.
          </h2>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-sm sm:text-base font-light">
            Contact our Saharanpur engineering team today. We provide full technical consultations and competitive quotes for all custom fabrication needs.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white px-10 py-4 rounded-sm text-xs font-bold uppercase tracking-widest shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] inline-block cursor-pointer"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
