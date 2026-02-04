import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import {
  BuildingLibraryIcon,
  CreditCardIcon,
  UserIcon,
  MapPinIcon,
  HashtagIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const AdminBankSettings = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    bank_name: '',
    account_number: '',
    account_name: '',
    branch: '',
    branch_code: '',
    swift_code: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getBankSettings();
      setSettings(response.data);
    } catch (err) {
      console.error('Failed to fetch bank settings:', err);
      toast.error('Failed to load bank settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!settings.bank_name || !settings.account_number || !settings.account_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      await adminAPI.updateBankSettings(settings);
      toast.success('Bank settings updated successfully');
    } catch (err) {
      console.error('Failed to update bank settings:', err);
      toast.error(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bank Account Settings</h1>
        <p className="text-gray-500 mt-1">Configure bank account details for customer payments</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Bank Name Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BuildingLibraryIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Bank Information</h2>
              <p className="text-sm text-gray-500">Primary bank details for receiving payments</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bank_name"
                value={settings.bank_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="e.g., Bank of Ceylon"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Name
                </label>
                <input
                  type="text"
                  name="branch"
                  value={settings.branch}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="e.g., Colombo Main Branch"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Code
                </label>
                <input
                  type="text"
                  name="branch_code"
                  value={settings.branch_code}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="e.g., 001"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <CreditCardIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
              <p className="text-sm text-gray-500">Account information shown to customers at checkout</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="account_name"
                value={settings.account_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="e.g., SH Womens Fashion (Pvt) Ltd"
              />
              <p className="text-sm text-gray-500 mt-1">
                The name registered with the bank account
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="account_number"
                value={settings.account_number}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="e.g., 0012345678901"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SWIFT Code
              </label>
              <input
                type="text"
                name="swift_code"
                value={settings.swift_code}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="e.g., BCEYLKLX"
              />
              <p className="text-sm text-gray-500 mt-1">
                Required for international transfers
              </p>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Customer Checkout Preview</h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Bank Transfer Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Bank Name:</span>
                <span className="font-medium text-gray-900">{settings.bank_name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Name:</span>
                <span className="font-medium text-gray-900">{settings.account_name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Number:</span>
                <span className="font-medium text-gray-900">{settings.account_number || '-'}</span>
              </div>
              {settings.branch && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Branch:</span>
                  <span className="font-medium text-gray-900">{settings.branch}</span>
                </div>
              )}
              {settings.branch_code && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Branch Code:</span>
                  <span className="font-medium text-gray-900">{settings.branch_code}</span>
                </div>
              )}
              {settings.swift_code && (
                <div className="flex justify-between">
                  <span className="text-gray-500">SWIFT Code:</span>
                  <span className="font-medium text-gray-900">{settings.swift_code}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gold-500 text-white font-medium rounded-lg hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-5 w-5" />
                Save Bank Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBankSettings;
