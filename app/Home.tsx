"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pizza, PizzaIcon, ShoppingBag, Info } from 'lucide-react';
import PigzasBackground from './Pizzabackground';
import ShoppingCart from './Shoppingcart';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [currentPizza, setCurrentPizza] = useState<{
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    details: string;
    prepTime: string;
  } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ id: string; size: string; quantity: number; }[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartService = {
    getItems: () => cartItems,
    addItem: (item: { id: string; size: string; quantity: number; }) => {
      const existingItemIndex = cartItems.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        setCartItems(updatedItems);
      } else {
        setCartItems([...cartItems, item]);
      }
    },
    updateItemQuantity: (id: string, quantity: number) => {
      setCartItems(items => 
        items.map(item => item.id === id ? { ...item, quantity } : item)
      );
    },
    removeItem: (id: string) => {
      setCartItems(items => items.filter(item => item.id !== id));
    },
    clearCart: () => {
      setCartItems([]);
    }
  };
  
  const pizzaFlavors = [
    {
      id: 1,
      name: "Clásica Margherita",
      description: "Tomate, mozzarella fresca, albahaca y aceite de oliva",
      price: 16900,
      image: "./marguerita.jpg",
      details: "Una pizza tradicional italiana con ingredientes frescos. La base perfecta de masa crujiente, salsa de tomate casera, mozzarella de búfala y albahaca fresca del huerto.",
      prepTime: "12 minutos"
    },
    {
      id: 2,
      name: "Pepperoni Suprema",
      description: "Pepperoni, mozzarella, salsa de tomate y orégano",
      price: 25900,
      image: "./peperroni.jpg",
      details: "Nuestra pizza más popular. Generosas capas de pepperoni picante, queso mozzarella derretido y una pizca de orégano italiano para darle ese sabor auténtico.",
      prepTime: "15 minutos"
    },
    {
      id: 3,
      name: "Vegetariana Deluxe",
      description: "Pimientos, champiñones, cebolla, aceitunas y queso",
      price: 24900,
      image: "./veg.jpg",
      details: "Una explosión de sabores vegetales. Pimientos frescos, champiñones salteados, cebolla caramelizada, aceitunas negras y una mezcla de quesos gourmet sobre nuestra masa artesanal.",
      prepTime: "18 minutos"
    },
    {
      id: 4,
      name: "Hawaiana Especial",
      description: "Jamón, piña, mozzarella y salsa de tomate",
      price: 19900,
      image: "./hawai.jpg",
      details: "La combinación perfecta de dulce y salado. Jamón premium, trozos de piña fresca y mozzarella cremosa sobre una base de salsa de tomate casera con un toque de especias.",
      prepTime: "14 minutos"
    },
  ];

  const handleAddToCart = (pizzaId: number) => {
    const pizza = pizzaFlavors.find(p => p.id === pizzaId);
    if (pizza) {
      const cartItem = {
        id: `${pizza.id}-medium`,
        name: pizza.name,
        size: "Mediana",
        price: pizza.price,
        quantity: 1,
        image: pizza.image
      };
      
      cartService.addItem(cartItem);

      setIsCartOpen(true);
    }
  };

  const openDetailModal = (pizzaId: number) => {
    const pizza = pizzaFlavors.find(p => p.id === pizzaId);
    if (pizza) {
      setCurrentPizza(pizza);
      setShowModal(true);
    }
  };

  return (
    <>
      <span className="fixed inset-0 z-[0]">
        <PigzasBackground />
      </span>
      
      <main className="container mx-auto px-6 pt-24 min-h-screen flex flex-col md:flex-row items-center justify-between relative z-1">
        <motion.section 
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
            src="/pigza.png"
            alt="Delicious Pigzas Pizza" 
            className="w-full"
          />
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 text-[var(--foreground)] bg-opacity-50 p-6 rounded-lg"
        >
          <header className="flex items-center space-x-4 mb-6">
            <Pizza className="h-10 w-10 text-[var(--accent)]" />
            <h1 className="font-['Dancing_Script'] font-bold text-4xl text-[var(--foreground)]">
              Pigzas
            </h1>
          </header>

          <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">
            Tu Pizza, Tu Eleccion
          </h2>

          <p className="text-lg mb-6 leading-relaxed">
            Diseña tu pizza perfecta con ingredientes frescos. Cada pizza, una creación única. Transforma tu hambre en una experiencia culinaria personalizada.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <PizzaIcon className="h-7 w-7 text-[var(--accent)]" />
              <span>Personaliza ingredientes</span>
            </li>
            <li className="flex items-center space-x-3">
              <Pizza className="h-7 w-7 text-[var(--accent)]" />
              <span>Recetas originales</span>
            </li>
            <li className="flex items-center space-x-3">
              <ShoppingBag className="h-7 w-7 text-[var(--accent)]" />
              <span>Entrega rápida</span>
            </li>
          </ul>

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
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-7 w-7" />
            <span>Comenzar a Diseñar</span>
          </motion.button>
        </motion.section>
      </main>
    
      <section className="container mx-auto px-6 py-24 relative z-1 mb-24">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--accent)] mb-4">Nuestras Especialidades</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Descubre nuestra selección de pizzas artesanales, elaboradas con los mejores ingredientes y nuestra pasión por la cocina italiana.
          </p>
        </header>
        
        <motion.article 
          className="mb-16 bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <section className="flex flex-col md:flex-row">
            <figure className="md:w-1/2 h-64 md:h-auto relative cursor-pointer" onClick={() => openDetailModal(pizzaFlavors[1].id)}>
              <span 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${pizzaFlavors[1].image})` }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></span>
              </span>
              <span className="absolute top-4 left-4 bg-[var(--brass-500)] text-white px-4 py-1 rounded-full text-sm font-medium">
                Más Popular
              </span>
            </figure>
            <section className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <header className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-[var(--accent)]">{pizzaFlavors[1].name}</h3>
                <span className="text-xl font-semibold text-[var(--brass-500)]">
                  ${pizzaFlavors[1].price.toLocaleString('es-CO')}
                </span>
              </header>
              
              <p className="text-gray-700 mb-6">
                {pizzaFlavors[1].details}
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.03, backgroundColor: 'var(--brass-600)' }}
                whileTap={{ scale: 0.97 }}
                className="py-3 bg-[var(--brass-500)] text-white rounded-full font-medium flex items-center justify-center space-x-2"
                onClick={() => handleAddToCart(pizzaFlavors[1].id)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Añadir al Carrito</span>
              </motion.button>
            </section>
          </section>
        </motion.article>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzaFlavors.filter(pizza => pizza.id !== 2).map((pizza, index) => (
            <motion.li 
              key={pizza.id}
              className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: index * 0.1,
                  duration: 0.5
                }
              }}
              whileHover={{ y: -5 }}
            >
              <figure 
                className="h-48 bg-cover bg-center relative cursor-pointer"
                style={{ backgroundImage: `url(${pizza.image})` }}
                onClick={() => openDetailModal(pizza.id)}
              >
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{pizza.name}</h3>
                </figcaption>
              </figure>
              <section className="p-4">
                <header className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    {pizza.prepTime}
                  </span>
                  <span className="font-bold text-[var(--brass-500)]">
                    ${pizza.price.toLocaleString('es-CO')}
                  </span>
                </header>
                <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                  {pizza.description}
                </p>
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: 'var(--brass-600)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-[var(--brass-500)] text-white text-sm rounded-lg font-medium flex items-center justify-center space-x-2"
                  onClick={() => handleAddToCart(pizza.id)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Añadir al Carrito</span>
                </motion.button>
              </section>
            </motion.li>
          ))}
        </ul>
      </section>
      
      {showModal && currentPizza && (
        <motion.aside 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowModal(false)}
        >
          <motion.article 
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <figure className="relative h-64 md:h-80">
              <span 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentPizza.image})` }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></span>
              </span>
              <motion.button 
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/80 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
              >
                <span className="text-2xl">&times;</span>
              </motion.button>
              <figcaption className="absolute bottom-0 left-0 p-6">
                <h2 className="text-white text-3xl font-bold">{currentPizza.name}</h2>
              </figcaption>
            </figure>
            
            <section className="p-6 overflow-y-auto">
              <header className="flex justify-between items-center mb-6">
                <span className="flex items-center space-x-2">
                  <span className="bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-sm">
                    {currentPizza.prepTime}
                  </span>
                </span>
                <span className="text-2xl font-bold text-[var(--brass-500)]">
                  ${currentPizza.price.toLocaleString('es-CO')}
                </span>
              </header>
              
              <section className="mb-8">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Ingredientes</h3>
                <p className="text-gray-700">{currentPizza.description}</p>
              </section>
              
              <section className="mb-8">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Detalles</h3>
                <p className="text-gray-700">{currentPizza.details}</p>
              </section>
              
              <motion.button 
                whileHover={{ scale: 1.03, backgroundColor: 'var(--brass-600)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 bg-[var(--brass-500)] text-white rounded-xl font-medium flex items-center justify-center space-x-2"
                onClick={() => {
                  handleAddToCart(currentPizza.id);
                  setShowModal(false);
                }}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Añadir al Carrito</span>
              </motion.button>
            </section>
          </motion.article>
        </motion.aside>
      )}
      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        // @ts-expect-error error
        cartService={cartService}
      />
    </>
  );
}