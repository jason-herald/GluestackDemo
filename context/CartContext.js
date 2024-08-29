// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([
  ]);

  const totalItems = products.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const increaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts
        .map((product) =>
          product.id === id ? { ...product, quantity: product.quantity - 1 } : product
        )
        .filter((product) => product.quantity > 0) // Remove product if quantity is 0
    );
  };

  const addToCart = (newProduct) => {
    setProducts((prevProducts) => {
      const productExists = prevProducts.find(product => product.id === newProduct.id);
      if (productExists) {
        return prevProducts.map(product =>
          product.id === newProduct.id
            ? { ...product, quantity: product.quantity + newProduct.quantity }
            : product
        );
      } else {
        return [...prevProducts, newProduct];
      }
    });
  };

  const clearCart = () => {
    setProducts([]); // Clear all products from the cart
  };

  return (
    <CartContext.Provider value={{ products, totalItems, subtotal, increaseQuantity, decreaseQuantity, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
