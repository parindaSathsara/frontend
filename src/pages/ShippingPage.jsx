import React from 'react';
import { Link } from 'react-router-dom';
import { TruckIcon, GlobeAltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Delivery Information</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Shipping Policy</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            We deliver to your doorstep with care and precision.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Shipping Options */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-luxury-pearl p-8 text-center">
              <TruckIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
              <h3 className="font-serif text-lg text-luxury-black mb-2">Domestic Shipping</h3>
              <p className="text-sm text-luxury-silver mb-2">Nationwide delivery</p>
              <p className="text-gold-600 font-medium">LKR 500 per kilo</p>
            </div>
            <div className="bg-luxury-pearl p-8 text-center">
              <GlobeAltIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
              <h3 className="font-serif text-lg text-luxury-black mb-2">International Shipping</h3>
              <p className="text-sm text-luxury-silver mb-2">Worldwide delivery</p>
              <p className="text-gold-600 font-medium">6-14 days</p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <TruckIcon className="h-6 w-6 text-gold-500" />
              Domestic Shipping
            </h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                We provide <strong>nationwide shipping</strong> with a flat rate of <strong>LKR 500 per kilo</strong>.
              </p>
              <ul className="space-y-2 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Orders are processed within <strong>1-2 working days</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Orders can be tracked on our website
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Please allow an additional <strong>2-6 business days</strong> for the package to be delivered
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <GlobeAltIcon className="h-6 w-6 text-gold-500" />
              International Shipping
            </h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500 mb-4">
              <p className="text-luxury-charcoal leading-relaxed">
                Shipping internationally can take between <strong>6-14 days</strong>, depending on location.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 p-6">
              <h3 className="font-medium text-red-800 mb-3 flex items-center gap-2">
                <ExclamationTriangleIcon className="h-5 w-5" />
                IMPORTANT
              </h3>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  We are <strong>not responsible</strong> for any duty/custom taxes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  You will be notified by the local service provider if there is any customs duty & taxes associated with your order
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  SH Women's will <strong>not be responsible</strong> for any destination charges or issues associated with your order
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link to="/" className="text-gold-600 hover:text-gold-700 text-sm tracking-wider uppercase">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
