import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon, ChatBubbleLeftRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            We'd love to hear from you. Our team is always here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-3xl text-luxury-black mb-8">Let's Connect</h2>
            <p className="text-luxury-charcoal leading-relaxed mb-12">
              Whether you have a question about our products, need styling advice, or want to share feedback, we're here for you. Reach out through any of the channels below.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-luxury-black flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-luxury-black mb-2">Visit Our Store</h3>
                  <p className="text-luxury-charcoal">
                    SH Women's Boutique<br />
                    123 Fashion Street, Linking Road<br />
                    Bandra West, Mumbai 400050<br />
                    Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-luxury-black flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-luxury-black mb-2">Call Us</h3>
                  <p className="text-luxury-charcoal">
                    Toll Free: <a href="tel:+911800123456" className="text-gold-600 hover:text-gold-700">1800-123-456</a><br />
                    WhatsApp: <a href="https://wa.me/919876543210" className="text-gold-600 hover:text-gold-700">+91 98765 43210</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-luxury-black flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-luxury-black mb-2">Email Us</h3>
                  <p className="text-luxury-charcoal">
                    General: <a href="mailto:hello@shwomens.com" className="text-gold-600 hover:text-gold-700">hello@shwomens.com</a><br />
                    Support: <a href="mailto:support@shwomens.com" className="text-gold-600 hover:text-gold-700">support@shwomens.com</a><br />
                    Orders: <a href="mailto:orders@shwomens.com" className="text-gold-600 hover:text-gold-700">orders@shwomens.com</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-luxury-black flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-luxury-black mb-2">Business Hours</h3>
                  <p className="text-luxury-charcoal">
                    Monday - Saturday: 10:00 AM - 8:00 PM<br />
                    Sunday: 11:00 AM - 6:00 PM<br />
                    <span className="text-gold-600">Customer Support: 9:00 AM - 9:00 PM (All days)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 pt-8 border-t border-luxury-silver/20">
              <h3 className="text-sm tracking-[0.2em] uppercase text-luxury-silver mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'Pinterest', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 border border-luxury-silver/30 flex items-center justify-center text-luxury-charcoal hover:border-gold-500 hover:text-gold-500 transition-colors"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-luxury-pearl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-gold-500" />
                <h2 className="font-serif text-2xl text-luxury-black">Send a Message</h2>
              </div>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  <p className="text-green-700">Thank you! Your message has been sent. We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-luxury-silver mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-luxury-silver/30 text-luxury-black focus:border-gold-500 focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-luxury-silver mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-luxury-silver/30 text-luxury-black focus:border-gold-500 focus:outline-none transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-luxury-silver mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-luxury-silver/30 text-luxury-black focus:border-gold-500 focus:outline-none transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-luxury-silver mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-luxury-silver/30 text-luxury-black focus:border-gold-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="return">Returns & Refunds</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-luxury-silver mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-white border border-luxury-silver/30 text-luxury-black focus:border-gold-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-luxury-black text-white text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <h2 className="font-serif text-2xl text-luxury-black mb-8 text-center">Find Our Store</h2>
          <div className="bg-luxury-pearl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="h-12 w-12 mx-auto text-gold-500 mb-4" />
              <p className="text-luxury-charcoal">Interactive Map</p>
              <p className="text-sm text-luxury-silver">123 Fashion Street, Bandra West, Mumbai</p>
            </div>
          </div>
        </div>

        {/* FAQ CTA */}
        <div className="mt-20 bg-luxury-black p-12 text-center">
          <h2 className="font-serif text-2xl text-white mb-4">Looking for Quick Answers?</h2>
          <p className="text-luxury-silver mb-8 max-w-xl mx-auto">
            Check our frequently asked questions for instant answers to common queries.
          </p>
          <Link
            to="/faq"
            className="inline-block px-8 py-4 border border-gold-500 text-gold-500 text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black transition-all duration-300"
          >
            View FAQs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
