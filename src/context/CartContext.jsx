import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer } from './CartReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TAX_RATE } from '../utils/constants';

const CartContext = createContext();
const initialState = { items: [] };

export const CartProvider = ({ children }) => {
  const [storedCart, setStoredCart] = useLocalStorage('cart', initialState);
  const [state, dispatch] = useReducer(cartReducer, storedCart);

  useEffect(() => {
    setStoredCart(state);
  }, [state, setStoredCart]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * TAX_RATE;
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getSubtotal,
      getTax,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};