import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading, admin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent mb-4"></div>
        <p className="text-slate-500 text-sm font-light">Verifying credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(admin?.role)) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex flex-col justify-center items-center p-4">
        <div className="glass-panel p-8 rounded-sm max-w-md text-center">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0-6V9m0-6H5.121a3 3 0 00-2.122.879l-1 1A3 3 0 001.12 7v10a3 3 0 003 3h14.756a3 3 0 002.122-.879l1-1a3 3 0 00.879-2.122V7a3 3 0 00-3-3H12z" />
          </svg>
          <h2 className="heading-font text-xl font-bold uppercase text-white mb-2">Access Denied</h2>
          <p className="text-slate-400 text-sm mb-6">
            You do not have the required permissions to view this section.
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
