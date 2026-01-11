import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon, ChevronDownIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category');
  const minPrice = searchParams.get('min_price');
  const maxPrice = searchParams.get('max_price');
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page')) || 1;

  const { data: productsData, isLoading } = useQuery(
    ['products', { search, category, minPrice, maxPrice, sort, page }],
    () =>
      productAPI
        .getAll({ search, category, min_price: minPrice, max_price: maxPrice, sort, page })
        .then((res) => res.data)
  );

  const { data: categories } = useQuery('categories', () =>
    categoryAPI.getAll().then((res) => res.data.categories || res.data.data || res.data)
  );

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const priceRanges = [
    { label: 'Under Rs. 5,000', min: 0, max: 5000 },
    { label: 'Rs. 5,000 - Rs. 15,000', min: 5000, max: 15000 },
    { label: 'Rs. 15,000 - Rs. 30,000', min: 15000, max: 30000 },
    { label: 'Rs. 30,000 - Rs. 50,000', min: 30000, max: 50000 },
    { label: 'Over Rs. 50,000', min: 50000, max: null },
  ];

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = search || category || minPrice || maxPrice;

  // Get page title based on search/category
  const getPageTitle = () => {
    if (search) return `Search: "${search}"`;
    if (category) return category.charAt(0).toUpperCase() + category.slice(1);
    return 'All Products';
  };

  return (
    <div className="bg-luxury-white min-h-screen">
      {/* Page Header */}
      <div className="bg-luxury-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 block">
            {search ? 'Search Results' : 'Explore Our Collection'}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-luxury-silver max-w-2xl mx-auto">
            {search 
              ? `Showing results for "${search}"`
              : 'Discover our handpicked selection of exquisite pieces, each crafted with precision and passion.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-luxury-silver/20">
          {/* Left - Filter Toggle & Results Count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-luxury-silver/30 text-luxury-black hover:border-gold-500 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span className="text-sm tracking-wider">Filters</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-gold-500 text-luxury-black text-xs flex items-center justify-center">
                  {(category ? 1 : 0) + (minPrice || maxPrice ? 1 : 0)}
                </span>
              )}
            </button>
            
            <span className="text-luxury-silver text-sm">
              {productsData?.total || productsData?.meta?.total || 0} products
            </span>
          </div>

          {/* Right - Sort & View Options */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-luxury-silver/30 text-luxury-black hover:border-gold-500 transition-colors min-w-[180px] justify-between"
              >
                <span className="text-sm">{sortOptions.find((o) => o.value === sort)?.label}</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-full bg-white border border-luxury-silver/20 shadow-lg z-20">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateFilter('sort', option.value);
                        setSortOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-luxury-pearl transition-colors ${
                        sort === option.value ? 'bg-luxury-pearl text-gold-600' : 'text-luxury-black'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode */}
            <div className="hidden sm:flex items-center border border-luxury-silver/30">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-luxury-black text-white' : 'text-luxury-silver hover:text-luxury-black'} transition-colors`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-luxury-black text-white' : 'text-luxury-silver hover:text-luxury-black'} transition-colors`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="sticky top-24 space-y-8">
              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 text-sm tracking-wider"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear All Filters
                </button>
              )}

              {/* Categories */}
              <div>
                <h3 className="text-xs text-luxury-silver tracking-[0.2em] uppercase mb-4">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', null)}
                    className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                      !category
                        ? 'bg-luxury-black text-white'
                        : 'text-luxury-black hover:bg-luxury-pearl'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.slug)}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        category === cat.slug
                          ? 'bg-luxury-black text-white'
                          : 'text-luxury-black hover:bg-luxury-pearl'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-xs text-luxury-silver tracking-[0.2em] uppercase mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        if (range.min !== null) newParams.set('min_price', range.min);
                        else newParams.delete('min_price');
                        if (range.max !== null) newParams.set('max_price', range.max);
                        else newParams.delete('max_price');
                        newParams.delete('page');
                        setSearchParams(newParams);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        minPrice == range.min && maxPrice == range.max
                          ? 'bg-luxury-black text-white'
                          : 'text-luxury-black hover:bg-luxury-pearl'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative Element */}
              <div className="w-full h-[1px] bg-gradient-to-r from-gold-500 via-luxury-silver/20 to-transparent"></div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-luxury-pearl"></div>
                    <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
                      <div className="h-2 sm:h-3 bg-luxury-pearl w-1/3 mx-auto"></div>
                      <div className="h-4 sm:h-5 bg-luxury-pearl w-3/4 mx-auto"></div>
                      <div className="h-3 sm:h-4 bg-luxury-pearl w-1/2 mx-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (productsData?.data || productsData?.products)?.length > 0 ? (
              <>
                <div className={`grid ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'
                    : 'grid-cols-1 gap-6'
                }`}>
                  {(productsData.data || productsData.products).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {(productsData.last_page || productsData.meta?.last_page) > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {[...Array(productsData.last_page || productsData.meta?.last_page)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => updateFilter('page', i + 1)}
                        className={`w-10 h-10 flex items-center justify-center text-sm transition-colors ${
                          page === i + 1
                            ? 'bg-luxury-black text-white'
                            : 'border border-luxury-silver/30 text-luxury-black hover:border-gold-500'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 border border-luxury-silver/30 flex items-center justify-center">
                  <FunnelIcon className="h-8 w-8 text-luxury-silver" />
                </div>
                <h3 className="font-serif text-2xl text-luxury-black mb-2">No Products Found</h3>
                <p className="text-luxury-silver mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-luxury-black text-white text-sm tracking-wider uppercase hover:bg-gold-500 hover:text-luxury-black transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
