import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, HeartIcon, GlobeAltIcon, ShieldCheckIcon, UserGroupIcon, TruckIcon, StarIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  const values = [
    {
      icon: SparklesIcon,
      title: 'Quality First',
      description: 'I believe every piece should feel special—from the fabric of the clothing to the finishing of the jewelry and other products.'
    },
    {
      icon: HeartIcon,
      title: 'Empowering Women',
      description: 'I support women by creating fashion that makes them feel confident, graceful, and self-expressive.'
    },
    {
      icon: StarIcon,
      title: 'Accessibility & Affordability',
      description: 'Luxury should feel attainable—I aim to offer beautiful products at fair and reasonable prices.'
    }
  ];

  const stats = [
    { number: '2012', label: 'Founded' },
    { number: '13+', label: 'Years of Passion' },
    { number: '∞', label: 'Dreams to Fulfill' },
    { number: '1', label: 'Woman\'s Vision' }
  ];

  const founder = {
    name: 'Shaira Hussain',
    role: 'Chief Visionary Officer',
    image: null,
    bio: 'The heart and soul behind SH Women\'s, Shaira\'s journey began with Haala\'s Boutique in 2012—a passion project born from a dream to create something meaningful and beautiful for women.'
  };

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Page Header */}
      <div className="bg-luxury-black py-12 md:py-16">
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
              <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">EST. 2012</span>
              <h2 className="font-serif text-4xl text-luxury-black mb-8">A Journey of Resilience & Beauty</h2>
              <div className="space-y-6 text-luxury-charcoal leading-relaxed">
                <p>
                  Founded in 2012, SH Women's began its journey as Haala's Boutique—a heartfelt passion project born from a dream to create something meaningful and beautiful for women. Back then, our focus was modest clothing, lovingly designed with intention and care.
                </p>
                <p>
                  Though the path wasn't always linear and life brought its own challenges, the vision never faded. The desire to build a brand rooted in elegance, purpose, and strength remained quietly persistent—waiting for its moment to rise again.
                </p>
                <p>
                  Today, that dream takes bold new steps—refined, focused, and reimagined. Rebranded as SH Women's, this is more than a jewelry and accessories label; it is a symbol of resilience, femininity, and the beauty of beginning again. Each piece is thoughtfully handpicked to inspire confidence, celebrate individuality, and bring a touch of everyday luxury to women's lives.
                </p>
              </div>
            </div>
            <div className="bg-luxury-pearl p-4">
              <div className="aspect-[4/5] bg-gradient-to-br from-luxury-black to-luxury-charcoal flex items-center justify-center">
                <div className="text-center p-8">
                  <HeartIcon className="h-16 w-16 mx-auto text-gold-500 mb-4" />
                  <h3 className="font-serif text-2xl text-white mb-2">SH Women's</h3>
                  <p className="text-luxury-silver">Where Dreams Rise Again</p>
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
          <div className="grid md:grid-cols-3 gap-8">
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
                To empower, uplift, and bring a little joy to every woman's journey. We aim to celebrate individuality through thoughtfully curated pieces that inspire confidence and bring everyday luxury within reach.
              </p>
            </div>
            <div className="bg-luxury-black p-12">
              <h3 className="font-serif text-2xl text-white mb-6">Our Vision</h3>
              <p className="text-luxury-silver leading-relaxed">
                To grow steadily and with intention—into a brand that offers timeless pieces not only for women, but eventually for the next generation—our children. This marks the beginning of a larger vision: to build an empire of refined essentials that speak to strength, softness, and style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">The Heart Behind SH Women's</span>
            <h2 className="font-serif text-4xl text-luxury-black">Meet Our Founder</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-48 h-48 mx-auto mb-6 bg-luxury-pearl rounded-full flex items-center justify-center">
              <UserGroupIcon className="h-20 w-20 text-gold-500" />
            </div>
            <h3 className="font-serif text-2xl text-luxury-black mb-2">{founder.name}</h3>
            <p className="text-gold-600 text-sm tracking-wider uppercase mb-6">{founder.role}</p>
            <p className="text-luxury-charcoal leading-relaxed mb-8">{founder.bio}</p>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-20 bg-luxury-pearl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 md:p-16">
            <div className="text-center mb-8">
              <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">A Personal Note</span>
              <h2 className="font-serif text-3xl text-luxury-black">From Our Founder</h2>
            </div>
            <div className="space-y-6 text-luxury-charcoal leading-relaxed italic">
              <p>
                This is more than a store—it's a celebration of women, by a woman. With every piece, we aim to empower, uplift, and bring a little joy to your journey.
              </p>
              <p className="font-semibold text-luxury-black">
                Because every detail matters. Every woman matters.
              </p>
              <p>
                Thank you for being part of this journey. Here's to small steps, big dreams, and a future beautifully made.
              </p>
            </div>
            <div className="mt-10 text-right">
              <p className="font-serif text-xl text-luxury-black">Yours truly,</p>
              <p className="font-serif text-2xl text-gold-600 mt-2">Shaira Hussain</p>
              <p className="text-sm text-luxury-charcoal tracking-wider uppercase mt-1">Chief Visionary Officer, SH Women's</p>
            </div>
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
              <h3 className="text-white font-serif text-lg mb-3">Handpicked With Care</h3>
              <p className="text-luxury-silver text-sm">Every piece is thoughtfully selected to inspire confidence and celebrate your individuality.</p>
            </div>
            <div className="border border-gold-500/30 p-8 text-center">
              <HeartIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
              <h3 className="text-white font-serif text-lg mb-3">By Women, For Women</h3>
              <p className="text-luxury-silver text-sm">A celebration of femininity, resilience, and the beauty of every woman's unique journey.</p>
            </div>
            <div className="border border-gold-500/30 p-8 text-center">
              <TruckIcon className="h-10 w-10 mx-auto text-gold-500 mb-4" />
              <h3 className="text-white font-serif text-lg mb-3">Delivered With Love</h3>
              <p className="text-luxury-silver text-sm">Every order is handled with care, bringing everyday luxury to your doorstep.</p>
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
