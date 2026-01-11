import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getUser: () => api.get('/user'),
  updateProfile: (data) => api.put('/user/profile', data),
  updatePassword: (data) => api.put('/user/password', data),
};

// Category APIs
export const categoryAPI = {
  getAll: (params) => api.get('/categories', { params }),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
};

// Product APIs
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getFeatured: () => api.get('/products/featured'),
  getTrending: () => api.get('/products/trending'),
  getBySlug: (slug) => api.get(`/products/${slug}`),
};

// Album APIs
export const albumAPI = {
  getAll: (params) => api.get('/albums', { params }),
  getFeatured: () => api.get('/albums/featured'),
  getBySlug: (slug) => api.get(`/albums/${slug}`),
};

// Cart APIs
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (data) => api.post('/cart/items', data),
  updateItem: (itemId, data) => api.put(`/cart/items/${itemId}`, data),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  applyCoupon: (data) => api.post('/cart/apply-coupon', data),
  removeCoupon: () => api.delete('/cart/remove-coupon'),
  clear: () => api.delete('/cart/clear'),
};

// Order APIs
export const orderAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getByNumber: (orderNumber) => api.get(`/orders/${orderNumber}`),
  create: (data) => api.post('/orders', data),
  cancel: (orderNumber) => api.post(`/orders/${orderNumber}/cancel`),
};

// Payment APIs
export const paymentAPI = {
  getBankDetails: () => api.get('/payment/bank-details'),
  uploadSlip: (orderNumber, formData) => api.post(`/payment/${orderNumber}/upload-slip`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getStatus: (orderNumber) => api.get(`/payment/${orderNumber}/status`),
};

// Wishlist APIs
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (productId) => api.post('/wishlist', { product_id: productId }),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
};

// Review APIs
export const reviewAPI = {
  getForProduct: (slug, params) => api.get(`/products/${slug}/reviews`, { params }),
  create: (slug, data) => api.post(`/products/${slug}/reviews`, data),
  update: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),
  delete: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

// Banner APIs
export const bannerAPI = {
  getAll: () => api.get('/banners'),
};

