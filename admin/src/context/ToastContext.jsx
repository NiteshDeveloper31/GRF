import { createContext, useState, useContext, useCallback } from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toastIcons = {
    success: <CheckCircle2 size={16} className="text-emerald-400" />,
    error: <AlertTriangle size={16} className="text-red-400" />,
    warning: <AlertTriangle size={16} className="text-amber-400" />,
    info: <Info size={16} className="text-blue-400" />,
  };

  const borderColors = {
    success: "border-l-4 border-emerald-500 bg-[#0b0f19] border-white/5",
    error: "border-l-4 border-red-500 bg-[#140b0f] border-white/5",
    warning: "border-l-4 border-amber-500 bg-[#14100b] border-white/5",
    info: "border-l-4 border-blue-500 bg-[#0b0d19] border-white/5",
  };

  const textColors = {
    success: "text-emerald-200",
    error: "text-red-200",
    warning: "text-amber-200",
    info: "text-blue-200",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Floating Toast Notification Container */}
      <div className="fixed top-6 right-6 z-100 space-y-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-start justify-between p-4 rounded-sm border shadow-2xl pointer-events-auto
              transition-all duration-300 animate-slideIn
              ${borderColors[toast.type]}
            `}
            style={{
              animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 shrink-0">{toastIcons[toast.type]}</div>
              <div>
                <p className={`text-xs font-light leading-relaxed ${textColors[toast.type]}`}>
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-500 hover:text-white transition-colors ml-4 shrink-0 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastContext;
