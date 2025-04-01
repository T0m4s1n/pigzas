"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PizzaHeader from '../Header';
import PigzasBackground from '../Pizzabackground';
import {
    Pizza,
    ShoppingBag,
    ChevronRight,
    ChevronLeft,
    Clock,
    Trash2,
    Scissors,
    Check,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const PizzaDesigner = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [pizzaSize, setPizzaSize] = useState<'small' | 'medium' | 'large' | 'xl'>('medium');
    const [pizzaCrust, setPizzaCrust] = useState<'thin' | 'traditional' | 'thick' | 'stuffed'>('traditional');
    const [twoFlavors, setTwoFlavors] = useState(false);
    // Removed duplicate Ingredient interface declaration
    
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
    const [bakingTime, setBakingTime] = useState(15);
    const [cutStyle, setCutStyle] = useState('traditional');
    const [price, setPrice] = useState(18900);
    const pizzaRef = useRef(null);
    
    // Pizza visualization sizes based on selected size
    const pizzaSizeDimensions = {
        small: { outerInset: 3, innerInset: 9, scale: 0.85 },
        medium: { outerInset: 2, innerInset: 8, scale: 1 },
        large: { outerInset: 1.5, innerInset: 7, scale: 1.1 },
        xl: { outerInset: 1, innerInset: 6, scale: 1.2 },
    };

    // Pizza crust visualization based on selected crust
    const pizzaCrustStyles = {
        thin: { crustWidth: 1, crustColor: '#C8964E' },
        traditional: { crustWidth: 2, crustColor: '#C8964E' },
        thick: { crustWidth: 3, crustColor: '#C8964E' },
        stuffed: { crustWidth: 3, crustColor: '#E6BB7B' }, // Slightly different color for stuffed
    };
    
    // Baking time affects pizza color
    const bakingTimeColors = {
        10: { baseColor: '#FEE975', crustAdjustment: -10 }, // Lighter
        15: { baseColor: '#FDC234', crustAdjustment: 0 },   // Normal
        20: { baseColor: '#E6A328', crustAdjustment: 10 },  // Darker/more baked
    };

    const ingredientCategories = React.useMemo(() => [
        {
                name: "Proteínas",
                items: [
                        { id: 'pepperoni', name: 'Pepperoni', image: './assets/peperoni.png', price: 2500 },
                        { id: 'ham', name: 'Jamón', image: '/ham.png', price: 4000 },
                        { id: 'chicken', name: 'Pollo', image: '/chicken.png', price: 2500 },
                        { id: 'bacon', name: 'Tocino', image: '/bacon.png', price: 2000 },
                ]
        },
        {
                name: "Vegetales",
                items: [
                        { id: 'mushroom', name: 'Champiñones', image: '/mushroom.png', price: 1500 },
                        { id: 'pepper', name: 'Pimiento', image: '/pepper.png', price: 1000 },
                        { id: 'onion', name: 'Cebolla', image: '/onion.png', price: 1000 },
                        { id: 'olive', name: 'Aceitunas', image: '/olive.png', price: 1500 },
                ]
        },
        {
                name: "Quesos",
                items: [
                        { id: 'mozzarella', name: 'Mozzarella', image: '/mozzarella.png', price: 2000 },
                        { id: 'cheddar', name: 'Cheddar', image: '/cheddar.png', price: 2000 },
                        { id: 'parmesan', name: 'Parmesano', image: '/parmesan.png', price: 2500 },
                        { id: 'gouda', name: 'Gouda', image: '/gouda.png', price: 2500 },
                ]
        },
        {
                name: "Extras",
                items: [
                        { id: 'pineapple', name: 'Piña', image: '/pineapple.png', price: 1500 },
                        { id: 'basil', name: 'Albahaca', image: '/basil.png', price: 500 },
                        { id: 'arugula', name: 'Rúcula', image: '/arugula.png', price: 1000 },
                        { id: 'chili', name: 'Chile', image: '/chili.png', price: 500 },
                ]
        }
    ], []);


    const cutStyles = [
        { id: 'traditional', name: 'Tradicional', image: '/traditional-cut.png' },
        { id: 'square', name: 'Cuadrados', image: '/square-cut.png' },
        { id: 'strips', name: 'Tiras', image: '/strips-cut.png' },
        { id: 'uncut', name: 'Sin Cortar', image: '/uncut.png' },
    ];


    const sizeOptions = React.useMemo(() => [
      { id: 'small', name: 'Pequeña', priceMultiplier: 0.8, slices: 6 } as const,
      { id: 'medium', name: 'Mediana', priceMultiplier: 1, slices: 8 } as const,
      { id: 'large', name: 'Grande', priceMultiplier: 1.2, slices: 10 } as const,
      { id: 'xl', name: 'Extra Grande', priceMultiplier: 1.5, slices: 12 } as const,
    ], []);


    const crustOptions = React.useMemo(() => [
        { id: 'traditional', name: 'Tradicional', price: 0 } as const,
        { id: 'thin', name: 'Delgada', price: 0 } as const,
        { id: 'thick', name: 'Gruesa', price: 1000 } as const,
        { id: 'stuffed', name: 'Rellena de Queso', price: 3000 } as const,
    ], []);

    // Update price calculation when any relevant state changes
    React.useEffect(() => {
        let basePrice = 10000;
        
        const selectedSize = sizeOptions.find(size => size.id === pizzaSize);
        basePrice = basePrice * (selectedSize?.priceMultiplier ?? 1);

        const selectedCrust = crustOptions.find(crust => crust.id === pizzaCrust);
        basePrice += selectedCrust?.price ?? 0;

        const ingredientsPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
        
        basePrice += ingredientsPrice;
        
        if (twoFlavors) {
            basePrice += 2000;
        }
        
        setPrice(Number(basePrice.toFixed(0)));
    }, [pizzaSize, pizzaCrust, twoFlavors, selectedIngredients, crustOptions, sizeOptions]);

    interface Ingredient {
        id: string;
        name: string;
        image: string;
        price: number;
    }

    const addIngredient = (ingredient: Ingredient) => {
        setSelectedIngredients(prev => [...prev, ingredient]);
    };

    const removeIngredient = (ingredientId: string) => {
        setSelectedIngredients(prev => prev.filter(ing => ing.id !== ingredientId));
    };

    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const addToCart = () => {
        alert("¡Pizza personalizada añadida al carrito!");
        router.push('');
    };

    // Common pizza visualization component for consistency across steps
    const PizzaVisualization = ({ showIngredients = true, showCutStyle = false, size = "md", twoFlavors = false, pizzaCrust, selectedIngredients = [] }: { showIngredients?: boolean; showCutStyle?: boolean; size?: string; twoFlavors?: boolean; pizzaCrust?: 'traditional' | 'thin' | 'thick' | 'stuffed'; selectedIngredients?: Ingredient[] }) => {
        const dimensions = pizzaSizeDimensions[pizzaSize];
        const crustStyle = pizzaCrust ? pizzaCrustStyles[pizzaCrust] : pizzaCrustStyles['traditional'];
        const bakingColor = bakingTimeColors[bakingTime as keyof typeof bakingTimeColors] || bakingTimeColors[15]; // Default to 15 if invalid
        
        // Size classes based on prop
        const sizeClasses = {
            sm: "w-32 h-32",
            md: "w-64 h-64",
            lg: "w-full aspect-square",
        }[size] || "w-64 h-64";

        return (
            <div 
                className={`${sizeClasses} bg-[var(--card-hover)] rounded-full mx-auto relative overflow-hidden border-4 border-[var(--brass-600)]`}
                style={{ maxWidth: size === "lg" ? "400px" : undefined }}
            >
                {/* Pizza crust (outer edge) */}
                <div className="absolute inset-2 rounded-full" 
                    style={{ 
                        backgroundColor: crustStyle.crustColor,
                        inset: `${dimensions.outerInset}px`
                    }}
                ></div>
                
                {/* Pizza base (cheese) */}
                <div className="absolute rounded-full" 
                    style={{ 
                        backgroundColor: bakingColor.baseColor,
                        inset: `${dimensions.innerInset}px` 
                    }}
                ></div>
                
                {/* Divider for half and half pizza */}
                {twoFlavors && (
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-[var(--brass-600)] transform -translate-x-1/2 z-10"></div>
                )}

                {/* Render ingredients if showing them */}
                {showIngredients && selectedIngredients.flatMap((ingredient, ingredientIndex) => {
                    // Removed unused variable isTwoFlavors
                    // Create 3-7 instances of each ingredient based on ingredient type
                    const instanceCount = ingredient.id.includes('cheese') ? 7 : 
                                        ingredient.id.includes('pepperoni') ? 6 : 
                                        ingredient.id.includes('olive') ? 5 : 4;
                    
                    return Array.from({ length: instanceCount }).map((_, instanceIndex) => {
                        const randomAngle = (ingredientIndex * 30 + instanceIndex * 50) % 360;
                        const randomRadius = 10 + (instanceIndex * 30 + ingredientIndex * 5) % 30;
                        const angleInRadians = (randomAngle * Math.PI) / 180;
                        
                        // Calculate x,y position using polar coordinates
                        const posX = 50 + randomRadius * Math.cos(angleInRadians);
                        const posY = 50 + randomRadius * Math.sin(angleInRadians);
                        
                        // Skip if we're doing half-and-half and this ingredient should be on the other half
                        if (twoFlavors) {
                            const isLeftHalf = posX < 50;
                            if ((ingredientIndex % 2 === 0 && !isLeftHalf) || 
                                (ingredientIndex % 2 === 1 && isLeftHalf)) {
                                return null;
                            }
                        }
                        
                        // Random rotation for visual interest
                        const rotation = (ingredientIndex * 20 + instanceIndex * 40) % 360;
                        
                        // Size based on ingredient type and pizza size
                        const baseSize = ingredient.id === 'olive' || ingredient.id === 'pepperoni' ? 6 :
                                        ingredient.id === 'pineapple' ? 7 : 8;
                                       
                        const sizePx = baseSize * (dimensions.scale || 1);
                        
                        return (
                            <motion.div
                                key={`${ingredient.id}-${ingredientIndex}-${instanceIndex}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: instanceIndex * 0.05 }}
                                className="absolute flex items-center justify-center"
                                style={{
                                    left: `${posX}%`,
                                    top: `${posY}%`,
                                    width: `${sizePx}px`,
                                    height: `${sizePx}px`,
                                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                                    zIndex: 5 + ingredientIndex
                                }}
                            >
                                <img 
                                    src={`/api/placeholder/32/32?text=${ingredient.id}`} 
                                    alt={ingredient.name}
                                    className="object-contain w-full h-full"
                                    style={{ 
                                        transform: ingredient.id === 'pineapple' ? 'rotate(45deg)' : 'none'
                                    }}
                                />
                            </motion.div>
                        );
                    }).filter(Boolean); // Remove null entries (for half pizzas)
                })}

                {/* Render cut style if showing it */}
                {showCutStyle && cutStyle && (
                    <>
                        {cutStyle === 'traditional' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-0.5 bg-white opacity-70"></div>
                                <div className="h-full w-0.5 bg-white opacity-70"></div>
                                <div className="w-3/4 h-0.5 bg-white opacity-70 rotate-45 absolute"></div>
                                <div className="w-3/4 h-0.5 bg-white opacity-70 -rotate-45 absolute"></div>
                            </div>
                        )}
                        
                        {cutStyle === 'square' && (
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                                <div className="border border-white opacity-70"></div>
                                <div className="border border-white opacity-70"></div>
                                <div className="border border-white opacity-70"></div>
                                <div className="border border-white opacity-70"></div>
                                <div className="border border-white opacity-70"></div>
                                <div className="border border-white opacity-70"></div>
                                <div className="border border-white opacity-70"></div>
                                <div className="border border-white opacity-70"></div>
                                <div className="border border-white opacity-70"></div>
                            </div>
                        )}
                        
                        {cutStyle === 'strips' && (
                            <div className="absolute inset-0 flex flex-col">
                                <div className="flex-1 border-b border-white opacity-70"></div>
                                <div className="flex-1 border-b border-white opacity-70"></div>
                                <div className="flex-1 border-b border-white opacity-70"></div>
                                <div className="flex-1 border-b border-white opacity-70"></div>
                                <div className="flex-1"></div>
                            </div>
                        )}
                        
                        {cutStyle === 'uncut' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Scissors className="h-12 w-12 text-white opacity-70" style={{ transform: 'rotate(45deg)' }} />
                                <div className="absolute h-12 w-12 flex items-center justify-center">
                                    <div className="h-full w-0.5 bg-white rotate-45"></div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    };

const renderStepContent = () => {
  switch(currentStep) {
      case 1:
          return (
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-2/5 flex justify-center">
                      <PizzaVisualization showIngredients={false} size="lg" />
                  </div>
                  
                  <div className="lg:w-3/5 space-y-8">
                      <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-[var(--foreground)]">1. Selecciona el tamaño</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {sizeOptions.map(size => (
                              <motion.div
                              key={size.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setPizzaSize(size.id)}
                              className={`
                                  p-4 rounded-lg cursor-pointer text-center border-2
                                  ${pizzaSize === size.id ? 
                                  'bg-[var(--brass-500)] text-white border-[var(--accent-dark)]' : 
                                  'bg-[var(--card-hover)] text-[var(--foreground)] border-[var(--border)]'}
                              `}
                              >
                              <div className="flex justify-center mb-2">
                                  <Pizza 
                                  className={`h-10 w-10 ${pizzaSize === size.id ? 'text-white' : 'text-[var(--accent)]'}`} 
                                  style={{ transform: `scale(${0.7 + sizeOptions.findIndex(s => s.id === size.id) * 0.1})` }} 
                                  />
                              </div>
                              <div className="font-semibold">{size.name}</div>
                              <div className={`text-sm ${pizzaSize === size.id ? 'text-white' : 'text-[var(--accent)]'}`}>
                                  {size.slices} rebanadas
                              </div>
                              </motion.div>
                          ))}
                          </div>
                      </div>
                      
                      <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-[var(--foreground)]">2. Tipo de masa</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {crustOptions.map(crust => (
                              <motion.div
                              key={crust.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setPizzaCrust(crust.id)}
                              className={`
                                  p-4 rounded-lg cursor-pointer text-center border-2 
                                  ${pizzaCrust === crust.id ? 
                                  'bg-[var(--brass-500)] text-white border-[var(--accent-dark)]' : 
                                  'bg-[var(--card-hover)] text-[var(--foreground)] border-[var(--border)]'}
                              `}
                              >
                              <div className="font-semibold">{crust.name}</div>
                              {crust.price > 0 && 
                                  <div className={`text-sm ${pizzaCrust === crust.id ? 'text-white' : 'text-[var(--accent)]'}`}>
                                  +${crust.price}
                                  </div>
                              }
                              </motion.div>
                          ))}
                          </div>
                      </div>
                      
                      <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-[var(--foreground)]">3. ¿Mitad y mitad?</h3>
                          <div className="flex space-x-4">
                          <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setTwoFlavors(false)}
                              className={`
                              px-6 py-3 rounded-lg flex-1 border-2
                              ${!twoFlavors ? 
                                  'bg-[var(--brass-500)] text-white border-[var(--accent-dark)]' : 
                                  'bg-[var(--card-hover)] text-[var(--foreground)] border-[var(--border)]'}
                              `}
                          >
                              Una sola
                          </motion.button>
                          <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setTwoFlavors(true)}
                              className={`
                              px-6 py-3 rounded-lg flex-1 border-2
                              ${twoFlavors ? 
                                  'bg-[var(--brass-500)] text-white border-[var(--accent-dark)]' : 
                                  'bg-[var(--card-hover)] text-[var(--foreground)] border-[var(--border)]'}
                              `}
                          >
                              Mitad y mitad (+$2000)
                          </motion.button>
                          </div>
                      </div>
                  </div>
              </div>
          );
      case 2:
          return (
              <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2 space-y-6">
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">Elige tus ingredientes</h3>
                  
                  {ingredientCategories.map(category => (
                  <div key={category.name} className="space-y-3">
                      <h4 className="font-medium text-[var(--accent)]">{category.name}</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {category.items.map(ingredient => {
                          const isSelected = selectedIngredients.some(ing => ing.id === ingredient.id);
                          
                          return (
                          <motion.div
                              key={ingredient.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => isSelected ? 
                              removeIngredient(ingredient.id) : 
                              addIngredient(ingredient)
                              }
                              className={`
                              p-3 rounded-lg cursor-pointer flex flex-col items-center justify-center text-center
                              ${isSelected ? 
                                  'bg-[var(--brass-500)] text-white' : 
                                  'bg-[var(--card-hover)] text-[var(--foreground)]'}
                              `}
                          >
                              <div className="h-12 w-12 flex items-center justify-center mb-1">
                              <img 
                                  src={`/api/placeholder/48/48?text=${ingredient.id}`} 
                                  alt={ingredient.name}
                                  className="object-contain h-10 w-10"
                              />
                              </div>
                              <div className="text-sm font-medium">{ingredient.name}</div>
                              <div className={`text-xs ${isSelected ? 'text-white' : 'text-[var(--accent)]'}`}>
                              +${ingredient.price}
                              </div>
                          </motion.div>
                          );
                      })}
                      </div>
                  </div>
                  ))}
              </div>
              
              <div className="lg:w-1/2">
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">Diseña tu pizza</h3>
                  
                  <div ref={pizzaRef} className="mx-auto" style={{ maxWidth: '400px' }}>
                  <PizzaVisualization 
                      size="lg" 
                      twoFlavors={twoFlavors}
                      pizzaCrust={pizzaCrust}
                  />
                  </div>
                  
                  <div className="mt-6 space-y-4">
                  <h4 className="font-medium text-[var(--foreground)]">Ingredientes seleccionados:</h4>
                  
                  {selectedIngredients.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                      {selectedIngredients.map(ingredient => (
                          <motion.div
                          key={ingredient.id}
                          className="px-3 py-2 rounded-full bg-[var(--brass-500)] text-white flex items-center gap-2"
                          >
                          {ingredient.name}
                          <Trash2 
                              className="h-4 w-4 cursor-pointer" 
                              onClick={(e) => {
                              e.stopPropagation();
                              removeIngredient(ingredient.id);
                              }}
                          />
                          </motion.div>
                      ))}
                      </div>
                  ) : (
                      <p className="text-[var(--foreground-muted)]">
                      No has seleccionado ingredientes. Haz clic en las opciones para añadirlos a tu pizza.
                      </p>
                  )}
                  
                  <p className="text-sm text-[var(--foreground-muted)]">
                      <strong>Configuración actual:</strong> Pizza {sizeOptions.find(s => s.id === pizzaSize)?.name}, 
                      masa {crustOptions.find(c => c.id === pizzaCrust)?.name}, 
                      {twoFlavors ? ' mitad y mitad' : ' una sola'}
                  </p>
                  </div>
              </div>
              </div>
          );  
      case 3:
          return (
              <div className="space-y-8">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Tiempo de horneado</h3>
              
              <div className="max-w-xl mx-auto text-center space-y-6">
                  <div className="flex items-center justify-center">
                  <Clock className="h-16 w-16 text-[var(--accent)]" />
                  </div>
                  
                  <p className="text-lg text-[var(--foreground)]">
                  Elige cuánto tiempo quieres que horneemos tu pizza:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setBakingTime(10)}
                      className={`
                      p-4 rounded-lg border-2
                      ${bakingTime === 10 ? 
                          'bg-[var(--brass-500)] text-white' : 
                          'bg-[var(--card-hover)] text-[var(--foreground)]'}
                      `}
                  >
                      <div className="font-medium text-lg">Suave</div>
                      <div className="text-base">10 minutos</div>
                      <div className="mt-2 text-sm">
                      {bakingTime === 10 ? 'Seleccionado' : 'Masa más suave'}
                      </div>
                  </motion.button>
                  
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setBakingTime(15)}
                      className={`
                      p-4 rounded-lg border-2
                      ${bakingTime === 15 ? 
                          'bg-[var(--brass-500)] text-white' : 
                          'bg-[var(--card-hover)] text-[var(--foreground)]'}
                      `}
                  >
                      <div className="font-medium text-lg">Clásica</div>
                      <div className="text-base">15 minutos</div>
                      <div className="mt-2 text-sm">
                      {bakingTime === 15 ? 'Seleccionado' : 'Punto perfecto'}
                      </div>
                  </motion.button>
                  
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setBakingTime(20)}
                      className={`
                      p-4 rounded-lg border-2
                      ${bakingTime === 20 ? 
                          'bg-[var(--brass-500)] text-white' : 
                          'bg-[var(--card-hover)] text-[var(--foreground)]'}
                      `}
                  >
                      <div className="font-medium text-lg">Crujiente</div>
                      <div className="text-base">20 minutos</div>
                      <div className="mt-2 text-sm">
                      {bakingTime === 20 ? 'Seleccionado' : 'Extra crujiente'}
                      </div>
                  </motion.button>
                  </div>
                  
                  <div className="mt-6 text-left p-4 bg-[var(--card-hover)] rounded-lg">
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Resumen de tu pizza:</h4>
                  <p className="text-sm text-[var(--foreground-muted)]">
                      <strong>Tamaño:</strong> {sizeOptions.find(s => s.id === pizzaSize)?.name}<br />
                      <strong>Masa:</strong> {crustOptions.find(c => c.id === pizzaCrust)?.name}<br />
                      <strong>Estilo:</strong> {twoFlavors ? 'Mitad y mitad' : 'Una sola'}<br />
                      <strong>Ingredientes:</strong> {selectedIngredients.length > 0 ? 
                      selectedIngredients.map(ing => ing.name).join(', ') : 
                      'Sin ingredientes adicionales'
                      }
                  </p>
                  </div>
              </div>
              </div>
          );
      case 4:
          return (
              <div className="space-y-8">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Estilo de corte</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {cutStyles.map(style => (
                  <motion.div
                      key={style.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCutStyle(style.id)}
                      className={`
                      p-4 rounded-lg cursor-pointer text-center
                      ${cutStyle === style.id ? 
                          'bg-[var(--brass-500)] text-white border-2 border-[var(--accent)]' : 
                          'bg-[var(--card-hover)] text-[var(--foreground)]'}
                      `}
                  >
                      <div className="relative h-32 w-32 bg-[#E63946] rounded-full mx-auto mb-3 overflow-hidden border-2 border-[#F9C784]">
                      {style.id === 'traditional' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-white opacity-70"></div>
                          <div className="h-full w-0.5 bg-white opacity-70"></div>
                          <div className="w-3/4 h-0.5 bg-white opacity-70 rotate-45 absolute"></div>
                          <div className="w-3/4 h-0.5 bg-white opacity-70 -rotate-45 absolute"></div>
                          </div>
                      )}
                      
                      {style.id === 'square' && (
                          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                          <div className="border border-white opacity-70"></div>
                          <div className="border border-white opacity-70"></div>
                          <div className="border border-white opacity-70"></div>
                          <div className="border border-white opacity-70"></div>
                          <div className="border border-white opacity-70"></div>
                          <div className="border border-white opacity-70"></div>
                          <div className="border border-white opacity-70"></div>
                          <div className="border border-white opacity-70"></div>
                          <div className="border border-white opacity-70"></div>
                          </div>
                      )}
                      
                      {style.id === 'strips' && (
                          <div className="absolute inset-0 flex flex-col">
                          <div className="flex-1 border-b border-white opacity-70"></div>
                          <div className="flex-1 border-b border-white opacity-70"></div>
                          <div className="flex-1 border-b border-white opacity-70"></div>
                          <div className="flex-1 border-b border-white opacity-70"></div>
                          <div className="flex-1"></div>
                          </div>
                      )}
                      
                      {style.id === 'uncut' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                          <Scissors className="h-12 w-12 text-white opacity-70" style={{ transform: 'rotate(45deg)' }} />
                          <div className="absolute h-12 w-12 flex items-center justify-center">
                              <div className="h-full w-0.5 bg-white rotate-45"></div>
                          </div>
                          </div>
                      )}
                      </div>
                      <div className="font-semibold text-lg">{style.name}</div>
                  </motion.div>
                  ))}
              </div>
              
              <div className="mt-8 p-4 bg-[var(--card-hover)] rounded-lg">
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Resumen de tu pizza:</h4>
                  <p className="text-sm text-[var(--foreground-muted)]">
                  <strong>Tamaño:</strong> {sizeOptions.find(s => s.id === pizzaSize)?.name}<br />
                  <strong>Masa:</strong> {crustOptions.find(c => c.id === pizzaCrust)?.name}<br />
                  <strong>Estilo:</strong> {twoFlavors ? 'Mitad y mitad' : 'Una sola'}<br />
                  <strong>Tiempo de horneado:</strong> {bakingTime} minutos<br />
                  <strong>Ingredientes:</strong> {selectedIngredients.length > 0 ? 
                      selectedIngredients.map(ing => ing.name).join(', ') : 
                      'Sin ingredientes adicionales'
                  }
                  </p>
              </div>
              </div>
          );
      case 5: 
          // Calcular precio total basado en todas las selecciones
          const calculateTotalPrice = () => {
              // Precio base según tamaño
              const basePrice = 10000 * (sizeOptions.find(size => size.id === pizzaSize)?.priceMultiplier || 1);
              
              // Precio adicional por tipo de masa
              const crustPrice = crustOptions.find(crust => crust.id === pizzaCrust)?.price || 0;
              
              // Suma de precios de ingredientes
              const ingredientsPrice = selectedIngredients.reduce((total, ing) => total + ing.price, 0);
              
              // Precio total redondeado a 2 decimales
              return (basePrice + crustPrice + ingredientsPrice).toFixed(2);
          };
          
          const totalPrice = calculateTotalPrice();
          
          return (
              <div className="space-y-8">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Revisa tu pizza personalizada</h3>
              
              <div className="bg-[var(--card-hover)] rounded-xl p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                      <div className="w-full aspect-square bg-[var(--card-background)] rounded-full mx-auto relative overflow-hidden border-4 border-[var(--brass-600)]"
                          style={{ maxWidth: '300px' }}>
                      <div className="absolute inset-2 rounded-full bg-[#F9C784]"></div>
                      <div className="absolute inset-8 rounded-full bg-[#E63946]"></div>
                      {twoFlavors && (
                          <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-[var(--brass-600)] transform -translate-x-1/2] z-10"></div>
                      )}
                      {selectedIngredients.map((ingredient, index) => {
                          // Similar layout calculation as in the design step
                          const numIngredients = selectedIngredients.length;
                          const angle = (2 * Math.PI * index) / Math.max(numIngredients, 1);
                          const radius = 30;
                          const posX = 50 + radius * Math.cos(angle);
                          const posY = 50 + radius * Math.sin(angle);
                          const rotation = Math.random() * 360;
                          
                          return (
                          <div
                              key={`${ingredient.id}-${index}`}
                              className="absolute w-8 h-8 bg-[var(--accent)] rounded-full opacity-80"
                              style={{
                              left: `${posX}%`,
                              top: `${posY}%`,
                              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                              zIndex: 5 + index
                              }}
                          ></div>
                          );
                      })}

                      {cutStyle === 'traditional' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-white opacity-60"></div>
                          <div className="h-full w-0.5 bg-white opacity-60"></div>
                          <div className="w-3/4 h-0.5 bg-white opacity-60 rotate-45 absolute"></div>
                          <div className="w-3/4 h-0.5 bg-white opacity-60 -rotate-45 absolute"></div>
                          </div>
                      )}
                      
                      {cutStyle === 'square' && (
                          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                          <div className="border border-white opacity-60"></div>
                          <div className="border border-white opacity-60"></div>
                          <div className="border border-white opacity-60"></div>
                          <div className="border border-white opacity-60"></div>
                          <div className="border border-white opacity-60"></div>
                          <div className="border border-white opacity-60"></div>
                          <div className="border border-white opacity-60"></div>
                          <div className="border border-white opacity-60"></div>
                          <div className="border border-white opacity-60"></div>
                          </div>
                      )}
                      
                      {cutStyle === 'strips' && (
                          <div className="absolute inset-0 flex flex-col">
                          <div className="flex-1 border-b border-white opacity-60"></div>
                          <div className="flex-1 border-b border-white opacity-60"></div>
                          <div className="flex-1 border-b border-white opacity-60"></div>
                          <div className="flex-1 border-b border-white opacity-60"></div>
                          <div className="flex-1"></div>
                          </div>
                      )}
                      </div>
                  </div>
                  
                  <div className="md:w-1/2 space-y-4">
                      <h4 className="font-bold text-lg text-[var(--foreground)]">Detalles de tu pizza</h4>
                      
                      <div className="space-y-2">
                      <div className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Tamaño:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {sizeOptions.find(size => size.id === pizzaSize)?.name || 'Desconocido'}
                          </span>
                      </div>
                      
                      <div className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Masa:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {crustOptions.find(crust => crust.id === pizzaCrust)?.name || 'Desconocido'}
                          </span>
                      </div>
                      
                      <div className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Estilo:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {twoFlavors ? 'Mitad y mitad' : 'Una sola'}
                          </span>
                      </div>
                      
                      <div className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Tiempo de horneado:</span>
                          <span className="font-medium text-[var(--foreground)]">{bakingTime} minutos</span>
                      </div>
                      
                      <div className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Corte:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {cutStyles.find(style => style.id === cutStyle)?.name || 'Desconocido'}
                          </span>
                      </div>
                      
                      <div className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Rebanadas:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {sizeOptions.find(size => size.id === pizzaSize)?.slices || '8'} rebanadas
                          </span>
                      </div>
                      </div>
                      
                      <div className="pt-4 border-t border-[var(--card-background)]">
                      <h4 className="font-medium text-[var(--foreground)] mb-2">Ingredientes:</h4>
                      
                      {selectedIngredients.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                          {selectedIngredients.map(ingredient => (
                              <span 
                              key={ingredient.id}
                              className="px-2 py-1 bg-[var(--brass-500)] text-white text-sm rounded-full"
                              >
                              {ingredient.name}
                              </span>
                          ))}
                          </div>
                      ) : (
                          <p className="text-[var(--foreground-muted)] text-sm">Sin ingredientes adicionales</p>
                      )}
                      </div>
                      
                      <div className="pt-4 border-t border-[var(--card-background)]">
                      <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-[var(--foreground)]">Precio Total:</span>
                          <span className="text-2xl font-bold text-[var(--accent)]">${totalPrice}</span>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
              </div>
          );
      default:
          return null;
  }
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

        <PizzaHeader/>
        <PigzasBackground />
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
              Diseña Tu Pizza
            </h1>
          </div>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Crea la pizza de tus sueños seleccionando el tamaño, la masa, los ingredientes y más.
          </p>
        </motion.div>

        <div className="mb-12">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                {step > 1 && (
                  <div 
                    className={`flex-1 h-1 ${
                      step <= currentStep ? 'bg-[var(--brass-500)]' : 'bg-[var(--card-hover)]'
                    }`}
                  ></div>
                )}
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 cursor-pointer
                    ${step <= currentStep ? 'bg-[var(--brass-500)] text-white' : 'bg-[var(--card-hover)] text-[var(--foreground-muted)]'}
                    ${step === currentStep ? 'ring-4 ring-[var(--brass-500)] ring-opacity-30' : ''}
                  `}
                >
                  {step < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{step}</span>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
          
          <div className="flex justify-between max-w-3xl mx-auto mt-2 text-sm text-[var(--foreground-muted)]">
            <div className="text-center w-10">Base</div>
            <div className="text-center w-10">Toppings</div>
            <div className="text-center w-10">Horneado</div>
            <div className="text-center w-10">Corte</div>
            <div className="text-center w-10">Final</div>
          </div>
        </div>
        <div className="mb-12">
          {renderStepContent()}
        </div>

        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            className={`
              px-6 py-3 rounded-full flex items-center space-x-2
              ${currentStep > 1 ? 
                'bg-[var(--card-hover)] text-[var(--foreground)]' : 
                'bg-[var(--card-background)] text-[var(--foreground-muted)] cursor-not-allowed'}
            `}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Anterior</span>
          </motion.button>
          
          {currentStep < 5 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="
                px-6 py-3
                bg-[var(--brass-500)]
                text-white
                rounded-full
                flex
                items-center
                space-x-2
                shadow-md
                hover:bg-[var(--brass-600)]
              "
            >
              <span>Siguiente</span>
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
              className="
                px-6 py-3
                bg-[var(--brass-500)]
                text-white
                rounded-full
                flex
                items-center
                space-x-2
                shadow-md
                hover:bg-[var(--brass-600)]
              "
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Añadir al Carrito</span>
            </motion.button>
          )}
        </div>
        
        <div className="fixed bottom-6 right-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--brass-500)] text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="font-bold">${price}</span>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PizzaDesigner;