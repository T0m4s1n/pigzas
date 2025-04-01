"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pizza, Plus, ShoppingBag, Info, X, Clock } from 'lucide-react';
import PizzaHeader from '../Header';
import { useRouter } from 'next/navigation';
import PigzasBackground from '../Pizzabackground';
import ShoppingCart from '../Shoppingcart';

// Define CartItem interface (same as in ShoppingCart)
export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

// Create a CartService class for managing the cart
class CartService {
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Load cart from localStorage on initialization
    this.loadCart();
  }

  private loadCart(): void {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }

  private saveCart(): void {
    localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    // Notify all listeners that cart has changed
    this.listeners.forEach(listener => listener());
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  addItem(item: CartItem): void {
    // Check if the item already exists (by name and size)
    const existingItemIndex = this.items.findIndex(
      i => i.name === item.name && i.size === item.size
    );

    if (existingItemIndex >= 0) {
      // If item exists, increment quantity
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Otherwise add new item
      this.items.push(item);
    }
    
    this.saveCart();
  }

  updateItemQuantity(id: string, quantity: number): void {
    if (quantity < 1) return;
    
    const index = this.items.findIndex(item => item.id === id);
    if (index >= 0) {
      this.items[index].quantity = quantity;
      this.saveCart();
    }
  }

  removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
  }

  clearCart(): void {
    this.items = [];
    this.saveCart();
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export default function Menu() {
  const router = useRouter();
  const [cartService] = useState(new CartService());
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
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
      price: 16000,
      image: "./marguerita.jpg",
      details: "Una pizza tradicional italiana con ingredientes frescos. La base perfecta de masa crujiente, salsa de tomate casera, mozzarella de búfala y albahaca fresca del huerto.",
      prepTime: "12 minutos"
    },
    {
      id: 2,
      name: "Pepperoni Suprema",
      description: "Pepperoni, mozzarella, salsa de tomate y orégano",
      price: 25999,
      image: "./peperroni.jpg",
      details: "Nuestra pizza más popular. Generosas capas de pepperoni picante, queso mozzarella derretido y una pizca de orégano italiano para darle ese sabor auténtico.",
      prepTime: "15 minutos"
    },
    {
      id: 3,
      name: "Vegetariana Deluxe",
      description: "Pimientos, champiñones, cebolla, aceitunas y queso",
      price: 24999,
      image: "./veg.jpg",
      details: "Una explosión de sabores vegetales. Pimientos frescos, champiñones salteados, cebolla caramelizada, aceitunas negras y una mezcla de quesos gourmet sobre nuestra masa artesanal.",
      prepTime: "18 minutos"
    },
    {
      id: 4,
      name: "Hawaiana Especial",
      description: "Jamón, piña, mozzarella y salsa de tomate",
      price: 19999,
      image: "./hawai.jpg",
      details: "La combinación perfecta de dulce y salado. Jamón premium, trozos de piña fresca y mozzarella cremosa sobre una base de salsa de tomate casera con un toque de especias.",
      prepTime: "14 minutos"
    },
    {
      id: 5,
      name: "Cuatro Quesos",
      description: "Mozzarella, gorgonzola, parmesano y queso de cabra",
      price: 27999,
      image: "./queso.jpg",
      details: "Un festín para los amantes del queso. Cuatro quesos seleccionados: mozzarella, gorgonzola, parmesano y queso de cabra, todo derretido sobre nuestra masa crujiente con salsa de tomate.",
      prepTime: "16 minutos"
    },
    {
      id: 6,
      name: "Carnívora Extrema",
      description: "Carne molida, salchicha, jamón, tocino y pepperoni",
      price: 29999,
      image: "./jefe.jpg",
      details: "Para verdaderos amantes de la carne. Combinamos cinco tipos de carnes premium sobre nuestra deliciosa masa artesanal, con salsa de tomate especial y una generosa capa de queso mozzarella.",
      prepTime: "20 minutos"
    }
  ]);

  // Subscribe to cart changes
  useEffect(() => {
    const updateCartCount = () => {
      setCartItemCount(cartService.getItemCount());
    };
    
    // Initial count
    updateCartCount();
    
    // Subscribe to future changes
    const unsubscribe = cartService.subscribe(updateCartCount);
    
    // Cleanup subscription
    return unsubscribe;
  }, [cartService]);

  // Function to add pizza to cart
  const addToCart = (pizza: typeof pizzas[number], size = "Mediana") => {
    const cartItem: CartItem = {
      id: `${pizza.id}-${Date.now()}`, // Ensure unique ID for cart items
      name: pizza.name,
      size: size,
      price: pizza.price / 100, // Convert to Euros format (assuming price is in cents)
      quantity: 1,
      image: pizza.image
    };
    
    cartService.addItem(cartItem);
    
    // Show cart feedback
    const timer = setTimeout(() => {
      setIsCartOpen(true);
    }, 300);
    
    return () => clearTimeout(timer);
  };

  const showPizzaDetails = (pizza: typeof pizzas[number]) => {
    setSelectedPizza(pizza);
  };

  const closeDetails = () => {
    setSelectedPizza(null);
  };

  const goToDesignPage = () => {
    router.push('/Design');
  };

  // Format price with dot as thousands separator and COP currency
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CO', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
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

      {/* Shopping Cart Button */}
      <motion.button
        className="fixed right-6 bottom-6 z-30 bg-[var(--brass-500)] text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
        whileHover={{ scale: 1.1, backgroundColor: 'var(--brass-600)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingBag className="h-6 w-6" />
        {cartItemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-white text-[var(--brass-500)] rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm"
          >
            {cartItemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Shopping Cart Component */}
      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartService={cartService}
      />

      <PizzaHeader onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      <PigzasBackground />
      
      <div className="container mx-auto px-6 py-16 min-h-screen">
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
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-4 mt-8">
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
                  <span className="font-bold text-[var(--accent)]">${formatPrice(pizza.price)}</span>
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
                    onClick={() => addToCart(pizza)}
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
      </div>

      {/* Pizza Detail Modal */}
      <AnimatePresence>
        {selectedPizza && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={closeDetails}
            />
            
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
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
                  <span className="font-bold text-xl text-[var(--accent)]">${formatPrice(selectedPizza.price)}</span>
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
                    onClick={() => {
                      addToCart(selectedPizza);
                      closeDetails();
                    }}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Añadir al Carrito</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}