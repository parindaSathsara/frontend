import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const AlbumCard = ({ album }) => {
  const imageUrl = album.cover_image || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80';
  const productCount = album.products_count || album.products?.length || 0;

  return (
    <div className="group relative overflow-hidden bg-white">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link to={`/albums/${album.slug}`}>
          <img
            src={imageUrl}
            alt={album.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        </Link>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        
        {/* Decorative Corner Elements */}
        <div className="absolute top-4 left-4 w-12 h-12">
          <div className="absolute top-0 left-0 w-6 h-[1px] bg-gold-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
          <div className="absolute top-0 left-0 w-[1px] h-6 bg-gold-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100"></div>
        </div>
        <div className="absolute top-4 right-4 w-12 h-12">
          <div className="absolute top-0 right-0 w-6 h-[1px] bg-gold-500 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
          <div className="absolute top-0 right-0 w-[1px] h-6 bg-gold-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100"></div>
        </div>
        <div className="absolute bottom-4 left-4 w-12 h-12">
          <div className="absolute bottom-0 left-0 w-6 h-[1px] bg-gold-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
          <div className="absolute bottom-0 left-0 w-[1px] h-6 bg-gold-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100"></div>
        </div>
        <div className="absolute bottom-4 right-4 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-gold-500 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
          <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-gold-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col">
          {/* Collection Label */}
          <span className="text-gold-400 text-[10px] tracking-[0.3em] uppercase mb-2">
            Collection
          </span>
          
          {/* Album Name */}
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 leading-tight">
            {album.name}
          </h3>
          
          {/* Product Count */}
          <p className="text-white/70 text-sm mb-6">
            {productCount} {productCount === 1 ? 'piece' : 'pieces'}
          </p>
          
          {/* Explore Link */}
          <Link 
            to={`/albums/${album.slug}`}
            className="group/link inline-flex items-center gap-3 text-white text-sm tracking-wider uppercase"
          >
            <span className="relative">
              Explore Collection
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
            </span>
            <ArrowRightIcon className="h-4 w-4 text-gold-500 transform group-hover/link:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Description - Appears on Hover */}
      {album.description && (
        <div className="absolute inset-x-0 bottom-0 p-8 pb-24 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-luxury-black via-luxury-black to-transparent pointer-events-none">
          <p className="text-white/60 text-sm line-clamp-2 italic">
            "{album.description}"
          </p>
        </div>
      )}

      {/* Crystal Shine Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000 ease-out"></div>
      </div>
    </div>
  );
};

export default AlbumCard;
