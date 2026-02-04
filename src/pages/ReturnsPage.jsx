import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowPathIcon, ShieldCheckIcon, ClockIcon, ExclamationTriangleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Customer Care</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Returns & Exchange Policy</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            Thank you for shopping with us. Please read our returns and exchange policy carefully before making a purchase.
          </p>
          <p className="text-luxury-silver/60 text-sm mt-4">Last updated: February 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-luxury-pearl p-8 text-center">
            <ClockIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">12 Hour Window</h3>
            <p className="text-sm text-luxury-silver">Report defects within 12 hours of delivery</p>
          </div>
          <div className="bg-luxury-pearl p-8 text-center">
            <ArrowPathIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">Defects Only</h3>
            <p className="text-sm text-luxury-silver">Returns accepted for defective items only</p>
          </div>
          <div className="bg-luxury-pearl p-8 text-center">
            <ShieldCheckIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">Quality Assured</h3>
            <p className="text-sm text-luxury-silver">Each item is checked before dispatch</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6">Online Orders</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500 mb-6">
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                <strong>No returns or exchanges are accepted for online orders</strong>, unless the item is defective at the time of delivery.
              </p>
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                If you receive a defective item, you must:
              </p>
              <ul className="space-y-3 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">1.</span>
                  Notify us within <strong>12 hours of delivery</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">2.</span>
                  Provide clear <strong>images/videos of the defect</strong> as proof
                </li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 p-6 mb-6">
              <p className="text-red-800 font-medium">
                <ExclamationTriangleIcon className="h-5 w-5 inline-block mr-2" />
                Requests made after 12 hours from delivery will not be accepted.
              </p>
            </div>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                Items must be <strong>unused, unworn, and in original condition</strong> to be eligible for review.
              </p>
              <p className="text-luxury-charcoal leading-relaxed">
                Once the defect is verified, we will advise you on the next steps (replacement or store credit, as applicable).
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6">In-Store Purchases</h2>
            <div className="bg-luxury-black text-white p-8">
              <p className="leading-relaxed mb-4">
                <strong>All in-store purchases are final.</strong>
              </p>
              <p className="leading-relaxed mb-4">
                Customers are requested to thoroughly inspect all jewelry and clothing items before making payment.
              </p>
              <p className="leading-relaxed">
                <strong>No returns, exchanges, or refunds will be entertained once payment is completed.</strong>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6">Jewelry Disclaimer</h2>
            <div className="bg-gold-50 border border-gold-200 p-6">
              <p className="text-luxury-charcoal leading-relaxed">
                Due to the delicate and personal nature of jewelry, <strong>no returns or exchanges will be accepted</strong> except in the case of a verified manufacturing defect reported within the specified time frame.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6">Sale & Discounted Items</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed">
                All sale, promotional, or discounted items are <strong>non-returnable and non-exchangeable</strong>, both online and in-store.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6">Final Decision</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed">
                All return or exchange decisions are made at the <strong>sole discretion of the management</strong> after inspection of the item and provided proof.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <EnvelopeIcon className="h-6 w-6 text-gold-500" />
              Contact Us
            </h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed">
                For any concerns regarding defective items, please contact us at:
              </p>
              <p className="text-luxury-charcoal mt-4">
                <strong>Email:</strong> <a href="mailto:Connect@shwomens.com" className="text-gold-600 hover:text-gold-700">Connect@shwomens.com</a>
              </p>
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

export default ReturnsPage;
