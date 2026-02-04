import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const toast = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle both image formats: primary_image (from API) or images array
  const primaryImage = product.primary_image?.image_path || product.images?.[0]?.image_path || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80';
  // Second image for hover effect (if available)
  const secondaryImage = product.images?.[1]?.image_path || product.images?.[1]?.url || null;
  
  // API uses sale_price, also handle discount_price for compatibility
  const salePrice = product.sale_price || product.discount_price;
  const originalPrice = parseFloat(product.price);
  const finalPrice = salePrice ? parseFloat(salePrice) : originalPrice;
  const hasDiscount = salePrice && finalPrice < originalPrice;

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

  // List View Layout - Horizontal compact card
  if (viewMode === 'list') {
    return (
      <div 
        className="group flex gap-4 bg-white border border-gray-100 hover:border-gray-200 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image - Small square */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden bg-[#f8f5f0]">
          <Link to={`/products/${product.slug}`}>
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 py-3 pr-4 flex flex-col justify-center min-w-0">
          <Link to={`/products/${product.slug}`}>
            <h3 className="text-sm text-gray-800 hover:text-gray-500 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>
          
          {/* Short description if available */}
          {product.short_description && (
            <p className="text-xs text-gray-400 line-clamp-1 mb-2 hidden sm:block">
              {product.short_description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            {hasDiscount ? (
              <>
                <span className="text-sm font-medium text-gray-800">
                  Rs {finalPrice?.toLocaleString()}.00
                </span>
                <span className="text-xs text-gray-400 line-through">
                  Rs {originalPrice?.toLocaleString()}.00
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-600">
                Rs {finalPrice?.toLocaleString()}.00
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button 
            onClick={handleQuickAdd}
            disabled={isAdding || product.stock_quantity === 0}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-[10px] font-medium tracking-wider uppercase transition-all w-fit ${
              added 
                ? 'bg-green-600 text-white' 
                : product.stock_quantity === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="h-3 w-3" />
                Added
              </>
            ) : isAdding ? (
              <>
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding...
              </>
            ) : (
              <>
                <ShoppingBagIcon className="h-3 w-3" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Grid View Layout (Default)
  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-[#f8f5f0] mb-4">
        <Link to={`/products/${product.slug}`}>
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              secondaryImage && isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Secondary Image (on hover) */}
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} - alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </Link>
        
        {/* Quick Add Button - appears on hover */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <button 
            onClick={handleQuickAdd}
            disabled={isAdding || product.stock_quantity === 0}
            className={`w-full py-3 text-[11px] font-medium tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              added 
                ? 'bg-green-600 text-white' 
                : product.stock_quantity === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white/95 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Added to Cart
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

      {/* Product Info - Clean & Minimal */}
      <div className="text-center">
        {/* Product Name */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-[13px] sm:text-sm text-gray-800 mb-2 hover:text-gray-500 transition-colors line-clamp-2 leading-relaxed tracking-wide">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-[13px] sm:text-sm text-gray-800">
                Rs {finalPrice?.toLocaleString()}.00 LKR
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                Rs {originalPrice?.toLocaleString()}.00
              </span>
            </>
          ) : (
            <span className="text-[13px] sm:text-sm text-gray-600">
              Rs {finalPrice?.toLocaleString()}.00 LKR
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
