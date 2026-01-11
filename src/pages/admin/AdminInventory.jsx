import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import { formatCurrency } from '../../utils/currency';
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

const AdminInventory = () => {
  const toast = useToast();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [stats, setStats] = useState({ total: 0, lowStock: 0, outOfStock: 0 });

  useEffect(() => {
    fetchInventory();
  }, [page, filter]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const params = { page, search };
      
      let response;
      if (filter === 'low') {
        response = await adminAPI.getInventory({ ...params, low_stock: true });
      } else if (filter === 'out') {
        response = await adminAPI.getInventory({ ...params, out_of_stock: true });
      } else {
        response = await adminAPI.getInventory(params);
      }
      
      const items = response.data.data || [];
      setInventoryItems(items);
      setPagination(response.data);
      
      // Calculate stats from current page (in real app, this should come from backend)
      const lowStockCount = items.filter(i => i.quantity > 0 && i.is_low_stock).length;
      const outOfStockCount = items.filter(i => i.available_quantity <= 0).length;
      setStats({
        total: response.data.total || items.length,
        lowStock: lowStockCount,
        outOfStock: outOfStockCount,
      });
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
      toast.error('Failed to load inventory data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchInventory();
  };

  const handleUpdateStock = async () => {
    if (!editModal || newStock === '') return;
    try {
      await adminAPI.updateInventory(editModal.id, { 
        quantity: parseInt(newStock),
      });
      setEditModal(null);
      setNewStock('');
      toast.success('Stock updated successfully');
      fetchInventory();
    } catch (err) {
      console.error('Failed to update stock:', err);
      toast.error('Failed to update stock');
    }
  };

  const getStockStatus = (item) => {
    const qty = item.available_quantity ?? item.quantity ?? 0;
    const threshold = item.low_stock_threshold ?? 10;
    
    if (qty <= 0) return { label: 'Out of Stock', class: 'bg-red-100 text-red-800' };
    if (qty <= threshold || item.is_low_stock) return { label: 'Low Stock', class: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', class: 'bg-green-100 text-green-800' };
  };

  // Helper to get variant display name
  const getVariantDisplay = (item) => {
    if (!item.variant) return null;
    
    const attrs = item.variant.variation_attributes;
    if (attrs && Object.keys(attrs).length > 0) {
      return Object.values(attrs)
        .map(attr => attr.value_name)
        .filter(Boolean)
        .join(', ');
    }
    
    // Fallback to variant_name
    return item.variant.variant_name || item.variant.sku;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-500 mt-1">Monitor and manage product stock levels</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-700">Low Stock</p>
          </div>
          <p className="text-3xl font-bold text-yellow-800">{stats.lowStock}</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-6">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-700">Out of Stock</p>
          </div>
          <p className="text-3xl font-bold text-red-800">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, SKU, variants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
            >
              Search
            </button>
          </form>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'low', label: 'Low Stock' },
              { value: 'out', label: 'Out of Stock' },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => { setFilter(f.value); setPage(1); }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === f.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
            <button
              onClick={fetchInventory}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              title="Refresh"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Product</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Variant</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">SKU</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Stock</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Reserved</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Available</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500 mx-auto"></div>
                  </td>
                </tr>
              ) : inventoryItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-gray-500">
                    No inventory items found
                  </td>
                </tr>
              ) : (
                inventoryItems.map((item) => {
                  const stockStatus = getStockStatus(item);
                  const variantDisplay = getVariantDisplay(item);
                  const productImage = item.product?.images?.[0]?.image_path || item.variant?.image;
                  const imgSrc = productImage?.startsWith('http') ? productImage : `/storage/${productImage}`;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {productImage ? (
                              <img
                                src={imgSrc}
                                alt={item.product?.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</p>
                            <p className="text-sm text-gray-500">{item.product?.category?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {variantDisplay ? (
                          <div>
                            <p className="text-sm text-gray-900">{variantDisplay}</p>
                            {item.variant?.variation_attributes && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {Object.entries(item.variant.variation_attributes).map(([key, attr]) => (
                                  <span 
                                    key={key}
                                    className="inline-flex items-center text-xs bg-gray-100 rounded px-1.5 py-0.5"
                                  >
                                    {attr.type_name}: {attr.value_name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No variant</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-600 font-mono text-sm">
                          {item.variant?.sku || item.product?.sku || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-lg font-semibold text-gray-900">
                          {item.quantity ?? 0}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-gray-500">
                          {item.reserved_quantity ?? 0}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`text-xl font-bold ${
                          (item.available_quantity ?? item.quantity ?? 0) <= 0 ? 'text-red-600' :
                          item.is_low_stock ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {item.available_quantity ?? item.quantity ?? 0}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${stockStatus.class}`}>
                          {stockStatus.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => { setEditModal(item); setNewStock((item.quantity ?? 0).toString()); }}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                          >
                            Update Stock
                          </button>
                          {item.product?.id && (
                            <Link
                              to={`/admin/products/${item.product.id}`}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                              title="Edit Product"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {pagination.from || 0} to {pagination.to || 0} of {pagination.total || 0} items
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= pagination.last_page}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Update Stock Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Stock</h3>
            <p className="text-gray-600 mb-2">
              Product: <span className="font-medium">{editModal.product?.name}</span>
            </p>
            {getVariantDisplay(editModal) && (
              <p className="text-gray-500 text-sm mb-4">
                Variant: <span className="font-medium">{getVariantDisplay(editModal)}</span>
              </p>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
              <p className="text-2xl font-bold text-gray-900">{editModal.quantity ?? 0}</p>
              {editModal.reserved_quantity > 0 && (
                <p className="text-sm text-yellow-600">
                  {editModal.reserved_quantity} reserved for pending orders
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Stock Quantity</label>
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                min="0"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => { setEditModal(null); setNewStock(''); }}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStock}
                className="flex-1 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
