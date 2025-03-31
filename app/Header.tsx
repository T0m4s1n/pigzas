"use client";

import React, { useState } from 'react';
import { Home, Menu, X, ShoppingBag, PizzaIcon, Info, Sun, Moon, Pizza } from 'lucide-react';
import { useTheme } from './themeutils';
import { motion, AnimatePresence } from 'framer-motion';

const PizzaHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme() as { theme: 'light' | 'dark'; toggleTheme: () => void };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: '/Menu', label: 'Menú', icon: Menu },
    { href: '/Design', label: 'Crear Pizza', icon: PizzaIcon },
    { href: '/About', label: 'Sobre Nosotros', icon: Info },
  ];

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
        <div className="container flex h-24 items-center justify-between px-6 relative">
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
          <nav className="hidden md:flex space-x-6">
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
                <link.icon className="h-6 w-6" />
                <span>{link.label}</span>
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <motion.button 
              onClick={toggleTheme} 
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="
                p-3 rounded-full 
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
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="
                relative p-3 rounded-full
                bg-[var(--card-background)]
                text-[var(--foreground)]
                hover:bg-[var(--border)]
              "
            >
              <ShoppingBag className="h-6 w-6" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="
                  absolute -top-2 -right-2 
                  bg-[var(--accent)] text-white 
                  rounded-full 
                  w-6 h-6 
                  flex items-center justify-center 
                  text-xs
                  font-['Playwrite_HU']
                  font-bold
                "
              >
                0
              </motion.span>
            </motion.button>

            <motion.button 
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="md:hidden p-3 rounded-full bg-[var(--card-background)]"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-[var(--foreground)]" />
              ) : (
                <Home className="h-6 w-6 text-[var(--foreground)]" />
              )}
            </motion.button>

            <motion.button 
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--brass-600)' 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="
                hidden md:flex
                px-6 py-3 
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
              <ShoppingBag className="h-6 w-6" />
              <span className="font-semibold">Hacer Pedido</span>
            </motion.button>
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
                "
              >
                <div className="flex flex-col items-center py-6 space-y-6">
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
                      <link.icon className="h-7 w-7" />
                      <span>{link.label}</span>
                    </motion.a>
                  ))}
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'var(--brass-600)' 
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="
                      px-6 py-3 
                      bg-[var(--brass-500)] 
                      text-white  
                      rounded-full 
                      flex 
                      items-center 
                      space-x-2
                      shadow-md
                    "
                  >
                    <ShoppingBag className="h-6 w-6" />
                    <span>Hacer Pedido</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default PizzaHeader;