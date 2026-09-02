const API_BASE_URL = 'https://fakestoreapi.com';

export const api = {
  getAllProducts: async () => {
    const response = await fetch(API_BASE_URL + '/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProductById: async (id) => {
    const response = await fetch(API_BASE_URL + '/products/' + id);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(API_BASE_URL + '/products/categories');
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  getProductsByCategory: async (category) => {
    const response = await fetch(API_BASE_URL + '/products/category/' + category);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return response.json();
  },

  getLimitedProducts: async (limit) => {
    const response = await fetch(API_BASE_URL + '/products?limit=' + (limit || 4));
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }
};