"use client";

import React, { useState, useEffect } from 'react';
import { Home, Menu, X, ShoppingBag, PizzaIcon, Info, Sun, Moon, Pizza } from 'lucide-react';
import { useTheme } from './themeutils';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCart from './Shoppingcart';

const PizzaHeader: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { theme, toggleTheme } = useTheme() as { theme: 'light' | 'dark'; toggleTheme: () => void };
  
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Pizza Margarita', size: 'Mediana', price: 12.99, quantity: 1, image: '/api/placeholder/80/80' },
    { id: '2', name: 'Pizza Pepperoni', size: 'Grande', price: 15.99, quantity: 2, image: '/api/placeholder/80/80' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openCart = () => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(true);
  };
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { href: '/Menu', label: 'Menú', icon: Menu },
    { href: '/Design', label: 'Crear Pizza', icon: PizzaIcon },
    { href: '/About', label: 'Sobre Nosotros', icon: Info },
  ];
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)] transition-colors">
        <div className="container mx-auto max-w-7xl flex h-24 items-center justify-between px-4 sm:px-6 relative">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10" />
            <span className="font-['Dancing_Script'] font-bold text-3xl tracking-tight">
              Pigzas
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+HU:wght@100..400&display=swap');
        
        body {
          font-family: 'Playwrite HU', cursive;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)] transition-colors">
        <div className="container mx-auto max-w-7xl flex h-24 items-center justify-between px-4 sm:px-6 relative">
          <motion.a 
            href="/"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: "tween", 
              duration: 0.3
            }}
            className="flex items-center space-x-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Pizza className="h-10 w-10 text-[var(--accent)]" />
            <span className="font-['Dancing_Script'] font-bold text-[var(--foreground)] text-3xl tracking-tight">
              Pigzas
            </span>
          </motion.a>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "tween",
                  duration: 0.2
                }}
                whileHover={{ 
                  scale: 1.05,
                  color: 'var(--accent)' 
                }}
                whileTap={{ scale: 0.95 }}
                className="
                  flex items-center space-x-2
                  text-[var(--foreground)]
                  hover:text-[var(--accent)]
                  transition-colors
                  font-medium
                "
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <motion.button 
              onClick={toggleTheme} 
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="
                p-2 rounded-full 
                bg-[var(--card-background)]
                text-[var(--foreground)]
                hover:bg-[var(--border)]
                transition-colors 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[var(--accent)]/50
              "
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>
          
            <motion.button 
              onClick={toggleCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="
                relative p-2 rounded-full
                bg-[var(--card-background)]
                text-[var(--foreground)]
                hover:bg-[var(--border)]
              "
            >
              <ShoppingBag className="h-5 w-5" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="
                  absolute -top-2 -right-2 
                  bg-[var(--accent)] text-white 
                  rounded-full 
                  w-5 h-5 
                  flex items-center justify-center 
                  text-xs
                  font-['Playwrite_HU']
                  font-bold
                "
              >
                {totalItems}
              </motion.span>
            </motion.button>

            <motion.button 
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="md:hidden p-2 rounded-full bg-[var(--card-background)]"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-[var(--foreground)]" />
              ) : (
                <Home className="h-5 w-5 text-[var(--foreground)]" />
              )}
            </motion.button>

            <motion.a 
              href="/Menu"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--brass-600)' 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="
                hidden md:flex
                px-4 py-2 
                bg-[var(--brass-500)] 
                text-white 
                rounded-full 
                transition-colors
                items-center 
                space-x-2
                shadow-md
                hover:shadow-lg
              "
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="font-semibold">Hacer Pedido</span>
            </motion.a>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.2, type: "tween" }}
                className="
                  absolute 
                  top-full 
                  left-0 
                  w-full 
                  bg-[var(--background)]
                  shadow-lg 
                  md:hidden
                  border-b border-[var(--border)]
                "
              >
                <div className="flex flex-col items-center py-4 space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "tween",
                        duration: 0.2
                      }}
                      className="
                        flex items-center space-x-3
                        text-[var(--foreground)]
                        hover:text-[var(--accent)]
                        text-lg
                        font-medium
                      "
                    >
                      <link.icon className="h-6 w-6" />
                      <span>{link.label}</span>
                    </motion.a>
                  ))}
                  
                  <motion.button
                    onClick={openCart}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'var(--brass-600)' 
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="
                      mt-2
                      px-5 py-2.5
                      bg-[var(--brass-500)] 
                      text-white  
                      rounded-full 
                      flex 
                      items-center 
                      space-x-2
                      shadow-md
                    "
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Ver Carrito</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default PizzaHeader;