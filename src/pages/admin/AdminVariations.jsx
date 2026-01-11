import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  SwatchIcon,
  CheckCircleIcon,
  XCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const AdminVariations = () => {
  const [loading, setLoading] = useState(true);
  const [variationTypes, setVariationTypes] = useState([]);
  const [variations, setVariations] = useState({});
  const [activeTypeId, setActiveTypeId] = useState(null);
  const [modal, setModal] = useState({ show: false, mode: 'add', item: null });
  const [typeModal, setTypeModal] = useState({ show: false, mode: 'add', item: null });
  const [formData, setFormData] = useState({ name: '', value: '', display_order: 0 });
  const [typeFormData, setTypeFormData] = useState({ name: '', slug: '', input_type: 'select', is_required: false });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, item: null, isType: false });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch variation types
      const typesResponse = await adminAPI.getVariationTypes();
      const types = typesResponse.data || [];
      setVariationTypes(types);
      
      // Set first active type as default
      if (types.length > 0 && !activeTypeId) {
        setActiveTypeId(types[0].id);
      }
      
      // Fetch all variations
      const variationsResponse = await adminAPI.getVariations();
      setVariations(variationsResponse.data.grouped || {});
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getActiveType = () => {
    return variationTypes.find(t => t.id === activeTypeId);
  };

  const getCurrentOptions = () => {
    const activeType = getActiveType();
    if (!activeType) return [];
    const typeData = variations[activeType.slug];
    return typeData?.options || [];
  };

  // Type Modal Handlers
  const handleOpenTypeModal = (mode, item = null) => {
    if (mode === 'edit' && item) {
      setTypeFormData({
        name: item.name,
        slug: item.slug,
        input_type: item.input_type || 'select',
        is_required: item.is_required || false,
      });
    } else {
      setTypeFormData({ name: '', slug: '', input_type: 'select', is_required: false });
    }
    setTypeModal({ show: true, mode, item });
  };

  const handleSubmitType = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      if (typeModal.mode === 'add') {
        await adminAPI.createVariationType({
          name: typeFormData.name,
          slug: typeFormData.slug || typeFormData.name.toLowerCase().replace(/\s+/g, '_'),
          input_type: typeFormData.input_type,
          is_required: typeFormData.is_required,
          is_active: true,
          display_order: variationTypes.length,
        });
      } else {
        await adminAPI.updateVariationType(typeModal.item.id, typeFormData);
      }
      
      setTypeModal({ show: false, mode: 'add', item: null });
      fetchData();
    } catch (err) {
      console.error('Failed to save variation type:', err);
      alert(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  // Option Modal Handlers
  const handleOpenModal = (mode, item = null) => {
    if (mode === 'edit' && item) {
      setFormData({
        name: item.name,
        value: item.value || '',
        display_order: item.display_order || 0,
      });
    } else {
      setFormData({ name: '', value: '', display_order: getCurrentOptions().length });
    }
    setModal({ show: true, mode, item });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const activeType = getActiveType();
      
      if (modal.mode === 'add') {
        await adminAPI.createVariation({
          variation_type_id: activeType.id,
          name: formData.name,
          value: formData.value || null,
          display_order: parseInt(formData.display_order) || 0,
          is_active: true,
        });
      } else {
        await adminAPI.updateVariation(modal.item.id, {
          name: formData.name,
          value: formData.value || null,
          display_order: parseInt(formData.display_order) || 0,
        });
      }
      
      setModal({ show: false, mode: 'add', item: null });
      fetchData();
    } catch (err) {
      console.error('Failed to save variation:', err);
      alert(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      await adminAPI.toggleVariationStatus(item.id);
      fetchData();
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleToggleTypeStatus = async (type) => {
    try {
      await adminAPI.toggleVariationTypeStatus(type.id);
      fetchData();
    } catch (err) {
      console.error('Failed to toggle type status:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.item) return;
    try {
      if (deleteModal.isType) {
        await adminAPI.deleteVariationType(deleteModal.item.id);
        if (activeTypeId === deleteModal.item.id) {
          setActiveTypeId(variationTypes.find(t => t.id !== deleteModal.item.id)?.id || null);
        }
      } else {
        await adminAPI.deleteVariation(deleteModal.item.id);
      }
      setDeleteModal({ show: false, item: null, isType: false });
      fetchData();
    } catch (err) {
      console.error('Failed to delete:', err);
      alert(err.response?.data?.message || 'Failed to delete. This item may be in use by products.');
    }
  };

  const getPlaceholder = () => {
    const activeType = getActiveType();
    if (!activeType) return { name: '', value: '' };
    
    switch (activeType.slug) {
      case 'color': return { name: 'e.g., Red', value: 'Hex code e.g., #FF0000' };
      case 'size': return { name: 'e.g., XL', value: 'Full name e.g., Extra Large' };
      case 'material': return { name: 'e.g., Cotton', value: 'Description e.g., 100% Cotton' };
      case 'gold_type': return { name: 'e.g., 24K', value: 'Description e.g., 24 Karat Gold' };
      default: return { name: 'Option name', value: 'Optional value/description' };
    }
  };

  const isColorType = () => {
    const activeType = getActiveType();
    return activeType?.input_type === 'color_picker' || activeType?.slug === 'color';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  const activeType = getActiveType();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Variation Management</h1>
          <p className="text-gray-500 mt-1">Manage variation types and their options for your products</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenTypeModal('add')}
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            Add Variation Type
          </button>
          {activeType && (
            <button
              onClick={() => handleOpenModal('add')}
              className="inline-flex items-center px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add {activeType.name}
            </button>
          )}
        </div>
      </div>

      {/* Variation Types List */}
      {variationTypes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Cog6ToothIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Variation Types</h3>
          <p className="text-gray-500 mb-4">Create variation types like Color, Size, Material to get started</p>
          <button
            onClick={() => handleOpenTypeModal('add')}
            className="text-gold-600 hover:text-gold-700 font-medium"
          >
            Create your first variation type
          </button>
        </div>
      ) : (
        <>
          {/* Tabs for Variation Types */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-100 overflow-x-auto">
              <nav className="flex min-w-max">
                {variationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTypeId(type.id)}
                    className={`group relative flex items-center gap-2 py-4 px-6 text-center font-medium transition-colors ${
                      activeTypeId === type.id
                        ? 'border-b-2 border-gold-500 text-gold-600'
                        : 'text-gray-500 hover:text-gray-700'
                    } ${!type.is_active ? 'opacity-50' : ''}`}
                  >
                    <span>{type.name}</span>
                    <span className="text-sm bg-gray-100 rounded-full px-2 py-0.5">
                      {(variations[type.slug]?.options || []).length}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpenTypeModal('edit', type); }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
                      title="Edit type"
                    >
                      <PencilIcon className="h-3 w-3" />
                    </button>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="p-6">
              {!activeType ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Select a variation type</p>
                </div>
              ) : getCurrentOptions().length === 0 ? (
                <div className="text-center py-12">
                  <SwatchIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">No {activeType.name.toLowerCase()} options added yet</p>
                  <button
                    onClick={() => handleOpenModal('add')}
                    className="text-gold-600 hover:text-gold-700 font-medium"
                  >
                    Add your first {activeType.name.toLowerCase()}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {getCurrentOptions().map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-4 ${
                        item.is_active ? 'border-gray-200' : 'border-gray-100 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {isColorType() && item.value && (
                            <div
                              className="w-8 h-8 rounded-full border border-gray-200 shadow-inner"
                              style={{ backgroundColor: item.value }}
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            {item.value && !isColorType() && (
                              <p className="text-sm text-gray-500">{item.value}</p>
                            )}
                            {isColorType() && item.value && (
                              <p className="text-xs text-gray-400 font-mono">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className={`text-sm flex items-center gap-1 ${
                            item.is_active ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          {item.is_active ? (
                            <>
                              <CheckCircleIcon className="h-4 w-4" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircleIcon className="h-4 w-4" />
                              Inactive
                            </>
                          )}
                        </button>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenModal('edit', item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteModal({ show: true, item, isType: false })}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Type Info Card */}
          {activeType && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Selected Type</p>
                  <p className="font-medium text-gray-900">{activeType.name}</p>
                  <p className="text-xs text-gray-400">Slug: {activeType.slug} | Input: {activeType.input_type}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleTypeStatus(activeType)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      activeType.is_active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {activeType.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => setDeleteModal({ show: true, item: activeType, isType: true })}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    Delete Type
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Variation Type Modal */}
      {typeModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {typeModal.mode === 'add' ? 'Add' : 'Edit'} Variation Type
            </h3>
            
            <form onSubmit={handleSubmitType} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={typeFormData.name}
                  onChange={(e) => setTypeFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="e.g., Gold Type, Shoe Lace Color"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL identifier)</label>
                <input
                  type="text"
                  value={typeFormData.slug}
                  onChange={(e) => setTypeFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '_') }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="Auto-generated if left empty"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Input Type</label>
                <select
                  value={typeFormData.input_type}
                  onChange={(e) => setTypeFormData(prev => ({ ...prev, input_type: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="select">Select Dropdown</option>
                  <option value="color_picker">Color Picker</option>
                  <option value="text">Text Input</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_required"
                  checked={typeFormData.is_required}
                  onChange={(e) => setTypeFormData(prev => ({ ...prev, is_required: e.target.checked }))}
                  className="rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                />
                <label htmlFor="is_required" className="text-sm text-gray-700">
                  Required for all products
                </label>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setTypeModal({ show: false, mode: 'add', item: null })}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (typeModal.mode === 'add' ? 'Create' : 'Update')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Variation Option Modal */}
      {modal.show && activeType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {modal.mode === 'add' ? 'Add' : 'Edit'} {activeType.name}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder={getPlaceholder().name}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isColorType() ? 'Color Code' : 'Value/Description'}
                </label>
                <div className="flex gap-2">
                  {isColorType() && (
                    <input
                      type="color"
                      value={formData.value || '#000000'}
                      onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                      className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
                    />
                  )}
                  <input
                    type="text"
                    value={formData.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder={getPlaceholder().value}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: e.target.value }))}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setModal({ show: false, mode: 'add', item: null })}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (modal.mode === 'add' ? 'Add' : 'Update')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete {deleteModal.isType ? 'Variation Type' : activeType?.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteModal.item?.name}"? 
              {deleteModal.isType 
                ? ' This will also delete all options under this type and may affect products.'
                : ' This may affect products using this option.'}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal({ show: false, item: null, isType: false })}
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

export default AdminVariations;
