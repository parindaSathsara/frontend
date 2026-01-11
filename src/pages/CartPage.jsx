import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon, ArrowLongRightIcon, TruckIcon, ShieldCheckIcon, ArrowLeftIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount, isLoading } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discount;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-white">
        <div className="bg-luxury-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl text-white">Shopping Bag</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-8 border border-luxury-silver/30 flex items-center justify-center">
              <ShoppingBagIcon className="h-12 w-12 text-luxury-silver" />
            </div>
            <h2 className="font-serif text-3xl text-luxury-black mb-4">Your Bag is Empty</h2>
            <p className="text-luxury-silver mb-10 max-w-md mx-auto">
              Looks like you haven't added any items to your bag yet. Start exploring our collections.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-10 py-4 bg-luxury-black text-white text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black transition-all duration-300"
            >
              Continue Shopping
              <ArrowLongRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white">
      <div className="bg-luxury-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Your Selection</span>
          <h1 className="font-serif text-4xl text-white">Shopping Bag</h1>
          <p className="text-luxury-silver mt-2">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:gap-12">
          <div className="lg:flex-1">
            <Link to="/products" className="inline-flex items-center gap-2 text-luxury-silver hover:text-gold-600 text-sm tracking-wider uppercase mb-8 transition-colors">
              <ArrowLeftIcon className="h-4 w-4" />
              Continue Shopping
            </Link>

            <div className="divide-y divide-luxury-silver/20">
              {cartItems.map((item) => {
                // Check if this is an album item
                const isAlbum = item.item_type === 'album' || item.album_id || item.album;
                
                // Handle both server cart and local cart data structures
                const product = item.product || item;
                const album = item.album || item;
                
                // Get display data based on item type
                const displayItem = isAlbum ? album : product;
                const imageUrl = isAlbum 
                  ? (album.cover_image || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80')
                  : (product.primary_image?.image_path || product.primaryImage?.image_path || product.images?.[0]?.image_path || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80');
                const price = parseFloat(item.price || displayItem.final_price || displayItem.sale_price || displayItem.price);
                const itemName = item.name || displayItem.name || (isAlbum ? 'Album' : 'Product');
                const itemSlug = displayItem.slug || item.slug;
                const categoryName = isAlbum 
                  ? 'Product Bundle' 
                  : (product.category?.name || item.category?.name || 'Collection');
                const itemLink = isAlbum ? `/albums/${itemSlug}` : `/products/${itemSlug}`;
                
                return (
                  <div key={item.id} className="py-8 flex gap-6">
                    <Link to={itemLink} className="flex-shrink-0 w-32 h-40 bg-luxury-pearl overflow-hidden">
                      <img src={imageUrl} alt={itemName} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <p className="text-[10px] text-gold-600 tracking-[0.2em] uppercase mb-1">
                          {categoryName}
                        </p>
                        <Link to={itemLink} className="font-serif text-lg text-luxury-black hover:text-gold-600 transition-colors">
                          {itemName}
                        </Link>
                        <div className="mt-3">
                          <span className="text-lg text-luxury-black">Rs. {price.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-luxury-silver/30">
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                            className="w-10 h-10 flex items-center justify-center text-luxury-black hover:bg-luxury-pearl disabled:opacity-50 transition-colors"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center text-sm font-medium border-x border-luxury-silver/30">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="w-10 h-10 flex items-center justify-center text-luxury-black hover:bg-luxury-pearl transition-colors"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-luxury-silver hover:text-red-600 transition-colors">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="hidden sm:block text-right">
                      <p className="text-xs text-luxury-silver tracking-wider uppercase mb-1">Total</p>
                      <p className="text-lg font-medium text-luxury-black">
                        Rs. {(price * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 mt-12 lg:mt-0">
            <div className="sticky top-24 bg-luxury-pearl p-8">
              <h2 className="font-serif text-2xl text-luxury-black mb-6">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-luxury-silver/20">
                <div className="flex justify-between text-luxury-silver">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-2">
                      <TagIcon className="h-4 w-4" />
                      Discount (10%)
                    </span>
                    <span>-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-luxury-silver">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between py-6 border-b border-luxury-silver/20">
                <span className="text-lg font-medium text-luxury-black">Total</span>
                <span className="text-xl font-medium text-luxury-black">Rs. {finalTotal.toLocaleString()}</span>
              </div>

              {/* Promo Code */}
              <div className="py-6 border-b border-luxury-silver/20">
                <label className="block text-xs text-luxury-silver tracking-wider uppercase mb-2">Promo Code</label>
                {promoApplied ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200">
                    <span className="text-green-700 text-sm">WELCOME10 applied</span>
                    <button onClick={() => { setPromoApplied(false); setPromoCode(''); }} className="text-green-700 hover:text-green-900">
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-3 bg-white border border-luxury-silver/30 text-luxury-black placeholder-luxury-silver/50 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                      <button onClick={handleApplyPromo} className="px-6 py-3 border border-luxury-black text-luxury-black text-sm tracking-wider uppercase hover:bg-luxury-black hover:text-white transition-all">
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
                    <p className="text-xs text-luxury-silver mt-2">Try: WELCOME10 for 10% off</p>
                  </>
                )}
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-3 w-full mt-6 py-4 bg-luxury-black text-white text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black transition-all duration-300"
              >
                Proceed to Checkout
                <ArrowLongRightIcon className="h-5 w-5" />
              </Link>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-luxury-silver">
                  <TruckIcon className="h-5 w-5 text-gold-500" />
                  <span className="text-sm">Free shipping on orders over Rs. 10,000</span>
                </div>
                <div className="flex items-center gap-3 text-luxury-silver">
                  <ShieldCheckIcon className="h-5 w-5 text-gold-500" />
                  <span className="text-sm">Secure checkout with SSL encryption</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-luxury-silver/20">
                <p className="text-xs text-luxury-silver text-center mb-3">We Accept</p>
                <div className="flex items-center justify-center gap-4">
                  {['Visa', 'Mastercard', 'UPI', 'PayPal'].map((method) => (
                    <div key={method} className="w-12 h-8 bg-white border border-luxury-silver/30 flex items-center justify-center">
                      <span className="text-[10px] text-luxury-silver">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
