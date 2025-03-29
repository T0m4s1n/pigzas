"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pizza, Plus, ShoppingBag, Info, X, Clock } from 'lucide-react';
import PizzaHeader from '../Header';
import { useRouter } from 'next/navigation';

export default function Menu() {
  const router = useRouter();
  const [selectedPizza, setSelectedPizza] = useState<{
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    details: string;
    prepTime: string;
  } | null>(null);
  
  const [pizzas] = useState([
    {
      id: 1,
      name: "Clásica Margherita",
      description: "Tomate, mozzarella fresca, albahaca y aceite de oliva",
      price: 12.99,
      image: "./marguerita.jpg",
      details: "Una pizza tradicional italiana con ingredientes frescos. La base perfecta de masa crujiente, salsa de tomate casera, mozzarella de búfala y albahaca fresca del huerto.",
      prepTime: "12 minutos"
    },
    {
      id: 2,
      name: "Pepperoni Suprema",
      description: "Pepperoni, mozzarella, salsa de tomate y orégano",
      price: 14.99,
      image: "./peperroni.jpg",
      details: "Nuestra pizza más popular. Generosas capas de pepperoni picante, queso mozzarella derretido y una pizca de orégano italiano para darle ese sabor auténtico.",
      prepTime: "15 minutos"
    },
    {
      id: 3,
      name: "Vegetariana Deluxe",
      description: "Pimientos, champiñones, cebolla, aceitunas y queso",
      price: 13.99,
      image: "./veg.jpg",
      details: "Una explosión de sabores vegetales. Pimientos frescos, champiñones salteados, cebolla caramelizada, aceitunas negras y una mezcla de quesos gourmet sobre nuestra masa artesanal.",
      prepTime: "18 minutos"
    },
    {
      id: 4,
      name: "Hawaiana Especial",
      description: "Jamón, piña, mozzarella y salsa de tomate",
      price: 15.99,
      image: "./hawai.jpg",
      details: "La combinación perfecta de dulce y salado. Jamón premium, trozos de piña fresca y mozzarella cremosa sobre una base de salsa de tomate casera con un toque de especias.",
      prepTime: "14 minutos"
    }
  ]);


  const showPizzaDetails = (pizza: { id: number; name: string; description: string; price: number; image: string; details: string; prepTime: string }) => {
    setSelectedPizza(pizza);
  };


  const closeDetails = () => {
    setSelectedPizza(null);
  };


  const goToDesignPage = () => {
    router.push('/design');
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+HU:wght@100..400&display=swap');
        
        body {
          font-family: 'Playwrite HU', cursive;
        }
      `}</style>

      <PizzaHeader />

      <div className="container mx-auto px-6 py-32 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Pizza className="h-10 w-10 text-[var(--accent)]" />
            <h1 className="font-['Dancing_Script'] font-bold text-4xl text-[var(--foreground)]">
              Menú Pigzas
            </h1>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">
            Nuestras Creaciones Especiales
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Descubre nuestras pizzas cuidadosamente diseñadas por nuestros chefs. Sabores tradicionales y combinaciones únicas para satisfacer todos los gustos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza, index) => (
            <motion.div
              key={pizza.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                bounce: 0.2
              }}
              className="bg-[var(--card-background)] rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{pizza.name}</h3>
                  <span className="font-bold text-[var(--accent)]">${pizza.price}</span>
                </div>
                <p className="text-[var(--foreground-muted)] mb-4">{pizza.description}</p>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'var(--brass-600)' 
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="
                      flex-1
                      px-4 py-2
                      bg-[var(--brass-500)]
                      text-white
                      rounded-full
                      flex
                      items-center
                      justify-center
                      space-x-2
                      shadow-md
                      hover:shadow-lg
                      font-medium
                    "
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Añadir</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="
                      px-4 py-2
                      border border-[var(--accent)]
                      text-[var(--accent)]
                      rounded-full
                      flex
                      items-center
                      justify-center
                      shadow-md
                      hover:shadow-lg
                      hover:bg-[var(--card-hover)]
                    "
                    onClick={() => showPizzaDetails(pizza)}
                  >
                    <Info className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">
            ¿Prefieres crear tu propia pizza?
          </h2>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'var(--brass-600)' 
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="
              mt-4 
              px-8 py-4 
              bg-[var(--brass-500)] 
              text-white  
              rounded-full 
              flex 
              items-center 
              justify-center
              space-x-3
              shadow-md
              hover:shadow-lg
              text-lg
              font-semibold
              mx-auto
            "
            onClick={goToDesignPage}
          >
            <Plus className="h-6 w-6" />
            <span>Diseña Tu Propia Pizza</span>
          </motion.button>
        </motion.div>
      </div>

      {selectedPizza && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--card-background)] rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border-2 border-[var(--accent)]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[var(--foreground)]">{selectedPizza.name}</h3>
              <motion.button 
                onClick={closeDetails}
                whileHover={{ scale: 1.1, backgroundColor: 'var(--brass-500)' }}
                whileTap={{ scale: 0.95 }}
                className="
                  h-10 w-10
                  flex items-center justify-center
                  rounded-full
                  text-[var(--foreground)]
                  bg-[var(--card-hover)]
                  hover:text-white
                  shadow-md
                "
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
            
            <div className="relative h-48 overflow-hidden rounded-lg mb-4">
              <img
                src={selectedPizza.image}
                alt={selectedPizza.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-[var(--foreground)] mb-4">{selectedPizza.details}</p>
            
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 mr-2 text-[var(--accent)]" />
              <span className="text-[var(--foreground-muted)]">Tiempo de preparación: <strong>{selectedPizza.prepTime}</strong></span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl text-[var(--accent)]">${selectedPizza.price}</span>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'var(--brass-600)' 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="
                  px-4 py-2
                  bg-[var(--brass-500)]
                  text-white
                  rounded-full
                  flex
                  items-center
                  justify-center
                  space-x-2
                  shadow-md
                  hover:shadow-lg
                  font-medium
                "
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Añadir al Carrito</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}