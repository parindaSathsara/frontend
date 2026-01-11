import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { 
  HeartIcon, 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon,
  MinusIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { data: product, isLoading, error } = useQuery(
    ['product', slug],
    () => productAPI.getBySlug(slug).then(res => res.data.product || res.data),
    { enabled: !!slug }
  );

  // Extract available variation types and options from variants
  const variationData = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) {
      return { types: [], optionsByType: {} };
    }

    const typesMap = new Map();
    const optionsByType = {};

    product.variants.forEach(variant => {
      if (!variant.is_active) return;
      
      // Check variation_options or variation_attributes
      const options = variant.variation_options || [];
      const attributes = variant.variation_attributes || {};

      // Handle variation_options format
      options.forEach(opt => {
        if (opt.variation_type) {
          const typeSlug = opt.variation_type.slug;
          const typeName = opt.variation_type.name;
          
          if (!typesMap.has(typeSlug)) {
            typesMap.set(typeSlug, { slug: typeSlug, name: typeName, displayOrder: opt.variation_type.display_order || 0 });
          }
          
          if (!optionsByType[typeSlug]) {
            optionsByType[typeSlug] = new Map();
          }
          optionsByType[typeSlug].set(opt.id, { id: opt.id, name: opt.name, value: opt.value });
        }
      });

      // Handle variation_attributes format (fallback)
      Object.entries(attributes).forEach(([typeSlug, attr]) => {
        if (!typesMap.has(typeSlug)) {
          typesMap.set(typeSlug, { slug: typeSlug, name: attr.type_name, displayOrder: 0 });
        }
        
        if (!optionsByType[typeSlug]) {
          optionsByType[typeSlug] = new Map();
        }
        // For attributes, we use value_name as ID since we don't have option ID
        optionsByType[typeSlug].set(attr.value_name, { id: attr.value_name, name: attr.value_name, value: attr.value_data });
      });
    });

    // Convert maps to arrays
    const types = Array.from(typesMap.values()).sort((a, b) => a.displayOrder - b.displayOrder);
    const optionsArrayByType = {};
    Object.entries(optionsByType).forEach(([typeSlug, optMap]) => {
      optionsArrayByType[typeSlug] = Array.from(optMap.values());
    });

    return { types, optionsByType: optionsArrayByType };
  }, [product]);

  // Find the selected variant based on selected options
  const selectedVariant = useMemo(() => {
    if (!product?.variants || Object.keys(selectedOptions).length === 0) {
      return null;
    }

    return product.variants.find(variant => {
      if (!variant.is_active) return false;
      
      const variantOptions = variant.variation_options || [];
      const variantAttrs = variant.variation_attributes || {};

      // Check if all selected options match this variant
      return Object.entries(selectedOptions).every(([typeSlug, selectedValue]) => {
        // Check in variation_options
        const matchInOptions = variantOptions.some(opt => 
          opt.variation_type?.slug === typeSlug && (opt.id === selectedValue || opt.name === selectedValue)
        );
        
        // Check in variation_attributes
        const matchInAttrs = variantAttrs[typeSlug]?.value_name === selectedValue;
        
        return matchInOptions || matchInAttrs;
      });
    });
  }, [product, selectedOptions]);

  // Calculate final price
  const priceInfo = useMemo(() => {
    const basePrice = parseFloat(product?.price || 0);
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : null;
    const baseFinalPrice = salePrice || basePrice;
    
    let finalPrice = baseFinalPrice;
    if (selectedVariant?.price_adjustment) {
      finalPrice = baseFinalPrice + parseFloat(selectedVariant.price_adjustment);
    }

    const hasDiscount = salePrice && salePrice < basePrice;
    const discountPercent = product?.discount_percentage || (hasDiscount ? Math.round(((basePrice - baseFinalPrice) / basePrice) * 100) : 0);

    return { basePrice, finalPrice, hasDiscount, discountPercent };
  }, [product, selectedVariant]);

  // Check stock availability
  const stockInfo = useMemo(() => {
    if (selectedVariant) {
      const qty = selectedVariant.inventory?.available_quantity ?? selectedVariant.inventory?.quantity ?? 0;
      return { inStock: qty > 0, quantity: qty };
    }
    const qty = product?.inventory?.available_quantity ?? product?.inventory?.quantity ?? 0;
    return { inStock: qty > 0 || !product?.inventory, quantity: qty };
  }, [product, selectedVariant]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="aspect-[3/4] bg-luxury-pearl animate-pulse"></div>
            <div className="mt-8 lg:mt-0 space-y-6">
              <div className="h-4 bg-luxury-pearl w-24 animate-pulse"></div>
              <div className="h-10 bg-luxury-pearl w-3/4 animate-pulse"></div>
              <div className="h-6 bg-luxury-pearl w-1/4 animate-pulse"></div>
              <div className="h-32 bg-luxury-pearl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-luxury-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-luxury-black mb-4">Product Not Found</h2>
          <Link to="/products" className="text-gold-600 hover:text-gold-700">Back to Products</Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length > 0 
    ? product.images 
    : product.primary_image 
      ? [product.primary_image] 
      : [{ image_path: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' }];

  const handleOptionSelect = (typeSlug, optionValue) => {
    setSelectedOptions(prev => ({
      ...prev,
      [typeSlug]: optionValue
    }));
  };

  const handleAddToCart = async () => {
    // Validate that required options are selected
    if (variationData.types.length > 0 && Object.keys(selectedOptions).length < variationData.types.length) {
      toast.error('Please select all options before adding to cart');
      return;
    }

    if (!stockInfo.inStock) {
      toast.error('This item is currently out of stock');
      return;
    }

    try {
      await addToCart({ 
        product_id: product.id, 
        quantity, 
        variant_id: selectedVariant?.id || null,
        product: product
      });
      setAddedToCart(true);
      toast.success(`${product.name} added to cart!`);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  // Check if all options are selected
  const allOptionsSelected = variationData.types.length === 0 || 
    Object.keys(selectedOptions).length >= variationData.types.length;

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Breadcrumb */}
      <div className="bg-luxury-pearl/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-luxury-silver hover:text-gold-600 transition-colors">Home</Link>
            <span className="text-luxury-silver">/</span>
            <Link to="/products" className="text-luxury-silver hover:text-gold-600 transition-colors">Products</Link>
            <span className="text-luxury-silver">/</span>
            {product.category && (
              <>
                <Link to={`/products?category=${product.category.slug}`} className="text-luxury-silver hover:text-gold-600 transition-colors">
                  {product.category.name}
                </Link>
                <span className="text-luxury-silver">/</span>
              </>
            )}
            <span className="text-luxury-black truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative aspect-[3/4] bg-luxury-pearl overflow-hidden group">
              <img
                src={images[selectedImage]?.image_path || images[selectedImage]?.url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {priceInfo.hasDiscount && (
                <span className="absolute top-6 left-6 bg-luxury-black text-white px-4 py-2 text-xs font-bold tracking-wider">
                  -{priceInfo.discountPercent}% OFF
                </span>
              )}
              {images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-500">
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-500">
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-24 overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-gold-500' : 'border-transparent hover:border-luxury-silver/50'
                    }`}
                  >
                    <img src={img.image_path || img.url} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            <p className="text-gold-600 text-xs tracking-[0.3em] uppercase mb-3">{product.category?.name || 'Collection'}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-black mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarSolid key={i} className={`h-4 w-4 ${i < Math.floor(product.average_rating || 4.5) ? 'text-gold-500' : 'text-luxury-silver/30'}`} />
                ))}
              </div>
              <span className="text-sm text-luxury-silver">{(product.average_rating || 4.5).toFixed(1)} ({product.review_count || 0} reviews)</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-serif text-3xl text-luxury-black">Rs. {priceInfo.finalPrice.toLocaleString()}</span>
              {priceInfo.hasDiscount && (
                <>
                  <span className="text-xl text-luxury-silver line-through">Rs. {priceInfo.basePrice.toLocaleString()}</span>
                  <span className="text-gold-600 text-sm font-medium">Save Rs. {(priceInfo.basePrice - priceInfo.finalPrice).toLocaleString()}</span>
                </>
              )}
            </div>

            <p className="text-luxury-charcoal leading-relaxed mb-8">{product.description || product.short_description}</p>

            <div className="w-full h-[1px] bg-gradient-to-r from-gold-500 via-luxury-silver/20 to-transparent mb-8"></div>

            {/* Dynamic Variation Options */}
            {variationData.types.map(type => (
              <div key={type.slug} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-luxury-silver">
                    Select {type.name}
                    {selectedOptions[type.slug] && (
                      <span className="ml-2 text-gold-600 normal-case tracking-normal">
                        : {variationData.optionsByType[type.slug]?.find(o => o.id === selectedOptions[type.slug] || o.name === selectedOptions[type.slug])?.name}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {variationData.optionsByType[type.slug]?.map((option) => {
                    const isSelected = selectedOptions[type.slug] === option.id || selectedOptions[type.slug] === option.name;
                    const optionValue = typeof option.id === 'number' ? option.id : option.name;
                    
                    // Check if this option has color value (for color swatches)
                    const isColorType = type.slug === 'color' || type.name.toLowerCase().includes('color');
                    const colorValue = option.value || option.name;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(type.slug, optionValue)}
                        className={`flex items-center justify-center border text-sm font-medium transition-all ${
                          isColorType ? 'w-10 h-10 rounded-full' : 'min-w-14 h-14 px-4'
                        } ${
                          isSelected 
                            ? 'border-luxury-black bg-luxury-black text-white ring-2 ring-gold-500 ring-offset-2' 
                            : 'border-luxury-silver/30 hover:border-gold-500'
                        }`}
                        style={isColorType ? { backgroundColor: colorValue } : {}}
                        title={option.name}
                      >
                        {!isColorType && option.name}
                        {isColorType && isSelected && <CheckIcon className="h-5 w-5 text-white drop-shadow-md" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-xs tracking-[0.2em] uppercase text-luxury-silver mb-3 block">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-luxury-silver/30">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-luxury-pearl transition-colors">
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(stockInfo.quantity || 99, quantity + 1))} className="w-12 h-12 flex items-center justify-center hover:bg-luxury-pearl transition-colors">
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <span className={`text-sm ${stockInfo.inStock ? 'text-luxury-silver' : 'text-red-600'}`}>
                  {stockInfo.inStock 
                    ? `${stockInfo.quantity > 0 ? stockInfo.quantity + ' in stock' : 'In Stock'}` 
                    : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Validation Message */}
            {!allOptionsSelected && variationData.types.length > 0 && (
              <div className="mb-4 flex items-center gap-2 text-amber-600 text-sm">
                <ExclamationCircleIcon className="h-5 w-5" />
                <span>Please select {variationData.types.filter(t => !selectedOptions[t.slug]).map(t => t.name.toLowerCase()).join(', ')} to continue</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart || !stockInfo.inStock || !allOptionsSelected}
                className={`flex-1 py-4 flex items-center justify-center gap-3 text-sm tracking-wider uppercase transition-all duration-300 ${
                  addedToCart 
                    ? 'bg-green-600 text-white' 
                    : !stockInfo.inStock 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : !allOptionsSelected
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-luxury-black text-white hover:bg-gold-500 hover:text-luxury-black'
                }`}
              >
                {addedToCart 
                  ? (<><CheckIcon className="h-5 w-5" />Added to Bag</>) 
                  : !stockInfo.inStock 
                    ? 'Out of Stock'
                    : (<><ShoppingBagIcon className="h-5 w-5" />Add to Bag</>)}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 flex items-center justify-center border transition-all ${
                  isWishlisted ? 'border-gold-500 bg-gold-500 text-luxury-black' : 'border-luxury-silver/30 hover:border-gold-500'
                }`}
              >
                {isWishlisted ? <HeartSolid className="h-6 w-6" /> : <HeartIcon className="h-6 w-6" />}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-luxury-pearl/50">
                <TruckIcon className="h-6 w-6 mx-auto text-gold-600 mb-2" />
                <p className="text-xs text-luxury-charcoal">Free Shipping</p>
                <p className="text-[10px] text-luxury-silver">Orders over Rs. 10,000</p>
              </div>
              <div className="text-center p-4 bg-luxury-pearl/50">
                <ArrowPathIcon className="h-6 w-6 mx-auto text-gold-600 mb-2" />
                <p className="text-xs text-luxury-charcoal">Easy Returns</p>
                <p className="text-[10px] text-luxury-silver">15 days return</p>
              </div>
              <div className="text-center p-4 bg-luxury-pearl/50">
                <ShieldCheckIcon className="h-6 w-6 mx-auto text-gold-600 mb-2" />
                <p className="text-xs text-luxury-charcoal">Authentic</p>
                <p className="text-[10px] text-luxury-silver">100% genuine</p>
              </div>
            </div>

            <p className="text-sm text-luxury-silver">
              SKU: <span className="text-luxury-charcoal">{selectedVariant?.sku || product.sku || 'N/A'}</span>
            </p>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-20 border-t border-luxury-silver/20 pt-12">
          <h3 className="font-serif text-2xl text-luxury-black mb-8">Product Details</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-sm tracking-[0.2em] uppercase text-gold-600 mb-4">Description</h4>
              <p className="text-luxury-charcoal leading-relaxed">{product.description}</p>
              <ul className="mt-6 space-y-2 text-luxury-charcoal">
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-gold-500" />Premium quality material</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-gold-500" />Handcrafted with care</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-gold-500" />Traditional artisan techniques</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-gold-500" />Perfect for special occasions</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm tracking-[0.2em] uppercase text-gold-600 mb-4">Care Instructions</h4>
              <ul className="space-y-3 text-luxury-charcoal">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-luxury-pearl flex items-center justify-center text-xs">1</span>
                  Dry clean recommended for best results
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-luxury-pearl flex items-center justify-center text-xs">2</span>
                  Store in a cool, dry place away from moisture
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-luxury-pearl flex items-center justify-center text-xs">3</span>
                  Keep away from direct sunlight to preserve colors
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-luxury-pearl flex items-center justify-center text-xs">4</span>
                  Handle with care to maintain embroidery and embellishments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
