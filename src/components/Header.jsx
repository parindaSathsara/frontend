import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || !isHomePage ? 'bg-white shadow-sm' : 'bg-white'
    }`}>
      {/* Announcement Bar */}
      <div className="bg-[#f8f5f0] text-center py-2.5">
        <p className="text-[11px] tracking-widest text-gray-700 uppercase">
          Elegance Redefined — Quality Jewelry & Accessories
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-3 items-center py-5">
            {/* Left Navigation */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/products" 
                className="text-gray-800 text-[13px] font-medium tracking-widest hover:text-gray-500 transition-colors uppercase"
              >
                Shop All
              </Link>
              <Link 
                to="/products?featured=true" 
                className="text-gray-800 text-[13px] font-medium tracking-widest hover:text-gray-500 transition-colors uppercase"
              >
                New Arrivals
              </Link>
              <Link 
                to="/albums" 
                className="text-gray-800 text-[13px] font-medium tracking-widest hover:text-gray-500 transition-colors uppercase"
              >
                Collections
              </Link>
            </div>

            {/* Center Logo - Large & Prominent */}
            <div className="flex justify-center">
              <Link to="/">
                <img 
                  src="/logosh.png" 
                  alt="SH Women's" 
                  className="h-20 w-auto"
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center justify-end space-x-5">
              {/* Search */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-700 hover:text-gray-500 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              {/* User Menu */}
              {isAuthenticated() ? (
                <div className="relative">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-500 transition-colors"
                  >
                    <UserIcon className="h-5 w-5" />
                    <ChevronDownIcon className={`h-3 w-3 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown */}
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg border border-gray-100 py-1 z-20">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-medium text-gray-900 text-sm truncate">{user?.first_name} {user?.last_name}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          My Profile
                        </Link>
                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          My Orders
                        </Link>
                        <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Wishlist
                        </Link>
                        {isAdmin() && (
                          <Link to="/admin" className="block px-4 py-2 text-sm text-gold-600 hover:bg-gray-50 border-t border-gray-100">
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-gray-500 transition-colors"
                >
                  <UserIcon className="h-5 w-5" />
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="text-gray-700 hover:text-gray-500 transition-colors relative">
                <ShoppingBagIcon className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between py-3">
            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

            {/* Center Logo */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src="/logosh.png" 
                alt="SH Women's" 
                className="h-14 w-auto"
              />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <Link to="/cart" className="p-2 text-gray-700 relative">
                <ShoppingBagIcon className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-16 pb-4' : 'max-h-0'}`}>
            <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors text-sm"
                autoFocus={searchOpen}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
      }`}>
        <div className="px-6 py-6 space-y-4">
          <Link
            to="/products"
            className="block py-2 text-gray-800 font-medium tracking-widest uppercase text-sm"
          >
            Shop All
          </Link>
          <Link
            to="/products?featured=true"
            className="block py-2 text-gray-800 font-medium tracking-widest uppercase text-sm"
          >
            New Arrivals
          </Link>
          <Link
            to="/albums"
            className="block py-2 text-gray-800 font-medium tracking-widest uppercase text-sm"
          >
            Collections
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-800 font-medium tracking-widest uppercase text-sm"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-gray-800 font-medium tracking-widest uppercase text-sm"
          >
            Contact
          </Link>
          
          <div className="pt-4 border-t border-gray-100">
            {isAuthenticated() ? (
              <div className="space-y-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Account</p>
                <Link
                  to="/profile"
                  className="block py-2 text-gray-700 text-sm"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block py-2 text-gray-700 text-sm"
                >
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="block py-2 text-gray-700 text-sm"
                >
                  Wishlist
                </Link>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="block py-2 text-gold-600 text-sm font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block py-2 text-gray-700 text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block py-3 bg-gray-900 text-white text-center text-sm font-medium tracking-widest uppercase"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block py-3 text-gray-700 text-center text-sm font-medium border border-gray-200 tracking-widest uppercase"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
