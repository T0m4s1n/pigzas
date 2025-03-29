"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, PizzaIcon, ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-6 pt-24 min-h-screen flex flex-col md:flex-row items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            type: "spring",
            bounce: 0.3
          }
        }}
        className="w-full md:w-1/2 mb-12 md:mb-0 md:mr-12"
      >
        <img 
          src="./pigza.png" 
          alt="Delicious Pigzas Pizza" 
          className="w-full"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 text-[var(--foreground)]"
      >
        <div className="flex items-center space-x-4 mb-6">
          <Pizza className="h-10 w-10 text-[var(--accent)]" />
          <h1 className="font-['Dancing_Script'] font-bold text-4xl text-[var(--foreground)]">
            Pigzas
          </h1>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">
          Tu Pizza, Tu Diseño
        </h2>

        <p className="text-lg mb-6 leading-relaxed">
          Diseña tu pizza perfecta con ingredientes frescos. Cada pizza, una creación única. Transforma tu hambre en una experiencia culinaria personalizada.
        </p>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <PizzaIcon className="h-7 w-7 text-[var(--accent)]" />
            <span>Personaliza ingredientes</span>
          </div>
          <div className="flex items-center space-x-3">
            <Pizza className="h-7 w-7 text-[var(--accent)]" />
            <span>Recetas originales</span>
          </div>
          <div className="flex items-center space-x-3">
            <ShoppingBag className="h-7 w-7 text-[var(--accent)]" />
            <span>Entrega rápida</span>
          </div>
        </div>

        <motion.button 
          whileHover={{ 
            scale: 1.05,
            backgroundColor: 'var(--brass-600)' 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="
            mt-8 
            px-8 py-4 
            bg-[var(--brass-500)] 
            text-white  
            rounded-full 
            flex 
            items-center 
            space-x-3
            shadow-md
            hover:shadow-lg
            text-lg
            font-semibold
          "
        >
          <ShoppingBag className="h-7 w-7" />
          <span>Comenzar a Diseñar</span>
        </motion.button>
      </motion.div>
    </div>
  );
};