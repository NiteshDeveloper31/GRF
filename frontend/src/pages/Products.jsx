import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../api/axios';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const CATEGORIES = [
  "Storage Tank",
  "Milk Storage Tank",
  "Silo System",
  "Brewery Tank",
  "Reactor Vessel",
  "High Pressure Vessel",
  "Mixing Tank",
  "Jacketed Vessel",
  "Underground Oil Storage Tank",
  "Custom Equipment"
];

export default function Products({ products, setProducts, loading, setLoading, error, setError }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Scroll Pagination State
  const [visibleCount, setVisibleCount] = useState(6);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  const categoryFilter = searchParams.get('category') || '';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (selected) => {
    if (selected) {
      setSearchParams({ category: selected });
    } else {
      setSearchParams({});
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const fetchAllProducts = async (showLoading = true) => {
      try {
        if (showLoading) setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        if (showLoading && products.length === 0) {
          setError('Unable to load products. Please check your network connection.');
        }
        console.error(err);
      } finally {
        if (showLoading) setLoading(false);
      }
    };

    if (products.length === 0) {
      fetchAllProducts(true);
    } else {
      // Silently revalidate in background to fetch updates
      fetchAllProducts(false);
    }

    // Poll for new products every 60 seconds (silently in background)
    const interval = setInterval(() => {
      fetchAllProducts(false);
    }, 60000);

    return () => clearInterval(interval);
  }, [products.length, setProducts, setLoading, setError]);

  // Infinite Scroll Pagination logic (load 6 products at a time)
  useEffect(() => {
    const handleScroll = () => {
      if (loading || error || isNextPageLoading) return;

      const totalItems = categoryFilter ? filteredProducts.length : products.length;
      if (visibleCount >= totalItems) return;

      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const isNearBottom = window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 250;
      
      if (isNearBottom) {
        setIsNextPageLoading(true);
        setTimeout(() => {
          setVisibleCount(prev => Math.min(prev + 6, totalItems));
          setIsNextPageLoading(false);
        }, 600); // 600ms delay to feel realistic and smooth
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, filteredProducts.length, products.length, loading, error, isNextPageLoading, categoryFilter]);

  useEffect(() => {
    if (categoryFilter) {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    // Reset visible count on category change
    setVisibleCount(6);
    setIsNextPageLoading(false);
  }, [categoryFilter, products]);

  const handleContactForDetails = (categoryName) => {
    const params = new URLSearchParams();
    params.set('product', categoryName || 'Custom Equipment');
    params.set('message', `Inquiry regarding custom fabrication of ${categoryName || 'process equipment'}.`);
    navigate(`/contact?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Build items to display: Only show real products from database
  const displayItems = categoryFilter ? filteredProducts : products;

  return (
    <div className="py-16 bg-brand-obsidian min-h-screen relative overflow-hidden text-left">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fadeIn">
        
        {/* Page Header */}
        <div className="border-b border-white/[0.04] pb-10 mb-12">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/5 border border-brand-accent/20 px-3 py-1.5 rounded-sm">
            GRF PRODUCT CATALOGUE
          </span>
          <h1 className="heading-font text-4xl sm:text-5xl font-extrabold text-white mt-4 uppercase">
            Our Process Equipment
          </h1>
          <p className="text-slate-400 mt-3 max-w-3xl text-sm sm:text-base font-light leading-relaxed">
            From industrial storage solutions to specialized heat-transfer vessels, we engineer all equipment to match heavy-duty industrial quality codes.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="glass-panel p-6 rounded-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Filter by Equipment Category
            </label>
            <div className="relative w-full max-w-[280px] sm:max-w-none sm:w-80" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-brand-charcoal text-slate-200 text-sm border border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent px-5 py-3.5 rounded-sm outline-none transition-all w-full flex justify-between items-center cursor-pointer shadow-sm hover:bg-brand-charcoal/80"
              >
                <span className="heading-font text-xs tracking-wider text-left">
                  {categoryFilter ? categoryFilter : 'All Categories'}
                </span>
                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 z-50 w-full mt-2 bg-[#0b0d16]/98 border border-white/10 rounded-sm shadow-2xl max-h-72 overflow-y-auto backdrop-blur-md animate-scaleUp">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('')}
                      className={`w-full text-left px-5 py-3 text-xs tracking-wider font-bold heading-font transition-all ${
                        !categoryFilter
                          ? 'bg-brand-accent text-white'
                          : 'text-slate-300 hover:bg-white/[0.03] hover:text-white border-b border-white/[0.02]'
                      }`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map((cat, idx) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full text-left px-5 py-3 text-xs tracking-wider font-bold heading-font transition-all ${
                          categoryFilter.toLowerCase() === cat.toLowerCase()
                            ? 'bg-brand-accent text-white'
                            : `text-slate-300 hover:bg-white/[0.03] hover:text-white ${
                                idx < CATEGORIES.length - 1 ? 'border-b border-white/[0.02]' : ''
                              }`
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Equipment Listed</span>
            <p className="text-3xl font-extrabold text-white heading-font mt-1">
              {loading ? '--' : filteredProducts.length} <span className="text-brand-accent text-sm font-normal">items</span>
            </p>
          </div>
        </div>

        {/* Status Notifications */}
        {!loading && !error && (
          <>
            {/* If the whole DB is empty */}
            {products.length === 0 && (
              <div className="bg-brand-accent/5 border border-brand-accent/25 rounded-sm p-4 text-slate-300 text-xs sm:text-sm flex items-center gap-3 mb-8">
                <svg className="h-5 w-5 text-brand-accent shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No standard inventory models are currently registered in the database. All engineering divisions are operating under custom-order status.</p>
              </div>
            )}
            
            {/* If selected category is empty */}
            {categoryFilter && filteredProducts.length === 0 && (
              <div className="bg-brand-accent/5 border border-brand-accent/25 rounded-sm p-4 text-slate-300 text-xs sm:text-sm flex items-center gap-3 mb-8">
                <svg className="h-5 w-5 text-brand-accent shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No standard inventory models are currently listed in the catalogue for <strong>"{categoryFilter}"</strong>. Custom design engineering is fully active.</p>
              </div>
            )}
          </>
        )}

        {/* Products Grid */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <div className="text-center py-16 bg-brand-charcoal/30 rounded-sm border border-white/5 max-w-md mx-auto shadow-2xl">
            <p className="text-red-500 font-semibold mb-4 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-accent hover:brightness-110 text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reload Catalogue
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fadeIn">
              {displayItems.slice(0, visibleCount).map((product) => (
                <ProductCard key={`prod-${product._id || product.id}`} product={product} />
              ))}
            </div>

            {/* Next page premium loader */}
            {isNextPageLoading && (
              <div className="flex flex-col items-center justify-center py-6 animate-pulse">
                <div className="flex space-x-2 justify-center items-center">
                  <div className="h-2 w-2 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-brand-accent rounded-full animate-bounce"></div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-3">
                  Loading engineering models...
                </span>
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}

/**
 * Premium glassmorphic CAD Blueprint Coming Soon card component.
 */
function ComingSoonCard({ category, onContact }) {
  return (
    <div className="glass-panel glass-panel-hover rounded-sm overflow-hidden flex flex-col group h-full transition-all duration-500 border border-brand-accent/20">
      
      {/* CAD blueprint mockup block - Obsidian style */}
      <div className="aspect-[4/3] w-full bg-[#0a0d18]/80 flex items-center justify-center p-6 text-center border-b border-white/[0.03] select-none relative overflow-hidden">
        
        {/* Technical grids */}
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
        
        {/* Drafting metrics */}
        <div className="absolute top-2.5 left-2.5 text-[8px] font-mono text-slate-500">STATUS: SCHEDULED</div>
        <div className="absolute bottom-2.5 right-2.5 text-[8px] font-mono text-slate-500">STAGE: INITIAL DRAFT</div>
        <div className="absolute top-2.5 right-2.5 text-[8px] font-mono text-brand-accent/60 font-semibold font-bold">GRF-COMING-SOON</div>
        <div className="absolute bottom-2.5 left-2.5 text-[8px] font-mono text-slate-500">MATERIAL: SS 304 / 316</div>

        {/* Coming soon technical badge */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
          <span className="bg-brand-accent text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-md shadow-brand-accent/20">
            Coming Soon
          </span>
        </div>

        {/* Concentric blueprint guides */}
        <div className="absolute h-32 w-32 rounded-full border border-dashed border-slate-700/50 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full border border-dashed border-brand-accent/15 spin-slow-hover"></div>
        </div>

        {/* Floating specification tag */}
        <div className="z-10 px-4 bg-[#0b0d16]/95 p-4 border border-white/5 rounded-sm shadow-lg relative max-w-[200px] mt-6">
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-brand-accent"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-brand-accent"></div>
          
          <p className="heading-font text-white font-bold text-xs sm:text-sm leading-snug tracking-wide uppercase">
            Bespoke {category}
          </p>
          <span className="text-[8px] tracking-widest text-brand-accent font-bold mt-1 block font-mono">
            CUSTOM BUILD // GRF
          </span>
        </div>
      </div>

      {/* Information details */}
      <div className="p-6 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category tag */}
          <div className="mb-4">
            <span className="inline-block whitespace-nowrap bg-brand-accent/5 border border-brand-accent/20 text-brand-accent text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-widest">
              {category}
            </span>
          </div>
          
          <h3 className="heading-font text-white text-lg font-bold mb-3 tracking-wide group-hover:text-brand-accent transition-colors duration-300">
            Custom {category}
          </h3>
          
          <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">
            We are currently adding standard inventory products to this category. We fully design and fabricate custom {category} equipment to client specifications. Contact us for custom sizing, pressure ratings, and layouts.
          </p>
        </div>

        {/* Button Actions */}
        <div className="grid grid-cols-1 gap-4 pt-5 border-t border-white/[0.04]">
          <button
            onClick={() => onContact(category)}
            className="w-full bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-115 text-white py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-brand-accent/10 active:scale-95 cursor-pointer text-center"
          >
            Contact for Details & Quote
          </button>
        </div>
      </div>
    </div>
  );
}
