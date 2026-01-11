import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon, CheckIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const toast = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  
  // Handle both image formats: primary_image (from API) or images array
  const imageUrl = product.primary_image?.image_path || product.images?.[0]?.image_path || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80';
  const rating = product.average_rating || 4.5;
  const reviewCount = product.reviews_count || 0;
  // API uses sale_price, also handle discount_price for compatibility
  const salePrice = product.sale_price || product.discount_price;
  const originalPrice = parseFloat(product.price);
  const finalPrice = salePrice ? parseFloat(salePrice) : originalPrice;
  const hasDiscount = salePrice && finalPrice < originalPrice;
  const discountPercent = product.discount_percentage || (hasDiscount ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding || added) return;
    
    setIsAdding(true);
    try {
      await addToCart({
        product_id: product.id,
        quantity: 1,
        variant_id: null,
        product: product
      });
      setAdded(true);
      toast.success(`${product.name} added to cart!`);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-white border border-transparent hover:border-gold-500/30 transition-all duration-500">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-luxury-pearl">
        <Link to={`/products/${product.slug}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/20 transition-colors duration-500"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-luxury-black text-white px-3 py-1.5 text-[10px] font-bold tracking-wider">
              -{discountPercent}%
            </span>
          )}
          {product.is_new && (
            <span className="bg-gold-500 text-luxury-black px-3 py-1.5 text-[10px] font-bold tracking-wider">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold-500 group/btn">
          <HeartIcon className="h-5 w-5 text-luxury-black group-hover/btn:text-luxury-black" />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <button 
            onClick={handleQuickAdd}
            disabled={isAdding || product.stock_quantity === 0}
            className={`w-full py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              added 
                ? 'bg-green-600 text-white' 
                : product.stock_quantity === 0 
                  ? 'bg-luxury-silver/50 text-luxury-silver cursor-not-allowed'
                  : 'bg-luxury-black text-white hover:bg-gold-500 hover:text-luxury-black'
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Added!
              </>
            ) : isAdding ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding...
              </>
            ) : (
              <>
                <ShoppingBagIcon className="h-4 w-4" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Quick Add'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-4 text-center">
        {/* Category */}
        <p className="text-[8px] sm:text-[10px] text-gold-600 tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1 sm:mb-2">
          {product.category?.name || 'Collection'}
        </p>

        {/* Product Name */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-serif text-sm sm:text-lg text-luxury-black mb-1 sm:mb-2 group-hover:text-gold-600 transition-colors line-clamp-2 min-h-[36px] sm:min-h-[56px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating - Hidden on mobile for cleaner look */}
        {reviewCount > 0 && (
          <div className="hidden sm:flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating) ? 'text-gold-500' : 'text-luxury-silver/30'
                }`}
              />
            ))}
            <span className="text-xs text-luxury-silver ml-1">({reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-center gap-1 sm:gap-3 flex-wrap">
          <span className="text-sm sm:text-xl font-light text-luxury-black">
            Rs. {finalPrice?.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-[10px] sm:text-sm text-luxury-silver line-through">
              Rs. {originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status - Hidden on mobile */}
        {product.stock_quantity !== undefined && (
          <div className="mt-2 sm:mt-3 hidden sm:block">
            {product.stock_quantity > 0 ? (
              product.stock_quantity < 5 ? (
                <span className="text-[10px] text-gold-600 tracking-wider uppercase">
                  Only {product.stock_quantity} left
                </span>
              ) : null
            ) : (
              <span className="text-[10px] text-luxury-silver tracking-wider uppercase">
                Out of Stock
              </span>
            )}
          </div>
        )}
      </div>

      {/* Gold Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

export default ProductCard;
