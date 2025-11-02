"use client";

import type { CartItem, Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalQuantity: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("luzia-delivery-cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("luzia-delivery-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.estoque === 0) {
      toast({
        title: "Produto indisponível",
        description: `${product.nome} está fora de estoque.`,
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.estoque) {
          toast({
            title: "Estoque insuficiente",
            description: `Temos apenas ${product.estoque} unidades de ${product.nome}.`,
            variant: "destructive",
            duration: 3000,
          });
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    toast({
      title: "✅ Adicionado ao carrinho",
      description: `${quantity}x ${product.nome}`,
      duration: 1000,
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
    toast({
      title: "Produto removido",
      description: "O item foi removido do seu carrinho.",
      variant: "destructive",
      duration: 2000,
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      const itemToUpdate = prevItems.find((item) => item.id === productId);
      if (!itemToUpdate) return prevItems;

      if (newQuantity < 1) {
        return prevItems.filter((item) => item.id !== productId);
      }
      
      if (newQuantity > itemToUpdate.estoque) {
        toast({
          title: "Estoque insuficiente",
          description: `Temos apenas ${itemToUpdate.estoque} unidades de ${itemToUpdate.nome}.`,
          variant: "destructive",
          duration: 3000,
        });
        return prevItems;
      }

      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.preco * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalQuantity,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
