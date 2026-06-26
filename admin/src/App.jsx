import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Quotes from "./pages/Quotes";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import FAQs from "./pages/FAQs";

// Layout for authorized sections
const AppLayout = () => {
  const location = useLocation();

  // Map route paths to header titles
  const getSectionTitle = (path) => {
    if (path.startsWith("/products/edit")) {
      return "Edit Equipment Spec";
    }
    switch (path) {
      case "/products":
        return "Equipment Catalog";
      case "/products/add":
        return "Add New Equipment";
      case "/quotes":
        return "Quotation Requests";
      case "/faqs":
        return "FAQ & Chatbot Manager";
      default:
        return "Control Panel";
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-brand-obsidian text-slate-100 selection:bg-brand-accent/20">
      {/* Sidebar Nav */}
      <Sidebar />

      {/* Main content viewport */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Header bar */}
        <Navbar sectionTitle={getSectionTitle(location.pathname)} />

        {/* Scrollable workspace */}
        <main className="flex-1 overflow-y-auto bg-brand-obsidian relative">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Login Endpoint */}
            <Route path="/login" element={<Login />} />

            {/* Secure Protected Workspace Panel */}
            <Route element={<ProtectedRoute allowedRoles={["super_admin", "sales", "manager"]} />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/edit/:id" element={<AddProduct />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/faqs" element={<FAQs />} />
              </Route>
            </Route>

            {/* Wildcard Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
