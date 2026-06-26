import { useState, useEffect } from "react";
import { authApi } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  ShieldAlert,
  Plus,
  X,
  Mail,
  Phone,
  User,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Clock
} from "lucide-react";

const Admins = () => {
  const { admin: currentAdmin } = useAuth();
  const { showToast } = useToast();
  
  // States
  const [adminsList, setAdminsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Register Form State
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "sales",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const data = await authApi.getAllAdmins();
      const mapped = data.map((admin) => ({
        ...admin,
        role: admin.email === "admin@grfdynamicengineering.com" ? "super_admin" : "sales",
      }));
      setAdminsList(mapped);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch administrative team log.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentAdmin?.role === "super_admin") {
      fetchAdmins();
    }
  }, [currentAdmin]);

  const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      showToast("Name, Email and Password are required fields.", "warning");
      return;
    }

    setSubmitting(true);
    try {
      await authApi.registerAdmin(registerForm);
      setIsRegisterModalOpen(false);
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "sales",
      });
      fetchAdmins();
      showToast("New team member registered successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to register new admin account.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const roleColors = {
    super_admin: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
    manager: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
    sales: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
  };

  const roleLabel = {
    super_admin: "Admin",
    manager: "Admin",
    sales: "Admin",
  };

  if (currentAdmin?.role !== "super_admin") {
    return (
      <div className="p-8 text-center min-h-[50vh] flex flex-col justify-center items-center">
        <ShieldAlert size={48} className="text-red-500 mb-4 animate-bounce" />
        <h2 className="heading-font text-white text-xl font-bold uppercase mb-2">Access Denied</h2>
        <p className="text-slate-500 text-xs font-mono max-w-sm">
          Section reserved for Super Admin account.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="heading-font text-2xl font-black text-white uppercase tracking-wider">
            Team Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Register sales representatives and managers to assign customer pipelines
          </p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="bg-brand-accent hover:brightness-110 text-black font-bold py-2.5 px-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-200 shadow-md shadow-brand-accent/10 active:scale-95 cursor-pointer flex items-center space-x-1.5"
        >
          <Plus size={16} />
          <span>Register Admin</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 flex items-center space-x-3 text-red-200">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span className="text-xs font-mono">{error}</span>
        </div>
      )}

      {/* Grid: Admins List */}
      <div className="glass-panel rounded-sm relative overflow-hidden">
        <div className="absolute top-2 left-2 border-t border-l border-brand-accent/30 w-3 h-3"></div>
        <div className="absolute bottom-2 right-2 border-b border-r border-brand-accent/30 w-3 h-3"></div>

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent mb-3"></div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Opening Secure Vault...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-400">
              <thead>
                <tr className="border-b border-white/[0.04] text-slate-500 font-mono text-[9px] uppercase tracking-wider bg-white/[0.01]">
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-6">Email Address</th>
                  <th className="py-3.5 px-6">Phone</th>
                  <th className="py-3.5 px-6">Access Role</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {adminsList.map((user) => (
                  <tr key={user._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-6 font-bold text-white uppercase flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-brand-steel border border-white/5 flex items-center justify-center text-slate-400 font-mono text-[10px]">
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{user.name}</span>
                    </td>
                    <td className="py-4 px-6 font-light text-slate-300">
                      {user.email}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-400">
                      {user.phone || "N/A"}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${roleColors[user.role]}`}>
                        {roleLabel[user.role] || user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs border ${user.isActive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                        {user.isActive ? "Active" : "Deactivated"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-[10px] text-slate-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never logged in"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Warning Box */}
      <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm flex items-center space-x-3 text-slate-500">
        <Clock size={16} className="text-slate-600 shrink-0" />
        <p className="text-[10px] font-mono leading-relaxed uppercase tracking-wider">
          Security Note: Administrative accounts cannot be deleted directly from the client panel to prevent accidental lockouts. Active status toggles are handled via secure DBA processes.
        </p>
      </div>
      </div>

      {/* REGISTER ADMIN MODAL */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-md bg-brand-charcoal border border-white/10 p-6 rounded-sm shadow-2xl relative animate-scaleUp">
            
            {/* Close */}
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="heading-font text-white text-lg font-bold tracking-widest uppercase mb-6 border-b border-white/[0.04] pb-2">
              Register Team Account
            </h3>

            <form onSubmit={handleRegisterAdmin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Admin Name *</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-3 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2 text-xs text-white outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Email Address *</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-3 text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2 text-xs text-white outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Password * (Min 6 chars)</label>
                <div className="relative">
                  <KeyRound size={14} className="absolute left-3 top-3 text-slate-500 pointer-events-none" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2 text-xs text-white outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Phone Number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-3 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2 text-xs text-white outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Access Level Role *</label>
                <select
                  required
                  value={registerForm.role}
                  onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                  className="w-full bg-[#0a0d18] border border-white/10 rounded-sm p-2 text-xs text-slate-300 outline-hidden"
                >
                  <option value="sales">Sales Rep (Limited assignment)</option>
                  <option value="manager">Manager (Read all pipelines)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-accent hover:brightness-110 disabled:brightness-75 text-black font-bold py-3 px-4 rounded-sm text-xs uppercase tracking-widest transition-all cursor-pointer flex justify-center items-center space-x-1.5"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-black"></div>
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} />
                    <span>Authorize & Save Account</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Admins;
