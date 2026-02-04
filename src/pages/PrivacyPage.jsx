import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, EyeIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Your Data, Protected</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-luxury-silver/60 text-sm mt-4">Last updated: February 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-luxury-pearl p-8 text-center">
            <ShieldCheckIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">Secure Data</h3>
            <p className="text-sm text-luxury-silver">Your data is protected</p>
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
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Information We Collect</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500 mb-4">
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                We may collect the following types of information:
              </p>
              <ul className="space-y-2 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Personal information you voluntarily provide (such as your name or email address when you contact us or sign up)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Non-personal information such as browser type, device information, and pages visited, collected automatically to help improve our website
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">How We Use Your Information</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Operate and maintain our website
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Respond to inquiries or messages
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Improve website performance and user experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Send updates or communications, if you have opted in
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Cookies</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed">
                Our website may use cookies or similar technologies to enhance your experience. You can choose to disable cookies through your browser settings if you prefer.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Sharing Your Information</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed">
                We do not sell, trade, or rent your personal information to others. We may share information only when required by law or to protect our rights.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Data Security</h2>
            <div className="bg-luxury-black text-white p-8">
              <p className="leading-relaxed">
                We take reasonable measures to protect your information, but no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Third-Party Links</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Your Choices</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed mb-4">
                You may contact us to:
              </p>
              <ul className="space-y-2 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Access, update, or delete your personal information
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500">•</span>
                  Opt out of future communications
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Changes to This Policy</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500">
              <p className="text-luxury-charcoal leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
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
                If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPage;
