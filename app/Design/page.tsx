"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PizzaHeader from '../Header';
import PigzasBackground from '../Pizzabackground';
import {
    Pizza,
    ShoppingBag,
    ChevronRight,
    ChevronLeft,
    Clock,
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
    
    const [bakingTime, setBakingTime] = useState(15);
    const [cutStyle, setCutStyle] = useState('traditional');
    const [price, setPrice] = useState(18900);
    const [selectedIngredients, setSelectedIngredients] = useState<Topping[]>([]);

    const toggleTopping = (topping: Topping) => {
        setSelectedIngredients((prev) =>
            prev.some((i) => i.id === topping.id)
                ? prev.filter((i) => i.id !== topping.id)
                : [...prev, topping]
        );
    };
    const pizzaSizeDimensions = {
        small: { outerInset: 3, innerInset: 9, scale: 0.85 },
        medium: { outerInset: 2, innerInset: 8, scale: 1 },
        large: { outerInset: 1.5, innerInset: 7, scale: 1.1 },
        xl: { outerInset: 1, innerInset: 6, scale: 1.2 },
    };
    const pizzaCrustStyles = {
        thin: { crustWidth: 1, crustColor: '#C8964E' },
        traditional: { crustWidth: 2, crustColor: '#C8964E' },
        thick: { crustWidth: 3, crustColor: '#C8964E' },
        stuffed: { crustWidth: 3, crustColor: '#E6BB7B' },
    };
    
    const bakingTimeColors = {
        10: { baseColor: '#FEE975', crustAdjustment: -10 },
        15: { baseColor: '#FDC234', crustAdjustment: 0 },
        20: { baseColor: '#E6A328', crustAdjustment: 10 },
    };

    interface Topping {
        id: string;
        name: string;
        image: string;
        price: number;
        category: string;
    }

    const toppings: Topping[] = [
        { id: 'mozzarella', name: 'Mozzarella', image: '/mozzarella.png', price: 1000, category: 'cheese' },
        { id: 'cheddar', name: 'Cheddar', image: '/cheddar.png', price: 1200, category: 'cheese' },
        { id: 'pepperoni', name: 'Pepperoni', image: '/pepperoni.png', price: 1500, category: 'meat' },
        { id: 'mushroom', name: 'Mushroom', image: '/mushroom.png', price: 800, category: 'veggie' },
        { id: 'olive', name: 'Olive', image: '/olive.png', price: 700, category: 'veggie' },
    ];

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

    React.useEffect(() => {
        let basePrice = 10000;
        
        const selectedSize = sizeOptions.find(size => size.id === pizzaSize);
        basePrice = basePrice * (selectedSize?.priceMultiplier ?? 1);

        const selectedCrust = crustOptions.find(crust => crust.id === pizzaCrust);
        basePrice += selectedCrust?.price ?? 0;

        
        setPrice(Number(basePrice.toFixed(0)));
    }, [pizzaSize, pizzaCrust, twoFlavors, crustOptions, sizeOptions]);

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
        alert("Funcion no disponible temporalmente");
        router.push('');
    };
    const PizzaVisualization = ({ showToppings = true, showCutStyle = false, size = "md", twoFlavors = false, pizzaCrust, selectedToppings = [] }: { showToppings?: boolean; showCutStyle?: boolean; size?: string; twoFlavors?: boolean; pizzaCrust?: 'traditional' | 'thin' | 'thick' | 'stuffed'; selectedToppings?: Topping[] }) => {
        const dimensions = pizzaSizeDimensions[pizzaSize];
        const crustStyle = pizzaCrust ? pizzaCrustStyles[pizzaCrust] : pizzaCrustStyles['traditional'];
        const bakingColor = bakingTimeColors[bakingTime as keyof typeof bakingTimeColors] || bakingTimeColors[15];
        const sizeClasses = {
            sm: "w-32 h-32",
            md: "w-64 h-64",
            lg: "w-full aspect-square",
        }[size] || "w-64 h-64";

        return (
            <section 
                className={`${sizeClasses} bg-[var(--card-hover)] rounded-full mx-auto relative overflow-hidden border-4 border-[var(--brass-600)]`}
                style={{ maxWidth: size === "lg" ? "400px" : undefined }}
            >
                <section className="absolute inset-2 rounded-full" 
                    style={{ 
                        backgroundColor: crustStyle.crustColor,
                        inset: `${dimensions.outerInset}px`
                    }}
                ></section>
                
                <section className="absolute rounded-full" 
                    style={{ 
                        backgroundColor: bakingColor.baseColor,
                        inset: `${dimensions.innerInset}px` 
                    }}
                ></section>
                
                {twoFlavors && (
                    <section className="absolute top-0 bottom-0 left-1/2 w-1 bg-[var(--brass-600)] transform -translate-x-1/2 z-10"></section>
                )}

                {showToppings && selectedToppings.flatMap((topping, toppingIndex) => {
                    const instanceCount = topping.id.includes('cheese') ? 7 : 
                                        topping.id.includes('pepperoni') ? 6 : 
                                        topping.id.includes('olive') ? 5 : 4;
                    
                    return Array.from({ length: instanceCount }).map((_, instanceIndex) => {
                        const randomAngle = (toppingIndex * 30 + instanceIndex * 50) % 360;
                        const randomRadius = 10 + (instanceIndex * 30 + toppingIndex * 5) % 30;
                        const angleInRadians = (randomAngle * Math.PI) / 180;
                        
                        const posX = 50 + randomRadius * Math.cos(angleInRadians);
                        const posY = 50 + randomRadius * Math.sin(angleInRadians);
                    
                        if (twoFlavors) {
                            const isLeftHalf = posX < 50;
                            if ((toppingIndex % 2 === 0 && !isLeftHalf) || 
                                (toppingIndex % 2 === 1 && isLeftHalf)) {
                                return null;
                            }
                        }
                        const rotation = (toppingIndex * 20 + instanceIndex * 40) % 360;
                        
                        const baseSize = topping.id === 'olive' || topping.id === 'pepperoni' ? 6 :
                                        topping.id === 'pineapple' ? 7 : 8;
                                       
                        const sizePx = baseSize * (dimensions.scale || 1);
                        
                        return (
                            <motion.section
                                key={`${topping.id}-${toppingIndex}-${instanceIndex}`}
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
                                    zIndex: 5 + toppingIndex
                                }}
                            >
                                <img 
                                    src={`/api/placeholder/32/32?text=${topping.id}`} 
                                    alt={topping.name}
                                    className="object-contain w-full h-full"
                                    style={{ 
                                        transform: topping.id === 'pineapple' ? 'rotate(45deg)' : 'none'
                                    }}
                                />
                            </motion.section>
                        );
                    }).filter(Boolean); 
                })}

                {showCutStyle && cutStyle && (
                    <>
                        {cutStyle === 'traditional' && (
                            <section className="absolute inset-0 flex items-center justify-center">
                                <section className="w-full h-0.5 bg-white opacity-70"></section>
                                <section className="h-full w-0.5 bg-white opacity-70"></section>
                                <section className="w-3/4 h-0.5 bg-white opacity-70 rotate-45 absolute"></section>
                                <section className="w-3/4 h-0.5 bg-white opacity-70 -rotate-45 absolute"></section>
                            </section>
                        )}
                        
                        {cutStyle === 'square' && (
                            <section className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                            </section>
                        )}
                        
                        {cutStyle === 'strips' && (
                            <section className="absolute inset-0 flex flex-col">
                                <section className="flex-1 border-b border-white opacity-70"></section>
                                <section className="flex-1 border-b border-white opacity-70"></section>
                                <section className="flex-1 border-b border-white opacity-70"></section>
                                <section className="flex-1 border-b border-white opacity-70"></section>
                                <section className="flex-1"></section>
                            </section>
                        )}
                        
                        {cutStyle === 'uncut' && (
                            <section className="absolute inset-0 flex items-center justify-center">
                                <Scissors className="h-12 w-12 text-white opacity-70" style={{ transform: 'rotate(45deg)' }} />
                                <section className="absolute h-12 w-12 flex items-center justify-center">
                                    <section className="h-full w-0.5 bg-white rotate-45"></section>
                                </section>
                            </section>
                        )}
                    </>
                )}
            </section>
        );
    };

    const renderStepContent = () => {
        switch(currentStep) {
            case 1:
                return (
                    <section className="flex flex-col lg:flex-row gap-8 items-center">
                        <section className="lg:w-2/5 flex justify-center">
                            <PizzaVisualization showToppings={false} size="lg" />
                        </section>
                        
                        <section className="lg:w-3/5 space-y-8">
                            <section className="space-y-4">
                                <h3 className="text-xl font-semibold text-[var(--foreground)]">1. Selecciona el tamaño</h3>
                                <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {sizeOptions.map(size => (
                                    <motion.section
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
                                    <section className="flex justify-center mb-2">
                                        <Pizza 
                                        className={`h-10 w-10 ${pizzaSize === size.id ? 'text-white' : 'text-[var(--accent)]'}`} 
                                        style={{ transform: `scale(${0.7 + sizeOptions.findIndex(s => s.id === size.id) * 0.1})` }} 
                                        />
                                    </section>
                                    <section className="font-semibold">{size.name}</section>
                                    <section className={`text-sm ${pizzaSize === size.id ? 'text-white' : 'text-[var(--accent)]'}`}>
                                        {size.slices} rebanadas
                                    </section>
                                    </motion.section>
                                ))}
                                </section>
                            </section>
                            
                            <section className="space-y-4">
                                <h3 className="text-xl font-semibold text-[var(--foreground)]">2. Tipo de masa</h3>
                                <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {crustOptions.map(crust => (
                                    <motion.section
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
                                    <section className="font-semibold">{crust.name}</section>
                                    {crust.price > 0 && 
                                        <section className={`text-sm ${pizzaCrust === crust.id ? 'text-white' : 'text-[var(--accent)]'}`}>
                                        +${crust.price}
                                        </section>
                                    }
                                    </motion.section>
                                ))}
                                </section>
                            </section>
                            
                            <section className="space-y-4">
                                <h3 className="text-xl font-semibold text-[var(--foreground)]">3. ¿Mitad y mitad?</h3>
                                <section className="flex space-x-4">
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
                                </section>
                            </section>
                        </section>
                    </section>
                );
            case 2:
                return (
                    <section className="flex flex-col lg:flex-row gap-8 items-center">
                        <section className="lg:w-2/5 flex justify-center">
                            <PizzaVisualization showToppings={true} size="lg" selectedToppings={selectedIngredients} pizzaCrust={pizzaCrust} />
                        </section>
                        
                        <section className="lg:w-3/5 space-y-8">
                            <section className="space-y-4">
                                <h3 className="text-xl font-semibold text-[var(--foreground)]">Selecciona los ingredientes</h3>
                                
                                <section className="space-y-6">
                                    <section>
                                        <h4 className="font-medium text-[var(--foreground-muted)] mb-2">Quesos</h4>
                                        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {toppings.filter(t => t.category === 'cheese').map(topping => (
                                                <motion.section
                                                    key={topping.id}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleTopping(topping)}
                                                    className={`
                                                        p-3 rounded-lg cursor-pointer border
                                                        ${selectedIngredients.some(i => i.id === topping.id) ?
                                                            'bg-[var(--brass-500)] text-white border-[var(--accent-dark)]' :
                                                            'bg-[var(--card-hover)] text-[var(--foreground)] border-[var(--border)]'}
                                                    `}
                                                >
                                                    <section className="flex items-center">
                                                        <section className="w-8 h-8 bg-[var(--card-background)] rounded-full flex items-center justify-center mr-2">
                                                            {selectedIngredients.some(i => i.id === topping.id) ?
                                                                <Check className="h-4 w-4 text-[var(--accent)]" /> :
                                                                <span className="h-4 w-4" />
                                                            }
                                                        </section>
                                                        <section>
                                                            <section className="font-medium text-sm">{topping.name}</section>
                                                            {topping.price > 0 &&
                                                                <section className={`text-xs ${selectedIngredients.some(i => i.id === topping.id) ? 'text-white' : 'text-[var(--accent)]'}`}>
                                                                    +${topping.price}
                                                                </section>
                                                            }
                                                        </section>
                                                    </section>
                                                </motion.section>
                                            ))}
                                        </section>
                                    </section>
                                    <section>
                                        <h4 className="font-medium text-[var(--foreground-muted)] mb-2">Carnes</h4>
                                        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {toppings.filter(t => t.category === 'meat').map(topping => (
                                                <motion.section
                                                    key={topping.id}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleTopping(topping)}
                                                    className={`
                                                        p-3 rounded-lg cursor-pointer border
                                                        ${selectedIngredients.some(i => i.id === topping.id) ?
                                                            'bg-[var(--brass-500)] text-white border-[var(--accent-dark)]' :
                                                            'bg-[var(--card-hover)] text-[var(--foreground)] border-[var(--border)]'}
                                                    `}
                                                >
                                                    <section className="flex items-center">
                                                        <section className="w-8 h-8 bg-[var(--card-background)] rounded-full flex items-center justify-center mr-2">
                                                            {selectedIngredients.some(i => i.id === topping.id) ?
                                                                <Check className="h-4 w-4 text-[var(--accent)]" /> :
                                                                <span className="h-4 w-4" />
                                                            }
                                                        </section>
                                                        <section>
                                                            <section className="font-medium text-sm">{topping.name}</section>
                                                            {topping.price > 0 &&
                                                                <section className={`text-xs ${selectedIngredients.some(i => i.id === topping.id) ? 'text-white' : 'text-[var(--accent)]'}`}>
                                                                    +${topping.price}
                                                                </section>
                                                            }
                                                        </section>
                                                    </section>
                                                </motion.section>
                                            ))}
                                        </section>
                                    </section>
                                    <section>
                                        <h4 className="font-medium text-[var(--foreground-muted)] mb-2">Vegetales</h4>
                                        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {toppings.filter(t => t.category === 'veggie').map(topping => (
                                                <motion.section
                                                    key={topping.id}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleTopping(topping)}
                                                    className={`
                                                        p-3 rounded-lg cursor-pointer border
                                                        ${selectedIngredients.some(i => i.id === topping.id) ?
                                                            'bg-[var(--brass-500)] text-white border-[var(--accent-dark)]' :
                                                            'bg-[var(--card-hover)] text-[var(--foreground)] border-[var(--border)]'}
                                                    `}
                                                >
                                                    <section className="flex items-center">
                                                        <section className="w-8 h-8 bg-[var(--card-background)] rounded-full flex items-center justify-center mr-2">
                                                            {selectedIngredients.some(i => i.id === topping.id) ?
                                                                <Check className="h-4 w-4 text-[var(--accent)]" /> :
                                                                <span className="h-4 w-4" />
                                                            }
                                                        </section>
                                                        <section>
                                                            <section className="font-medium text-sm">{topping.name}</section>
                                                            {topping.price > 0 &&
                                                                <section className={`text-xs ${selectedIngredients.some(i => i.id === topping.id) ? 'text-white' : 'text-[var(--accent)]'}`}>
                                                                    +${topping.price}
                                                                </section>
                                                            }
                                                        </section>
                                                    </section>
                                                </motion.section>
                                            ))}
                                        </section>
                                    </section>
                                </section>

                                <section className="mt-6 p-4 bg-[var(--card-hover)] rounded-lg">
                                    <h4 className="font-medium text-[var(--foreground)] mb-2">Ingredientes seleccionados:</h4>
                                    {selectedIngredients.length > 0 ? (
                                        <section className="flex flex-wrap gap-2">
                                            {selectedIngredients.map(ingredient => (
                                                <span 
                                                    key={ingredient.id}
                                                    className="px-2 py-1 bg-[var(--brass-500)] text-white text-sm rounded-full flex items-center"
                                                >
                                                    {ingredient.name}
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleTopping(ingredient);
                                                        }}
                                                        className="ml-1 w-4 h-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xs"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </section>
                                    ) : (
                                        <p className="text-[var(--foreground-muted)] text-sm">Ningún ingrediente seleccionado todavía</p>
                                    )}
                                </section>
                            </section>
                        </section>
                    </section>
                );
            case 3:
                return (
                    <section className="space-y-8">
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">Tiempo de horneado</h3>
                    
                    <section className="max-w-xl mx-auto text-center space-y-6">
                        <section className="flex items-center justify-center">
                        <Clock className="h-16 w-16 text-[var(--accent)]" />
                        </section>
                        
                        <p className="text-lg text-[var(--foreground)]">
                        Elige cuánto tiempo quieres que horneemos tu pizza:
                        </p>
                        
                        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
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
                            <section className="font-medium text-lg">Suave</section>
                            <section className="text-base">10 minutos</section>
                            <section className="mt-2 text-sm">
                            {bakingTime === 10 ? 'Seleccionado' : 'Masa más suave'}
                            </section>
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
                            <section className="font-medium text-lg">Clásica</section>
                            <section className="text-base">15 minutos</section>
                            <section className="mt-2 text-sm">
                            {bakingTime === 15 ? 'Seleccionado' : 'Punto perfecto'}
                            </section>
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
                            <section className="font-medium text-lg">Crujiente</section>
                            <section className="text-base">20 minutos</section>
                            <section className="mt-2 text-sm">
                            {bakingTime === 20 ? 'Seleccionado' : 'Extra crujiente'}
                            </section>
                        </motion.button>
                        </section>
                        
                        <section className="mt-6 text-left p-4 bg-[var(--card-hover)] rounded-lg">
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
                        </section>
                    </section>
                    </section>
                );
            case 4:
                return (
                    <section className="space-y-8">
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">Estilo de corte</h3>
                    
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {cutStyles.map(style => (
                        <motion.section
                            key={style.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCutStyle(style.id)}
                            className={`
                            p-4 rounded-lg cursor-pointer text-center border-2
                            ${cutStyle === style.id ? 
                                'bg-[var(--brass-500)] text-white border-2 border-[var(--accent)]' : 
                                'bg-[var(--card-hover)] text-[var(--foreground)]'}
                            `}
                        >
                            <section className="relative h-32 w-32 bg-[#E63946] rounded-full mx-auto mb-3 overflow-hidden border-2 border-[#F9C784]">
                            {style.id === 'traditional' && (
                                <section className="absolute inset-0 flex items-center justify-center">
                                <section className="w-full h-0.5 bg-white opacity-70"></section>
                                <section className="h-full w-0.5 bg-white opacity-70"></section>
                                <section className="w-3/4 h-0.5 bg-white opacity-70 rotate-45 absolute"></section>
                                <section className="w-3/4 h-0.5 bg-white opacity-70 -rotate-45 absolute"></section>
                                </section>
                            )}
                            
                            {style.id === 'square' && (
                                <section className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                <section className="border border-white opacity-70"></section>
                                </section>
                            )}
                            
                            {style.id === 'strips' && (
                                <section className="absolute inset-0 flex flex-col">
                                <section className="flex-1 border-b border-white opacity-70"></section>
                                <section className="flex-1 border-b border-white opacity-70"></section>
                                <section className="flex-1 border-b border-white opacity-70"></section>
                                <section className="flex-1 border-b border-white opacity-70"></section>
                                <section className="flex-1"></section>
                                </section>
                            )}
                            
                            {style.id === 'uncut' && (
                                <section className="absolute inset-0 flex items-center justify-center">
                                <Scissors className="h-12 w-12 text-white opacity-70" style={{ transform: 'rotate(45deg)' }} />
                                <section className="absolute h-12 w-12 flex items-center justify-center">
                                    <section className="h-full w-0.5 bg-white rotate-45"></section>
                                </section>
                                </section>
                            )}
                            </section>
                            <section className="font-semibold text-lg">{style.name}</section>
                        </motion.section>
                        ))}
                    </section>
                    
                    <section className="mt-8 p-4 bg-[var(--card-hover)] rounded-lg">
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
                    </section>
                    </section>
                );
      case 5: 
          const calculateTotalPrice = () => {
              const basePrice = 10000 * (sizeOptions.find(size => size.id === pizzaSize)?.priceMultiplier || 1);
              const crustPrice = crustOptions.find(crust => crust.id === pizzaCrust)?.price || 0;
            
              const ingredientsPrice = selectedIngredients.reduce((total, ing) => total + ing.price, 0);
              
              return (basePrice + crustPrice + ingredientsPrice).toFixed(2);
          };
          
          const totalPrice = calculateTotalPrice();
          
          return (
              <section className="space-y-8">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Revisa tu pizza personalizada</h3>
              
              <section className="bg-[var(--card-hover)] rounded-xl p-6">
                  <section className="flex flex-col md:flex-row gap-6">
                  <section className="md:w-1/2">
                      <section className="w-full aspect-square bg-[var(--card-background)] rounded-full mx-auto relative overflow-hidden border-4 border-[var(--brass-600)]"
                          style={{ maxWidth: '300px' }}>
                      <section className="absolute inset-2 rounded-full bg-[#F9C784]"></section>
                      <section className="absolute inset-8 rounded-full bg-[#E63946]"></section>
                      {twoFlavors && (
                          <section className="absolute top-0 bottom-0 left-1/2 w-2 bg-[var(--brass-600)] transform -translate-x-1/2] z-10"></section>
                      )}
                      {selectedIngredients.map((ingredient, index) => {
                          const numIngredients = selectedIngredients.length;
                          const angle = (2 * Math.PI * index) / Math.max(numIngredients, 1);
                          const radius = 30;
                          const posX = 50 + radius * Math.cos(angle);
                          const posY = 50 + radius * Math.sin(angle);
                          const rotation = Math.random() * 360;
                          
                          return (
                          <section
                              key={`${ingredient.id}-${index}`}
                              className="absolute w-8 h-8 bg-[var(--accent)] rounded-full opacity-80"
                              style={{
                              left: `${posX}%`,
                              top: `${posY}%`,
                              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                              zIndex: 5 + index
                              }}
                          ></section>
                          );
                      })}

                      {cutStyle === 'traditional' && (
                          <section className="absolute inset-0 flex items-center justify-center">
                          <section className="w-full h-0.5 bg-white opacity-60"></section>
                          <section className="h-full w-0.5 bg-white opacity-60"></section>
                          <section className="w-3/4 h-0.5 bg-white opacity-60 rotate-45 absolute"></section>
                          <section className="w-3/4 h-0.5 bg-white opacity-60 -rotate-45 absolute"></section>
                          </section>
                      )}
                      
                      {cutStyle === 'square' && (
                          <section className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                          <section className="border border-white opacity-60"></section>
                          <section className="border border-white opacity-60"></section>
                          <section className="border border-white opacity-60"></section>
                          <section className="border border-white opacity-60"></section>
                          <section className="border border-white opacity-60"></section>
                          <section className="border border-white opacity-60"></section>
                          <section className="border border-white opacity-60"></section>
                          <section className="border border-white opacity-60"></section>
                          <section className="border border-white opacity-60"></section>
                          </section>
                      )}
                      
                      {cutStyle === 'strips' && (
                          <section className="absolute inset-0 flex flex-col">
                          <section className="flex-1 border-b border-white opacity-60"></section>
                          <section className="flex-1 border-b border-white opacity-60"></section>
                          <section className="flex-1 border-b border-white opacity-60"></section>
                          <section className="flex-1 border-b border-white opacity-60"></section>
                          <section className="flex-1"></section>
                          </section>
                      )}
                      </section>
                  </section>
                  
                  <section className="md:w-1/2 space-y-4">
                      <h4 className="font-bold text-lg text-[var(--foreground)]">Detalles de tu pizza</h4>
                      
                      <section className="space-y-2">
                      <section className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Tamaño:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {sizeOptions.find(size => size.id === pizzaSize)?.name || 'Desconocido'}
                          </span>
                      </section>
                      
                      <section className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Masa:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {crustOptions.find(crust => crust.id === pizzaCrust)?.name || 'Desconocido'}
                          </span>
                      </section>
                      
                      <section className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Estilo:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {twoFlavors ? 'Mitad y mitad' : 'Una sola'}
                          </span>
                      </section>
                      
                      <section className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Tiempo de horneado:</span>
                          <span className="font-medium text-[var(--foreground)]">{bakingTime} minutos</span>
                      </section>
                      
                      <section className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Corte:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {cutStyles.find(style => style.id === cutStyle)?.name || 'Desconocido'}
                          </span>
                      </section>
                      
                      <section className="flex justify-between">
                          <span className="text-[var(--foreground-muted)]">Rebanadas:</span>
                          <span className="font-medium text-[var(--foreground)]">
                          {sizeOptions.find(size => size.id === pizzaSize)?.slices || '8'} rebanadas
                          </span>
                      </section>
                      </section>
                      
                      <section className="pt-4 border-t border-[var(--card-background)]">
                      <h4 className="font-medium text-[var(--foreground)] mb-2">Ingredientes:</h4>
                      
                      {selectedIngredients.length > 0 ? (
                          <section className="flex flex-wrap gap-2">
                          {selectedIngredients.map(ingredient => (
                              <span 
                              key={ingredient.id}
                              className="px-2 py-1 bg-[var(--brass-500)] text-white text-sm rounded-full"
                              >
                              {ingredient.name}
                              </span>
                          ))}
                          </section>
                      ) : (
                          <p className="text-[var(--foreground-muted)] text-sm">Sin ingredientes adicionales</p>
                      )}
                      </section>
                      
                      <section className="pt-4 border-t border-[var(--card-background)]">
                      <section className="flex justify-between items-center">
                          <span className="text-lg font-bold text-[var(--foreground)]">Precio Total:</span>
                          <span className="text-2xl font-bold text-[var(--accent)]">${totalPrice}</span>
                      </section>
                      </section>
                  </section>
                  </section>
              </section>
              </section>
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
      <section className="container mx-auto px-6 py-32 min-h-screen">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <section className="flex items-center justify-center space-x-4 mb-4">
            <Pizza className="h-10 w-10 text-[var(--accent)]" />
            <h1 className="font-['Dancing_Script'] font-bold text-4xl text-[var(--foreground)]">
              Diseña Tu Pizza
            </h1>
          </section>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Crea la pizza de tus sueños seleccionando el tamaño, la masa, los ingredientes y más.
          </p>
        </motion.section>

        <section className="mb-12">
          <section className="flex justify-between items-center max-w-3xl mx-auto">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                {step > 1 && (
                  <section 
                    className={`flex-1 h-1 ${
                      step <= currentStep ? 'bg-[var(--brass-500)]' : 'bg-[var(--card-hover)]'
                    }`}
                  ></section>
                )}
                <section 
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
                </section>
              </React.Fragment>
            ))}
          </section>
          
          <section className="flex justify-between max-w-3xl mx-auto mt-2 text-sm text-[var(--foreground-muted)]">
            <section className="text-center w-10">Base</section>
            <section className="text-center w-10">Toppings</section>
            <section className="text-center w-10">Horneado</section>
            <section className="text-center w-10">Corte</section>
            <section className="text-center w-10">Final</section>
          </section>
        </section>
        <section className="mb-12">
          {renderStepContent()}
        </section>

        <section className="flex justify-between mt-8">
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
              <span>NO DISPONIBLE</span>
            </motion.button>
          )}
        </section>
        
        <section className="fixed bottom-6 right-6">
          <motion.section
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--brass-500)] text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="font-bold">${price}</span>
          </motion.section>
        </section>
      </section>
    </>
  );
};

export default PizzaDesigner;