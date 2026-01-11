import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  PhotoIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const AdminAlbums = () => {
  const toast = useToast();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, [page]);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAlbums({ page, search });
      setAlbums(response.data.albums?.data || response.data.data || []);
      setPagination(response.data.albums || response.data);
    } catch (err) {
      console.error('Failed to fetch albums:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchAlbums();
  };

  const handleToggleStatus = async (album) => {
    try {
      await adminAPI.updateAlbum(album.id, { is_active: !album.is_active });
      fetchAlbums();
    } catch (err) {
      console.error('Failed to update album:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      await adminAPI.deleteAlbum(deleteModal.id);
      setDeleteModal(null);
      toast.success('Album deleted successfully');
      fetchAlbums();
    } catch (err) {
      console.error('Failed to delete album:', err);
      toast.error('Failed to delete album');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Albums</h1>
          <p className="text-gray-500 mt-1">Manage product bundles and collections</p>
        </div>
        <Link
          to="/admin/albums/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          New Album
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search albums..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Albums Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500 mx-auto"></div>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-12">
            <PhotoIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No albums found</p>
            <Link
              to="/admin/albums/create"
              className="text-gold-600 hover:text-gold-700 mt-2 inline-block"
            >
              Create your first album
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div key={album.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group">
                {/* Cover Image */}
                <div className="aspect-video relative overflow-hidden">
                  {album.cover_image ? (
                    <img
                      src={album.cover_image.startsWith('http') ? album.cover_image : `${import.meta.env.VITE_API_URL?.replace('/api', '')}/storage/${album.cover_image}`}
                      alt={album.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <PhotoIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      album.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {album.is_active ? 'Published' : 'Draft'}
                    </span>
                    {album.is_featured && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Album Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{album.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {album.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{album.products_count || 0} products</span>
                    {album.final_price && (
                      <span className="font-medium text-gray-900">₹{parseFloat(album.final_price).toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4 flex gap-2">
                  <Link
                    to={`/admin/albums/${album.id}`}
                    className="flex-1 py-2 text-center border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700 text-sm"
                  >
                    <PencilSquareIcon className="h-4 w-4 inline-block mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleToggleStatus(album)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600"
                    title={album.is_active ? 'Unpublish' : 'Publish'}
                  >
                    {album.is_active ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteModal(album)}
                    className="p-2 border border-red-200 rounded-lg hover:bg-red-50 text-red-600"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="border-t border-gray-100 mt-6 pt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {pagination.from || 0} to {pagination.to || 0} of {pagination.total || 0} albums
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= pagination.last_page}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Album</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteModal.name}"? This will remove all product associations.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAlbums;
