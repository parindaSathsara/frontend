import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI, paymentAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import {
  ArrowLeftIcon,
  TruckIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  DocumentArrowUpIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

const OrderDetailPage = () => {
  const { orderNumber } = useParams();
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingSlip, setUploadingSlip] = useState(false);
  const [slipFile, setSlipFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const orderStatuses = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircleIcon },
    { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: ClockIcon },
    { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: TruckIcon },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircleIcon },
    { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-800', icon: XCircleIcon },
  ];

  const bankDetails = {
    bank_name: 'Bank of Ceylon',
    account_number: '0012345678901',
    account_name: 'SH Womens Fashion (Pvt) Ltd',
    branch: 'Colombo Main Branch',
  };

  useEffect(() => {
    fetchOrder();
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderAPI.getByNumber(orderNumber);
      setOrder(response.data.order);
    } catch (err) {
      console.error('Failed to fetch order:', err);
      setError(err.response?.data?.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleSlipUpload = async (e) => {
    e.preventDefault();
    if (!slipFile) {
      toast.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('payment_slip', slipFile);

    try {
      setUploadingSlip(true);
      await paymentAPI.uploadSlip(orderNumber, formData);
      toast.success('Payment slip uploaded successfully! We will verify it shortly.');
      setShowUploadModal(false);
      setSlipFile(null);
      fetchOrder();
    } catch (err) {
      console.error('Failed to upload slip:', err);
      toast.error(err.response?.data?.message || 'Failed to upload payment slip');
    } finally {
      setUploadingSlip(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const formatCurrency = (amount) => {
    return `Rs. ${parseFloat(amount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-LK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusInfo = (status) => {
    return orderStatuses.find(s => s.value === status) || orderStatuses[0];
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Progress steps for order tracking
  const getProgressSteps = () => {
    const steps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(order?.status);
    
    if (order?.status === 'cancelled' || order?.status === 'refunded') {
      return { steps, currentIndex: -1, isCancelled: true };
    }
    
    return { steps, currentIndex, isCancelled: false };
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <XCircleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <Link to="/orders" className="text-gold-600 hover:text-gold-700">
            ← Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;
  const { steps, currentIndex, isCancelled } = getProgressSteps();
  const needsPaymentSlip = order.payment_method === 'bank_transfer' && 
                           order.payment_status === 'pending' && 
                           !order.payments?.some(p => p.payment_slip);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/orders" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to My Orders
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order {order.order_number}</h1>
            <p className="text-gray-500 mt-1">Placed on {formatDate(order.created_at)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
              <StatusIcon className="h-4 w-4 mr-1" />
              {statusInfo.label}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.payment_status)}`}>
              <CreditCardIcon className="h-4 w-4 mr-1" />
              {order.payment_status}
            </span>
          </div>
        </div>
      </div>

      {/* Bank Transfer Payment Reminder */}
      {needsPaymentSlip && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Action Required: Upload Payment Slip</h3>
          <p className="text-yellow-700 mb-4">
            Please complete your bank transfer and upload your payment slip to confirm your order.
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-3">Bank Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-xs text-gray-500">Bank</span>
                  <p className="font-medium">{bankDetails.bank_name}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-xs text-gray-500">Account Number</span>
                  <p className="font-medium font-mono">{bankDetails.account_number}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.account_number, 'Account number')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded md:col-span-2">
                <div>
                  <span className="text-xs text-gray-500">Account Name</span>
                  <p className="font-medium">{bankDetails.account_name}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.account_name, 'Account name')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Amount to transfer: <span className="font-semibold text-gray-900">{formatCurrency(order.total)}</span>
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
          >
            <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
            Upload Payment Slip
          </button>
        </div>
      )}

      {/* Order Progress */}
      {!isCancelled && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Progress</h2>
          <div className="relative">
            <div className="flex justify-between">
              {steps.map((step, index) => {
                const stepStatus = orderStatuses.find(s => s.value === step);
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;
                
                return (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="h-6 w-6" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span className={`mt-2 text-xs md:text-sm text-center ${
                      isCurrent ? 'font-semibold text-gray-900' : 'text-gray-500'
                    }`}>
                      {stepStatus?.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Progress bar */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10 mx-8">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${Math.max(0, (currentIndex / (steps.length - 1)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Cancelled/Refunded Banner */}
      {isCancelled && (
        <div className={`rounded-xl p-6 mb-6 ${order.status === 'cancelled' ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <XCircleIcon className={`h-8 w-8 ${order.status === 'cancelled' ? 'text-red-500' : 'text-gray-500'}`} />
            <div>
              <h3 className={`font-semibold ${order.status === 'cancelled' ? 'text-red-800' : 'text-gray-800'}`}>
                Order {order.status === 'cancelled' ? 'Cancelled' : 'Refunded'}
              </h3>
              <p className={`text-sm ${order.status === 'cancelled' ? 'text-red-600' : 'text-gray-600'}`}>
                {order.status === 'cancelled' 
                  ? 'This order has been cancelled.' 
                  : 'This order has been refunded.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Order Items ({order.items?.length || 0})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items?.map((item) => {
                const product = item.product || {};
                const imgPath = product.primary_image?.image_path || product.images?.[0]?.image_path;
                const imgSrc = imgPath 
                  ? (imgPath.startsWith('http') ? imgPath : `/storage/${imgPath}`)
                  : '/placeholder-product.jpg';
                
                return (
                  <div key={item.id} className="p-6 flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={imgSrc}
                        alt={product.name || 'Product'}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name || product.name}</h3>
                      {item.variant_name && (
                        <p className="text-sm text-gray-500">{item.variant_name}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
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
                  <span>{order.shipping_cost > 0 ? formatCurrency(order.shipping_cost) : 'Free'}</span>
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div className="text-gray-600 text-sm space-y-1">
              <p className="font-medium text-gray-900">
                {order.shipping_first_name} {order.shipping_last_name}
              </p>
              <p>{order.shipping_address}</p>
              <p>
                {order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}
              </p>
              <p>{order.shipping_country}</p>
              {order.shipping_phone && (
                <p className="mt-2">Phone: {order.shipping_phone}</p>
              )}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="text-gray-900 capitalize">
                  {order.payment_method === 'bank_transfer' ? 'Bank Transfer' : 
                   order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`capitalize ${order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.payment_status}
                </span>
              </div>
              {order.payments?.length > 0 && order.payments[0].payment_slip && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-green-600 flex items-center gap-1">
                    <CheckCircleIcon className="h-4 w-4" />
                    Payment slip uploaded
                  </p>
                  {order.payments[0].verified_at && (
                    <p className="text-green-600 text-xs mt-1">Verified on {formatDate(order.payments[0].verified_at)}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tracking Info */}
          {order.tracking_number && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tracking Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking #</span>
                  <span className="text-gray-900 font-mono">{order.tracking_number}</span>
                </div>
                {order.carrier && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Carrier</span>
                    <span className="text-gray-900">{order.carrier}</span>
                  </div>
                )}
                {order.tracking_url && (
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Track Package →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Order Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Notes</h2>
              <p className="text-gray-600 text-sm">{order.notes}</p>
            </div>
          )}

          {/* Need Help */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you have any questions about your order, please contact us.
            </p>
            <Link
              to="/contact"
              className="text-gold-600 hover:text-gold-700 text-sm font-medium"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>

      {/* Upload Payment Slip Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Payment Slip</h3>
            <form onSubmit={handleSlipUpload}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Payment Slip Image
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setSlipFile(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: JPG, PNG, PDF (max 5MB)
                </p>
              </div>
              
              {slipFile && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Selected: <span className="font-medium">{slipFile.name}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {(slipFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setSlipFile(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!slipFile || uploadingSlip}
                  className="flex-1 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingSlip ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
