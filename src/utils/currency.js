/**
 * Currency utility for SH Womens
 * Default currency: LKR (Sri Lankan Rupee)
 */

export const CURRENCY_CONFIG = {
  LKR: {
    code: 'LKR',
    symbol: 'Rs.',
    locale: 'en-LK',
    name: 'Sri Lankan Rupee',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    name: 'Indian Rupee',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    name: 'US Dollar',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'de-DE',
    name: 'Euro',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    locale: 'en-GB',
    name: 'British Pound',
  },
};

// Default currency
export const DEFAULT_CURRENCY = 'LKR';

/**
 * Format amount as currency
 * @param {number} amount - The amount to format
 * @param {string} currencyCode - Currency code (default: LKR)
 * @param {object} options - Additional formatting options
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currencyCode = DEFAULT_CURRENCY, options = {}) => {
  const currency = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG[DEFAULT_CURRENCY];
  
  const formatter = new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: options.decimals ?? 0,
    minimumFractionDigits: options.decimals ?? 0,
    ...options,
  });
  
  return formatter.format(amount || 0);
};

/**
 * Get currency symbol
 * @param {string} currencyCode - Currency code
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (currencyCode = DEFAULT_CURRENCY) => {
  return CURRENCY_CONFIG[currencyCode]?.symbol || CURRENCY_CONFIG[DEFAULT_CURRENCY].symbol;
};

/**
 * Format price for display (shorthand)
 * @param {number} amount - The amount
 * @returns {string} Formatted price
 */
export const formatPrice = (amount) => {
  return `Rs. ${(amount || 0).toLocaleString('en-LK')}`;
};

export default {
  formatCurrency,
  formatPrice,
  getCurrencySymbol,
  CURRENCY_CONFIG,
  DEFAULT_CURRENCY,
};
