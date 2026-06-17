export default function LoadingSkeleton({ count = 6 }) {
  const skeletons = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {skeletons.map((_, index) => (
        <div 
          key={index} 
          className="bg-brand-charcoal/50 border border-white/[0.03] rounded-sm overflow-hidden flex flex-col shadow-2xl animate-pulse animate-duration-1000"
        >
          {/* Obsidian image skeleton */}
          <div className="aspect-[4/3] w-full bg-brand-steel/50 border-b border-white/[0.03] relative">
            <div className="absolute inset-0 blueprint-grid opacity-15"></div>
          </div>
          
          {/* Information Skeleton */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              {/* Category Badge skeleton */}
              <div className="h-5 w-24 bg-brand-steel rounded-sm"></div>
              
              {/* Title skeleton */}
              <div className="h-6 w-3/4 bg-brand-steel rounded-sm"></div>
              
              {/* Description lines skeleton */}
              <div className="space-y-2.5">
                <div className="h-3 w-full bg-brand-steel/55 rounded-sm"></div>
                <div className="h-3 w-full bg-brand-steel/55 rounded-sm"></div>
                <div className="h-3 w-4/5 bg-brand-steel/55 rounded-sm"></div>
              </div>
            </div>
            
            {/* Actions skeleton */}
            <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/[0.03]">
              <div className="h-10 bg-brand-steel rounded-sm"></div>
              <div className="h-10 bg-brand-steel rounded-sm"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
