import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { albumAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  CheckIcon,
  TagIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeartIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const AlbumDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useToast();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    fetchAlbum();
  }, [slug]);

  const fetchAlbum = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await albumAPI.getBySlug(slug);
      setAlbum(response.data.album);
    } catch (err) {
      console.error('Failed to fetch album:', err);
      setError('Album not found or unavailable.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate pricing
  const pricing = useMemo(() => {
    if (!album) return { calculated: 0, final: 0, savings: 0 };
    
    const calculatedPrice = album.products?.reduce((sum, product) => {
      const qty = product.pivot?.quantity || 1;
      const price = parseFloat(product.final_price || product.price || 0);
      return sum + (price * qty);
    }, 0) || 0;

    const basePrice = album.price ? parseFloat(album.price) : calculatedPrice;
    const discount = parseFloat(album.discount_percentage || 0);
    const finalPrice = basePrice * (1 - discount / 100);
    const savings = calculatedPrice - finalPrice;

    return {
      calculated: calculatedPrice,
      base: basePrice,
      final: finalPrice,
      savings: savings > 0 ? savings : 0,
      discount,
    };
  }, [album]);

  // Check if album is in stock
  const isInStock = useMemo(() => {
    if (!album?.products) return false;
    // For now, assume in stock. In real app, check inventory
    return true;
  }, [album]);

  // Get all product images for gallery
  const allImages = useMemo(() => {
    const images = [];
    if (album?.cover_image) {
      images.push({ src: getImageUrl(album.cover_image), alt: album.name });
    }
    album?.products?.forEach(product => {
      if (product.primary_image?.image_path) {
        images.push({ 
          src: getImageUrl(product.primary_image.image_path), 
          alt: product.name,
          productId: product.id 
        });
      }
      product.images?.forEach(img => {
        if (img.image_path && img.image_path !== product.primary_image?.image_path) {
          images.push({ 
            src: getImageUrl(img.image_path), 
            alt: product.name,
            productId: product.id 
          });
        }
      });
    });
    return images.length > 0 ? images : [{ src: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80', alt: 'Album' }];
  }, [album]);

  const handleAddToCart = async () => {
    if (!album || adding) return;
    
    setAdding(true);
    try {
      const result = await addToCart({
        item_type: 'album',
        album_id: album.id,
        quantity: quantity,
      });
      
      if (result.success) {
        toast.success(`${album.name} added to cart!`);
      } else {
        toast.error(result.message || 'Failed to add album to cart');
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      toast.error('Failed to add album to cart');
    } finally {
      setAdding(false);
    }
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Album Not Found</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link
            to="/albums"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-white rounded-full hover:bg-gold-600 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Albums
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gold-600">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/albums" className="text-gray-500 hover:text-gold-600">Albums</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{album.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={allImages[activeImage]?.src}
                alt={allImages[activeImage]?.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-lg transition-all"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-lg transition-all"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {pricing.discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                  {pricing.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index ? 'border-gold-500' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Album Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <span className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-2 block">
                Curated Collection
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                {album.name}
              </h1>
              {album.description && (
                <p className="text-gray-600 leading-relaxed">
                  {album.description}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-end gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{pricing.final.toFixed(2)}
                </span>
                {pricing.savings > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{pricing.calculated.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      Save ₹{pricing.savings.toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Bundle includes {album.products?.length || 0} products
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock || adding}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gold-500 text-white font-medium rounded-full hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {adding ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <ShoppingBagIcon className="h-5 w-5" />
                      Add Album to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`p-4 rounded-full border transition-colors ${
                    wishlisted 
                      ? 'bg-red-50 border-red-200 text-red-500' 
                      : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500'
                  }`}
                >
                  {wishlisted ? (
                    <HeartSolidIcon className="h-6 w-6" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <TagIcon className="h-6 w-6 text-gold-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Bundle Savings</p>
                  <p className="text-xs text-gray-500">Better value together</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <TruckIcon className="h-6 w-6 text-gold-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over ₹1000</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-gold-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Quality Assured</p>
                  <p className="text-xs text-gray-500">100% genuine products</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckIcon className="h-6 w-6 text-gold-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-500">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products in Album */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif text-gray-900 mb-8">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {album.products?.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  {product.primary_image?.image_path ? (
                    <img
                      src={getImageUrl(product.primary_image.image_path)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PhotoIcon className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-gold-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category?.name || 'Product'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      ₹{parseFloat(product.final_price || product.price || 0).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Qty: {product.pivot?.quantity || 1}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            to="/albums"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to All Albums
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper function for image URLs
function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${import.meta.env.VITE_API_URL?.replace('/api', '')}/storage/${imagePath}`;
}

export default AlbumDetailPage;
