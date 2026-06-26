import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Database, Clock, RefreshCw } from "lucide-react";

const Navbar = ({ sectionTitle = "Overview" }) => {
  const { admin } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <header className="h-16 border-b border-white/[0.04] bg-brand-charcoal/95 flex items-center justify-between px-6 lg:px-8 relative z-20">
      {/* Drafting lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04]"></div>

      {/* Section Title */}
      <div className="flex items-center space-x-3 pl-10 lg:pl-0">
        <h2 className="heading-font text-white text-md font-bold tracking-widest uppercase">
          {sectionTitle}
        </h2>
      </div>

      {/* Status Metrics */}
      <div className="flex items-center space-x-6 text-[10px] font-mono text-slate-500">
        {/* System Time */}
        <div className="hidden sm:flex items-center space-x-1.5 bg-[#0a0d18] border border-white/5 py-1 px-2.5 rounded-sm">
          <Clock size={12} className="text-brand-accent" />
          <span>{formatDate(time)}</span>
          <span className="text-slate-400 font-bold">|</span>
          <span className="text-white font-bold">{formatTime(time)}</span>
        </div>

        {/* Database Status */}
        <div className="flex items-center space-x-1.5 bg-[#0a0d18] border border-white/5 py-1 px-2.5 rounded-sm">
          <Database size={12} className="text-green-500" />
          <span className="text-slate-400">DB:</span>
          <span className="text-green-400 font-bold uppercase">Connected</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
