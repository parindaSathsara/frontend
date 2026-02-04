import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import {
  TruckIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const AdminShippingSettings = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    shipping_rate_per_kg: 500,
    free_shipping_threshold: 0,
    default_weight: 0.5,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getShippingSettings();
      setSettings(response.data);
    } catch (err) {
      console.error('Failed to fetch shipping settings:', err);
      toast.error('Failed to load shipping settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      await adminAPI.updateShippingSettings(settings);
      toast.success('Shipping settings updated successfully');
    } catch (err) {
      console.error('Failed to update shipping settings:', err);
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
        <h1 className="text-2xl font-bold text-gray-900">Shipping Settings</h1>
        <p className="text-gray-500 mt-1">Configure shipping rates and thresholds</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Shipping Rate Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gold-50 rounded-lg">
              <TruckIcon className="h-6 w-6 text-gold-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Shipping Rate</h2>
              <p className="text-sm text-gray-500">Set the shipping cost per kilogram</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate per Kilogram (LKR)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">Rs.</span>
                </div>
                <input
                  type="number"
                  name="shipping_rate_per_kg"
                  value={settings.shipping_rate_per_kg}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="500"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Example: If rate is Rs. 500 and product weighs 2kg, shipping = Rs. 1,000
              </p>
            </div>
          </div>
        </div>

        {/* Free Shipping Threshold Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Free Shipping Threshold</h2>
              <p className="text-sm text-gray-500">Orders above this amount get free shipping</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Order Amount (LKR)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">Rs.</span>
              </div>
              <input
                type="number"
                name="free_shipping_threshold"
                value={settings.free_shipping_threshold}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="0"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Set to 0 to disable free shipping. Example: Rs. 10,000 means orders above Rs. 10,000 get free shipping.
            </p>
          </div>
        </div>

        {/* Default Weight Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ScaleIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Default Product Weight</h2>
              <p className="text-sm text-gray-500">Used when product weight is not specified</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Weight (kg)
            </label>
            <input
              type="number"
              name="default_weight"
              value={settings.default_weight}
              onChange={handleInputChange}
              min="0"
              step="0.001"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="0.5"
            />
            <p className="text-sm text-gray-500 mt-2">
              If a product doesn't have a weight set, this default will be used for shipping calculation.
            </p>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Shipping Calculation Preview</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• 1 item (0.5 kg): <span className="font-medium text-gray-900">Rs. {(0.5 * (settings.shipping_rate_per_kg || 0)).toFixed(2)}</span></p>
            <p>• 3 items (1.5 kg): <span className="font-medium text-gray-900">Rs. {(1.5 * (settings.shipping_rate_per_kg || 0)).toFixed(2)}</span></p>
            <p>• 5 items (2.5 kg): <span className="font-medium text-gray-900">Rs. {(2.5 * (settings.shipping_rate_per_kg || 0)).toFixed(2)}</span></p>
            {settings.free_shipping_threshold > 0 && (
              <p className="text-green-600">• Orders above Rs. {settings.free_shipping_threshold.toLocaleString()}: <span className="font-medium">FREE</span></p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-5 w-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminShippingSettings;
