import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const [hasSynced, setHasSynced] = useState(false);
  
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

  // Sync guest cart to server when user logs in
  const syncGuestCartToServer = useCallback(async () => {
    if (localCart.items.length > 0) {
      try {
        // Format items for server sync
        const itemsToSync = localCart.items.map(item => ({
          item_type: item.item_type || 'product',
          product_id: item.item_type === 'album' ? null : (item.id || item.product_id),
          album_id: item.item_type === 'album' ? (item.album_id || item.id) : null,
          variant_id: item.variant_id || null,
          quantity: item.quantity || 1,
        }));
        
        await cartAPI.syncGuestCart(itemsToSync);
        // Clear local cart after successful sync
        setLocalCart({ items: [], total: 0 });
        // Refresh server cart
        queryClient.invalidateQueries('cart');
      } catch (error) {
        console.error('Failed to sync guest cart:', error);
        // Even if sync fails, still try to add items individually
        for (const item of localCart.items) {
          try {
            const serverData = {
              item_type: item.item_type || 'product',
              quantity: item.quantity || 1,
            };
            if (item.item_type === 'album') {
              serverData.album_id = item.album_id || item.id;
            } else {
              serverData.product_id = item.id || item.product_id;
              serverData.variant_id = item.variant_id || null;
            }
            await cartAPI.addItem(serverData);
          } catch (e) {
            console.error('Failed to add item:', e);
          }
        }
        setLocalCart({ items: [], total: 0 });
        queryClient.invalidateQueries('cart');
      }
    }
    setHasSynced(true);
  }, [localCart.items, queryClient]);

  // Sync cart when user logs in
  useEffect(() => {
    if (isAuthenticated() && !hasSynced && localCart.items.length > 0) {
      syncGuestCartToServer();
    }
    // Reset sync flag when user logs out
    if (!isAuthenticated()) {
      setHasSynced(false);
    }
  }, [isAuthenticated, hasSynced, localCart.items.length, syncGuestCartToServer]);

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
      const price = parseFloat(item.final_price || item.sale_price || item.price || 0);
      return sum + (price * item.quantity);
    }, 0);
  };

  // Add to local cart
  const addToLocalCart = (product, quantity = 1) => {
    setLocalCart(prev => {
      // For albums, use album_id as the identifier; for products, use id
      const itemId = product.album_id || product.id;
      const existingIndex = prev.items.findIndex(item => {
        const existingId = item.album_id || item.id;
        return existingId === itemId && item.item_type === product.item_type;
      });
      let newItems;
      
      if (existingIndex >= 0) {
        newItems = prev.items.map((item, index) => 
          index === existingIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Ensure price is set correctly
        const itemPrice = product.final_price || product.sale_price || product.price || 0;
        newItems = [...prev.items, { ...product, quantity, price: itemPrice, final_price: itemPrice }];
      }
      
      return { items: newItems, total: calculateLocalTotal(newItems) };
    });
  };

  // Update local cart item
  const updateLocalCartItem = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromLocalCart(itemId);
      return;
    }
    setLocalCart(prev => {
      const newItems = prev.items.map(item => {
        const currentId = item.album_id || item.id;
        return currentId === itemId ? { ...item, quantity } : item;
      });
      return { items: newItems, total: calculateLocalTotal(newItems) };
    });
  };

  // Remove from local cart
  const removeFromLocalCart = (itemId) => {
    setLocalCart(prev => {
      const newItems = prev.items.filter(item => {
        const currentId = item.album_id || item.id;
        return currentId !== itemId;
      });
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
      let item;
      if (itemData.item_type === 'album') {
        // For albums, merge album data with album_id and ensure price is set
        item = {
          ...itemData.album,
          album_id: itemData.album_id,
          item_type: 'album',
        };
      } else {
        // For products
        item = itemData.product || itemData;
        item.item_type = 'product';
      }
      addToLocalCart(item, itemData.quantity || 1);
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
  
  // Calculate total from items directly (don't trust server's cached total)
  const cartTotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price || item.subtotal / item.quantity || 0);
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);
  
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
