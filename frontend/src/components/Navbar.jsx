import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo1.jpeg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setIsScrolled((current) => {
          const next = window.scrollY > 20;
          return current === next ? current : next;
        });
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const activeStyle = "text-brand-accent font-bold relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-0.5 after:bg-brand-accent after:shadow-[0_0_10px_#0ea5e9] pb-1 transition-all duration-300";
  const inactiveStyle = "text-slate-400 hover:text-white font-medium pb-1 transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-0 after:h-0.5 after:bg-brand-accent hover:after:w-full after:transition-all after:duration-300";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
      ? 'bg-brand-obsidian/95 shadow-lg border-b border-brand-accent/15 py-3.5'
      : 'bg-transparent border-b border-white/5 py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-brand-accent/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={logo}
                alt="GRF Logo"
                className="h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105 relative z-10"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="heading-font text-xl md:text-2xl font-extrabold tracking-wider text-white leading-none">
                GRF <span className="text-brand-accent">DYNAMIC</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-slate-500 font-semibold uppercase mt-0.5 leading-none">
                Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-brand-accent/10 active:scale-[0.98] mt-1"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-sm text-slate-400 hover:text-white hover:bg-brand-steel focus:outline-none transition-all duration-200 border border-transparent"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out border-white/[0.03] ${isOpen
          ? 'max-h-screen opacity-100 py-6 border-b bg-brand-obsidian shadow-2xl'
          : 'max-h-0 opacity-0 overflow-hidden pointer-events-none border-b-0'
          }`}
      >
        <div className="px-4 space-y-4 flex flex-col">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-sm text-base font-medium transition-colors text-left ${isActive
                  ? 'text-brand-accent bg-brand-accent/5 border-l-2 border-brand-accent'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 px-4">
            <Link
              to="/contact"
              className="block w-full text-center bg-gradient-to-r from-brand-accent to-blue-600 text-white py-3 rounded-sm font-bold uppercase text-sm tracking-wider hover:bg-blue-700 transition-all duration-200"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
