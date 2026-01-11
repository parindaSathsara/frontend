import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wishlistAPI } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/Toast';
import {
  HeartIcon,
  TrashIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);
  
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await wishlistAPI.get();
      // Handle different response structures
      const items = response.data.data || response.data.wishlist || response.data || [];
      setWishlistItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
      setError('Failed to load wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);
      await wishlistAPI.remove(productId);
      setWishlistItems(prev => prev.filter(item => {
        const itemProductId = item.product_id || item.product?.id || item.id;
        return itemProductId !== productId;
      }));
      toast.success('Removed from wishlist');
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
      toast.error('Failed to remove item');
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (item) => {
    const product = item.product || item;
    const productId = product.id;
    
    try {
      setAddingToCartId(productId);
      await addToCart({
        item_type: 'product',
        product_id: productId,
        quantity: 1
      });
      toast.success('Added to cart!');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCartId(null);
    }
  };

  const formatCurrency = (amount) => {
    return `Rs. ${parseFloat(amount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <HeartSolidIcon className="h-8 w-8 text-red-500" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-500">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Save items you love by clicking the heart icon on products
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {wishlistItems.map((item) => {
            const product = item.product || item;
            const productId = item.product_id || product.id;
            const imgPath = product.primary_image?.image_path || product.images?.[0]?.image_path;
            const imgSrc = imgPath 
              ? (imgPath.startsWith('http') ? imgPath : `/storage/${imgPath}`)
              : '/placeholder-product.jpg';
            const hasDiscount = product.sale_price && parseFloat(product.sale_price) < parseFloat(product.price);
            const price = hasDiscount ? product.sale_price : product.price;
            const originalPrice = hasDiscount ? product.price : null;
            const discountPercentage = hasDiscount 
              ? Math.round((1 - parseFloat(product.sale_price) / parseFloat(product.price)) * 100)
              : 0;

            return (
              <div
                key={item.id || productId}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <Link to={`/products/${product.slug}`}>
                    <img
                      src={imgSrc}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
                    />
                  </Link>
                  
                  {/* Discount Badge */}
                  {hasDiscount && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{discountPercentage}%
                    </span>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(productId)}
                    disabled={removingId === productId}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors disabled:opacity-50"
                    title="Remove from wishlist"
                  >
                    {removingId === productId ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-500"></div>
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
                    )}
                  </button>
                </div>

                {/* Details */}
                <div className="p-4">
                  <Link to={`/products/${product.slug}`}>
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-gold-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {product.category && (
                    <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
                  )}

                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-semibold text-gray-900">{formatCurrency(price)}</span>
                    {originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{formatCurrency(originalPrice)}</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={addingToCartId === productId || !product.is_active}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingToCartId === productId ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingBagIcon className="h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Continue Shopping */}
      {wishlistItems.length > 0 && (
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="text-gold-600 hover:text-gold-700 font-medium"
          >
            ← Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
