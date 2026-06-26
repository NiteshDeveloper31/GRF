import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { leadsApi, authApi, followUpsApi, quotesApi } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Trash2,
  X,
  Phone,
  Mail,
  Building,
  Calendar,
  PlusCircle,
  FileText,
  AlertCircle,
  User,
  MessageSquare,
  FileSpreadsheet
} from "lucide-react";

const Leads = () => {
  const { admin: currentAdmin } = useAuth();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [leads, setLeads] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("new");
  const [priority, setPriority] = useState("");
  const [source, setSource] = useState("");
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Create Lead Form State
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    company: "",
    designation: "",
    productInterest: "Storage Tank",
    capacityRequired: "",
    material: "Not Sure",
    message: "",
    source: "website",
    priority: "warm",
    city: "",
    state: "",
  });

  // Follow-up Form State
  const [followUpForm, setFollowUpForm] = useState({
    action: "called",
    note: "",
    outcome: "interested",
    nextFollowUpDate: "",
    nextFollowUpNote: "",
  });
  const [followUps, setFollowUps] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [submittingFollowUp, setSubmittingFollowUp] = useState(false);
  
  // Reassignment Form State
  const [assignedTo, setAssignedTo] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [leadPriority, setLeadPriority] = useState("");

  const productInterests = [
    "Storage Tank",
    "Milk Storage Tank",
    "Silo System",
    "Brewery Tank",
    "Reactor Vessel",
    "High Pressure Vessel",
    "Mixing Tank",
    "Jacketed Vessel",
    "Underground Oil Storage Tank",
    "Custom Equipment",
    "Other"
  ];

  const fetchLeads = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const params = {
        search: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
        source: source || undefined,
      };
      const data = await leadsApi.getLeads(params);
      setLeads(data.leads || data);
    } catch (err) {
      console.error(err);
      if (showLoading) setError("Failed to fetch leads.");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(true);

    // Poll for new leads every 60 seconds
    const interval = setInterval(() => {
      fetchLeads(false);
    }, 60000);
    
    // Fetch Admins if current admin is super_admin (for reassignment dropdown)
    if (currentAdmin?.role === "super_admin") {
      authApi.getAllAdmins()
        .then((data) => {
          const mapped = data.map((admin) => ({
            ...admin,
            role: admin.email === "admin@grfdynamicengineering.com" ? "super_admin" : "sales",
          }));
          setAdmins(mapped);
        })
        .catch((err) => console.error("Error loading team admins:", err));
    }

    return () => clearInterval(interval);
  }, [search, status, priority, source]);

  // Clear status filter if looking for a specific lead via deep link (so it doesn't get filtered out of the leads list)
  useEffect(() => {
    const leadId = searchParams.get("id");
    if (leadId) {
      setStatus("");
    }
  }, [searchParams]);

  // Deep Link handler (e.g. from dashboard follow-ups)
  useEffect(() => {
    const leadId = searchParams.get("id");
    if (leadId && leads.length > 0) {
      const targetLead = leads.find((l) => l._id === leadId);
      if (targetLead) {
        handleOpenDetails(targetLead);
        // Clear param
        setSearchParams({});
      }
    }
  }, [searchParams, leads]);

  const handleOpenDetails = async (lead) => {
    setSelectedLead(lead);
    setLeadStatus(lead.status);
    setLeadPriority(lead.priority);
    setAssignedTo(lead.assignedTo?._id || lead.assignedTo || "");
    setIsDetailsModalOpen(true);
    
    // Fetch related logs
    try {
      const followUpLogs = await followUpsApi.getByLead(lead._id);
      setFollowUps(followUpLogs);
      
      const quoteLogs = await quotesApi.getByLead(lead._id);
      setQuotes(quoteLogs);
    } catch (err) {
      console.error("Error loading lead relation logs:", err);
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      await leadsApi.createLead(createForm);
      setIsCreateModalOpen(false);
      // Reset form
      setCreateForm({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        company: "",
        designation: "",
        productInterest: "Storage Tank",
        capacityRequired: "",
        material: "Not Sure",
        message: "",
        source: "website",
        priority: "warm",
        city: "",
        state: "",
      });
      fetchLeads();
      showToast("New lead created successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to create lead.", "error");
    }
  };

  const handleUpdateLeadConfig = async () => {
    if (!selectedLead) return;
    try {
      const updated = await leadsApi.updateLead(selectedLead._id, {
        status: leadStatus,
        priority: leadPriority,
        assignedTo: assignedTo || null,
      });
      setSelectedLead(updated);
      fetchLeads();
      showToast("Lead updated successfully.", "success");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to update lead details.", "error");
    }
  };

  const handleAddFollowUp = async (e) => {
    e.preventDefault();
    if (!followUpForm.note) {
      showToast("Please enter a note for the follow-up.", "warning");
      return;
    }

    setSubmittingFollowUp(true);
    try {
      await followUpsApi.create({
        lead: selectedLead._id,
        doneBy: currentAdmin._id,
        ...followUpForm
      });
      
      // Reset form
      setFollowUpForm({
        action: "called",
        note: "",
        outcome: "interested",
        nextFollowUpDate: "",
        nextFollowUpNote: "",
      });

      // Reload follow-ups
      const followUpLogs = await followUpsApi.getByLead(selectedLead._id);
      setFollowUps(followUpLogs);
      fetchLeads(); // refresh main list (status changes, etc.)
      showToast("Follow-up log registered successfully.", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to record follow-up.", "error");
    } finally {
      setSubmittingFollowUp(false);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead? All follow-ups and quotes history will remain in db or be orphaned.")) return;
    try {
      await leadsApi.deleteLead(id);
      setIsDetailsModalOpen(false);
      fetchLeads();
      showToast("Lead deleted successfully.", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete lead.", "error");
    }
  };

  return (
    <>
      <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-font text-2xl font-black text-white uppercase tracking-wider">
            Leads Pipeline
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Browse and manage customer specifications and follow-ups
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-brand-accent hover:brightness-110 text-black font-bold py-2.5 px-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-200 shadow-md shadow-brand-accent/10 active:scale-95 cursor-pointer flex items-center space-x-1.5"
        >
          <Plus size={16} />
          <span>New Lead</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        {/* Search */}
        <div className="space-y-1.5 col-span-1 lg:col-span-2">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">Search contact/company</label>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-3 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter name, email, company..."
              className="w-full bg-[#0a0d18] border border-white/5 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2 text-xs text-white placeholder-slate-600 outline-hidden"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-1.5">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#0a0d18] border border-white/5 focus:border-brand-accent/40 rounded-sm px-3 py-2.5 text-xs text-slate-300 outline-hidden"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="pipeline">Pipeline</option>
            <option value="interested">Interested</option>
            <option value="call_back_later">Call Back Later</option>
            <option value="closed">Closed</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="space-y-1.5">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-[#0a0d18] border border-white/5 focus:border-brand-accent/40 rounded-sm px-3 py-2.5 text-xs text-slate-300 outline-hidden"
          >
            <option value="">All Priorities</option>
            <option value="hot">Hot</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </select>
        </div>

        {/* Source Filter */}
        <div className="space-y-1.5">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">Source</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full bg-[#0a0d18] border border-white/5 focus:border-brand-accent/40 rounded-sm px-3 py-2.5 text-xs text-slate-300 outline-hidden"
          >
            <option value="">All Sources</option>
            <option value="website">Website</option>
            <option value="meta_ads">Meta Ads</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="referral">Referral</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-panel rounded-sm relative overflow-hidden">
        <div className="absolute top-2 left-2 border-t border-l border-brand-accent/30 w-3 h-3"></div>
        <div className="absolute bottom-2 right-2 border-b border-r border-brand-accent/30 w-3 h-3"></div>

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent mb-3"></div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Querying Pipeline...</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <p className="text-xs font-mono">No leads match the specified filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-400">
              <thead>
                <tr className="border-b border-white/[0.04] text-slate-500 font-mono text-[9px] uppercase tracking-wider bg-white/[0.01]">
                  <th className="py-3.5 px-6">Lead details</th>
                  <th className="py-3.5 px-6">Company</th>
                  <th className="py-3.5 px-6">Product Interest</th>
                  <th className="py-3.5 px-6">Priority</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Assigned to</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-6 font-bold text-white uppercase">
                      {lead.name}
                      <span className="block text-[10px] text-slate-500 font-mono font-light mt-0.5">
                        {lead.email} | {lead.phone}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-light text-slate-300 uppercase tracking-wide">
                      {lead.company || "N/A"}
                      {lead.designation && <span className="block text-[10px] text-slate-500">{lead.designation}</span>}
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-brand-steel/60 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide border border-white/5">
                        {lead.productInterest}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`
                        inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border
                        ${lead.priority === "hot" ? "bg-red-500/10 border-red-500/20 text-red-400" : ""}
                        ${lead.priority === "warm" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : ""}
                        ${lead.priority === "cold" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : ""}
                      `}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`
                        inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border
                        ${lead.status === "new" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : ""}
                        ${lead.status === "pipeline" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : ""}
                        ${lead.status === "interested" ? "bg-teal-500/10 border-teal-500/20 text-teal-400" : ""}
                        ${lead.status === "call_back_later" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : ""}
                        ${lead.status === "closed" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : ""}
                        ${lead.status === "lost" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" : ""}
                      `}>
                        {lead.status?.replace("_", " ") || ""}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-light uppercase">
                      {lead.assignedTo?.name || "Unassigned"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleOpenDetails(lead)}
                        className="p-1.5 text-slate-400 hover:text-brand-accent transition-colors border border-white/5 hover:border-brand-accent/20 bg-[#0a0d18] rounded-sm cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      </div>

      {/* CREATE LEAD MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-brand-charcoal border border-white/10 p-6 rounded-sm shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scaleUp">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="heading-font text-white text-lg font-bold tracking-widest uppercase mb-6 border-b border-white/[0.04] pb-2">
              Record New Inquiry
            </h3>

            <form onSubmit={handleCreateLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Email Address *</label>
                <input
                  type="email"
                  required
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={createForm.phone}
                  onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">WhatsApp Number</label>
                <input
                  type="text"
                  value={createForm.whatsapp}
                  onChange={(e) => setCreateForm({ ...createForm, whatsapp: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Company Name</label>
                <input
                  type="text"
                  value={createForm.company}
                  onChange={(e) => setCreateForm({ ...createForm, company: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Designation</label>
                <input
                  type="text"
                  value={createForm.designation}
                  onChange={(e) => setCreateForm({ ...createForm, designation: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Product Interest *</label>
                <select
                  required
                  value={createForm.productInterest}
                  onChange={(e) => setCreateForm({ ...createForm, productInterest: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-slate-300 outline-hidden"
                >
                  {productInterests.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Capacity Required</label>
                <input
                  type="text"
                  placeholder="e.g. 10,000 Litres"
                  value={createForm.capacityRequired}
                  onChange={(e) => setCreateForm({ ...createForm, capacityRequired: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Material</label>
                <select
                  value={createForm.material}
                  onChange={(e) => setCreateForm({ ...createForm, material: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-slate-300 outline-hidden"
                >
                  <option value="Not Sure">Not Sure</option>
                  <option value="Stainless Steel">Stainless Steel</option>
                  <option value="Mild Steel">Mild Steel</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Priority</label>
                <select
                  value={createForm.priority}
                  onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-slate-300 outline-hidden"
                >
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="cold">Cold</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">City</label>
                <input
                  type="text"
                  value={createForm.city}
                  onChange={(e) => setCreateForm({ ...createForm, city: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">State</label>
                <input
                  type="text"
                  value={createForm.state}
                  onChange={(e) => setCreateForm({ ...createForm, state: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden"
                />
              </div>

              <div className="col-span-1 md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Inquiry Message</label>
                <textarea
                  rows="3"
                  value={createForm.message}
                  onChange={(e) => setCreateForm({ ...createForm, message: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-white outline-hidden resize-none"
                />
              </div>

              <div className="col-span-1 md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-brand-accent hover:brightness-110 text-black font-bold py-3 px-4 rounded-sm text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  Create Lead Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEAD DETAILS & ACTIONS MODAL */}
      {isDetailsModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-4xl bg-brand-charcoal border border-white/10 p-6 rounded-sm shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scaleUp grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Close */}
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Left Box: Info & Lead config updates (Col-5) */}
            <div className="lg:col-span-5 space-y-6 border-r border-white/[0.04] pr-0 lg:pr-6">
              <div>
                <span className="bg-brand-accent/5 border border-brand-accent/25 text-brand-accent text-[8px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
                  Lead Profile
                </span>
                <h3 className="heading-font text-white text-lg font-bold tracking-wide uppercase mt-2">
                  {selectedLead.name}
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">ID: {selectedLead._id}</p>
              </div>

              {/* Technical Specifications of Lead */}
              <div className="bg-[#0a0d18] border border-white/5 rounded-sm p-4 space-y-3.5 text-xs text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <Mail size={14} className="text-slate-500" />
                  <span className="truncate">{selectedLead.email}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone size={14} className="text-slate-500" />
                  <span>{selectedLead.phone}</span>
                </div>
                {selectedLead.company && (
                  <div className="flex items-center space-x-2.5">
                    <Building size={14} className="text-slate-500" />
                    <span className="uppercase font-bold text-white tracking-wide">
                      {selectedLead.company} {selectedLead.designation && `(${selectedLead.designation})`}
                    </span>
                  </div>
                )}
                <div className="border-t border-white/[0.04] pt-3.5 space-y-2">
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Requirement Detail</p>
                  <p className="text-xs text-slate-400 font-light">
                    Interest: <span className="text-white font-bold">{selectedLead.productInterest}</span>
                  </p>
                  {selectedLead.capacityRequired && (
                    <p className="text-xs text-slate-400 font-light">
                      Capacity: <span className="text-white font-bold">{selectedLead.capacityRequired}</span>
                    </p>
                  )}
                  <p className="text-xs text-slate-400 font-light">
                    Material: <span className="text-white font-bold">{selectedLead.material}</span>
                  </p>
                  {selectedLead.message && (
                    <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xs mt-2 text-[11px] text-slate-400 italic">
                      "{selectedLead.message}"
                    </div>
                  )}
                </div>
              </div>

              {/* Reassignment / Status Updates */}
              <div className="space-y-4 pt-4 border-t border-white/[0.04]">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Update Lead Settings
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Status</label>
                    <select
                      value={leadStatus}
                      onChange={(e) => setLeadStatus(e.target.value)}
                      className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-1.5 text-xs text-slate-300 outline-hidden"
                    >
                      <option value="new">New</option>
                      <option value="pipeline">Pipeline</option>
                      <option value="interested">Interested</option>
                      <option value="call_back_later">Call Back Later</option>
                      <option value="closed">Closed</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Priority</label>
                    <select
                      value={leadPriority}
                      onChange={(e) => setLeadPriority(e.target.value)}
                      className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-1.5 text-xs text-slate-300 outline-hidden"
                    >
                      <option value="hot">Hot</option>
                      <option value="warm">Warm</option>
                      <option value="cold">Cold</option>
                    </select>
                  </div>
                </div>

                {/* Assigned To - Super Admin only can write. Sales/Managers can see only */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Assigned Sales Admin</label>
                  {currentAdmin?.role === "super_admin" ? (
                    <select
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-1.5 text-xs text-slate-300 outline-hidden"
                    >
                      <option value="">Unassigned</option>
                      {admins.map((admin) => (
                        <option key={admin._id} value={admin._id}>{admin.name} (Admin)</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      disabled
                      value={selectedLead.assignedTo?.name || "Unassigned"}
                      className="w-full bg-[#0a0d18]/50 border border-white/5 rounded-sm p-1.5 text-xs text-slate-500 outline-hidden uppercase"
                    />
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateLeadConfig}
                    className="flex-1 bg-white/[0.05] hover:bg-brand-accent hover:text-black border border-white/10 hover:border-brand-accent text-white font-bold py-2 px-3 rounded-sm text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Save Settings
                  </button>

                  {currentAdmin?.role === "super_admin" && (
                    <button
                      onClick={() => handleDeleteLead(selectedLead._id)}
                      className="bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white p-2 rounded-sm transition-all cursor-pointer"
                      title="Delete Lead Profile"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Box: Action Logs & Quotes Generator Link (Col-7) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              
              {/* Follow-up logs Timeline */}
              <div>
                <h4 className="heading-font text-white text-xs font-bold tracking-widest uppercase mb-4 border-b border-white/[0.04] pb-2">
                  Follow-Up Logs
                </h4>

                <div className="max-h-[220px] overflow-y-auto space-y-3.5 pr-2">
                  {followUps.length === 0 ? (
                    <p className="text-xs font-mono text-slate-500 italic py-4">No follow-ups recorded yet for this client.</p>
                  ) : (
                    followUps.map((log) => (
                      <div key={log._id} className="bg-white/[0.01] border border-white/[0.03] p-3 rounded-xs relative">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-brand-accent uppercase font-bold flex items-center space-x-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent mr-1"></span>
                            {log.action}
                          </span>
                          <span className="text-[8px] font-mono text-slate-500">
                            {new Date(log.createdAt).toLocaleDateString()} by {log.doneBy?.name || "Rep"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-2 font-light">{log.note}</p>
                        
                        {log.outcome && (
                          <span className="inline-block mt-2 bg-slate-800 text-slate-400 text-[8px] font-mono px-1.5 py-0.5 rounded-xs uppercase">
                            Outcome: {log.outcome?.replace('_', ' ') || ''}
                          </span>
                        )}

                        {log.nextFollowUpDate && (
                          <div className="mt-2 text-[8px] font-mono text-slate-500 border-t border-white/[0.02] pt-1.5">
                            Next Schedule: {new Date(log.nextFollowUpDate).toLocaleDateString()} {log.nextFollowUpNote && `(${log.nextFollowUpNote})`}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add Follow-up Form */}
              <div className="bg-[#0a0d18]/50 border border-white/5 p-4 rounded-sm">
                <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Log New Communication
                </h5>

                <form onSubmit={handleAddFollowUp} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 font-bold uppercase">Action Type</label>
                      <select
                        value={followUpForm.action}
                        onChange={(e) => setFollowUpForm({ ...followUpForm, action: e.target.value })}
                        className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-1.5 text-xs text-slate-300 outline-hidden"
                      >
                        <option value="called">Called</option>
                        <option value="emailed">Emailed</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="meeting">Meeting</option>
                        <option value="site_visit">Site Visit</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 font-bold uppercase">Outcome</label>
                      <select
                        value={followUpForm.outcome}
                        onChange={(e) => setFollowUpForm({ ...followUpForm, outcome: e.target.value })}
                        className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-1.5 text-xs text-slate-300 outline-hidden"
                      >
                        <option value="interested">Interested</option>
                        <option value="not_interested">Not Interested</option>
                        <option value="call_back_later">Call Back Later</option>
                        <option value="deal_in_progress">Deal In Progress</option>
                        <option value="deal_closed">Deal Closed</option>
                        <option value="no_response">No Response</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-500 font-bold uppercase">Conversation Summary *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter details of conversation..."
                      value={followUpForm.note}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, note: e.target.value })}
                      className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-1.5 text-xs text-white outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-t border-white/[0.03] pt-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 font-bold uppercase">Next Action Date</label>
                      <input
                        type="date"
                        value={followUpForm.nextFollowUpDate}
                        onChange={(e) => setFollowUpForm({ ...followUpForm, nextFollowUpDate: e.target.value })}
                        className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-1.5 text-xs text-slate-300 outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 font-bold uppercase">Next Action Note</label>
                      <input
                        type="text"
                        placeholder="e.g. Email quote"
                        value={followUpForm.nextFollowUpNote}
                        onChange={(e) => setFollowUpForm({ ...followUpForm, nextFollowUpNote: e.target.value })}
                        className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-1.5 text-xs text-white outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingFollowUp}
                    className="w-full bg-brand-accent hover:brightness-110 disabled:brightness-75 text-black font-bold py-2 px-3 rounded-sm text-[10px] uppercase tracking-widest transition-all cursor-pointer flex justify-center items-center"
                  >
                    {submittingFollowUp ? "Logging..." : "Save Communication Log"}
                  </button>
                </form>
              </div>

              {/* Quotes Associated */}
              <div className="border-t border-white/[0.04] pt-4 flex justify-between items-center">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1">Quotes Generated</h4>
                  <p className="text-xs text-white font-bold">
                    {quotes.length} {quotes.length === 1 ? "quote" : "quotes"} registered
                  </p>
                </div>

                <Link
                  to={`/quotes?create=true&leadId=${selectedLead._id}`}
                  className="bg-brand-steel border border-white/10 hover:border-brand-accent/30 text-white hover:text-brand-accent font-bold py-2 px-3 rounded-sm text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1.5"
                >
                  <PlusCircle size={12} />
                  <span>Generate Quotation</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Leads;
