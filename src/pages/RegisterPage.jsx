import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
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

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(formData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-luxury-white px-4 py-12 lg:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center">
              <img 
                src="/logosh.png" 
                alt="SH Womens" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-luxury-black mb-3">
              Create Account
            </h2>
            <p className="text-luxury-silver">
              Join our exclusive community of style connoisseurs.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs text-luxury-silver tracking-wider uppercase mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-transparent border border-luxury-silver/30 text-luxury-black placeholder-luxury-silver/50 focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>

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

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs text-luxury-silver tracking-wider uppercase mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-transparent border border-luxury-silver/30 text-luxury-black placeholder-luxury-silver/50 focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="+91 98765 43210"
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
                  placeholder="Create a strong password"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 ${
                          i < passwordStrength
                            ? strengthColors[passwordStrength - 1]
                            : 'bg-luxury-silver/20'
                        } transition-colors`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-luxury-silver">
                    Password strength: <span className="font-medium">{strengthLabels[passwordStrength - 1] || 'Very Weak'}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="password_confirmation" className="block text-xs text-luxury-silver tracking-wider uppercase mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="w-full px-4 py-4 pr-12 bg-transparent border border-luxury-silver/30 text-luxury-black placeholder-luxury-silver/50 focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="Confirm your password"
                />
                {formData.password_confirmation && formData.password === formData.password_confirmation && (
                  <CheckCircleIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 border border-luxury-silver/30 text-gold-500 focus:ring-gold-500 focus:ring-offset-0"
              />
              <label htmlFor="terms" className="text-sm text-luxury-silver">
                I agree to the{' '}
                <Link to="/terms" className="text-gold-600 hover:text-gold-700">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-gold-600 hover:text-gold-700">Privacy Policy</Link>
              </label>
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
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-luxury-silver">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-600 hover:text-gold-700 font-medium transition-colors">
              Sign In
            </Link>
          </p>

          {/* Decorative Element */}
          <div className="flex justify-center mt-6">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80"
          alt="Luxury Jewelry"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-luxury-black/60 via-luxury-black/40 to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-8 right-8">
          <Link to="/" className="flex items-center">
            <img 
              src="/logosh.png" 
              alt="SH Womens" 
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-end text-right p-16 ml-auto">
          <div className="w-16 h-[1px] bg-gold-500 mb-8"></div>
          <h1 className="font-serif text-5xl text-white mb-6 leading-tight">
            Begin Your<br />
            <span className="text-gold-400">Journey</span>
          </h1>
          <p className="text-white/70 text-lg max-w-md leading-relaxed">
            Join thousands of women who trust SH Womens for their most treasured fashion moments.
          </p>
          
          {/* Benefits */}
          <div className="mt-10 space-y-4 text-left">
            {[
              'Exclusive member discounts',
              'Early access to collections',
              'Free shipping on first order',
              'Personalized recommendations'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-white/80">
                <CheckCircleIcon className="h-5 w-5 text-gold-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Corner */}
        <div className="absolute bottom-8 right-8 w-24 h-24">
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gold-500/50"></div>
          <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gold-500/50"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
