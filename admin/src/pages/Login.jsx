import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { KeyRound, Mail, AlertTriangle } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Invalid email or password. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = () => {
    setEmail("admin@grfdynamicengineering.com");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-brand-obsidian flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-sm shadow-2xl relative z-10 animate-scaleUp">
        {/* Decorative blueprint corners */}
        <div className="absolute top-3 left-3 border-t-2 border-l-2 border-brand-accent w-6 h-6 opacity-75"></div>
        <div className="absolute top-3 right-3 border-t-2 border-r-2 border-brand-accent w-6 h-6 opacity-75"></div>
        <div className="absolute bottom-3 left-3 border-b-2 border-l-2 border-brand-accent w-6 h-6 opacity-75"></div>
        <div className="absolute bottom-3 right-3 border-b-2 border-r-2 border-brand-accent w-6 h-6 opacity-75"></div>

        {/* Header Logo */}
        <div className="text-center mb-8 select-none">
          <div className="w-12 h-12 rounded-sm bg-brand-accent mx-auto flex items-center justify-center font-bold text-black heading-font text-2xl shadow-lg shadow-brand-accent/20 mb-4">
            G
          </div>
          <h1 className="heading-font text-white font-extrabold text-2xl tracking-wider leading-none">
            GRF DYNAMIC
          </h1>
          <p className="text-[10px] font-mono text-brand-accent tracking-[0.2em] uppercase mt-2">
            Control Panel Login
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6 flex items-start space-x-3 text-red-200">
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-400" />
            <span className="text-xs font-light leading-relaxed">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                autoComplete="off"
                className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent rounded-sm pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-hidden transition-colors"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <KeyRound size={16} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full bg-[#0a0d18] border border-white/10 focus:border-brand-accent rounded-sm pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-hidden transition-colors"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 disabled:brightness-75 text-white font-bold py-3.5 px-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-200 shadow-lg shadow-brand-accent/10 active:scale-[0.98] cursor-pointer flex justify-center items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Auto Fill credentials helper */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-[10px] text-slate-500 font-light mb-3 leading-relaxed">
            Need test access? Use the pre-seeded Super Admin account:
          </p>
          <button
            type="button"
            onClick={fillCredentials}
            className="inline-flex items-center space-x-1.5 px-4 py-2 border border-dashed border-brand-accent/20 hover:border-brand-accent/50 bg-brand-accent/5 hover:bg-brand-accent/10 text-brand-accent text-[10px] font-mono font-bold rounded-sm uppercase tracking-wider transition-all cursor-pointer"
          >
            Auto-fill Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
