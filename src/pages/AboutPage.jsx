import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, HeartIcon, GlobeAltIcon, ShieldCheckIcon, UserGroupIcon, TruckIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  const values = [
    {
      icon: SparklesIcon,
      title: 'Quality Excellence',
      description: 'Every piece in our collection is carefully curated and quality-checked to ensure you receive nothing but the best.'
    },
    {
      icon: HeartIcon,
      title: 'Passion for Fashion',
      description: 'We live and breathe fashion. Our love for style and design drives everything we do.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Sustainable Practices',
      description: 'We are committed to eco-friendly practices, from sourcing to packaging.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Transparency',
      description: 'Honest pricing, genuine products, and clear policies. Your trust is our priority.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '50+', label: 'Artisan Partners' },
    { number: '5+', label: 'Years of Excellence' }
  ];

  const team = [
    {
      name: 'Sunita Sharma',
      role: 'Founder & Creative Director',
      image: null,
      bio: 'With 20 years in the fashion industry, Sunita brings her vision of affordable luxury to every woman.'
    },
    {
      name: 'Priya Mehta',
      role: 'Head of Curation',
      image: null,
      bio: 'Priya travels across India to discover unique pieces and talented artisans.'
    },
    {
      name: 'Anjali Desai',
      role: 'Customer Experience Lead',
      image: null,
      bio: 'Anjali ensures every customer interaction reflects our commitment to excellence.'
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">Our Story</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">About SH Women's</h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            Celebrating the elegance of Indian women through timeless fashion
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">EST. 2019</span>
              <h2 className="font-serif text-4xl text-luxury-black mb-8">Where Tradition Meets Contemporary Style</h2>
              <div className="space-y-6 text-luxury-charcoal leading-relaxed">
                <p>
                  SH Women's was born from a simple yet powerful vision: to make every woman feel confident, beautiful, and empowered through fashion. What started as a small boutique in Mumbai has grown into a beloved destination for women seeking quality ethnic and contemporary wear.
                </p>
                <p>
                  Our founder, Sunita Sharma, noticed a gap in the market for premium quality women's fashion that didn't compromise on affordability. She believed that every woman deserves access to beautiful clothing that makes her feel special, whether it's a handcrafted saree for a wedding or an elegant shirt for a business meeting.
                </p>
                <p>
                  Today, SH Women's curates collections from across India, working directly with skilled artisans and ethical manufacturers. From the intricate weaves of Banarasi silk to contemporary designs that reflect modern sensibilities, every piece tells a story.
                </p>
              </div>
            </div>
            <div className="bg-luxury-pearl p-4">
              <div className="aspect-[4/5] bg-gradient-to-br from-luxury-black to-luxury-charcoal flex items-center justify-center">
                <div className="text-center p-8">
                  <SparklesIcon className="h-16 w-16 mx-auto text-gold-500 mb-4" />
                  <h3 className="font-serif text-2xl text-white mb-2">Our Boutique</h3>
                  <p className="text-luxury-silver">Bandra West, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-5xl text-gold-500 mb-2">{stat.number}</div>
                <div className="text-sm tracking-[0.2em] uppercase text-luxury-silver">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">What We Believe In</span>
            <h2 className="font-serif text-4xl text-luxury-black">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-luxury-pearl hover:bg-luxury-black group transition-colors duration-300">
                <value.icon className="h-12 w-12 mx-auto text-gold-500 mb-6" />
                <h3 className="font-serif text-xl text-luxury-black group-hover:text-white mb-4 transition-colors">{value.title}</h3>
                <p className="text-luxury-charcoal group-hover:text-luxury-silver text-sm leading-relaxed transition-colors">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-luxury-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12">
              <h3 className="font-serif text-2xl text-luxury-black mb-6">Our Mission</h3>
              <p className="text-luxury-charcoal leading-relaxed">
                To empower women through fashion by providing access to high-quality, beautifully crafted clothing that celebrates their individuality. We strive to bridge the gap between traditional craftsmanship and modern style, making luxury accessible to every woman.
              </p>
            </div>
            <div className="bg-luxury-black p-12">
              <h3 className="font-serif text-2xl text-white mb-6">Our Vision</h3>
              <p className="text-luxury-silver leading-relaxed">
                To become India's most trusted destination for women's fashion, known for exceptional quality, sustainable practices, and a commitment to celebrating the beauty of every woman. We envision a future where fashion empowers rather than excludes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">The People Behind SH Women's</span>
            <h2 className="font-serif text-4xl text-luxury-black">Meet Our Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-luxury-pearl rounded-full flex items-center justify-center">
                  <UserGroupIcon className="h-20 w-20 text-gold-500" />
                </div>
                <h3 className="font-serif text-xl text-luxury-black mb-2">{member.name}</h3>
                <p className="text-gold-600 text-sm tracking-wider uppercase mb-4">{member.role}</p>
                <p className="text-luxury-charcoal text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">The SH Women's Promise</span>
            <h2 className="font-serif text-4xl text-white">Why Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gold-500/30 p-8 text-center">
              <SparklesIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
              <h3 className="text-white font-serif text-lg mb-3">Curated Collections</h3>
              <p className="text-luxury-silver text-sm">Every piece is hand-selected for quality, design, and value.</p>
            </div>
            <div className="border border-gold-500/30 p-8 text-center">
              <ShieldCheckIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
              <h3 className="text-white font-serif text-lg mb-3">Authenticity Guaranteed</h3>
              <p className="text-luxury-silver text-sm">100% genuine products with transparent sourcing.</p>
            </div>
            <div className="border border-gold-500/30 p-8 text-center">
              <TruckIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
              <h3 className="text-white font-serif text-lg mb-3">Pan-India Delivery</h3>
              <p className="text-luxury-silver text-sm">Fast, reliable shipping to your doorstep, anywhere in India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-luxury-black mb-6">Join Our Journey</h2>
          <p className="text-luxury-charcoal mb-8 max-w-2xl mx-auto">
            Be part of our growing community of fashion-forward women. Follow us for styling tips, new arrivals, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-luxury-black text-white text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black transition-all duration-300"
            >
              Explore Collection
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-luxury-black text-luxury-black text-sm tracking-wider uppercase hover:bg-luxury-black hover:text-white transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
