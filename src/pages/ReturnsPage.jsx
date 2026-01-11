import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowPathIcon, ShieldCheckIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Customer Satisfaction</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Returns & Refunds</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            Your satisfaction is our priority. We make returns easy and hassle-free.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Return Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-luxury-pearl p-8 text-center">
            <ClockIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">15 Days Return</h3>
            <p className="text-sm text-luxury-silver">Easy returns within 15 days of delivery</p>
          </div>
          <div className="bg-luxury-pearl p-8 text-center">
            <ArrowPathIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">Free Pickup</h3>
            <p className="text-sm text-luxury-silver">We arrange free pickup from your doorstep</p>
          </div>
          <div className="bg-luxury-pearl p-8 text-center">
            <ShieldCheckIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-luxury-black mb-2">Full Refund</h3>
            <p className="text-sm text-luxury-silver">Get complete refund or exchange</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6">Return Policy</h2>
            <div className="bg-luxury-pearl/50 p-6 border-l-4 border-gold-500 mb-6">
              <p className="text-luxury-charcoal leading-relaxed">
                At SH Women's, we want you to be completely satisfied with your purchase. If you are not entirely happy with your order, we're here to help with our easy return process.
              </p>
            </div>
            
            <h3 className="font-serif text-xl text-luxury-black mb-4 flex items-center gap-3">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              Items Eligible for Return
            </h3>
            <ul className="space-y-3 text-luxury-charcoal mb-8">
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">✓</span>
                Items must be unused, unworn, and in original condition
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">✓</span>
                All tags and labels must be attached
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">✓</span>
                Items must be in original packaging
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">✓</span>
                Return request must be initiated within 15 days of delivery
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">✓</span>
                Invoice or order confirmation must be provided
              </li>
            </ul>

            <h3 className="font-serif text-xl text-luxury-black mb-4 flex items-center gap-3">
              <XCircleIcon className="h-6 w-6 text-red-600" />
              Items Not Eligible for Return
            </h3>
            <ul className="space-y-3 text-luxury-charcoal mb-8">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                Customized or personalized items
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                Items marked as "Final Sale" or "Non-Returnable"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                Earrings and nose pins (for hygiene reasons)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                Items that have been altered or damaged by customer
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                Gift cards and vouchers
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6">How to Return</h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gold-500 text-luxury-black flex items-center justify-center font-serif text-xl flex-shrink-0">1</div>
                <div>
                  <h3 className="font-serif text-lg text-luxury-black mb-2">Initiate Return Request</h3>
                  <p className="text-luxury-charcoal">Log into your account, go to 'My Orders', select the item you wish to return, and click 'Return'. Alternatively, email us at returns@shwomens.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gold-500 text-luxury-black flex items-center justify-center font-serif text-xl flex-shrink-0">2</div>
                <div>
                  <h3 className="font-serif text-lg text-luxury-black mb-2">Pack the Item</h3>
                  <p className="text-luxury-charcoal">Pack the item securely in its original packaging with all tags attached. Include a copy of the invoice.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gold-500 text-luxury-black flex items-center justify-center font-serif text-xl flex-shrink-0">3</div>
                <div>
                  <h3 className="font-serif text-lg text-luxury-black mb-2">Schedule Pickup</h3>
                  <p className="text-luxury-charcoal">Our logistics partner will contact you to schedule a free pickup from your location within 2-3 business days.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gold-500 text-luxury-black flex items-center justify-center font-serif text-xl flex-shrink-0">4</div>
                <div>
                  <h3 className="font-serif text-lg text-luxury-black mb-2">Receive Refund</h3>
                  <p className="text-luxury-charcoal">Once we receive and inspect the item, your refund will be processed within 5-7 business days.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6">Refund Process</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-luxury-black text-white">
                    <th className="px-6 py-4 text-left text-sm tracking-wider uppercase">Payment Method</th>
                    <th className="px-6 py-4 text-left text-sm tracking-wider uppercase">Refund Timeline</th>
                    <th className="px-6 py-4 text-left text-sm tracking-wider uppercase">Refund To</th>
                  </tr>
                </thead>
                <tbody className="text-luxury-charcoal">
                  <tr className="border-b border-luxury-silver/20">
                    <td className="px-6 py-4">Credit/Debit Card</td>
                    <td className="px-6 py-4">5-7 Business Days</td>
                    <td className="px-6 py-4">Original Card</td>
                  </tr>
                  <tr className="border-b border-luxury-silver/20 bg-luxury-pearl/30">
                    <td className="px-6 py-4">UPI</td>
                    <td className="px-6 py-4">2-3 Business Days</td>
                    <td className="px-6 py-4">Original UPI ID</td>
                  </tr>
                  <tr className="border-b border-luxury-silver/20">
                    <td className="px-6 py-4">Net Banking</td>
                    <td className="px-6 py-4">5-7 Business Days</td>
                    <td className="px-6 py-4">Original Bank Account</td>
                  </tr>
                  <tr className="border-b border-luxury-silver/20 bg-luxury-pearl/30">
                    <td className="px-6 py-4">Cash on Delivery</td>
                    <td className="px-6 py-4">7-10 Business Days</td>
                    <td className="px-6 py-4">Bank Account/UPI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-luxury-black mb-6 flex items-center gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-gold-500" />
              Important Notes
            </h2>
            <div className="bg-gold-50 border border-gold-200 p-6">
              <ul className="space-y-3 text-luxury-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">•</span>
                  Refund amount excludes original shipping charges (if any)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">•</span>
                  For exchanges, please place a new order and return the original item
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">•</span>
                  Items purchased during sale may have modified return policies
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">•</span>
                  We reserve the right to refuse returns that don't meet our criteria
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Contact Us</h2>
            <div className="bg-luxury-black text-white p-8">
              <p className="mb-4">
                Have questions about returns? Our customer care team is here to help.
              </p>
              <div className="space-y-2">
                <p>Email: <a href="mailto:returns@shwomens.com" className="text-gold-400 hover:text-gold-300">returns@shwomens.com</a></p>
                <p>Phone: <a href="tel:+911800123456" className="text-gold-400 hover:text-gold-300">1800-123-456</a> (Toll Free)</p>
                <p>Hours: Monday - Saturday, 9 AM - 6 PM IST</p>
              </div>
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

export default ReturnsPage;
