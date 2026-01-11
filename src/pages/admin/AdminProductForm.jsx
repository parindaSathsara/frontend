import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import {
  ArrowLeftIcon,
  PhotoIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [variationTypes, setVariationTypes] = useState([]);
  const [variationOptions, setVariationOptions] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    description: '',
    short_description: '',
    price: '',
    sale_price: '',
    cost_price: '',
    sku: '',
    is_featured: false,
    is_trending: false,
    is_active: true,
    meta_title: '',
    meta_description: '',
    stock_quantity: '0',
    low_stock_threshold: '10',
  });

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchInitialData();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchInitialData = async () => {
    try {
      const [catRes, typesRes, varRes] = await Promise.all([
        adminAPI.getCategories({ per_page: 100 }),
        adminAPI.getVariationTypes(),
        adminAPI.getVariations(),
      ]);
      setCategories(catRes.data.data || catRes.data || []);
      
      // Set variation types
      const types = typesRes.data || [];
      setVariationTypes(types.filter(t => t.is_active));
      
      // Set grouped variation options
      setVariationOptions(varRes.data.grouped || {});
    } catch (err) {
      console.error('Failed to fetch initial data:', err);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getProduct(id);
      const product = response.data.product;
      
      setFormData({
        category_id: product.category_id || '',
        name: product.name || '',
        description: product.description || '',
        short_description: product.short_description || '',
        price: product.price || '',
        sale_price: product.sale_price || '',
        cost_price: product.cost_price || '',
        sku: product.sku || '',
        is_featured: product.is_featured || false,
        is_trending: product.is_trending || false,
        is_active: product.is_active ?? true,
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
        stock_quantity: product.inventory?.quantity || '0',
        low_stock_threshold: product.inventory?.low_stock_threshold || '10',
      });
      
      setImages(product.images || []);
      
      // Parse variants with their variation options
      const parsedVariants = (product.variants || []).map(v => {
        // Build selectedOptions from variation_options
        const selectedOptions = {};
        if (v.variation_options) {
          v.variation_options.forEach(opt => {
            if (opt.variation_type) {
              selectedOptions[opt.variation_type.slug] = opt.id;
            }
          });
        }
        return {
          ...v,
          selectedOptions,
          stock_quantity: v.inventory?.quantity || 0,
          isNew: false,
        };
      });
      setVariants(parsedVariants);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isNew: true,
    }));
    setNewImages(prev => [...prev, ...newImagePreviews]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = async (imageId) => {
    if (!isEdit) return;
    try {
      await adminAPI.deleteProductImage(id, imageId);
      setImages(prev => prev.filter(img => img.id !== imageId));
      toast.success('Image deleted');
    } catch (err) {
      console.error('Failed to delete image:', err);
      toast.error('Failed to delete image');
    }
  };

  const handleAddVariant = () => {
    setVariants(prev => [...prev, {
      id: `new-${Date.now()}`,
      selectedOptions: {},
      price_adjustment: '0',
      sku: '',
      stock_quantity: '0',
      is_active: true,
      isNew: true,
    }]);
  };

  const handleVariantOptionChange = (index, typeSlug, optionId) => {
    setVariants(prev => prev.map((v, i) => {
      if (i !== index) return v;
      return {
        ...v,
        selectedOptions: {
          ...v.selectedOptions,
          [typeSlug]: optionId ? parseInt(optionId) : null,
        }
      };
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setVariants(prev => prev.map((v, i) => 
      i === index ? { ...v, [field]: value } : v
    ));
  };

  const handleRemoveVariant = async (index) => {
    const variant = variants[index];
    if (!variant.isNew && isEdit) {
      try {
        await adminAPI.deleteProductVariant(id, variant.id);
        toast.success('Variant deleted');
      } catch (err) {
        console.error('Failed to delete variant:', err);
        toast.error('Failed to delete variant');
        return;
      }
    }
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Product name is required';
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    
    // Validate variants - at least one option should be selected
    variants.forEach((variant, index) => {
      const hasAnyOption = Object.values(variant.selectedOptions || {}).some(v => v);
      if (!hasAnyOption && variants.length > 1) {
        newErrors[`variant_${index}`] = 'Select at least one variation option';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      setSaving(true);
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
        cost_price: formData.cost_price ? parseFloat(formData.cost_price) : null,
        stock_quantity: parseInt(formData.stock_quantity),
        low_stock_threshold: parseInt(formData.low_stock_threshold),
      };

      let productId = id;

      if (isEdit) {
        await adminAPI.updateProduct(id, productData);
      } else {
        const response = await adminAPI.createProduct(productData);
        productId = response.data.product.id;
      }

      // Upload new images
      if (newImages.length > 0) {
        const imageFormData = new FormData();
        newImages.forEach((img) => {
          imageFormData.append('images[]', img.file);
        });
        await adminAPI.uploadProductImages(productId, imageFormData);
      }

      // Handle variants
      for (const variant of variants) {
        // Build variation_option_ids array from selectedOptions
        const variation_option_ids = Object.values(variant.selectedOptions || {})
          .filter(id => id !== null && id !== undefined && id !== '');
        
        const variantData = {
          variation_option_ids,
          price_adjustment: parseFloat(variant.price_adjustment) || 0,
          sku: variant.sku || null,
          is_active: variant.is_active,
          stock_quantity: parseInt(variant.stock_quantity) || 0,
        };

        if (variant.isNew) {
          if (variation_option_ids.length > 0) {
            await adminAPI.addProductVariant(productId, variantData);
          }
        } else {
          await adminAPI.updateProductVariant(productId, variant.id, variantData);
        }
      }

      toast.success(isEdit ? 'Product updated successfully!' : 'Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to save product:', err);
      
      let errorMessage = 'Failed to save product. Please try again.';
      if (err.response?.data?.message) {
        const msg = err.response.data.message;
        if (msg.includes('SQLSTATE')) {
          if (msg.includes('Duplicate entry')) {
            errorMessage = 'This item already exists. Please check for duplicates.';
          } else {
            errorMessage = 'A database error occurred. Please check your input.';
          }
        } else {
          errorMessage = msg;
        }
      }
      
      toast.error(errorMessage);
      
      if (err.response?.data?.errors) {
        const formattedErrors = {};
        Object.entries(err.response.data.errors).forEach(([key, value]) => {
          formattedErrors[key] = Array.isArray(value) ? value[0] : value;
        });
        setErrors(formattedErrors);
      }
    } finally {
      setSaving(false);
    }
  };

  // Get variant display name
  const getVariantDisplayName = (variant) => {
    const names = [];
    Object.entries(variant.selectedOptions || {}).forEach(([typeSlug, optionId]) => {
      if (optionId && variationOptions[typeSlug]) {
        const option = variationOptions[typeSlug].options?.find(o => o.id === optionId);
        if (option) names.push(option.name);
      }
    });
    return names.length > 0 ? names.join(' / ') : `Variant ${variants.indexOf(variant) + 1}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/admin/products" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {errors.general}
          </div>
        )}
        
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                  errors.category_id ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Product SKU"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                name="short_description"
                value={formData.short_description}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Brief description for product listings"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Detailed product description"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (Rs.) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (Rs.)</label>
              <input
                type="number"
                name="sale_price"
                value={formData.sale_price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (Rs.)</label>
              <input
                type="number"
                name="cost_price"
                value={formData.cost_price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory (Base Product)</h2>
          <p className="text-sm text-gray-500 mb-4">Stock for the main product. Each variant can have its own stock.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
              <input
                type="number"
                name="low_stock_threshold"
                value={formData.low_stock_threshold}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <p className="text-sm text-gray-500 mt-1">Alert when stock falls below this number</p>
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image.image_path?.startsWith('http') ? image.image_path : `/storage/${image.image_path}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(image.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
                {image.is_primary && (
                  <span className="absolute bottom-2 left-2 px-2 py-1 bg-gold-500 text-white text-xs rounded">Primary</span>
                )}
              </div>
            ))}

            {newImages.map((image, index) => (
              <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={image.preview} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
                <span className="absolute bottom-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">New</span>
              </div>
            ))}

            <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gold-500 hover:bg-gold-50 transition-colors">
              <PhotoIcon className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">Add Image</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Product Variants - Dynamic */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Product Variants</h2>
              <p className="text-sm text-gray-500">Add variants for different {variationTypes.map(t => t.name.toLowerCase()).join(', ')}</p>
            </div>
            <button
              type="button"
              onClick={handleAddVariant}
              className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Variant
            </button>
          </div>

          {variants.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No variants added. Click "Add Variant" to create variants with different options.
            </p>
          ) : (
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-700">{getVariantDisplayName(variant)}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {errors[`variant_${index}`] && (
                    <p className="text-red-500 text-sm mb-3">{errors[`variant_${index}`]}</p>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {/* Dynamic variation type dropdowns */}
                    {variationTypes.map(type => (
                      <div key={type.id}>
                        <label className="block text-sm text-gray-600 mb-1">{type.name}</label>
                        <select
                          value={variant.selectedOptions?.[type.slug] || ''}
                          onChange={(e) => handleVariantOptionChange(index, type.slug, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                        >
                          <option value="">Select {type.name}</option>
                          {variationOptions[type.slug]?.options?.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Price Adj. (Rs.)</label>
                      <input
                        type="number"
                        value={variant.price_adjustment || '0'}
                        onChange={(e) => handleVariantChange(index, 'price_adjustment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Variant SKU</label>
                      <input
                        type="text"
                        value={variant.sku || ''}
                        onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="SKU"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Stock Qty</label>
                      <input
                        type="number"
                        value={variant.stock_quantity || '0'}
                        onChange={(e) => handleVariantChange(index, 'stock_quantity', e.target.value)}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={variant.is_active}
                          onChange={(e) => handleVariantChange(index, 'is_active', e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Active</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Status</h2>
          
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
              />
              <span className="ml-2 text-gray-700">Active (visible on store)</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
              />
              <span className="ml-2 text-gray-700">Featured Product</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_trending"
                checked={formData.is_trending}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
              />
              <span className="ml-2 text-gray-700">Trending Product</span>
            </label>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="SEO title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="SEO description"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link
            to="/admin/products"
            className="px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
