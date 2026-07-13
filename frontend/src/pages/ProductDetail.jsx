import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productPdfUrl, setProductPdfUrl] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    let currentPdfUrl = null;
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        setError(null);

        const productData = await getProductById(id);
        setProduct(productData);

        if (productData?.pdf?.data) {
          const bytes = atob(productData.pdf.data);
          const buffer = new Uint8Array(bytes.length);
          for (let i = 0; i < bytes.length; i += 1) {
            buffer[i] = bytes.charCodeAt(i);
          }
          const blob = new Blob([buffer], { type: productData.pdf.contentType });
          currentPdfUrl = URL.createObjectURL(blob);
          setProductPdfUrl(currentPdfUrl);
        } else {
          setProductPdfUrl(null);
        }

        const allProducts = await getProducts();
        const related = allProducts.filter(
          (item) => item.category === productData.category && (item._id || item.id) !== (productData._id || productData.id)
        );
        setRelatedProducts(related.slice(0, 3));
      } catch (err) {
        setError(err.message || 'Product not found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      if (productPdfUrl) {
        URL.revokeObjectURL(productPdfUrl);
      }
    };
  }, [id]);

  const handleRequestQuote = () => {
    if (!product) return;
    const params = new URLSearchParams();
    params.set('product', product.category);
    if (product.specs && product.specs['Capacity Range']) {
      params.set('capacity', product.specs['Capacity Range']);
    }
    navigate(`/contact?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-h-[60vh] flex flex-col justify-center items-center bg-brand-obsidian">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent mb-4"></div>
        <p className="text-slate-500 text-sm font-light">Loading technical specifications...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-h-[60vh] flex flex-col justify-center items-center bg-brand-obsidian">
        <svg className="h-16 w-16 text-slate-500 mb-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="heading-font text-2xl font-bold uppercase text-white mb-2">
          Equipment Not Found
        </h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 font-light">
          {error || "The requested equipment specs could not be retrieved from the server."}
        </p>
        <Link
          to="/products"
          className="border border-white/10 hover:border-white text-white px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors bg-white/[0.02]"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-brand-obsidian min-h-screen relative overflow-hidden text-left">

      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fadeIn">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-[10px] text-slate-500 gap-2 mb-8 uppercase font-bold tracking-widest">
          <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-accent transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-400 truncate">{product.name}</span>
        </nav>

        {/* Product Details Main Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start glass-panel p-6 sm:p-10 rounded-sm mb-20 shadow-2xl">

          {/* Left: Product Images Gallery */}
          <div className="lg:col-span-6 space-y-4 w-full">
            {/* Large Viewport */}
            <div className={`w-full aspect-[4/3] ${product.images && product.images.length > 0 ? 'bg-transparent' : 'bg-[#0a0d18]/80'} flex flex-col items-center justify-center p-8 text-center border border-white/5 relative select-none rounded-sm min-h-[350px] overflow-hidden`}>
              {product.images && product.images.length > 0 ? (
                <img
                  src={`data:${product.images[activeImageIndex]?.contentType || product.images[0].contentType};base64,${product.images[activeImageIndex]?.data || product.images[0].data}`}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain object-center animate-fadeIn"
                  style={{ imageRendering: 'auto' }}
                />
              ) : (
                <>
                  {/* Blueprint grid overlays */}
                  <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>
                  <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

                  {/* Corner Drafting Marks */}
                  <div className="absolute top-4 left-4 border-l-2 border-t-2 border-brand-accent w-6 h-6 opacity-80"></div>
                  <div className="absolute top-4 right-4 border-r-2 border-t-2 border-brand-accent w-6 h-6 opacity-80"></div>
                  <div className="absolute bottom-4 left-4 border-l-2 border-b-2 border-brand-accent w-6 h-6 opacity-80"></div>
                  <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-brand-accent w-6 h-6 opacity-80"></div>

                  <div className="absolute top-2.5 left-6 text-[8px] font-mono text-slate-500">GRF-DESIGN-ENG_SYS</div>
                  <div className="absolute bottom-2.5 right-6 text-[8px] font-mono text-slate-500">ASME CODE COMPLIANT</div>

                  {/* Concentric rotating grids */}
                  <div className="absolute h-56 w-56 rounded-full border border-dashed border-slate-700/50 flex items-center justify-center">
                    <div className="h-44 w-44 rounded-full border border-dashed border-brand-accent/20 flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full border border-dashed border-slate-700/40"></div>
                    </div>
                  </div>

                  <div className="z-10 px-4 bg-brand-charcoal/95 p-6 border border-white/5 rounded-sm shadow-lg relative max-w-sm text-center">
                    <h2 className="heading-font text-white font-extrabold text-lg sm:text-xl md:text-2xl leading-snug tracking-wider uppercase mb-2">
                      {product.name}
                    </h2>
                    <span className="text-[10px] tracking-[0.2em] text-brand-accent uppercase font-bold block bg-brand-charcoal/90 py-1.5 px-4 border border-brand-accent/20 rounded-sm">
                      GRF DYNAMIC SYSTEM
                    </span>
                    <p className="text-[9px] text-slate-500 mt-4 font-mono">
                      MODEL: GRF-{product.category.toUpperCase().replace(/\s+/g, '-')}-00{product._id || product.id}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[4/3] rounded-sm overflow-hidden border-2 bg-[#0a0d18] transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-brand-accent scale-[1.02] shadow-md shadow-brand-accent/15'
                        : 'border-white/5 hover:border-brand-accent/40'
                    }`}
                  >
                    <img
                      src={`data:${img.contentType};base64,${img.data}`}
                      alt={`thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Technical Details & Specifications */}
          <div className="lg:col-span-6 flex flex-col h-full justify-between">
            <div>
              {/* Category Badge */}
              <div className="mb-5">
                <span className="inline-block bg-brand-accent/5 border border-brand-accent/25 text-brand-accent text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-widest rounded-sm">
                  {product.category}
                </span>
              </div>

              <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-white mb-4 uppercase leading-none">
                {product.name}
              </h1>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {product.longDescription || product.description}
              </p>

              {/* Material & Capacity Quick Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-[11px] font-mono tracking-wider">
                {product.material && product.material.length > 0 && (
                  <div>
                    <span className="text-slate-500 uppercase">Material: </span>
                    <span className="text-brand-accent font-semibold uppercase">{product.material.join(', ')}</span>
                  </div>
                )}
                {product.capacityRange && (product.capacityRange.min || product.capacityRange.max) && (
                  <div>
                    <span className="text-slate-500 uppercase">Capacity: </span>
                    <span className="text-white font-semibold">
                      {product.capacityRange.min || 0} - {product.capacityRange.max || 'Custom'} {product.capacityRange.unit || 'Liters'}
                    </span>
                  </div>
                )}
              </div>

              {/* Technical Specifications Table */}
              <h3 className="heading-font text-white text-md font-bold tracking-widest uppercase mb-4 border-b border-brand-accent/25 pb-2">
                Technical Specifications
              </h3>

              <div className="overflow-hidden border border-white/[0.04] bg-brand-charcoal/50 rounded-sm mb-8 shadow-inner">
                <table className="min-w-full divide-y divide-white/[0.04]">
                  <tbody className="divide-y divide-white/[0.04] text-xs sm:text-sm">
                    {product.specifications && Array.isArray(product.specifications) && product.specifications.length > 0 ? (
                      product.specifications.map((spec, index) => (
                        <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                          <td className="px-4 py-3.5 bg-white/[0.02] font-bold text-slate-300 w-1/3 uppercase tracking-wider text-[10px] sm:text-xs">
                            {spec.key}
                          </td>
                          <td className="px-4 py-3.5 text-slate-400 font-light">
                            {spec.value}
                          </td>
                        </tr>
                      ))
                    ) : product.specs && Object.entries(product.specs).length > 0 ? (
                      Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key} className="hover:bg-white/[0.01] transition-colors">
                          <td className="px-4 py-3.5 bg-white/[0.02] font-bold text-slate-300 w-1/3 uppercase tracking-wider text-[10px] sm:text-xs">
                            {key}
                          </td>
                          <td className="px-4 py-3.5 text-slate-400 font-light">
                            {value}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="px-4 py-3.5 text-slate-500 font-light text-center">
                          Custom specifications available upon request.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Key Features & Standards Checklist */}
              <div className="mb-8 p-4 bg-white/[0.01] border border-white/[0.03] rounded-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Engineering Features & Standards</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-slate-400 font-light">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-accent">✓</span> Quality: Hydrostatic & DP tested
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-accent">✓</span> Design: ASME Section VIII standards
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-accent">✓</span> Finish: Mirror/Matte polish options
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-accent">✓</span> Custom: Fully custom nozzle orientations
                  </div>
                </div>
              </div>

              {product.pdf && (
                <div className="mb-8 p-5 bg-[#061b29] border border-brand-accent/10 rounded-2xl shadow-[0_0_30px_rgba(8,44,74,0.25)]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold">
                        Product PDF
                      </p>
                      <p className="text-sm text-slate-300 max-w-2xl">
                        View the equipment specification document directly in your browser, or download it for offline review.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch gap-3">
                      <a
                        href={productPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-sm bg-white/10 border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-white/15"
                      >
                        View PDF
                      </a>
                      <a
                        href={productPdfUrl}
                        download={product.pdf.filename || `${product.name}.pdf`}
                        className="inline-flex items-center justify-center rounded-sm bg-brand-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 transition-all duration-200 hover:bg-brand-accent/90"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA button */}
            <div>
              <button
                onClick={handleRequestQuote}
                className="w-full bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white font-bold py-4 px-6 rounded-sm text-xs uppercase tracking-widest transition-all duration-200 shadow-lg shadow-brand-accent/15 active:scale-[0.98] cursor-pointer"
              >
                Request a Quote for this Product
              </button>
            </div>
          </div>

        </div>

        {/* Related products section */}
        {relatedProducts.length > 0 && (
          <div className="text-left mt-20">
            <h2 className="heading-font text-xl sm:text-2xl text-white font-bold uppercase mb-6 relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-8 after:h-0.5 after:bg-brand-accent">
              Related Equipment
            </h2>
            <div className="h-px bg-white/[0.04] w-full mb-8"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedProducts.map((item) => (
                <ProductCard key={item._id || item.id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
