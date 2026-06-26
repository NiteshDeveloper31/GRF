import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { leadsApi, followUpsApi } from "../api/api";
import StatCard from "../components/StatCard";
import { 
  Users, 
  UserPlus, 
  PhoneCall, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  MessageSquare
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    closedLeads: 0,
    lostLeads: 0,
  });
  const [upcomingFollowUps, setUpcomingFollowUps] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async (showLoading = true) => {
      try {
        if (showLoading) {
          setLoading(true);
          setError(null);
        }

        // Fetch all leads to compute correct statistics
        const leadsData = await leadsApi.getLeads();
        const allLeads = leadsData.leads || leadsData || [];

        // Count status occurrences
        const total = allLeads.length;
        const newCount = allLeads.filter((l) => l.status === "new").length;
        const pipelineCount = allLeads.filter((l) => l.status === "pipeline").length;
        const interestedCount = allLeads.filter((l) => l.status === "interested").length;
        const callbackCount = allLeads.filter((l) => l.status === "call_back_later").length;
        const closedCount = allLeads.filter((l) => l.status === "closed").length;
        const lostCount = allLeads.filter((l) => l.status === "lost").length;

        // Group active contacted leads (pipeline + interested + call_back_later)
        const contactedCount = pipelineCount + interestedCount + callbackCount;

        setStats({
          totalLeads: total,
          newLeads: newCount,
          contactedLeads: contactedCount,
          closedLeads: closedCount,
          lostLeads: lostCount,
          pipelineLeads: pipelineCount,
          interestedLeads: interestedCount,
          callbackLeads: callbackCount,
        });

        // Fetch upcoming followups
        const followUps = await followUpsApi.getUpcoming();
        setUpcomingFollowUps(followUps.slice(0, 5)); // Show top 5

        // Recent leads sorted by creation date
        const sortedLeads = [...allLeads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentLeads(sortedLeads.slice(0, 5));

      } catch (err) {
        console.error("Dashboard loading error:", err);
        if (showLoading) {
          setError("Unable to load dashboard analytics. Please check backend connection.");
        }
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData(true);

    const interval = setInterval(() => {
      fetchDashboardData(false);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center py-20 min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent mb-4"></div>
        <p className="text-slate-500 text-sm font-mono uppercase tracking-wider">Loading System Diagnostics...</p>
      </div>
    );
  }

  // Calculate Conversion Rate
  const conversionRate = stats.totalLeads > 0 
    ? Math.round((stats.closedLeads / stats.totalLeads) * 100) 
    : 0;

  // Status chart values helper
  const maxVal = Math.max(
    stats.newLeads,
    stats.pipelineLeads || 0,
    stats.interestedLeads || 0,
    stats.callbackLeads || 0,
    stats.closedLeads,
    stats.lostLeads,
    1
  );
  const statusBars = [
    { label: "New", value: stats.newLeads, color: "bg-blue-500", percent: (stats.newLeads / maxVal) * 100 },
    { label: "Pipeline", value: stats.pipelineLeads || 0, color: "bg-indigo-500", percent: ((stats.pipelineLeads || 0) / maxVal) * 100 },
    { label: "Interested", value: stats.interestedLeads || 0, color: "bg-teal-500", percent: ((stats.interestedLeads || 0) / maxVal) * 100 },
    { label: "Call Back Later", value: stats.callbackLeads || 0, color: "bg-amber-500", percent: ((stats.callbackLeads || 0) / maxVal) * 100 },
    { label: "Closed", value: stats.closedLeads, color: "bg-emerald-500", percent: (stats.closedLeads / maxVal) * 100 },
    { label: "Lost", value: stats.lostLeads, color: "bg-rose-500", percent: (stats.lostLeads / maxVal) * 100 },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 flex items-center space-x-3 text-red-200">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span className="text-xs font-mono">{error}</span>
        </div>
      )}

      {/* Grid: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Total Leads" 
          value={stats.totalLeads} 
          icon={Users} 
          description="Accumulated catalog requests" 
          colorClass="text-brand-accent border-brand-accent/20"
        />
        <StatCard 
          title="New Leads" 
          value={stats.newLeads} 
          icon={UserPlus} 
          description="Awaiting primary contact" 
          colorClass="text-blue-400 border-blue-400/20"
        />
        <StatCard 
          title="Contacted" 
          value={stats.contactedLeads} 
          icon={PhoneCall} 
          description="In communication pipeline" 
          colorClass="text-amber-400 border-amber-400/20"
        />
        <StatCard 
          title="Closed Deals" 
          value={stats.closedLeads} 
          icon={CheckCircle2} 
          description="Successfully converted leads" 
          colorClass="text-emerald-400 border-emerald-400/20"
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${conversionRate}%`} 
          icon={TrendingUp} 
          description="Closed deals ratio" 
          colorClass="text-cyan-400 border-cyan-400/20"
        />
      </div>

      {/* Grid: Charts and Upcoming Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Analytics Chart */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-sm relative">
          <div className="absolute top-2 left-2 border-t border-l border-brand-accent/30 w-3 h-3"></div>
          <div className="absolute bottom-2 right-2 border-b border-r border-brand-accent/30 w-3 h-3"></div>
          
          <h3 className="heading-font text-white text-sm font-bold tracking-widest uppercase mb-6 border-b border-white/[0.04] pb-2">
            Lead Status Distribution
          </h3>

          <div className="space-y-6">
            {statusBars.map((bar) => (
              <div key={bar.label} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 font-bold uppercase">{bar.label}</span>
                  <span className="text-white font-extrabold">{bar.value} leads</span>
                </div>
                <div className="h-4 bg-[#0a0d18] border border-white/5 rounded-sm overflow-hidden p-0.5">
                  <div 
                    className={`h-full ${bar.color} rounded-xs transition-all duration-1000 shadow-inner`}
                    style={{ width: `${bar.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.04] flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>CHART // GRF-LEAD-DIST-V1</span>
            <span>SYSTEM LIVE METRICS</span>
          </div>
        </div>

        {/* Right Column: Upcoming Follow-ups */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-sm relative flex flex-col justify-between">
          <div className="absolute top-2 left-2 border-t border-l border-brand-accent/30 w-3 h-3"></div>
          <div className="absolute bottom-2 right-2 border-b border-r border-brand-accent/30 w-3 h-3"></div>

          <div>
            <h3 className="heading-font text-white text-sm font-bold tracking-widest uppercase mb-6 border-b border-white/[0.04] pb-2">
              Pending Follow-Ups
            </h3>

            {upcomingFollowUps.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <Clock size={32} className="mx-auto mb-3 opacity-20" />
                <p className="text-xs font-mono">No pending follow-ups scheduled.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingFollowUps.map((item) => (
                  <Link 
                    key={item._id}
                    to={`/leads?id=${item.lead?._id || item.lead}`}
                    className="block p-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] hover:border-brand-accent/20 rounded-sm transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-white uppercase hover:text-brand-accent">
                          {item.lead?.name || "Unknown Lead"}
                        </span>
                        <p className="text-[10px] text-slate-400 line-clamp-1 italic font-light">
                          "{item.note}"
                        </p>
                      </div>
                      
                      {/* Action Badge */}
                      <span className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-mono">
                        {item.action}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center space-x-1.5 text-[9px] font-mono text-slate-500">
                      <Calendar size={10} className="text-brand-accent" />
                      <span>
                        Next: {new Date(item.nextFollowUpDate).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.04]">
            <Link 
              to="/leads" 
              className="inline-flex items-center space-x-2 text-brand-accent hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <span>View All Lead Timelines</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>

      {/* Section: Recent Leads */}
      <div className="glass-panel p-6 rounded-sm relative">
        <div className="absolute top-2 left-2 border-t border-l border-brand-accent/30 w-3 h-3"></div>
        <div className="absolute bottom-2 right-2 border-b border-r border-brand-accent/30 w-3 h-3"></div>

        <div className="flex justify-between items-center mb-6 border-b border-white/[0.04] pb-2">
          <h3 className="heading-font text-white text-sm font-bold tracking-widest uppercase">
            Recent Catalog Inquiries
          </h3>
          
          <Link 
            to="/leads" 
            className="text-xs font-mono text-slate-400 hover:text-brand-accent transition-colors flex items-center space-x-1"
          >
            <span>FULL LOG</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-xs font-mono">No recent leads found in database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-400">
              <thead>
                <tr className="border-b border-white/[0.04] text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Product Interest</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Date Recv</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {recentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white uppercase">
                      {lead.name}
                      <span className="block text-[10px] text-slate-500 font-mono font-light mt-0.5">
                        {lead.email}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-light text-slate-300 uppercase tracking-wide">
                      {lead.company || "N/A"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-brand-steel/60 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide border border-white/5">
                        {lead.productInterest}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`
                        inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border
                        ${lead.priority === "hot" ? "bg-red-500/10 border-red-500/20 text-red-400" : ""}
                        ${lead.priority === "warm" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : ""}
                        ${lead.priority === "cold" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : ""}
                      `}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`
                        inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border
                        ${lead.status === "new" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : ""}
                        ${lead.status === "pipeline" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : ""}
                        ${lead.status === "interested" ? "bg-teal-500/10 border-teal-500/20 text-teal-400" : ""}
                        ${lead.status === "call_back_later" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : ""}
                        ${lead.status === "closed" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : ""}
                        ${lead.status === "lost" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" : ""}
                      `}>
                        {lead.status?.replace(/_/g, " ") || ""}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[10px] text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
