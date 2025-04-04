"use client";

import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  timestamp: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartService?: {
    getItems: () => CartItem[];
    addItem: (item: CartItem) => void;
    updateItemQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
  };
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ 
  isOpen, 
  onClose, 
  cartService 
}) => {
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!cartService) {
      try {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
          setLocalCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, [cartService]);

  useEffect(() => {
    if (!cartService) {
      localStorage.setItem('shoppingCart', JSON.stringify(localCartItems));
    }
  }, [localCartItems, cartService]);

  const cartItems = cartService ? cartService.getItems() : localCartItems;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 12000 : 0;
  const total = subtotal + deliveryFee;

  const formatCOP = (amount: number) => {
    const integerAmount = Math.round(amount);
    return `$${integerAmount}`;
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    if (cartService) {
      cartService.updateItemQuantity(id, newQuantity);
    } else {
      setLocalCartItems(items => 
        items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
      );
    }
  };

  const removeItem = (id: string) => {
    if (cartService) {
      cartService.removeItem(id);
    } else {
      setLocalCartItems(items => items.filter(item => item.id !== id));
    }
  };

  const clearCart = () => {
    if (cartService) {
      cartService.clearCart();
    } else {
      setLocalCartItems([]);
    }
  };

  const handleCheckout = () => {
    try {
      setIsCheckingOut(true);
      
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const orderDetails: OrderDetails = {
        orderId,
        items: [...cartItems],
        subtotal,
        deliveryFee,
        total,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem(`order_${orderId}`, JSON.stringify(orderDetails));

      setTimeout(() => {
        clearCart();
        setIsCheckingOut(false);
        onClose();
        router.push(`/Payment?id=${orderId}`);
      }, 800);
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
      alert("Ha ocurrido un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          <motion.section
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[var(--background)] shadow-xl flex flex-col"
          >
            <section className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <section className="flex items-center space-x-3">
                <ShoppingBag className="h-6 w-6 text-[var(--accent)]" />
                <h2 className="text-xl font-['Dancing_Script'] font-bold text-[var(--foreground)]">
                  Tu Pedido
                </h2>
              </section>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[var(--card-background)] text-[var(--foreground)]"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </section>
            <section className="flex-1 overflow-y-auto py-4 px-6">
              {cartItems.length === 0 ? (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full space-y-4"
                >
                  <ShoppingBag className="h-16 w-16 text-[var(--foreground)] opacity-30" />
                  <p className="text-[var(--foreground-muted)] text-lg text-center">
                    Tu carrito está vacío
                  </p>
                  <motion.a
                    href="/Menu"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'var(--brass-600)' 
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onClose();
                    }}
                    className="
                      px-4 py-2 
                      bg-[var(--brass-500)] 
                      text-white 
                      rounded-full 
                      transition-colors
                      items-center 
                      flex
                      space-x-2
                      shadow-md
                      hover:shadow-lg
                    "
                  >
                    <span>Ver Menú</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </motion.section>
              ) : (
                <section className="space-y-6">
                  <section className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.section
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start space-x-4 p-3 rounded-lg bg-[var(--card-background)]"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 rounded-md object-cover"
                        />
                        <section className="flex-1 min-w-0">
                          <h3 className="font-medium text-[var(--foreground)]">{item.name}</h3>
                          <p className="text-sm text-[var(--foreground-muted)]">Tamaño: {item.size}</p>
                          <section className="mt-2 flex items-center justify-between">
                            <section className="flex items-center space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="
                                  p-1 rounded-full 
                                  bg-[var(--background)]
                                  text-[var(--foreground)]
                                  border border-[var(--border)]
                                "
                              >
                                <Minus className="h-3 w-3" />
                              </motion.button>
                              <span className="w-8 text-center text-[var(--foreground)]">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="
                                  p-1 rounded-full 
                                  bg-[var(--background)]
                                  text-[var(--foreground)]
                                  border border-[var(--border)]
                                "
                              >
                                <Plus className="h-3 w-3" />
                              </motion.button>
                            </section>
                            <p className="font-medium text-[var(--foreground)]">
                              {formatCOP(item.price * item.quantity)}
                            </p>
                          </section>
                        </section>
                        <motion.button
                          whileHover={{ scale: 1.1, color: 'var(--accent)' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-[var(--foreground-muted)] hover:text-[var(--accent)]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </motion.section>
                    ))}
                  </section>
                  
                  <section className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearCart}
                      className="
                        text-sm text-[var(--foreground-muted)]
                        hover:text-[var(--accent)]
                        flex items-center space-x-1
                      "
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Vaciar carrito</span>
                    </motion.button>
                  </section>
                </section>
              )}
            </section>
            
            {cartItems.length > 0 && (
              <section className="border-t border-[var(--border)] p-6 space-y-4">
                {/* Totals */}
                <section className="space-y-2">
                  <section className="flex justify-between text-[var(--foreground-muted)]">
                    <span>Subtotal</span>
                    <span>{formatCOP(subtotal)}</span>
                  </section>
                  <section className="flex justify-between text-[var(--foreground-muted)]">
                    <span>Envío</span>
                    <span>{formatCOP(deliveryFee)}</span>
                  </section>
                  <section className="flex justify-between font-medium text-[var(--foreground)] text-lg pt-2 border-t border-[var(--border)]">
                    <span>Total</span>
                    <span>{formatCOP(total)}</span>
                  </section>
                </section>

                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: 'var(--brass-600)' 
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                  className="
                    w-full py-3 px-4
                    bg-[var(--brass-500)]
                    hover:bg-[var(--brass-600)]
                    text-white font-medium
                    rounded-full
                    shadow-md
                    flex items-center justify-center
                    space-x-2
                    transition-colors
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                  "
                >
                  {isCheckingOut ? (
                    <span>Procesando...</span>
                  ) : (
                    <>
                      <span>Finalizar Pedido</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </section>
            )}
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;