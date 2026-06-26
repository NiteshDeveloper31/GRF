import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/api";
import { useToast } from "../context/ToastContext";
import {
  User,
  Mail,
  Phone,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Database
} from "lucide-react";

const Profile = () => {
  const { admin, updateProfileState } = useAuth();
  const { showToast } = useToast();

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (admin) {
      setName(admin.name || "");
      setPhone(admin.phone || "");
    }
  }, [admin]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!name) {
      setErrorMsg("Name is a required field.");
      showToast("Name is a required field.", "warning");
      return;
    }

    if (password && password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      showToast("Passwords do not match. Please verify.", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        phone,
      };

      if (password) {
        payload.password = password;
      }

      const updated = await authApi.updateProfile(payload);
      updateProfileState(updated);
      
      // Clear passwords
      setPassword("");
      setConfirmPassword("");
      setSuccessMsg("Profile updated successfully!");
      showToast("Profile updated successfully!", "success");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to update profile details.";
      setErrorMsg(msg);
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const roleLabel = {
    super_admin: "Admin Access",
    manager: "Admin Access",
    sales: "Admin Access",
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-2xl mx-auto animate-fadeIn">
      
      {/* Page Header */}
      <div>
        <h1 className="heading-font text-2xl font-black text-white uppercase tracking-wider">
          Profile Settings
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Manage your account credentials and contact details
        </p>
      </div>

      {/* Profile Container */}
      <div className="glass-panel p-6 rounded-sm relative">
        {/* Decorative blueprint corners */}
        <div className="absolute top-2 left-2 border-t border-l border-brand-accent/30 w-3 h-3"></div>
        <div className="absolute bottom-2 right-2 border-b border-r border-brand-accent/30 w-3 h-3"></div>

        {/* Info Alerts */}
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-sm p-4 mb-6 flex items-center space-x-3 text-emerald-200 text-xs font-mono">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6 flex items-center space-x-3 text-red-200 text-xs font-mono">
            <AlertCircle size={16} className="text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          
          {/* Header Role info */}
          <div className="bg-[#0a0d18] border border-white/5 p-4 rounded-sm flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Authorization Level</span>
              <p className="heading-font text-brand-accent text-sm font-bold uppercase tracking-wider">
                {roleLabel[admin?.role] || admin?.role}
              </p>
            </div>
            
            <Database size={20} className="text-brand-accent opacity-30" />
          </div>

          {/* Email Address (read only) */}
          <div className="space-y-1">
            <label className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Email Address (Primary Identity)</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-3 text-slate-600 pointer-events-none" />
              <input
                type="email"
                disabled
                value={admin?.email || ""}
                className="w-full bg-[#0a0d18]/50 border border-white/5 text-slate-500 rounded-sm pl-9 pr-4 py-2.5 text-xs outline-hidden cursor-not-allowed select-none font-mono"
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Display Name *</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2.5 text-xs text-white outline-hidden"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Contact Phone Number</label>
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2.5 text-xs text-white outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Password (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/[0.04] pt-4">
            
            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Change Password (Optional)</label>
              <div className="relative">
                <KeyRound size={14} className="absolute left-3 top-3 text-slate-500 pointer-events-none" />
                <input
                  type="password"
                  minLength={6}
                  placeholder="Leave blank to retain"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2.5 text-xs text-white outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Confirm New Password</label>
              <div className="relative">
                <KeyRound size={14} className="absolute left-3 top-3 text-slate-500 pointer-events-none" />
                <input
                  type="password"
                  minLength={6}
                  placeholder="Re-type password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent/40 rounded-sm pl-9 pr-4 py-2.5 text-xs text-white outline-hidden"
                />
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-accent hover:brightness-110 disabled:brightness-75 text-black font-bold py-3.5 px-4 rounded-sm text-xs uppercase tracking-widest transition-all cursor-pointer flex justify-center items-center space-x-1.5 mt-6"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-black"></div>
                <span>Updating Profile...</span>
              </>
            ) : (
              <span>Save Account Settings</span>
            )}
          </button>

        </form>
      </div>

    </div>
  );
};

export default Profile;
