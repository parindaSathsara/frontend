import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Local storage key for guest cart
const CART_STORAGE_KEY = 'shwomens_cart';

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  // Local cart for guests
  const [localCart, setLocalCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { items: [], total: 0 };
    }
    return { items: [], total: 0 };
  });

  // Save local cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(localCart));
  }, [localCart]);

  // Fetch cart data for authenticated users
  const { data: serverCart, isLoading } = useQuery(
    'cart',
    () => cartAPI.get().then(res => res.data.cart || res.data),
    {
      enabled: isAuthenticated(),
      refetchOnMount: true,
    }
  );

  // Calculate local cart total
  const calculateLocalTotal = (items) => {
    return items.reduce((sum, item) => {
      const price = item.sale_price || item.price;
      return sum + (parseFloat(price) * item.quantity);
    }, 0);
  };

  // Add to local cart
  const addToLocalCart = (product, quantity = 1) => {
    setLocalCart(prev => {
      const existingIndex = prev.items.findIndex(item => item.id === product.id);
      let newItems;
      
      if (existingIndex >= 0) {
        newItems = prev.items.map((item, index) => 
          index === existingIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, { ...product, quantity }];
      }
      
      return { items: newItems, total: calculateLocalTotal(newItems) };
    });
  };

  // Update local cart item
  const updateLocalCartItem = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromLocalCart(productId);
      return;
    }
    setLocalCart(prev => {
      const newItems = prev.items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      return { items: newItems, total: calculateLocalTotal(newItems) };
    });
  };

  // Remove from local cart
  const removeFromLocalCart = (productId) => {
    setLocalCart(prev => {
      const newItems = prev.items.filter(item => item.id !== productId);
      return { items: newItems, total: calculateLocalTotal(newItems) };
    });
  };

  // Clear local cart
  const clearLocalCart = () => {
    setLocalCart({ items: [], total: 0 });
  };

  // Server mutations
  const addItemMutation = useMutation(
    (data) => cartAPI.addItem(data),
    { onSuccess: () => queryClient.invalidateQueries('cart') }
  );

  const updateItemMutation = useMutation(
    ({ itemId, quantity }) => cartAPI.updateItem(itemId, { quantity }),
    { onSuccess: () => queryClient.invalidateQueries('cart') }
  );

  const removeItemMutation = useMutation(
    (itemId) => cartAPI.removeItem(itemId),
    { onSuccess: () => queryClient.invalidateQueries('cart') }
  );

  const clearCartMutation = useMutation(
    () => cartAPI.clear(),
    { onSuccess: () => queryClient.invalidateQueries('cart') }
  );

  // Unified cart actions
  const addToCart = async (itemData) => {
    if (isAuthenticated()) {
      try {
        // Format data for server API
        const serverData = {
          item_type: itemData.item_type || 'product',
          quantity: itemData.quantity || 1,
        };
        
        // Add album or product specific fields
        if (itemData.item_type === 'album') {
          serverData.album_id = itemData.album_id;
        } else {
          serverData.product_id = itemData.product_id || itemData.id;
          serverData.variant_id = itemData.variant_id || null;
        }
        
        await addItemMutation.mutateAsync(serverData);
        return { success: true };
      } catch (error) {
        console.error('Add to cart error:', error.response?.data);
        return { success: false, message: error.response?.data?.message || 'Failed to add item' };
      }
    } else {
      // For guests, store full product/album data locally
      const item = itemData.product || itemData.album || itemData;
      addToLocalCart({ ...item, item_type: itemData.item_type || 'product' }, itemData.quantity || 1);
      return { success: true };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    if (isAuthenticated()) {
      try {
        await updateItemMutation.mutateAsync({ itemId, quantity });
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Failed to update cart' };
      }
    } else {
      updateLocalCartItem(itemId, quantity);
      return { success: true };
    }
  };

  const removeFromCart = async (itemId) => {
    if (isAuthenticated()) {
      try {
        await removeItemMutation.mutateAsync(itemId);
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Failed to remove item' };
      }
    } else {
      removeFromLocalCart(itemId);
      return { success: true };
    }
  };

  const clearCart = async () => {
    if (isAuthenticated()) {
      try {
        await clearCartMutation.mutateAsync();
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Failed to clear cart' };
      }
    } else {
      clearLocalCart();
      return { success: true };
    }
  };

  // Get current cart based on auth status
  const cart = isAuthenticated() ? serverCart : localCart;
  const cartItems = cart?.items || [];
  const cartTotal = cart?.total || 0;
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const value = {
    cart,
    cartItems,
    cartCount,
    cartTotal,
    isLoading: isAuthenticated() ? isLoading : false,
    addToCart,
    updateCartItem,
    updateQuantity: updateCartItem, // Alias for compatibility
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
