import { createContext, useState, useEffect, useContext } from "react";
import { authApi } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if admin is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const adminData = await authApi.getProfile();
        const role = adminData.email === "admin@grfdynamicengineering.com" ? "super_admin" : "sales";
        setAdmin({ ...adminData, role });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("admin_token");
        setAdmin(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem("admin_token", data.token);
      
      // Fetch full profile just to ensure state is fully populated
      const profileData = await authApi.getProfile();
      const role = profileData.email === "admin@grfdynamicengineering.com" ? "super_admin" : "sales";
      setAdmin({ ...profileData, role });
      setIsAuthenticated(true);
      return { ...profileData, role };
    } catch (error) {
      setIsAuthenticated(false);
      setAdmin(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const updateProfileState = (updatedData) => {
    setAdmin((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        loading,
        login,
        logout,
        updateProfileState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
