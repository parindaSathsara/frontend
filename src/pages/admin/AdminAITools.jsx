import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import {
  SparklesIcon,
  TrashIcon,
  ArrowPathIcon,
  EyeIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const AdminAITools = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Image tag removal state
  const [scanning, setScanning] = useState(false);
  const [affectedProducts, setAffectedProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stripAllHtml, setStripAllHtml] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [scanned, setScanned] = useState(false);

  // AI generator state
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('professional');
  const [generating, setGenerating] = useState(false);
  const [generatedProduct, setGeneratedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [copied, setCopied] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await adminAPI.getCategories({ per_page: 100 });
      setCategories(res.data.data || res.data || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  // === Image Tag Removal Functions ===
  const handleScan = async () => {
    try {
      setScanning(true);
      const res = await adminAPI.previewImageTags();
      setAffectedProducts(res.data.products || []);
      setSelectedProducts(res.data.products?.map(p => p.id) || []);
      setScanned(true);
      if (res.data.total_affected === 0) {
        toast.success('No products contain image tags!');
      }
    } catch (err) {
      toast.error('Failed to scan products');
    } finally {
      setScanning(false);
    }
  };

  const handleToggleProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === affectedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(affectedProducts.map(p => p.id));
    }
  };

  const handleClean = async () => {
    if (selectedProducts.length === 0) {
      toast.error('Select at least one product to clean');
      return;
    }
    try {
      setCleaning(true);
      const res = await adminAPI.stripImageTags({
        product_ids: selectedProducts,
        strip_all_html: stripAllHtml,
      });
      toast.success(res.data.message);
      // Re-scan to update the list
      await handleScan();
    } catch (err) {
      toast.error('Failed to clean product descriptions');
    } finally {
      setCleaning(false);
    }
  };

  // === AI Generator Functions ===
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error('Please enter your OpenAI API key');
      return;
    }
    if (!prompt.trim()) {
      toast.error('Please describe the product you want to generate');
      return;
    }

    try {
      setGenerating(true);
      setGeneratedProduct(null);
      const res = await adminAPI.generateProduct({
        api_key: apiKey,
        prompt: prompt,
        category: category,
        style: style,
      });
      setGeneratedProduct(res.data.product);
      toast.success('Product details generated!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to generate product';
      toast.error(msg);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyField = (field, value) => {
    navigator.clipboard.writeText(String(value));
    setCopied(prev => ({ ...prev, [field]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [field]: false })), 2000);
  };

  const handleUseGenerated = () => {
    if (!generatedProduct) return;
    // Navigate to create product form with generated data in state
    navigate('/admin/products/create', {
      state: { generatedProduct: generatedProduct }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <SparklesIcon className="h-8 w-8 text-gold-500" />
          AI Tools
        </h1>
        <p className="text-gray-500 mt-1">Clean up product data and generate product listings with AI</p>
      </div>

      {/* ============ SECTION 1: Image Tag Removal ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-50 rounded-lg">
            <TrashIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Image Tag Removal</h2>
            <p className="text-sm text-gray-500">
              Scan and remove invalid &lt;img&gt; HTML tags from product descriptions
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={handleScan}
            disabled={scanning}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {scanning ? (
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <EyeIcon className="h-5 w-5 mr-2" />
            )}
            {scanning ? 'Scanning...' : 'Scan Products'}
          </button>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={stripAllHtml}
              onChange={(e) => setStripAllHtml(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
            />
            <span className="text-sm text-gray-700">Strip ALL HTML tags (not just images)</span>
          </label>
        </div>

        {scanned && affectedProducts.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">
                  {affectedProducts.length} product(s) with image tags found
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-gold-600 hover:text-gold-700"
                >
                  {selectedProducts.length === affectedProducts.length ? 'Deselect All' : 'Select All'}
                </button>
                <button
                  onClick={handleClean}
                  disabled={cleaning || selectedProducts.length === 0}
                  className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {cleaning ? (
                    <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <TrashIcon className="h-4 w-4 mr-2" />
                  )}
                  {cleaning ? 'Cleaning...' : `Clean ${selectedProducts.length} Product(s)`}
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {affectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleToggleProduct(product.id)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    <div className="flex gap-2 mt-1">
                      {product.description_has_img && (
                        <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">Description</span>
                      )}
                      {product.short_description_has_img && (
                        <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded">Short Desc</span>
                      )}
                    </div>
                    {product.description_preview && (
                      <p className="text-xs text-gray-500 mt-1 truncate">{product.description_preview}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {scanned && affectedProducts.length === 0 && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-700">All product descriptions are clean — no image tags found!</span>
          </div>
        )}
      </div>

      {/* ============ SECTION 2: AI Product Generator ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-50 rounded-lg">
            <SparklesIcon className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Product Generator</h2>
            <p className="text-sm text-gray-500">
              Generate product names, descriptions, pricing, and SEO details using ChatGPT
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="mt-6 space-y-5">
          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OpenAI API Key *</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="sk-..."
            />
            <p className="text-xs text-gray-400 mt-1">Your API key is sent directly to OpenAI and is not stored</p>
          </div>

          {/* Product Description Prompt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Describe the Product *</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. Gold plated necklace with emerald stones, elegant design suitable for weddings, medium weight..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Hint */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (optional)</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Auto-detect</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Writing Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Writing Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="professional">Professional</option>
                <option value="luxury">Luxury & Elegant</option>
                <option value="casual">Casual & Friendly</option>
                <option value="minimal">Minimal & Clean</option>
                <option value="detailed">Detailed & Technical</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={generating}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {generating ? (
              <>
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5 mr-2" />
                Generate Product Details
              </>
            )}
          </button>
        </form>

        {/* Generated Result */}
        {generatedProduct && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Product Details</h3>
              <button
                onClick={handleUseGenerated}
                className="inline-flex items-center px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
              >
                Use & Create Product
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <GeneratedField
                label="Product Name"
                value={generatedProduct.name}
                field="name"
                copied={copied}
                onCopy={handleCopyField}
              />

              {/* Short Description */}
              <GeneratedField
                label="Short Description"
                value={generatedProduct.short_description}
                field="short_description"
                copied={copied}
                onCopy={handleCopyField}
              />

              {/* Full Description */}
              <GeneratedField
                label="Full Description"
                value={generatedProduct.description}
                field="description"
                copied={copied}
                onCopy={handleCopyField}
                multiline
              />

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <GeneratedField
                  label="Price (LKR)"
                  value={generatedProduct.price}
                  field="price"
                  copied={copied}
                  onCopy={handleCopyField}
                />
                {generatedProduct.sale_price && (
                  <GeneratedField
                    label="Sale Price (LKR)"
                    value={generatedProduct.sale_price}
                    field="sale_price"
                    copied={copied}
                    onCopy={handleCopyField}
                  />
                )}
              </div>

              {/* SEO */}
              <GeneratedField
                label="Meta Title"
                value={generatedProduct.meta_title}
                field="meta_title"
                copied={copied}
                onCopy={handleCopyField}
              />
              <GeneratedField
                label="Meta Description"
                value={generatedProduct.meta_description}
                field="meta_description"
                copied={copied}
                onCopy={handleCopyField}
              />

              {/* Suggested Category */}
              {generatedProduct.suggested_category && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Suggested Category:</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {generatedProduct.suggested_category}
                  </span>
                </div>
              )}

              {/* Tags */}
              {generatedProduct.suggested_tags?.length > 0 && (
                <div>
                  <span className="text-sm text-gray-500 block mb-1">Suggested Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {generatedProduct.suggested_tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable field display component
const GeneratedField = ({ label, value, field, copied, onCopy, multiline = false }) => {
  if (!value && value !== 0) return null;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
      <div className="flex items-start gap-2">
        <div className={`flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 ${
          multiline ? 'whitespace-pre-wrap' : ''
        }`}>
          {String(value)}
        </div>
        <button
          onClick={() => onCopy(field, value)}
          className="p-2 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
          title="Copy to clipboard"
        >
          {copied[field] ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ClipboardDocumentIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminAITools;
