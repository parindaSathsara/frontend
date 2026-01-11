import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=80"
          alt="Luxury Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/60 via-luxury-black/40 to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-8 left-8">
          <Link to="/" className="flex items-center">
            <img 
              src="/logosh.png" 
              alt="SH Womens" 
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
        </div>

        <div className="relative z-10 flex flex-col justify-center p-16">
          <div className="w-16 h-[1px] bg-gold-500 mb-8"></div>
          <h1 className="font-serif text-5xl text-white mb-6 leading-tight">
            Welcome to<br />
            <span className="text-gold-400">Elegance</span>
          </h1>
          <p className="text-white/70 text-lg max-w-md leading-relaxed">
            Discover our curated collection of exquisite sarees, fine jewelry, and designer shirts crafted for the modern woman.
          </p>
        </div>

        {/* Decorative Corner */}
        <div className="absolute bottom-8 left-8 w-24 h-24">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500/50"></div>
          <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gold-500/50"></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-luxury-white px-4 py-12 lg:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-12">
            <Link to="/" className="inline-flex items-center">
              <img 
                src="/logosh.png" 
                alt="SH Womens" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-luxury-black mb-3">
              Sign In
            </h2>
            <p className="text-luxury-silver">
              Welcome back. Please enter your details.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs text-luxury-silver tracking-wider uppercase mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-transparent border border-luxury-silver/30 text-luxury-black placeholder-luxury-silver/50 focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs text-luxury-silver tracking-wider uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 pr-12 bg-transparent border border-luxury-silver/30 text-luxury-black placeholder-luxury-silver/50 focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-silver hover:text-gold-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-luxury-silver/30 text-gold-500 focus:ring-gold-500 focus:ring-offset-0"
                />
                <span className="text-sm text-luxury-silver">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-gold-600 hover:text-gold-700 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-luxury-black text-white font-semibold text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-luxury-silver/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-luxury-white px-4 text-luxury-silver tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-luxury-silver/30 text-luxury-black hover:border-gold-500 transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-luxury-silver/30 text-luxury-black hover:border-gold-500 transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="text-sm">Facebook</span>
            </button>
          </div>

          {/* Register Link */}
          <p className="mt-10 text-center text-luxury-silver">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-600 hover:text-gold-700 font-medium transition-colors">
              Create Account
            </Link>
          </p>

          {/* Decorative Element */}
          <div className="flex justify-center mt-8">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
