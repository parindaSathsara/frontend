import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { albumAPI } from '../services/api';
import AlbumCard from '../components/AlbumCard';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAlbums();
  }, [page]);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await albumAPI.getAll({ page, per_page: 12 });
      setAlbums(response.data.data || []);
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        total: response.data.total,
      });
    } catch (err) {
      console.error('Failed to fetch albums:', err);
      setError('Failed to load albums. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchAlbums();
  };

  const filteredAlbums = albums.filter(album =>
    album.name?.toLowerCase().includes(search.toLowerCase()) ||
    album.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <div className="relative bg-luxury-black py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border border-gold-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 border border-gold-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4 block">
            Curated Collections
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Our Albums
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Discover our carefully curated product bundles. Purchase complete sets at special prices.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500"></div>
            <div className="w-2 h-2 rotate-45 border border-gold-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search albums..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </form>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">View:</span>
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'grid' ? 'bg-gold-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'list' ? 'bg-gold-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <p className="text-gray-500 mb-6">
            Showing {filteredAlbums.length} {filteredAlbums.length === 1 ? 'album' : 'albums'}
          </p>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => fetchAlbums()}
              className="px-6 py-2 bg-gold-500 text-white rounded-full hover:bg-gold-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredAlbums.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FunnelIcon className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Albums Found</h3>
            <p className="text-gray-500 mb-6">
              {search ? `No albums match "${search}"` : 'Check back soon for new collections'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="px-6 py-2 border border-gold-500 text-gold-600 rounded-full hover:bg-gold-50 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : view === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {filteredAlbums.map(album => (
              <Link
                key={album.id}
                to={`/albums/${album.slug}`}
                className="group flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="w-48 md:w-64 flex-shrink-0 overflow-hidden">
                  <img
                    src={album.cover_image || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80'}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <span className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-2">
                    Collection
                  </span>
                  <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {album.name}
                  </h3>
                  {album.description && (
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {album.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {album.products_count || album.products?.length || 0} items
                    </span>
                    {album.final_price && (
                      <span className="font-semibold text-gray-900">
                        ₹{parseFloat(album.final_price).toFixed(2)}
                      </span>
                    )}
                    {album.discount_percentage > 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                        {album.discount_percentage}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(pagination.last_page)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg ${
                  page === i + 1
                    ? 'bg-gold-500 text-white'
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
              disabled={page === pagination.last_page}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumsPage;
