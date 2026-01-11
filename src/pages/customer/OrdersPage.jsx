import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../../services/api';
import {
  ShoppingBagIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const orderStatuses = [
    { value: '', label: 'All Orders' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircleIcon },
    { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: ClockIcon },
    { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: TruckIcon },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircleIcon },
  ];

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = { page: currentPage };
      if (statusFilter) params.status = statusFilter;
      
      const response = await orderAPI.getAll(params);
      setOrders(response.data.data || []);
      setTotalPages(response.data.last_page || 1);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    return orderStatuses.find(s => s.value === status) || orderStatuses[1];
  };

  const formatCurrency = (amount) => {
    return `Rs. ${parseFloat(amount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-LK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredOrders = orders.filter(order => {
    if (!searchQuery) return true;
    return order.order_number.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading && orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-1">Track and manage your orders</p>
        </div>
        
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 w-full md:w-64"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {orderStatuses.map((status) => (
          <button
            key={status.value}
            onClick={() => {
              setStatusFilter(status.value);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              statusFilter === status.value
                ? 'bg-gold-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500 mb-6">
            {statusFilter 
              ? `You don't have any ${statusFilter} orders yet.`
              : "You haven't placed any orders yet."}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon || ClockIcon;
            const itemCount = order.items?.length || 0;
            const firstItem = order.items?.[0];
            const product = firstItem?.product || {};
            const imgPath = product.primary_image?.image_path || product.images?.[0]?.image_path;
            const imgSrc = imgPath 
              ? (imgPath.startsWith('http') ? imgPath : `/storage/${imgPath}`)
              : '/placeholder-product.jpg';

            return (
              <Link
                key={order.id}
                to={`/orders/${order.order_number}`}
                className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={imgSrc}
                        alt={product.name || 'Product'}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
                      />
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{order.order_number}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Placed on {formatDate(order.created_at)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        {itemCount > 1 && firstItem && (
                          <span className="text-gray-400"> • {firstItem.name || product.name} and {itemCount - 1} more</span>
                        )}
                        {itemCount === 1 && firstItem && (
                          <span className="text-gray-400"> • {firstItem.name || product.name}</span>
                        )}
                      </p>
                    </div>

                    {/* Price & Arrow */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                        <p className={`text-xs ${order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {order.payment_status}
                        </p>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Action Bar for Pending Payment */}
                {order.payment_method === 'bank_transfer' && order.payment_status === 'pending' && (
                  <div className="px-4 md:px-6 py-3 bg-yellow-50 border-t border-yellow-100">
                    <p className="text-sm text-yellow-700">
                      <span className="font-medium">Action required:</span> Please upload your payment slip to complete this order
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