// Admin APIs
export const adminAPI = {
  // Dashboard
  getDashboard: () => api.get('/admin/dashboard'),
  getStats: () => api.get('/admin/dashboard/stats'),
  getRecentOrders: () => api.get('/admin/dashboard/recent-orders'),
  getLowStock: () => api.get('/admin/dashboard/low-stock'),
  
  // Products
  getProducts: (params) => api.get('/admin/products', { params }),
  getProduct: (id) => api.get(`/admin/products/${id}`),
  createProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  toggleProductStatus: (id) => api.post(`/admin/products/${id}/toggle-status`),
  toggleProductFeatured: (id) => api.post(`/admin/products/${id}/toggle-featured`),
  toggleProductTrending: (id) => api.post(`/admin/products/${id}/toggle-trending`),
  uploadProductImages: (id, formData) => api.post(`/admin/products/${id}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteProductImage: (productId, imageId) => api.delete(`/admin/products/${productId}/images/${imageId}`),
  
  // Product Variants
  addProductVariant: (productId, data) => api.post(`/admin/products/${productId}/variants`, data),
  updateProductVariant: (productId, variantId, data) => api.put(`/admin/products/${productId}/variants/${variantId}`, data),
  deleteProductVariant: (productId, variantId) => api.delete(`/admin/products/${productId}/variants/${variantId}`),
  
  // Categories
  getCategories: (params) => api.get('/admin/categories', { params }),
  getCategory: (id) => api.get(`/admin/categories/${id}`),
  createCategory: (data) => api.post('/admin/categories', data),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
  toggleCategoryStatus: (id) => api.post(`/admin/categories/${id}/toggle-status`),
  
  // Albums
  getAlbums: (params) => api.get('/admin/albums', { params }),
  getAlbum: (id) => api.get(`/admin/albums/${id}`),
  createAlbum: (data) => api.post('/admin/albums', data),
  updateAlbum: (id, data) => api.put(`/admin/albums/${id}`, data),
  deleteAlbum: (id) => api.delete(`/admin/albums/${id}`),
  deleteAlbumImage: (albumId, imageId) => api.delete(`/admin/albums/${albumId}/images/${imageId}`),
  toggleAlbumStatus: (id) => api.post(`/admin/albums/${id}/toggle-status`),
  toggleAlbumFeatured: (id) => api.post(`/admin/albums/${id}/toggle-featured`),
  addAlbumProduct: (albumId, productId) => api.post(`/admin/albums/${albumId}/products`, { product_id: productId }),
  removeAlbumProduct: (albumId, productId) => api.delete(`/admin/albums/${albumId}/products/${productId}`),
  
  // Orders
  getOrders: (params) => api.get('/admin/orders', { params }),
  getOrder: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, data) => api.put(`/admin/orders/${id}/status`, data),
  updatePaymentStatus: (id, data) => api.put(`/admin/orders/${id}/payment-status`, data),
  addOrderTracking: (id, data) => api.post(`/admin/orders/${id}/tracking`, data),
  
  // Inventory
  getInventory: (params) => api.get('/admin/inventory', { params }),
  updateInventory: (id, data) => api.put(`/admin/inventory/${id}`, data),
  adjustInventory: (id, data) => api.post(`/admin/inventory/${id}/adjust`, data),
  
  // Customers
  getCustomers: (params) => api.get('/admin/customers', { params }),
  getCustomer: (id) => api.get(`/admin/customers/${id}`),
  toggleCustomerStatus: (id) => api.post(`/admin/customers/${id}/toggle-status`),
  
  // Variation Types (Color, Size, Material, Gold Type, etc.)
  getVariationTypes: (params) => api.get('/admin/variation-types', { params }),
  getVariationType: (id) => api.get(`/admin/variation-types/${id}`),
  createVariationType: (data) => api.post('/admin/variation-types', data),
  updateVariationType: (id, data) => api.put(`/admin/variation-types/${id}`, data),
  deleteVariationType: (id) => api.delete(`/admin/variation-types/${id}`),
  toggleVariationTypeStatus: (id) => api.post(`/admin/variation-types/${id}/toggle-status`),
  reorderVariationTypes: (data) => api.post('/admin/variation-types/reorder', data),
  
  // Variation Options (Red, Blue, Small, Large, etc.)
  getVariations: (params) => api.get('/admin/variations', { params }),
  getVariationsByType: (typeSlug) => api.get(`/admin/variations/type/${typeSlug}`),
  createVariation: (data) => api.post('/admin/variations', data),
  updateVariation: (id, data) => api.put(`/admin/variations/${id}`, data),
  deleteVariation: (id) => api.delete(`/admin/variations/${id}`),
  toggleVariationStatus: (id) => api.post(`/admin/variations/${id}/toggle-status`),
  reorderVariations: (data) => api.post('/admin/variations/reorder', data),
    // Payment management
  getPayments: (params) => api.get('/admin/payments', { params }),
  getPendingPayments: () => api.get('/admin/payments/pending-verification'),
  getPaymentStats: () => api.get('/admin/payments/stats'),
  getPayment: (id) => api.get(`/admin/payments/${id}`),
  downloadPaymentSlip: (id) => api.get(`/admin/payments/${id}/slip`, { responseType: 'blob' }),
  verifyPayment: (id, data) => api.post(`/admin/payments/${id}/verify`, data),
  rejectPayment: (id, data) => api.post(`/admin/payments/${id}/reject`, data),
    // Banners
  getBanners: (params) => api.get('/admin/banners', { params }),
  createBanner: (data) => api.post('/admin/banners', data),
  updateBanner: (id, data) => api.put(`/admin/banners/${id}`, data),
  deleteBanner: (id) => api.delete(`/admin/banners/${id}`),
  
  // Coupons
  getCoupons: (params) => api.get('/admin/coupons', { params }),
  createCoupon: (data) => api.post('/admin/coupons', data),
  updateCoupon: (id, data) => api.put(`/admin/coupons/${id}`, data),
  deleteCoupon: (id) => api.delete(`/admin/coupons/${id}`),
};

export default api;
