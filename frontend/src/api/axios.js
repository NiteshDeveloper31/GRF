import { mockProducts } from './mockData';

const useMockApi = import.meta.env.VITE_USE_API !== 'true';
const mockSuccess = {
  success: true,
  message: 'Your inquiry has been successfully recorded locally. Thank you!',
};

/**
 * Fetches all products, optionally filtering by category.
 * The site currently runs against local mock data until backend APIs are ready.
 */
export const getProducts = async (categoryFilter = '') => {
  if (!useMockApi) {
    const { default: axios } = await import('axios');
    const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products`);
    const products = response.data;
    return categoryFilter
      ? products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
      : products;
  }

  return categoryFilter
    ? mockProducts.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
    : mockProducts;
};

/**
 * Fetches a single product by ID.
 * The site currently runs against local mock data until backend APIs are ready.
 */
export const getProductById = async (id) => {
  if (!useMockApi) {
    const { default: axios } = await import('axios');
    const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products/${id}`);
    return response.data;
  }

  const product = mockProducts.find(p => p.id === Number(id) || String(p.id) === String(id));
  if (!product) {
    throw new Error('Product not found in mock database.');
  }
  return product;
};

/**
 * Submits a new lead / contact form.
 * The site currently runs against local mock data until backend APIs are ready.
 */
export const createLead = async (leadData) => {
  if (!useMockApi) {
    const { default: axios } = await import('axios');
    const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/leads`, leadData);
    return response.data;
  }

  return mockSuccess;
};
