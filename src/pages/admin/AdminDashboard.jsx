import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import {
  CurrencyRupeeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboard();
      setStats(response.data.stats);
      setRecentOrders(response.data.recent_orders || []);
      setLowStock(response.data.low_stock || []);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
        <button onClick={fetchDashboardData} className="ml-4 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats?.sales?.total)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CurrencyRupeeIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {stats?.sales?.growth_percentage >= 0 ? (
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={stats?.sales?.growth_percentage >= 0 ? 'text-green-600' : 'text-red-600'}>
              {Math.abs(stats?.sales?.growth_percentage || 0)}%
            </span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.orders?.total || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-yellow-600">{stats?.orders?.pending || 0} Pending</span>
            <span className="text-purple-600">{stats?.orders?.processing || 0} Processing</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.customers?.total || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span className="text-green-600">+{stats?.customers?.new_this_month || 0}</span> new this month
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.products?.active || 0}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CubeIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            {stats?.products?.low_stock > 0 && (
              <span className="text-yellow-600">{stats.products.low_stock} Low Stock</span>
            )}
            {stats?.products?.out_of_stock > 0 && (
              <span className="text-red-600">{stats.products.out_of_stock} Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl p-6 text-white">
          <p className="text-gold-100 text-sm font-medium">Today's Sales</p>
          <p className="text-3xl font-bold mt-2">{formatCurrency(stats?.sales?.today)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <p className="text-blue-100 text-sm font-medium">This Month</p>
          <p className="text-3xl font-bold mt-2">{formatCurrency(stats?.sales?.this_month)}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 text-white">
          <p className="text-gray-300 text-sm font-medium">Last Month</p>
          <p className="text-3xl font-bold mt-2">{formatCurrency(stats?.sales?.last_month)}</p>
        </div>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-gold-600 hover:text-gold-700 text-sm font-medium">
                View All →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No recent orders</div>
            ) : (
              recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">#{order.order_number}</p>
                      <p className="text-sm text-gray-500">{order.user?.first_name} {order.user?.last_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(order.created_at)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                Low Stock Alert
              </h2>
              <Link to="/admin/inventory" className="text-gold-600 hover:text-gold-700 text-sm font-medium">
                Manage Inventory →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {lowStock.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <CheckCircleIcon className="h-12 w-12 mx-auto text-green-500 mb-2" />
                All products are well stocked!
              </div>
            ) : (
              lowStock.slice(0, 5).map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.product?.name}</p>
                      {item.variant && (
                        <p className="text-sm text-gray-500">
                          {item.variant.color && `${item.variant.color}`}
                          {item.variant.size && ` - ${item.variant.size}`}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${item.available_quantity === 0 ? 'text-red-600' : 'text-yellow-600'}`}>
                        {item.available_quantity} left
                      </p>
                      <p className="text-xs text-gray-500">Threshold: {item.threshold}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products/create"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gold-50 hover:border-gold-200 border border-transparent transition-colors"
          >
            <CubeIcon className="h-8 w-8 text-gold-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-colors"
          >
            <ShoppingBagIcon className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">View Orders</span>
          </Link>
          <Link
            to="/admin/customers"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-colors"
          >
            <UsersIcon className="h-8 w-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Customers</span>
          </Link>
          <Link
            to="/admin/inventory"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-colors"
          >
            <TruckIcon className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Inventory</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
