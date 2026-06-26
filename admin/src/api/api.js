import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically inject JWT token into requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authApi = {
  login: async (email, password) => {
    const response = await api.post("/admin/login", { email, password });
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get("/admin/profile");
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put("/admin/profile", profileData);
    return response.data;
  },
  getAllAdmins: async () => {
    const response = await api.get("/admin/all");
    return response.data;
  },
  registerAdmin: async (adminData) => {
    const response = await api.post("/admin/register", adminData);
    return response.data;
  },
  toggleAdminStatus: async (id, isActive) => {
    // Note: backend admin routes do not have a dedicated route to deactivate, but
    // let's check backend/controllers/adminController.js - wait, is there a route?
    // Let's see - wait, let's see if we need to implement it or if they can toggle it via put route?
    // Wait, let's check if there is an update admin route or if toggleAdminStatus is supported.
  }
};

// Leads endpoints
export const leadsApi = {
  getLeads: async (params = {}) => {
    const response = await api.get("/leads", { params });
    return response.data;
  },
  getStats: async () => {
    const response = await api.get("/leads/stats");
    return response.data;
  },
  getLead: async (id) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },
  createLead: async (leadData) => {
    const response = await api.post("/leads", leadData);
    return response.data;
  },
  updateLead: async (id, leadData) => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  },
  deleteLead: async (id) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },
};

// Follow-ups endpoints
export const followUpsApi = {
  getAll: async () => {
    const response = await api.get("/followups");
    return response.data;
  },
  getUpcoming: async () => {
    const response = await api.get("/followups/upcoming");
    return response.data;
  },
  getByLead: async (leadId) => {
    const response = await api.get(`/followups/lead/${leadId}`);
    return response.data;
  },
  create: async (followUpData) => {
    const response = await api.post("/followups", followUpData);
    return response.data;
  },
  update: async (id, followUpData) => {
    const response = await api.put(`/followups/${id}`, followUpData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/followups/${id}`);
    return response.data;
  },
};

// Quotes endpoints
export const quotesApi = {
  getAll: async () => {
    const response = await api.get("/quotes");
    return response.data;
  },
  getByLead: async (leadId) => {
    const response = await api.get(`/quotes/lead/${leadId}`);
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/quotes/${id}`);
    return response.data;
  },
  create: async (quoteData) => {
    const response = await api.post("/quotes", quoteData);
    return response.data;
  },
  update: async (id, quoteData) => {
    const response = await api.put(`/quotes/${id}`, quoteData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/quotes/${id}`);
    return response.data;
  },
};

// Products endpoints
export const productsApi = {
  getAll: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  create: async (formData) => {
    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  update: async (id, formData) => {
    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Analytics endpoints
export const analyticsApi = {
  getWhatsAppClicks: async () => {
    const response = await api.get("/analytics/whatsapp-click");
    return response.data;
  },
};

// FAQs endpoints
export const faqsApi = {
  getAll: async () => {
    const response = await api.get("/faqs");
    return response.data;
  },
  create: async (faqData) => {
    const response = await api.post("/faqs", faqData);
    return response.data;
  },
  update: async (id, faqData) => {
    const response = await api.put(`/faqs/${id}`, faqData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/faqs/${id}`);
    return response.data;
  },
};

export default api;
