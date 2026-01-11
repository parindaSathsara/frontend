import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { bannerAPI, productAPI, albumAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import AlbumCard from '../components/AlbumCard';
import { ArrowRightIcon, ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon, SparklesIcon, TruckIcon, ShieldCheckIcon, GiftIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: banners } = useQuery('banners', () =>
    bannerAPI.getAll().then((res) => res.data.banners || res.data.data || res.data)
  );

  const { data: featuredProducts } = useQuery('featuredProducts', () =>
    productAPI.getFeatured().then((res) => res.data.products || res.data.data || res.data)
  );

  const { data: trendingProducts } = useQuery('trendingProducts', () =>
    productAPI.getTrending().then((res) => res.data.products || res.data.data || res.data)
  );

  const { data: featuredAlbums } = useQuery('featuredAlbums', () =>
    albumAPI.getFeatured().then((res) => res.data.albums || res.data.data || res.data)
  );

  // Hero images for slider
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80',
      title: 'Timeless Elegance',
      subtitle: 'Handcrafted Sarees',
      description: 'Discover our curated collection of exquisite silk sarees, each piece a masterwork of tradition and artistry.',
      link: '/products?category=sarees'
    },
    {
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80',
      title: 'Royal Radiance',
      subtitle: 'Fine Jewelry',
      description: 'Adorn yourself with pieces that tell stories of heritage and craftsmanship passed down through generations.',
      link: '/products?category=jewelry'
    },
    {
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1600&q=80',
      title: 'Modern Classics',
      subtitle: 'Designer Shirts',
      description: 'Where contemporary design meets timeless sophistication. Elevate your everyday wardrobe.',
      link: '/products?category=shirts'
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="bg-luxury-white">
      {/* Hero Section with Slider */}
      <section className="relative h-screen min-h-[700px] max-h-[900px] overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-luxury-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className={`max-w-2xl transform transition-all duration-1000 delay-300 ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <span className="inline-block text-gold-400 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
                  {slide.subtitle}
                </span>
                <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-white/80 text-lg md:text-xl mb-10 max-w-lg font-light leading-relaxed">
                  {slide.description}
                </p>
                <Link
                  to={slide.link}
                  className="group inline-flex items-center gap-4 bg-gold-500 text-luxury-black px-8 py-4 font-semibold text-sm tracking-wider uppercase hover:bg-white transition-all duration-300"
                >
                  Explore Collection
                  <ArrowLongRightIcon className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
          <button
            onClick={prevSlide}
            className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500 hover:text-luxury-black transition-all duration-300"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 transition-all duration-500 ${
                  index === currentSlide ? 'w-8 bg-gold-500' : 'w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500 hover:text-luxury-black transition-all duration-300"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:block">
          <div className="flex flex-col items-center gap-2 text-white/60 text-xs tracking-widest">
            <span className="writing-vertical-rl rotate-180">SCROLL</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-luxury-black py-8 border-y border-luxury-charcoal/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: TruckIcon, title: 'Free Shipping', desc: 'On orders over Rs. 10,000' },
              { icon: ShieldCheckIcon, title: 'Authenticity Guaranteed', desc: '100% genuine products' },
              { icon: GiftIcon, title: 'Gift Packaging', desc: 'Complimentary gift wrap' },
              { icon: SparklesIcon, title: 'Premium Quality', desc: 'Handpicked selection' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 border border-gold-500/30 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">{feature.title}</h4>
                  <p className="text-luxury-silver text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      {featuredAlbums && featuredAlbums.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-3 block">Curated For You</span>
                <h2 className="font-serif text-4xl md:text-5xl text-luxury-black">Featured Collections</h2>
              </div>
              <Link 
                to="/albums" 
                className="group inline-flex items-center gap-2 text-luxury-black text-sm tracking-wider uppercase mt-4 md:mt-0"
              >
                View All Collections
                <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            {/* Albums Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAlbums.slice(0, 3).map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider with Quote */}
      <section className="py-16 bg-luxury-pearl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mb-8"></div>
          <blockquote className="font-serif text-2xl md:text-3xl text-luxury-black italic leading-relaxed">
            "Elegance is not about being noticed, it's about being remembered."
          </blockquote>
          <cite className="text-luxury-silver text-sm tracking-widest uppercase mt-6 block not-italic">
            — Giorgio Armani
          </cite>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-8"></div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-3 block">Handpicked Selection</span>
              <h2 className="font-serif text-4xl md:text-5xl text-luxury-black mb-4">Featured Products</h2>
              <p className="text-luxury-silver max-w-2xl mx-auto">
                Discover our most coveted pieces, each one selected for its exceptional craftsmanship and timeless appeal.
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                to="/products?featured=true"
                className="inline-flex items-center gap-3 border-2 border-luxury-black text-luxury-black px-10 py-4 font-semibold text-sm tracking-wider uppercase hover:bg-luxury-black hover:text-white transition-all duration-300"
              >
                View All Featured
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Category Showcase */}
      <section className="py-20 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-3 block">Explore</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sarees */}
            <Link 
              to="/products?category=sarees" 
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
                alt="Sarees"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent"></div>
              <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/50 transition-colors duration-500 m-4"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-gold-400 text-xs tracking-[0.3em] uppercase block mb-2">Traditional</span>
                <h3 className="font-serif text-3xl text-white mb-4">Sarees</h3>
                <span className="inline-flex items-center gap-2 text-white text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Shop Now
                  <ArrowRightIcon className="h-4 w-4 text-gold-500" />
                </span>
              </div>
            </Link>

            {/* Jewelry */}
            <Link 
              to="/products?category=jewelry" 
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
                alt="Jewelry"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent"></div>
              <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/50 transition-colors duration-500 m-4"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-gold-400 text-xs tracking-[0.3em] uppercase block mb-2">Exquisite</span>
                <h3 className="font-serif text-3xl text-white mb-4">Jewelry</h3>
                <span className="inline-flex items-center gap-2 text-white text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Shop Now
                  <ArrowRightIcon className="h-4 w-4 text-gold-500" />
                </span>
              </div>
            </Link>

            {/* Shirts */}
            <Link 
              to="/products?category=shirts" 
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
                alt="Shirts"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent"></div>
              <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/50 transition-colors duration-500 m-4"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-gold-400 text-xs tracking-[0.3em] uppercase block mb-2">Contemporary</span>
                <h3 className="font-serif text-3xl text-white mb-4">Shirts</h3>
                <span className="inline-flex items-center gap-2 text-white text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Shop Now
                  <ArrowRightIcon className="h-4 w-4 text-gold-500" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      {trendingProducts && trendingProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-luxury-pearl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-3 block">What's Hot</span>
                <h2 className="font-serif text-4xl md:text-5xl text-luxury-black">Trending Now</h2>
              </div>
              <Link 
                to="/products?trending=true" 
                className="group inline-flex items-center gap-2 text-luxury-black text-sm tracking-wider uppercase mt-4 md:mt-0"
              >
                View All Trending
                <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {trendingProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 bg-luxury-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Stay Connected</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Join Our Exclusive Circle</h2>
          <p className="text-luxury-silver mb-10 max-w-2xl mx-auto">
            Subscribe to receive early access to new collections, exclusive offers, and styling inspiration delivered to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-transparent border border-luxury-charcoal text-white placeholder-luxury-silver focus:border-gold-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-10 py-4 bg-gold-500 text-luxury-black font-semibold text-sm tracking-wider uppercase hover:bg-white transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>

          <p className="text-luxury-silver/50 text-xs mt-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="py-16 bg-luxury-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-3 block">Follow Us</span>
          <h2 className="font-serif text-3xl text-luxury-black mb-2">@SHWomens</h2>
          <p className="text-luxury-silver mb-8">Share your style with #SHWomensStyle</p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-luxury-pearl group overflow-hidden cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-luxury-pearl to-luxury-silver/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <SparklesIcon className="h-8 w-8 text-gold-500/30 group-hover:text-gold-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
