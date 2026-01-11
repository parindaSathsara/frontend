import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-gold-500 text-2xl">✦</span>
            <h3 className="font-serif text-3xl lg:text-4xl mt-4 mb-4">Join the SHWomens Circle</h3>
            <p className="text-luxury-silver mb-8 tracking-wide">
              Subscribe to receive exclusive previews, special offers, and styling inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-luxury-charcoal border border-gold-500/30 text-white placeholder-luxury-silver focus:outline-none focus:border-gold-500 transition-colors tracking-wide"
              />
              <button className="px-8 py-4 bg-gold-500 text-luxury-black font-semibold text-sm tracking-widest uppercase hover:bg-gold-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/logosh.png" 
                alt="SH Womens" 
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-luxury-silver text-sm leading-relaxed mb-6">
              Curating timeless elegance since 2020. Where luxury meets tradition, and every piece tells a story of exquisite craftsmanship.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all group">
                <svg className="w-5 h-5 text-gold-500 group-hover:text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all group">
                <svg className="w-5 h-5 text-gold-500 group-hover:text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all group">
                <svg className="w-5 h-5 text-gold-500 group-hover:text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 border border-gold-500/30 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all group">
                <svg className="w-5 h-5 text-gold-500 group-hover:text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-6">Shop</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=sarees" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  Sarees
                </Link>
              </li>
              <li>
                <Link to="/products?category=shirts" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  Shirts & Tops
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelry" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/albums" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/products?featured=true" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-6">Customer Care</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-luxury-silver hover:text-gold-500 transition-colors text-sm tracking-wide">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="text-luxury-silver">
                <span className="text-gold-500 block mb-1 tracking-wide">Address</span>
                123 Luxury Lane, Fashion District<br />
                Mumbai, Maharashtra 400001
              </li>
              <li>
                <span className="text-gold-500 block mb-1 tracking-wide">Phone</span>
                <a href="tel:+919876543210" className="text-luxury-silver hover:text-gold-500 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <span className="text-gold-500 block mb-1 tracking-wide">Email</span>
                <a href="mailto:concierge@shwomens.com" className="text-luxury-silver hover:text-gold-500 transition-colors">
                  concierge@shwomens.com
                </a>
              </li>
              <li>
                <span className="text-gold-500 block mb-1 tracking-wide">Hours</span>
                <span className="text-luxury-silver">Mon - Sat: 10AM - 8PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-luxury-silver text-xs tracking-wide">SECURE PAYMENTS</span>
              <div className="flex gap-3">
                <div className="px-4 py-2 border border-gold-500/20 text-luxury-silver text-xs font-bold">VISA</div>
                <div className="px-4 py-2 border border-gold-500/20 text-luxury-silver text-xs font-bold">MASTERCARD</div>
                <div className="px-4 py-2 border border-gold-500/20 text-luxury-silver text-xs font-bold">UPI</div>
                <div className="px-4 py-2 border border-gold-500/20 text-luxury-silver text-xs font-bold">AMEX</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-luxury-silver text-xs tracking-wide">
              <Link to="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
              <span className="text-gold-500">|</span>
              <Link to="/terms" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
              <span className="text-gold-500">|</span>
              <Link to="/cookies" className="hover:text-gold-500 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gold-500/10 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-luxury-silver text-xs tracking-wide">
              © 2026 SHWomens. All rights reserved. Crafted with excellence.
            </p>
            <p className="text-luxury-silver text-xs flex items-center gap-2">
              <span className="text-gold-500">✦</span> Made in India with Love <span className="text-gold-500">✦</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
