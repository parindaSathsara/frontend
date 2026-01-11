import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  ShoppingBagIcon,
  HeartIcon,
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
      scrolled || !isHomePage ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      {/* Compact Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-gray-900 text-white text-[11px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-1.5">
            <p className="text-gray-300">
              Free shipping on orders above Rs. 10,000
            </p>
            <div className="flex items-center gap-4 text-gray-300">
              <a href="tel:+94772897856" className="hover:text-gold-400 transition-colors">
                +94 77 289 7856
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-gold-600 transition-colors"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Left Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/products" 
              className="text-gray-700 text-sm font-medium hover:text-gold-600 transition-colors"
            >
              Shop
            </Link>
            <Link 
              to="/albums" 
              className="text-gray-700 text-sm font-medium hover:text-gold-600 transition-colors"
            >
              Collections
            </Link>
            <Link 
              to="/products?featured=true" 
              className="text-gray-700 text-sm font-medium hover:text-gold-600 transition-colors"
            >
              New Arrivals
            </Link>
          </div>

          {/* Center Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logosh.png" 
              alt="SH Womens" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Right Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Search */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-gold-600 transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Wishlist - Always visible */}
            <Link 
              to={isAuthenticated() ? "/wishlist" : "/login"} 
              className="p-2 text-gray-700 hover:text-gold-600 transition-colors"
            >
              <HeartIcon className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 text-gray-700 hover:text-gold-600 transition-colors relative">
              <ShoppingBagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated() ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1 p-2 text-gray-700 hover:text-gold-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5" />
                  <ChevronDownIcon className={`h-3 w-3 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown */}
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
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
                className="ml-2 px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gold-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-gold-600 transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <Link 
              to={isAuthenticated() ? "/wishlist" : "/login"} 
              className="p-2 text-gray-700 hover:text-gold-600 transition-colors"
            >
              <HeartIcon className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="p-2 text-gray-700 hover:text-gold-600 transition-colors relative">
              <ShoppingBagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-16 pb-3' : 'max-h-0'}`}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-sm"
              autoFocus={searchOpen}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 hover:text-gold-500 transition-colors" />
            </button>
          </form>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
      }`}>
        <div className="px-4 py-4 space-y-1">
          <Link
            to="/products"
            className="block py-2.5 text-gray-700 font-medium hover:text-gold-600 border-b border-gray-100"
          >
            Shop All
          </Link>
          <Link
            to="/albums"
            className="block py-2.5 text-gray-700 font-medium hover:text-gold-600 border-b border-gray-100"
          >
            Collections
          </Link>
          <Link
            to="/products?featured=true"
            className="block py-2.5 text-gray-700 font-medium hover:text-gold-600 border-b border-gray-100"
          >
            New Arrivals
          </Link>
          
          {isAuthenticated() ? (
            <>
              <div className="pt-2 pb-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Account</p>
              </div>
              <Link
                to="/profile"
                className="block py-2.5 text-gray-700 font-medium hover:text-gold-600 border-b border-gray-100"
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                className="block py-2.5 text-gray-700 font-medium hover:text-gold-600 border-b border-gray-100"
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                className="block py-2.5 text-gray-700 font-medium hover:text-gold-600 border-b border-gray-100"
              >
                Wishlist
              </Link>
              {isAdmin() && (
                <Link
                  to="/admin"
                  className="block py-2.5 text-gold-600 font-medium border-b border-gray-100"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2.5 text-gray-700 font-medium hover:text-gold-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-4">
              <Link
                to="/login"
                className="block py-2.5 bg-gray-900 text-white text-center font-medium rounded-lg hover:bg-gold-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block py-2.5 mt-2 text-gray-700 text-center font-medium border border-gray-200 rounded-lg hover:border-gold-500 transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
