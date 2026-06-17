import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createLead } from '../api/axios';

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

export default function Contact() {
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    companyName: '',
    designation: '',
    productInterest: '',
    capacityRequired: '',
    materialPreference: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const productParam = searchParams.get('product') || '';
    const capacityParam = searchParams.get('capacity') || '';

    const matchingCategory = CATEGORIES.find(
      (cat) => cat.toLowerCase() === productParam.toLowerCase()
    ) || '';

    setFormData((prev) => ({
      ...prev,
      productInterest: matchingCategory,
      capacityRequired: capacityParam
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid.';
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      tempErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) element.focus();
      return;
    }

    try {
      setSubmitting(true);
      const payload = { ...formData };
      const result = await createLead(payload);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          whatsapp: '',
          companyName: '',
          designation: '',
          productInterest: '',
          capacityRequired: '',
          materialPreference: '',
          message: ''
        });
      } else {
        setSubmitError(result.message || 'Error occurred while recording your inquiry.');
      }
    } catch (err) {
      setSubmitError('Failed to connect to the server. Please check your connection and try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-brand-obsidian min-h-screen relative overflow-hidden text-left animate-fadeIn">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="border-b border-white/[0.04] pb-10 mb-16">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/5 border border-brand-accent/20 px-3 py-1.5 rounded-sm">
            CONTACT & PROCUREMENT INQUIRIES
          </span>
          <h1 className="heading-font text-4xl sm:text-5xl font-extrabold text-white mt-4 uppercase">
            Request a Quote
          </h1>
          <div className="h-0.5 w-12 bg-brand-accent mt-4"></div>
        </div>

        {/* Success Modal Overlay */}
        {submitSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-obsidian/95">
            <div className="bg-[#121216] border border-white/[0.05] p-8 sm:p-10 rounded-sm max-w-md w-full text-center shadow-2xl relative animate-scaleUp">
              
              <div className="absolute top-2.5 left-2.5 border-t border-l border-brand-accent/35 w-4 h-4"></div>
              <div className="absolute top-2.5 right-2.5 border-t border-r border-brand-accent/35 w-4 h-4"></div>
              <div className="absolute bottom-2.5 left-2.5 border-b border-l border-brand-accent/35 w-4 h-4"></div>
              <div className="absolute bottom-2.5 right-2.5 border-b border-r border-brand-accent/35 w-4 h-4"></div>

              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-brand-accent/10 text-brand-accent mb-5 border border-brand-accent/20 shadow-inner">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="heading-font text-white text-xl font-bold uppercase mb-3 tracking-wide">
                Inquiry Submitted
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                Your request has been successfully recorded. Our sales team from the Saharanpur office will contact you within 24 business hours with technical specifications and commercial rates.
              </p>
              
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white w-full py-3 rounded-sm font-bold uppercase text-xs tracking-widest transition-all duration-200 shadow-md shadow-brand-accent/15 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Office Coordinates */}
            <div className="glass-panel p-8 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
              
              <h2 className="heading-font text-lg text-white font-bold uppercase mb-8 relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-8 after:h-0.5 after:bg-brand-accent">
                Registered Office
              </h2>
              
              <div className="space-y-7 text-sm text-slate-300">
                {/* Address block */}
                <div className="flex items-start gap-4">
                  <div className="bg-brand-charcoal p-3 rounded-sm border border-white/5 text-brand-accent shrink-0 shadow-md">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest block mb-1.5">Company Address</span>
                    <p className="leading-relaxed font-light text-slate-400">
                      Opposite Indian Oil Petrol Pump,<br />
                      Shop No.5, Chaudhary Market,<br />
                      Dehradun Road, Saharanpur - 247001,<br />
                      Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                {/* Phone block */}
                <div className="flex items-start gap-4">
                  <div className="bg-brand-charcoal p-3 rounded-sm border border-white/5 text-brand-accent shrink-0 shadow-md">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest block mb-1.5">Phone Number</span>
                    <p className="leading-relaxed font-bold text-white font-mono text-base">
                      <a href="tel:+919876543210" className="hover:text-brand-accent transition-colors">+91 98765 43210</a>
                    </p>
                  </div>
                </div>

                {/* Email block */}
                <div className="flex items-start gap-4">
                  <div className="bg-brand-charcoal p-3 rounded-sm border border-white/5 text-brand-accent shrink-0 shadow-md">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest block mb-1.5">Email Coordinates</span>
                    <p className="leading-relaxed font-bold text-white font-mono break-all text-base">
                      <a href="mailto:info@grfdynamicengineering.com" className="hover:text-brand-accent transition-colors">info@grfdynamicengineering.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consulting Message Callout */}
            <div className="border-l-[3px] border-brand-accent bg-brand-steel/20 p-6 rounded-r-sm shadow-md">
              <h3 className="heading-font text-white font-bold text-sm uppercase tracking-wide mb-1.5">Technical Consulting</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                Need urgent assistance or specific custom configurations? You can directly speak to our lead mechanical fabricator by dialing <a href="tel:+919876543210" className="text-white hover:text-brand-accent underline font-semibold">+91 98765 43210</a>.
              </p>
            </div>

          </div>

          {/* Right Column: Quote Request Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-sm shadow-2xl">
            <h2 className="heading-font text-xl text-white font-bold uppercase mb-8 pb-3 border-b border-white/[0.03]">
              Request Technical Details & Quote
            </h2>

            {submitError && (
              <div className="bg-red-950/30 border border-red-500/50 text-red-200 text-xs sm:text-sm p-4 rounded-sm mb-6 flex gap-2.5">
                <svg className="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="font-light">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Full Name <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full bg-brand-charcoal border text-sm text-white px-4 py-3 rounded-sm outline-none transition-all ${
                      errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent'
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.fullName}</p>}
                </div>
                
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Email Address <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-brand-charcoal border text-sm text-white px-4 py-3 rounded-sm outline-none transition-all ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent'
                    }`}
                    placeholder="name@company.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Phone and WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Phone Number <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-brand-charcoal border text-sm text-white px-4 py-3 rounded-sm outline-none transition-all ${
                      errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent'
                    }`}
                    placeholder="e.g. 9876543210"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.phone}</p>}
                </div>
                
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-sm text-white px-4 py-3 rounded-sm outline-none transition-all"
                    placeholder="Optional (for direct PDF quotes)"
                  />
                </div>
              </div>

              {/* Row 3: Company and Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-sm text-white px-4 py-3 rounded-sm outline-none transition-all"
                    placeholder="e.g. GRF Foods Pvt Ltd"
                  />
                </div>
                
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-sm text-white px-4 py-3 rounded-sm outline-none transition-all"
                    placeholder="e.g. Procurement Manager"
                  />
                </div>
              </div>

              {/* Row 4: Product Interest */}
              <div className="text-left">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Product Interest
                </label>
                <div className="relative">
                  <select
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleChange}
                    className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-sm text-white px-4 py-3 rounded-sm outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="">-- Select Product Category --</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 5: Capacity and Material Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Capacity Required
                  </label>
                  <input
                    type="text"
                    name="capacityRequired"
                    value={formData.capacityRequired}
                    onChange={handleChange}
                    className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-sm text-white px-4 py-3 rounded-sm outline-none transition-all"
                    placeholder="e.g. 10,000 Litres, 20 Tons"
                  />
                </div>
                
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Material Preference
                  </label>
                  <div className="relative">
                    <select
                      name="materialPreference"
                      value={formData.materialPreference}
                      onChange={handleChange}
                      className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-sm text-white px-4 py-3 rounded-sm outline-none transition-all cursor-pointer appearance-none"
                    >
                      <option value="">-- Select Material --</option>
                      <option value="SS">Stainless Steel (SS 304 / 316)</option>
                      <option value="MS">Mild Steel (MS)</option>
                      <option value="Not Sure">Not Sure / Need Advice</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="text-left">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Specific Requirements / Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-brand-charcoal border border-white/5 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-sm text-white px-4 py-3 rounded-sm outline-none transition-all resize-none"
                  placeholder="Detail your engineering drawings, temperature range, wall thickness or application requirements..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white font-bold py-4 px-6 rounded-sm text-xs uppercase tracking-widest transition-all duration-200 shadow-md shadow-brand-accent/15 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Quote Request</span>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
