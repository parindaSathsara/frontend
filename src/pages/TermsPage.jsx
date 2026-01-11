import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, ScaleIcon, ShieldCheckIcon, CurrencyRupeeIcon, TruckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Legal Agreement</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Terms & Conditions</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-luxury-silver/60 text-sm mt-4">Effective Date: January 1, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Table of Contents */}
        <nav className="bg-luxury-pearl p-8 mb-12">
          <h2 className="font-serif text-lg text-luxury-black mb-4">Table of Contents</h2>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-luxury-charcoal">
            <li><a href="#acceptance" className="hover:text-gold-600">1. Acceptance of Terms</a></li>
            <li><a href="#eligibility" className="hover:text-gold-600">2. Eligibility</a></li>
            <li><a href="#account" className="hover:text-gold-600">3. User Account</a></li>
            <li><a href="#orders" className="hover:text-gold-600">4. Orders & Payments</a></li>
            <li><a href="#shipping" className="hover:text-gold-600">5. Shipping & Delivery</a></li>
            <li><a href="#returns" className="hover:text-gold-600">6. Returns & Refunds</a></li>
            <li><a href="#ip" className="hover:text-gold-600">7. Intellectual Property</a></li>
            <li><a href="#liability" className="hover:text-gold-600">8. Limitation of Liability</a></li>
          </ul>
        </nav>

        <div className="prose max-w-none">
          <section id="acceptance" className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <DocumentTextIcon className="h-6 w-6 text-gold-500" />
              1. Acceptance of Terms
            </h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed">
                By accessing or using the SH Women's website (www.shwomens.com), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the website constitutes acceptance of any changes.
              </p>
            </div>
          </section>

          <section id="eligibility" className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <ScaleIcon className="h-6 w-6 text-gold-500" />
              2. Eligibility
            </h2>
            <p className="text-luxury-charcoal mb-4">To use our services, you must:</p>
            <ul className="space-y-2 text-luxury-charcoal">
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                Be at least 18 years of age or have parental/guardian consent
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                Have the legal capacity to enter into binding contracts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                Provide accurate and complete registration information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                Not have been previously banned from using our services
              </li>
            </ul>
          </section>

          <section id="account" className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6 text-gold-500" />
              3. User Account
            </h2>
            <div className="space-y-4 text-luxury-charcoal">
              <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
              <p><strong>Accurate Information:</strong> You agree to provide accurate, current, and complete information during registration and to update it as necessary.</p>
              <p><strong>Account Termination:</strong> We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>
            </div>
          </section>

          <section id="orders" className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <CurrencyRupeeIcon className="h-6 w-6 text-gold-500" />
              4. Orders & Payments
            </h2>
            <div className="space-y-4">
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-medium text-luxury-black mb-2">Product Information</h3>
                <p className="text-luxury-charcoal text-sm">We strive to display accurate product information. However, colors may vary due to monitor settings. We reserve the right to correct any errors in pricing or descriptions.</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-medium text-luxury-black mb-2">Pricing</h3>
                <p className="text-luxury-charcoal text-sm">All prices are in Sri Lankan Rupees (LKR) and include applicable taxes unless otherwise stated. Prices are subject to change without notice.</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-medium text-luxury-black mb-2">Payment Methods</h3>
                <p className="text-luxury-charcoal text-sm">We accept Credit Cards, Debit Cards, UPI, Net Banking, and Cash on Delivery (where available). All payments are processed securely through our payment partners.</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-medium text-luxury-black mb-2">Order Confirmation</h3>
                <p className="text-luxury-charcoal text-sm">An order confirmation email does not guarantee acceptance. We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspected fraud.</p>
              </div>
            </div>
          </section>

          <section id="shipping" className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <TruckIcon className="h-6 w-6 text-gold-500" />
              5. Shipping & Delivery
            </h2>
            <ul className="space-y-3 text-luxury-charcoal">
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                Delivery times are estimates and not guaranteed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                Risk of loss transfers to you upon delivery to the shipping carrier
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                We are not responsible for delays caused by carriers, customs, or circumstances beyond our control
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                You are responsible for providing accurate delivery information
              </li>
            </ul>
            <p className="text-luxury-charcoal mt-4">
              For detailed shipping information, please see our <Link to="/shipping" className="text-gold-600 hover:text-gold-700">Shipping Policy</Link>.
            </p>
          </section>

          <section id="returns" className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">6. Returns & Refunds</h2>
            <p className="text-luxury-charcoal mb-4">
              Returns are subject to our Return Policy. Please review our <Link to="/returns" className="text-gold-600 hover:text-gold-700">Returns & Refunds Policy</Link> for complete details on eligibility, process, and timelines.
            </p>
          </section>

          <section id="ip" className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">7. Intellectual Property</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of SH Women's or its content suppliers and is protected by intellectual property laws.
              </p>
              <p className="text-luxury-charcoal">
                You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </div>
          </section>

          <section id="liability" className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-gold-500" />
              8. Limitation of Liability
            </h2>
            <div className="bg-gold-50 border border-gold-200 p-6">
              <p className="text-luxury-charcoal mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="space-y-2 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">•</span>
                  SH Women's provides services "as is" without warranties of any kind
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">•</span>
                  We shall not be liable for indirect, incidental, or consequential damages
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">•</span>
                  Our total liability shall not exceed the amount paid for the specific product or service
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">9. Governing Law</h2>
            <p className="text-luxury-charcoal">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">10. Contact Information</h2>
            <div className="bg-luxury-black text-white p-8">
              <p className="mb-4">For questions about these Terms and Conditions:</p>
              <p>Email: <a href="mailto:legal@shwomens.com" className="text-gold-400 hover:text-gold-300">legal@shwomens.com</a></p>
              <p className="mt-2">Address: SH Women's, 123 Fashion Street, Mumbai, Maharashtra 400001, India</p>
            </div>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="text-gold-600 hover:text-gold-700 text-sm tracking-wider uppercase">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
