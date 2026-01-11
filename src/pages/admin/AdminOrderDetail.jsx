import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import {
  ArrowLeftIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  TruckIcon,
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusModal, setStatusModal] = useState(false);
  const [trackingModal, setTrackingModal] = useState(false);
  const [trackingData, setTrackingData] = useState({ tracking_number: '', carrier: '', tracking_url: '' });

  const orderStatuses = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800' },
    { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
    { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-800' },
  ];

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getOrder(id);
      setOrder(response.data.order);
    } catch (err) {
      console.error('Failed to fetch order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await adminAPI.updateOrderStatus(id, { status: newStatus });
      setStatusModal(false);
      fetchOrder();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleAddTracking = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.addOrderTracking(id, trackingData);
      setTrackingModal(false);
      fetchOrder();
    } catch (err) {
      console.error('Failed to add tracking:', err);
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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const found = orderStatuses.find(s => s.value === status);
    return found?.color || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Order not found</p>
        <Link to="/admin/orders" className="text-gold-600 hover:text-gold-700 mt-2 inline-block">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin/orders" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.order_number}</h1>
          <p className="text-gray-500">{formatDate(order.created_at)}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setStatusModal(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Update Status
          </button>
          {order.status === 'processing' && (
            <button
              onClick={() => setTrackingModal(true)}
              className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
            >
              Add Tracking
            </button>
          )}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Order Status</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Payment Status</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 
            order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            {order.payment_status}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Items</p>
          <p className="text-xl font-bold text-gray-900">{order.items?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Total Amount</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(order.total)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items?.map((item) => {
              const imgPath = item.product?.images?.[0]?.image_path;
              const imgSrc = imgPath?.startsWith('http') ? imgPath : `/storage/${imgPath}`;
              return (
              <div key={item.id} className="p-6 flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product?.images?.[0] ? (
                    <img
                      src={imgSrc}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product?.name || 'Product'}</h3>
                  {item.variant_name && (
                    <p className="text-sm text-gray-500">{item.variant_name}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
              );
            })}
          </div>
          
          {/* Order Summary */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{formatCurrency(order.shipping_cost)}</span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-gray-400" />
              Customer
            </h2>
            <div className="space-y-3">
              <p className="font-medium text-gray-900">
                {order.user?.first_name} {order.user?.last_name}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                {order.user?.email}
              </p>
              {order.user?.phone && (
                <p className="text-gray-600 flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  {order.user.phone}
                </p>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
              Shipping Address
            </h2>
            <div className="text-gray-600">
              <p className="font-medium text-gray-900">{order.shipping_first_name} {order.shipping_last_name}</p>
              <p>{order.shipping_address}</p>
              <p>{order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}</p>
              <p>{order.shipping_country}</p>
              {order.shipping_phone && <p className="mt-2">Phone: {order.shipping_phone}</p>}
              {order.shipping_email && <p>Email: {order.shipping_email}</p>}
            </div>
          </div>

          {/* Tracking Info */}
          {order.tracking_number && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TruckIcon className="h-5 w-5 text-gray-400" />
                Tracking
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="text-gray-500">Tracking #:</span> {order.tracking_number}
                </p>
                {order.carrier && (
                  <p className="text-gray-600">
                    <span className="text-gray-500">Carrier:</span> {order.carrier}
                  </p>
                )}
                {order.tracking_url && (
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:text-gold-700 text-sm"
                  >
                    Track Package →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCardIcon className="h-5 w-5 text-gray-400" />
              Payment
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="text-gray-500">Method:</span> {order.payment_method || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="text-gray-500">Status:</span>{' '}
                <span className={order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                  {order.payment_status}
                </span>
              </p>
            </div>
          </div>

          {/* Admin Notes */}
          {order.admin_notes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h2>
              <p className="text-gray-600">{order.admin_notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {statusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Order Status</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {orderStatuses.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleStatusUpdate(s.value)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    order.status === s.value
                      ? 'border-gold-500 bg-gold-50 text-gold-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStatusModal(false)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {trackingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Tracking Information</h3>
            <form onSubmit={handleAddTracking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number *</label>
                <input
                  type="text"
                  value={trackingData.tracking_number}
                  onChange={(e) => setTrackingData(prev => ({ ...prev, tracking_number: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                <input
                  type="text"
                  value={trackingData.carrier}
                  onChange={(e) => setTrackingData(prev => ({ ...prev, carrier: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="e.g., BlueDart, Delhivery"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking URL</label>
                <input
                  type="url"
                  value={trackingData.tracking_url}
                  onChange={(e) => setTrackingData(prev => ({ ...prev, tracking_url: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="https://"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setTrackingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
                >
                  Add Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetail;
