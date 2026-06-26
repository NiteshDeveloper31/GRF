const StatCard = ({ title, value, icon: Icon, description, colorClass = "text-brand-accent border-brand-accent/20" }) => {
  return (
    <div className="glass-panel p-5 rounded-sm relative select-none overflow-hidden transition-all duration-300 hover:border-brand-accent/30 group">
      {/* Corner design accents */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-slate-700"></div>
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-slate-700"></div>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] tracking-widest text-slate-500 uppercase font-mono font-bold mb-1">
            {title}
          </p>
          <h3 className="heading-font text-white text-2xl font-black tracking-wide leading-none my-2 group-hover:text-brand-accent transition-colors duration-300">
            {value}
          </h3>
          {description && (
            <p className="text-[10px] text-slate-400 font-light mt-1">
              {description}
            </p>
          )}
        </div>
        
        <div className={`p-2.5 rounded-sm bg-white/[0.02] border ${colorClass} transition-transform duration-300 group-hover:scale-105`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
