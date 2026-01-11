import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, EyeIcon, LockClosedIcon, UserIcon, ServerIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Your Data, Protected</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal information.
          </p>
          <p className="text-luxury-silver/60 text-sm mt-4">Last updated: January 1, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-luxury-pearl p-8 text-center">
            <ShieldCheckIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">Secure Data</h3>
            <p className="text-sm text-luxury-silver">Your data is encrypted and secure</p>
          </div>
          <div className="bg-luxury-pearl p-8 text-center">
            <EyeIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">Transparency</h3>
            <p className="text-sm text-luxury-silver">Clear about how we use data</p>
          </div>
          <div className="bg-luxury-pearl p-8 text-center">
            <LockClosedIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">Your Control</h3>
            <p className="text-sm text-luxury-silver">Manage your privacy preferences</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <UserIcon className="h-6 w-6 text-gold-500" />
              Information We Collect
            </h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <h3 className="font-serif text-lg text-luxury-black mb-3">Personal Information</h3>
              <ul className="space-y-2 text-luxury-charcoal">
                <li>• Name, email address, and phone number</li>
                <li>• Shipping and billing addresses</li>
                <li>• Payment information (processed securely)</li>
                <li>• Order history and preferences</li>
                <li>• Account credentials (encrypted)</li>
              </ul>
            </div>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500 mt-4">
              <h3 className="font-serif text-lg text-luxury-black mb-3">Automatically Collected Information</h3>
              <ul className="space-y-2 text-luxury-charcoal">
                <li>• Device information and browser type</li>
                <li>• IP address and location data</li>
                <li>• Browsing behavior and preferences</li>
                <li>• Cookies and similar technologies</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <ServerIcon className="h-6 w-6 text-gold-500" />
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-luxury-charcoal">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gold-500 text-luxury-black flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <h4 className="font-medium text-luxury-black">Order Processing</h4>
                  <p>To process, fulfill, and ship your orders, and send order confirmations and updates.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gold-500 text-luxury-black flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <h4 className="font-medium text-luxury-black">Customer Service</h4>
                  <p>To respond to your inquiries, provide support, and resolve issues.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gold-500 text-luxury-black flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <h4 className="font-medium text-luxury-black">Personalization</h4>
                  <p>To personalize your shopping experience and recommend products.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gold-500 text-luxury-black flex items-center justify-center flex-shrink-0">4</span>
                <div>
                  <h4 className="font-medium text-luxury-black">Marketing Communications</h4>
                  <p>To send promotional emails and newsletters (with your consent).</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gold-500 text-luxury-black flex items-center justify-center flex-shrink-0">5</span>
                <div>
                  <h4 className="font-medium text-luxury-black">Legal Compliance</h4>
                  <p>To comply with legal obligations and protect our rights.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4 flex items-center gap-3">
              <GlobeAltIcon className="h-6 w-6 text-gold-500" />
              Information Sharing
            </h2>
            <p className="text-luxury-charcoal mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="space-y-3 text-luxury-charcoal">
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                <strong>Service Providers:</strong> Shipping companies, payment processors, and analytics services
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                <strong>Business Partners:</strong> For joint marketing initiatives (with consent)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500">•</span>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-medium text-luxury-black mb-2">Access & Portability</h3>
                <p className="text-sm text-luxury-charcoal">Request a copy of your personal data</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-medium text-luxury-black mb-2">Correction</h3>
                <p className="text-sm text-luxury-charcoal">Update inaccurate personal information</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-medium text-luxury-black mb-2">Deletion</h3>
                <p className="text-sm text-luxury-charcoal">Request deletion of your data</p>
              </div>
              <div className="bg-luxury-pearl/50 p-6">
                <h3 className="font-medium text-luxury-black mb-2">Opt-Out</h3>
                <p className="text-sm text-luxury-charcoal">Unsubscribe from marketing communications</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Cookies & Tracking</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="space-y-2 text-luxury-charcoal">
                <li>• Remember your preferences and login status</li>
                <li>• Analyze website traffic and usage patterns</li>
                <li>• Personalize content and advertisements</li>
                <li>• Improve our website and services</li>
              </ul>
              <p className="text-luxury-charcoal mt-4">
                You can manage cookie preferences through your browser settings.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Data Security</h2>
            <div className="bg-luxury-black text-white p-8">
              <p className="mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="space-y-2">
                <li>• SSL/TLS encryption for all data transmission</li>
                <li>• Secure payment processing through PCI-DSS compliant gateways</li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Access controls and employee training</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Contact Us</h2>
            <p className="text-luxury-charcoal mb-4">
              For privacy-related inquiries or to exercise your rights:
            </p>
            <div className="bg-luxury-pearl/50 p-6">
              <p className="text-luxury-charcoal">
                <strong>Email:</strong> <a href="mailto:privacy@shwomens.com" className="text-gold-600 hover:text-gold-700">privacy@shwomens.com</a>
              </p>
              <p className="text-luxury-charcoal mt-2">
                <strong>Address:</strong> SH Women's, 123 Fashion Street, Mumbai, Maharashtra 400001, India
              </p>
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

export default PrivacyPage;
