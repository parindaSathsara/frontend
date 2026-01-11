import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { orderAPI, cartAPI } from '../services/api';
import { useQuery } from 'react-query';
import {
  ShoppingBagIcon,
  TruckIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  ChevronLeftIcon,
  DocumentArrowUpIcon,
  InformationCircleIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartCount, clearCart, isLoading: cartLoading } = useCart();
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();

  // Form states
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  
  // Shipping form
  const [shippingForm, setShippingForm] = useState({
    first_name: user?.name?.split(' ')[0] || '',
    last_name: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Sri Lanka',
  });

  // Billing form
  const [billingForm, setBillingForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Sri Lanka',
  });

  const [notes, setNotes] = useState('');
  const [bankReference, setBankReference] = useState('');

  // Bank details for transfer
  const bankDetails = {
    bank_name: 'Bank of Ceylon',
    account_number: '0012345678901',
    account_name: 'SH Womens Fashion (Pvt) Ltd',
    branch: 'Colombo Main Branch',
    branch_code: '001',
    swift_code: 'BABORLKX',
  };

  // Fetch cart from server if authenticated
  const { data: serverCart } = useQuery(
    'cart',
    () => cartAPI.get().then(res => res.data.cart || res.data),
    {
      enabled: isAuthenticated(),
    }
  );

  const cart = isAuthenticated() ? serverCart : { items: cartItems, total: cartTotal };
  const displayItems = cart?.items || [];
  const displayTotal = cart?.total || cartTotal;
  const shippingCost = displayTotal >= 10000 ? 0 : 350;
  const finalTotal = displayTotal + shippingCost;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.warning('Please login to continue checkout');
      navigate('/login?redirect=/checkout');
    }
  }, [isAuthenticated, navigate, toast]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && (!displayItems || displayItems.length === 0) && !orderPlaced) {
      toast.info('Your cart is empty');
      navigate('/cart');
    }
  }, [displayItems, cartLoading, navigate, toast, orderPlaced]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingForm(prev => ({ ...prev, [name]: value }));
  };

  const validateShipping = () => {
    const required = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state', 'postal_code'];
    for (const field of required) {
      if (!shippingForm[field]?.trim()) {
        toast.error(`Please fill in ${field.replace('_', ' ')}`);
        return false;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingForm.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateBilling = () => {
    if (sameAsBilling) return true;
    
    const required = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state', 'postal_code'];
    for (const field of required) {
      if (!billingForm[field]?.trim()) {
        toast.error(`Please fill in billing ${field.replace('_', ' ')}`);
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateShipping()) return;
      setStep(2);
    } else if (step === 2) {
      if (!paymentMethod) {
        toast.error('Please select a payment method');
        return;
      }
      if (!validateBilling()) return;
      setStep(3);
    }
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    const billing = sameAsBilling ? shippingForm : billingForm;

    const orderData = {
      shipping_first_name: shippingForm.first_name,
      shipping_last_name: shippingForm.last_name,
      shipping_email: shippingForm.email,
      shipping_phone: shippingForm.phone,
      shipping_address: shippingForm.address,
      shipping_city: shippingForm.city,
      shipping_state: shippingForm.state,
      shipping_postal_code: shippingForm.postal_code,
      shipping_country: shippingForm.country,
      billing_first_name: billing.first_name,
      billing_last_name: billing.last_name,
      billing_email: billing.email,
      billing_phone: billing.phone,
      billing_address: billing.address,
      billing_city: billing.city,
      billing_state: billing.state,
      billing_postal_code: billing.postal_code,
      billing_country: billing.country,
      payment_method: paymentMethod,
      bank_reference: bankReference,
      notes: notes,
    };

    try {
      const response = await orderAPI.create(orderData);
      const order = response.data.order;
      
      setOrderPlaced(order);
      toast.success('Order placed successfully!');
      
      // Clear cart will be handled by backend, but clear local state
      if (clearCart) clearCart();
      
    } catch (error) {
      console.error('Order error:', error);
      const message = error.response?.data?.message || 'Failed to place order. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-luxury-white">
        <div className="bg-luxury-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CheckCircleSolid className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="font-serif text-4xl text-white">Order Confirmed</h1>
            <p className="text-gold-500 mt-2">Thank you for your order!</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border border-luxury-silver/20 p-8">
            <div className="text-center mb-8">
              <p className="text-luxury-silver mb-2">Order Number</p>
              <p className="text-2xl font-serif text-luxury-black">{orderPlaced.order_number}</p>
            </div>

            {paymentMethod === 'bank_transfer' && (
              <div className="bg-gold-50 border border-gold-200 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <InformationCircleIcon className="h-6 w-6 text-gold-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-luxury-black mb-1">Payment Required</h3>
                    <p className="text-sm text-luxury-charcoal">
                      Please complete your bank transfer and upload the payment slip to process your order.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-luxury-black mb-3">Bank Details</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(bankDetails).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-luxury-silver capitalize">{key.replace('_', ' ')}:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-luxury-black">{value}</span>
                          <button
                            onClick={() => copyToClipboard(value, key.replace('_', ' '))}
                            className="text-gold-600 hover:text-gold-700"
                          >
                            <ClipboardDocumentIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-luxury-charcoal mb-3">
                    Use <span className="font-semibold">{orderPlaced.order_number}</span> as your payment reference
                  </p>
                  <Link
                    to={`/orders/${orderPlaced.order_number}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-luxury-black text-sm font-semibold tracking-wider uppercase hover:bg-gold-600 transition-colors"
                  >
                    <DocumentArrowUpIcon className="h-5 w-5" />
                    Upload Payment Slip
                  </Link>
                </div>
              </div>
            )}

            <div className="border-t border-luxury-silver/20 pt-6">
              <h4 className="font-semibold text-luxury-black mb-4">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-luxury-silver">Subtotal</span>
                  <span>Rs. {parseFloat(orderPlaced.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-silver">Shipping</span>
                  <span>{parseFloat(orderPlaced.shipping) > 0 ? `Rs. ${parseFloat(orderPlaced.shipping).toLocaleString()}` : 'Free'}</span>
                </div>
                {parseFloat(orderPlaced.discount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-Rs. {parseFloat(orderPlaced.discount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-luxury-silver/20">
                  <span>Total</span>
                  <span>Rs. {parseFloat(orderPlaced.total).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`/orders/${orderPlaced.order_number}`}
                className="px-8 py-3 bg-luxury-black text-white text-sm tracking-wider uppercase text-center hover:bg-luxury-charcoal transition-colors"
              >
                View Order
              </Link>
              <Link
                to="/products"
                className="px-8 py-3 border border-luxury-black text-luxury-black text-sm tracking-wider uppercase text-center hover:bg-luxury-black hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (cartLoading) {
    return (
      <div className="min-h-screen bg-luxury-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Header */}
      <div className="bg-luxury-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/cart" className="flex items-center gap-2 text-luxury-silver hover:text-gold-500 transition-colors">
              <ChevronLeftIcon className="h-5 w-5" />
              <span className="text-sm tracking-wider uppercase">Back to Cart</span>
            </Link>
            <h1 className="font-serif text-3xl text-white">Checkout</h1>
            <div className="w-24"></div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8 gap-4">
            {[
              { num: 1, label: 'Shipping', icon: TruckIcon },
              { num: 2, label: 'Payment', icon: CreditCardIcon },
              { num: 3, label: 'Review', icon: CheckCircleIcon },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div className={`flex items-center gap-2 ${step >= s.num ? 'text-gold-500' : 'text-luxury-silver/50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step > s.num ? 'bg-gold-500 border-gold-500' :
                    step === s.num ? 'border-gold-500' : 'border-luxury-silver/30'
                  }`}>
                    {step > s.num ? (
                      <CheckCircleSolid className="h-6 w-6 text-luxury-black" />
                    ) : (
                      <s.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="hidden sm:block text-sm tracking-wider uppercase">{s.label}</span>
                </div>
                {i < 2 && (
                  <div className={`w-12 sm:w-24 h-0.5 ${step > s.num ? 'bg-gold-500' : 'bg-luxury-silver/30'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:gap-12">
          {/* Main Form Area */}
          <div className="lg:flex-1">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white border border-luxury-silver/20 p-6 sm:p-8">
                <h2 className="font-serif text-2xl text-luxury-black mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-luxury-charcoal mb-2">First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={shippingForm.first_name}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-charcoal mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={shippingForm.last_name}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-charcoal mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingForm.email}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-charcoal mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingForm.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-luxury-charcoal mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingForm.address}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-charcoal mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingForm.city}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-charcoal mb-2">State/Province *</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingForm.state}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      placeholder="State or Province"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-charcoal mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postal_code"
                      value={shippingForm.postal_code}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                      placeholder="Postal code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-luxury-charcoal mb-2">Country *</label>
                    <select
                      name="country"
                      value={shippingForm.country}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white"
                    >
                      <option value="Sri Lanka">Sri Lanka</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-luxury-black text-white text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white border border-luxury-silver/20 p-6 sm:p-8">
                <h2 className="font-serif text-2xl text-luxury-black mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  {/* Bank Transfer Option */}
                  <label
                    className={`block p-4 border-2 cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-gold-500 bg-gold-50'
                        : 'border-luxury-silver/30 hover:border-gold-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="payment_method"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 accent-gold-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <BuildingLibraryIcon className="h-5 w-5 text-gold-600" />
                          <span className="font-semibold text-luxury-black">Bank Transfer</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Recommended</span>
                        </div>
                        <p className="text-sm text-luxury-silver">
                          Make a direct bank transfer. Your order will be processed once payment is verified.
                        </p>
                      </div>
                    </div>

                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-4 ml-8 p-4 bg-white border border-luxury-silver/20 rounded">
                        <h4 className="font-semibold text-luxury-black mb-3 text-sm">Bank Account Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-luxury-silver">Bank Name:</span>
                            <p className="font-medium">{bankDetails.bank_name}</p>
                          </div>
                          <div>
                            <span className="text-luxury-silver">Account Number:</span>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{bankDetails.account_number}</p>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(bankDetails.account_number, 'Account number')}
                                className="text-gold-600 hover:text-gold-700"
                              >
                                <ClipboardDocumentIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <span className="text-luxury-silver">Account Name:</span>
                            <p className="font-medium">{bankDetails.account_name}</p>
                          </div>
                          <div>
                            <span className="text-luxury-silver">Branch:</span>
                            <p className="font-medium">{bankDetails.branch}</p>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                          <p className="text-blue-800">
                            <strong>Important:</strong> Please use your Order Number as the payment reference when making the transfer.
                          </p>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Card Payment Option */}
                  <label
                    className={`block p-4 border-2 cursor-not-allowed opacity-60 ${
                      paymentMethod === 'card'
                        ? 'border-gold-500 bg-gold-50'
                        : 'border-luxury-silver/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="payment_method"
                        value="card"
                        disabled
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCardIcon className="h-5 w-5 text-luxury-silver" />
                          <span className="font-semibold text-luxury-charcoal">Credit/Debit Card</span>
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Coming Soon</span>
                        </div>
                        <p className="text-sm text-luxury-silver">
                          Pay securely with Visa, Mastercard, or other cards. This option will be available soon.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* COD Option */}
                  <label
                    className={`block p-4 border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-gold-500 bg-gold-50'
                        : 'border-luxury-silver/30 hover:border-gold-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 accent-gold-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <BanknotesIcon className="h-5 w-5 text-gold-600" />
                          <span className="font-semibold text-luxury-black">Cash on Delivery</span>
                        </div>
                        <p className="text-sm text-luxury-silver">
                          Pay with cash when your order is delivered. Available for orders within Colombo.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Billing Address */}
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="sameAsBilling"
                      checked={sameAsBilling}
                      onChange={(e) => setSameAsBilling(e.target.checked)}
                      className="accent-gold-500 h-4 w-4"
                    />
                    <label htmlFor="sameAsBilling" className="text-sm text-luxury-charcoal">
                      Billing address same as shipping address
                    </label>
                  </div>

                  {!sameAsBilling && (
                    <div className="border border-luxury-silver/20 p-4 mt-4">
                      <h3 className="font-semibold text-luxury-black mb-4">Billing Address</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-luxury-charcoal mb-2">First Name *</label>
                          <input
                            type="text"
                            name="first_name"
                            value={billingForm.first_name}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-luxury-charcoal mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="last_name"
                            value={billingForm.last_name}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-luxury-charcoal mb-2">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={billingForm.email}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-luxury-charcoal mb-2">Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={billingForm.phone}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm text-luxury-charcoal mb-2">Address *</label>
                          <input
                            type="text"
                            name="address"
                            value={billingForm.address}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-luxury-charcoal mb-2">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={billingForm.city}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-luxury-charcoal mb-2">State/Province *</label>
                          <input
                            type="text"
                            name="state"
                            value={billingForm.state}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-luxury-charcoal mb-2">Postal Code *</label>
                          <input
                            type="text"
                            name="postal_code"
                            value={billingForm.postal_code}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-luxury-charcoal mb-2">Country *</label>
                          <select
                            name="country"
                            value={billingForm.country}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white"
                          >
                            <option value="Sri Lanka">Sri Lanka</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-luxury-black text-luxury-black text-sm tracking-wider uppercase hover:bg-luxury-black hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-luxury-black text-white text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-white border border-luxury-silver/20 p-6 sm:p-8">
                <h2 className="font-serif text-2xl text-luxury-black mb-6">Review Your Order</h2>
                
                {/* Shipping Info Summary */}
                <div className="mb-6 pb-6 border-b border-luxury-silver/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-luxury-black">Shipping Address</h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-gold-600 hover:text-gold-700"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-luxury-charcoal">
                    {shippingForm.first_name} {shippingForm.last_name}<br />
                    {shippingForm.address}<br />
                    {shippingForm.city}, {shippingForm.state} {shippingForm.postal_code}<br />
                    {shippingForm.country}<br />
                    {shippingForm.phone}
                  </p>
                </div>

                {/* Payment Info Summary */}
                <div className="mb-6 pb-6 border-b border-luxury-silver/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-luxury-black">Payment Method</h3>
                    <button
                      onClick={() => setStep(2)}
                      className="text-sm text-gold-600 hover:text-gold-700"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {paymentMethod === 'bank_transfer' && <BuildingLibraryIcon className="h-5 w-5 text-gold-600" />}
                    {paymentMethod === 'cod' && <BanknotesIcon className="h-5 w-5 text-gold-600" />}
                    <span className="text-luxury-charcoal">
                      {paymentMethod === 'bank_transfer' && 'Bank Transfer'}
                      {paymentMethod === 'cod' && 'Cash on Delivery'}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-luxury-black mb-4">Order Items ({displayItems.length})</h3>
                  <div className="space-y-4">
                    {displayItems.map((item) => {
                      const product = item.product || item;
                      const imageUrl = product.primary_image?.image_path || product.primaryImage?.image_path || item.primary_image?.image_path || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&q=80';
                      const itemName = item.name || product.name || 'Product';
                      const itemPrice = parseFloat(item.price || product.sale_price || product.price || 0);
                      
                      return (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={imageUrl}
                            alt={itemName}
                            className="w-16 h-20 object-cover bg-luxury-pearl"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-luxury-black">{itemName}</p>
                            <p className="text-sm text-luxury-silver">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-luxury-black">
                            Rs. {(itemPrice * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Notes */}
                <div className="mb-6">
                  <label className="block text-sm text-luxury-charcoal mb-2">Order Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Any special instructions for your order..."
                    className="w-full px-4 py-3 border border-luxury-silver/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-luxury-black text-luxury-black text-sm tracking-wider uppercase hover:bg-luxury-black hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gold-500 text-luxury-black text-sm tracking-wider uppercase font-semibold hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <LockClosedIcon className="h-5 w-5" />
                        Place Order - Rs. {finalTotal.toLocaleString()}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96 mt-8 lg:mt-0">
            <div className="bg-white border border-luxury-silver/20 p-6 sticky top-24">
              <h3 className="font-serif text-xl text-luxury-black mb-6">Order Summary</h3>

              {/* Items Preview */}
              <div className="max-h-64 overflow-y-auto mb-6 space-y-3">
                {displayItems.map((item) => {
                  const product = item.product || item;
                  const imageUrl = product.primary_image?.image_path || product.primaryImage?.image_path || item.primary_image?.image_path || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&q=80';
                  const itemName = item.name || product.name || 'Product';
                  const itemPrice = parseFloat(item.price || product.sale_price || product.price || 0);
                  
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={itemName}
                          className="w-14 h-16 object-cover bg-luxury-pearl"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-luxury-black text-white text-xs flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-luxury-black truncate">{itemName}</p>
                        <p className="text-sm text-luxury-silver">Rs. {itemPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-luxury-silver/20 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-silver">Subtotal</span>
                  <span>Rs. {displayTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-silver">Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                    {shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-gold-600">
                    Add Rs. {(10000 - displayTotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-lg font-semibold border-t border-luxury-silver/20 pt-3">
                  <span>Total</span>
                  <span>Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center gap-2 text-sm text-luxury-silver">
                <LockClosedIcon className="h-4 w-4" />
                <span>Secure SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
