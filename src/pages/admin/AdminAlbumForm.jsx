import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';

const AdminAlbumForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data for album
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    discount_percentage: 0,
    is_featured: false,
    is_active: true,
    sort_order: 0,
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  // Products in album
  const [albumProducts, setAlbumProducts] = useState([]);
  
  // Product search
  const [productSearch, setProductSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showProductPicker, setShowProductPicker] = useState(false);

  // All products for dropdown (with variants)
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (isEditing) {
      fetchAlbum();
    }
    fetchAllProducts();
  }, [id]);

  const fetchAlbum = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAlbum(id);
      const album = response.data.album;
      
      setFormData({
        name: album.name || '',
        slug: album.slug || '',
        description: album.description || '',
        price: album.price || '',
        discount_percentage: album.discount_percentage || 0,
        is_featured: album.is_featured || false,
        is_active: album.is_active !== false,
        sort_order: album.sort_order || 0,
      });
      
      if (album.cover_image) {
        const imageUrl = album.cover_image.startsWith('http') 
          ? album.cover_image 
          : `${import.meta.env.VITE_API_URL?.replace('/api', '')}/storage/${album.cover_image}`;
        setCoverPreview(imageUrl);
      }
      
      // Set products in album with their pivot data
      if (album.products) {
        setAlbumProducts(album.products.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          final_price: p.final_price,
          image: p.primary_image?.image_path,
          variant_id: p.pivot?.variant_id || null,
          quantity: p.pivot?.quantity || 1,
          sort_order: p.pivot?.sort_order || 0,
          variants: p.variants || [],
        })));
      }
    } catch (err) {
      console.error('Failed to fetch album:', err);
      toast.error('Failed to load album');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await adminAPI.getProducts({ per_page: 100, is_active: true });
      const products = response.data.products?.data || response.data.data || [];
      setAllProducts(products);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const searchProducts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      setSearchLoading(true);
      const response = await adminAPI.getProducts({ search: query, per_page: 20, is_active: true });
      const products = response.data.products?.data || response.data.data || [];
      // Filter out products already in album
      const filteredProducts = products.filter(
        p => !albumProducts.some(ap => ap.id === p.id && !ap.variant_id)
      );
      setSearchResults(filteredProducts);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(productSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [productSearch]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'name' && !isEditing) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const addProductToAlbum = (product) => {
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      final_price: product.final_price,
      image: product.primary_image?.image_path || product.images?.[0]?.image_path,
      variant_id: null,
      quantity: 1,
      sort_order: albumProducts.length,
      variants: product.variants || [],
    };
    
    setAlbumProducts(prev => [...prev, newProduct]);
    setProductSearch('');
    setSearchResults([]);
    setShowProductPicker(false);
  };

  const removeProductFromAlbum = (index) => {
    setAlbumProducts(prev => prev.filter((_, i) => i !== index));
  };

  const updateProductInAlbum = (index, field, value) => {
    setAlbumProducts(prev => prev.map((p, i) => 
      i === index ? { ...p, [field]: value } : p
    ));
  };

  // Calculate total price from products
  const calculateTotalPrice = () => {
    return albumProducts.reduce((sum, p) => {
      const price = parseFloat(p.final_price || p.price || 0);
      return sum + (price * p.quantity);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('slug', formData.slug || generateSlug(formData.name));
      data.append('description', formData.description || '');
      data.append('price', formData.price || '');
      data.append('discount_percentage', formData.discount_percentage || 0);
      data.append('is_featured', formData.is_featured ? '1' : '0');
      data.append('is_active', formData.is_active ? '1' : '0');
      data.append('sort_order', formData.sort_order.toString());

      if (coverImage) {
        data.append('image', coverImage);
      }

      // Add products data as JSON
      const productsData = albumProducts.map((p, index) => ({
        product_id: p.id,
        variant_id: p.variant_id || null,
        quantity: p.quantity,
        sort_order: index,
      }));
      data.append('products', JSON.stringify(productsData));

      let response;
      if (isEditing) {
        data.append('_method', 'PUT');
        response = await adminAPI.updateAlbum(id, data);
      } else {
        response = await adminAPI.createAlbum(data);
      }

      toast.success(isEditing ? 'Album updated successfully' : 'Album created successfully');
      navigate('/admin/albums');
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      toast.error(err.response?.data?.message || 'Failed to save album');
      console.error('Failed to save album:', err);
    } finally {
      setSaving(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${import.meta.env.VITE_API_URL?.replace('/api', '')}/storage/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link to="/admin/albums" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Albums
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Album' : 'Create New Album'}
        </h1>
        <p className="text-gray-500 mt-1">Bundle products together for customers to purchase as a set</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Album Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Album Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="e.g., Summer Essentials Bundle"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.slug ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="summer-essentials-bundle"
                  />
                  {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug[0]}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="Describe what's included in this bundle..."
                  />
                </div>
              </div>
            </div>

            {/* Products in Album */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Products in Bundle</h2>
                <button
                  type="button"
                  onClick={() => setShowProductPicker(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors text-sm"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Product
                </button>
              </div>

              {albumProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <PhotoIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No products added yet</p>
                  <button
                    type="button"
                    onClick={() => setShowProductPicker(true)}
                    className="text-gold-600 hover:text-gold-700 font-medium"
                  >
                    Add your first product
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {albumProducts.map((product, index) => (
                    <div 
                      key={`${product.id}-${index}`}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <PhotoIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                        <p className="text-sm text-gray-500">
                          ₹{parseFloat(product.final_price || product.price || 0).toFixed(2)}
                        </p>
                      </div>

                      {/* Variant Selector */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="w-40">
                          <select
                            value={product.variant_id || ''}
                            onChange={(e) => updateProductInAlbum(index, 'variant_id', e.target.value || null)}
                            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                          >
                            <option value="">Base Product</option>
                            {product.variants.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.variant_name || `Variant ${v.id}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Quantity */}
                      <div className="w-24">
                        <input
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) => updateProductInAlbum(index, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full px-2 py-1.5 text-sm text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        />
                      </div>

                      {/* Subtotal */}
                      <div className="w-24 text-right">
                        <span className="font-medium text-gray-900">
                          ₹{(parseFloat(product.final_price || product.price || 0) * product.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeProductFromAlbum(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-200">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{calculateTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cover Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cover Image</h2>
              {coverPreview ? (
                <div className="relative mb-4">
                  <img
                    src={coverPreview}
                    alt="Cover"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => { setCoverImage(null); setCoverPreview(''); }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <PhotoIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <label className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-center cursor-pointer hover:bg-gray-200 transition-colors">
                Choose Cover
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bundle Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="Leave empty for auto-calculate"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use sum of products (₹{calculateTotalPrice().toFixed(2)})
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.discount_percentage}
                    onChange={(e) => handleChange('discount_percentage', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="0"
                  />
                </div>

                {/* Calculated Prices */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Base Price:</span>
                    <span>₹{(formData.price || calculateTotalPrice()).toFixed(2)}</span>
                  </div>
                  {formData.discount_percentage > 0 && (
                    <>
                      <div className="flex justify-between text-sm text-red-500 mb-1">
                        <span>Discount ({formData.discount_percentage}%):</span>
                        <span>-₹{((formData.price || calculateTotalPrice()) * formData.discount_percentage / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-gray-900">
                        <span>Final Price:</span>
                        <span>₹{((formData.price || calculateTotalPrice()) * (1 - formData.discount_percentage / 100)).toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => handleChange('sort_order', parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-700">Published</p>
                    <p className="text-sm text-gray-500">Make album visible</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('is_active', !formData.is_active)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.is_active ? 'bg-gold-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.is_active ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-700">Featured</p>
                    <p className="text-sm text-gray-500">Show on homepage</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('is_featured', !formData.is_featured)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.is_featured ? 'bg-gold-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.is_featured ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving || albumProducts.length === 0}
                  className="w-full px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving...' : isEditing ? 'Update Album' : 'Create Album'}
                </button>
                {albumProducts.length === 0 && (
                  <p className="text-xs text-center text-red-500">Add at least one product to save</p>
                )}
                <Link
                  to="/admin/albums"
                  className="block w-full px-4 py-2 border border-gray-200 rounded-lg text-center text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Product Picker Modal */}
      {showProductPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Product to Bundle</h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowProductPicker(false);
                    setProductSearch('');
                    setSearchResults([]);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {searchLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500 mx-auto"></div>
                </div>
              ) : productSearch && searchResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No products found for "{productSearch}"
                </div>
              ) : !productSearch && allProducts.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 mb-4">Or select from available products:</p>
                  {allProducts
                    .filter(p => !albumProducts.some(ap => ap.id === p.id))
                    .slice(0, 10)
                    .map(product => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addProductToAlbum(product)}
                        className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 text-left"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {product.primary_image?.image_path ? (
                            <img
                              src={getImageUrl(product.primary_image.image_path)}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <PhotoIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500">₹{parseFloat(product.price || 0).toFixed(2)}</p>
                        </div>
                        <PlusIcon className="h-5 w-5 text-gold-500" />
                      </button>
                    ))}
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map(product => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => addProductToAlbum(product)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 text-left"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {product.primary_image?.image_path ? (
                          <img
                            src={getImageUrl(product.primary_image.image_path)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <PhotoIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-sm text-gray-500">₹{parseFloat(product.price || 0).toFixed(2)}</p>
                      </div>
                      <PlusIcon className="h-5 w-5 text-gold-500" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Start typing to search for products
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAlbumForm;
