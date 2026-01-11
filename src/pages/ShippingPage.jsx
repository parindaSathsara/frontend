import React from 'react';
import { Link } from 'react-router-dom';
import { TruckIcon, ClockIcon, MapPinIcon, CurrencyRupeeIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const ShippingPage = () => {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      price: 'Free on orders above Rs. 10,000',
      icon: TruckIcon,
    },
    {
      name: 'Express Shipping',
      time: '2-3 Business Days',
      price: 'Rs. 500',
      icon: ClockIcon,
    },
    {
      name: 'Same Day Delivery',
      time: 'Order before 12 PM',
      price: 'Rs. 1,000 (Select cities)',
      icon: MapPinIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Delivery Information</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Shipping Policy</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            We deliver luxury to your doorstep with care and precision.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Shipping Methods */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-luxury-black mb-8 text-center">Shipping Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => (
              <div key={index} className="bg-luxury-pearl p-8 text-center">
                <method.icon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
                <h3 className="font-serif text-lg text-luxury-black mb-2">{method.name}</h3>
                <p className="text-sm text-luxury-silver mb-2">{method.time}</p>
                <p className="text-gold-600 font-medium">{method.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content Sections */}
        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <GlobeAltIcon className="h-6 w-6 text-gold-500" />
              Domestic Shipping
            </h2>
            <div className="bg-luxury-pearl/50 p-6 rounded-none border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                We ship to all states and union territories across India. Our logistics partners ensure your precious items reach you safely and on time.
              </p>
              <ul className="space-y-2 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Orders are processed within 1-2 business days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Tracking information sent via email and SMS
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Signature required upon delivery
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Discreet packaging for all jewelry items
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <CurrencyRupeeIcon className="h-6 w-6 text-gold-500" />
              Free Shipping
            </h2>
            <div className="bg-luxury-pearl/50 p-6 rounded-none border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                Enjoy complimentary standard shipping on all orders above Rs. 10,000. This offer applies to:
              </p>
              <ul className="space-y-2 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  All product categories including Sarees, Jewelry, and Shirts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Deliveries across all serviceable areas in Sri Lanka
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Combined orders meeting the minimum value
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Processing Time</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-luxury-black text-white">
                    <th className="px-6 py-4 text-left text-sm tracking-wider uppercase">Order Type</th>
                    <th className="px-6 py-4 text-left text-sm tracking-wider uppercase">Processing Time</th>
                  </tr>
                </thead>
                <tbody className="text-luxury-charcoal">
                  <tr className="border-b border-luxury-silver/20">
                    <td className="px-6 py-4">Ready-to-Ship Items</td>
                    <td className="px-6 py-4">1-2 Business Days</td>
                  </tr>
                  <tr className="border-b border-luxury-silver/20 bg-luxury-pearl/30">
                    <td className="px-6 py-4">Customized Items</td>
                    <td className="px-6 py-4">5-7 Business Days</td>
                  </tr>
                  <tr className="border-b border-luxury-silver/20">
                    <td className="px-6 py-4">Made-to-Order Jewelry</td>
                    <td className="px-6 py-4">7-10 Business Days</td>
                  </tr>
                  <tr className="border-b border-luxury-silver/20 bg-luxury-pearl/30">
                    <td className="px-6 py-4">Special Orders</td>
                    <td className="px-6 py-4">Contact for estimate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Delivery Zones</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-serif text-lg text-luxury-black mb-3">Metro Cities</h3>
                <p className="text-luxury-charcoal text-sm mb-2">Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad</p>
                <p className="text-gold-600 text-sm">Delivery: 2-4 Business Days</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-serif text-lg text-luxury-black mb-3">Tier 2 Cities</h3>
                <p className="text-luxury-charcoal text-sm mb-2">Pune, Ahmedabad, Jaipur, Lucknow, and more</p>
                <p className="text-gold-600 text-sm">Delivery: 4-6 Business Days</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-serif text-lg text-luxury-black mb-3">Other Areas</h3>
                <p className="text-luxury-charcoal text-sm mb-2">All other serviceable locations</p>
                <p className="text-gold-600 text-sm">Delivery: 5-7 Business Days</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-serif text-lg text-luxury-black mb-3">Remote Areas</h3>
                <p className="text-luxury-charcoal text-sm mb-2">Hill stations, islands, and remote locations</p>
                <p className="text-gold-600 text-sm">Delivery: 7-10 Business Days</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <PhoneIcon className="h-6 w-6 text-gold-500" />
              Need Help?
            </h2>
            <div className="bg-luxury-black text-white p-8">
              <p className="mb-4">
                For shipping inquiries or to track your order, please contact our customer service team:
              </p>
              <div className="space-y-2">
                <p>Email: <a href="mailto:shipping@shwomens.com" className="text-gold-400 hover:text-gold-300">shipping@shwomens.com</a></p>
                <p>Phone: <a href="tel:+911800123456" className="text-gold-400 hover:text-gold-300">1800-123-456</a> (Toll Free)</p>
                <p>Hours: Monday - Saturday, 9 AM - 6 PM IST</p>
              </div>
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
