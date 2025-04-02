"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, ShoppingBag, MapPin } from 'lucide-react';
import Link from 'next/link';
import PigzasBackground from '../Pizzabackground';

const useClientSearchParams = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    setSearchParams(params);
  }, []);
  
  return searchParams;
};

// Define OrderDetails type for TypeScript
export interface OrderDetails {
  orderId: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }[];
  subtotal: number;
  total: number;
  paymentStatus?: string;
  transactionId?: string;
  customerInfo?: {
    email: string;
    phone: string;
    pickupMethod: string;
  };
}

const Payment = () => {
  const router = useRouter();
  const searchParams = useClientSearchParams();
  
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the order ID once searchParams is available
  useEffect(() => {
    if (searchParams) {
      const id = searchParams.get('id');
      setOrderId(id);
    }
  }, [searchParams]);

  // Load order details once orderId is available
  useEffect(() => {
    if (isClient && orderId) {
      try {
        const orderDataString = localStorage.getItem(`order_${orderId}`);
        if (orderDataString) {
          const orderData = JSON.parse(orderDataString);
          setOrderDetails(orderData);
        } else {
          router.push('/Menu');
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        router.push('/Menu');
      }
    }
  }, [orderId, router, isClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .slice(0, 19);
      
      setFormData({...formData, [name]: formatted});
    } else if (name === 'cardExpiry') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(?=\d)/g, '$1/')
        .slice(0, 5);
      
      setFormData({...formData, [name]: formatted});
    } else if (name === 'cardCVC') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setFormData({...formData, [name]: formatted});
    } else if (name === 'phone') {
      const formatted = value.replace(/\D/g, '');
      setFormData({...formData, [name]: formatted});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.cardName.trim()) errors.cardName = 'El nombre es obligatorio';
    
    if (!formData.cardNumber.trim()) {
      errors.cardNumber = 'El número de tarjeta es obligatorio';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      errors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
    }
    
    if (!formData.cardExpiry.trim()) {
      errors.cardExpiry = 'La fecha de caducidad es obligatoria';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      errors.cardExpiry = 'Formato inválido. Use MM/YY';
    }
    
    if (!formData.cardCVC.trim()) {
      errors.cardCVC = 'El código de seguridad es obligatorio';
    } else if (formData.cardCVC.length < 3) {
      errors.cardCVC = 'El código debe tener 3 o 4 dígitos';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) errors.phone = 'El teléfono es obligatorio';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Format the price in COP format (no decimals)
  const formatCOP = (amount: number) => {
    // Convert to integer by removing decimal part
    const integerAmount = Math.round(amount);
    return `$${integerAmount.toLocaleString('es-CO')}`;
  };

  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setPaymentStatus('processing');
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Always make the payment successful for this demo
      const paymentResponse = {
        success: true,
        transactionId: `TXN-${Date.now()}`
      };
      
      if (paymentResponse.success && isClient && orderId) {
        if (orderDetails) {
          const updatedOrder = {
            ...orderDetails,
            paymentStatus: 'completed',
            transactionId: paymentResponse.transactionId,
            customerInfo: {
              email: formData.email,
              phone: formData.phone,
              pickupMethod: 'local'
            }
          };
          
          localStorage.setItem(`order_${orderId}`, JSON.stringify(updatedOrder));
          localStorage.removeItem('shoppingCart');
          
          setPaymentStatus('success');
        }
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setPaymentStatus('error');
    }
  };
  
  // Show loading or error state if needed
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="p-8 text-center">
          <p className="text-[var(--foreground-muted)]">Cargando...</p>
        </div>
      </div>
    );
  }
  
  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-pulse p-8 text-center">
          <p className="text-[var(--foreground-muted)]">Cargando detalles del pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <PigzasBackground/>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+HU:wght@100..400&display=swap');
        
        body {
          font-family: 'Playwrite HU', cursive;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="mb-8 flex items-center">
          <Link href="/Menu" className="mr-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-[var(--card-background)]"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.div>
          </Link>
          <h1 className="text-2xl font-bold flex items-center font-['Dancing_Script']">
            <CreditCard className="mr-2 h-6 w-6 text-[var(--accent)]" />
            Pago
          </h1>
        </div>
        
        <AnimatePresence mode="wait">
          {paymentStatus === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-12 text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="h-20 w-20 text-green-500" />
              </motion.div>
              
              <h2 className="text-2xl font-bold font-['Dancing_Script']">¡Pago Completado!</h2>
              <p className="text-[var(--foreground-muted)] max-w-md">
                ¡Felicidades! Tu pedido ha sido procesado correctamente. Puedes acercarte a nuestro local para recoger tu pizza presentando este comprobante.
              </p>
              
              <div className="mt-4 p-4 bg-[var(--card-background)] rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-lg">Comprobante de Pedido</p>
                  <p className="text-[var(--foreground-muted)] text-sm">{new Date().toLocaleDateString()}</p>
                </div>
                
                <p className="text-[var(--foreground-muted)] text-sm">ID de Pedido</p>
                <p className="font-mono font-medium">{orderDetails.orderId}</p>
                
                <div className="mt-4 pt-2 border-t border-[var(--border)]">
                  <div className="flex items-center text-[var(--foreground-muted)] my-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <p className="text-sm">Recoger en tienda</p>
                  </div>
                  
                  <h3 className="font-medium mt-3 mb-2">Productos:</h3>
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span>{item.quantity}x {item.name} ({item.size})</span>
                      <span>{formatCOP(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  
                  <div className="mt-2 pt-2 border-t border-[var(--border)]">
                    <div className="flex justify-between text-[var(--foreground-muted)]">
                      <span>Subtotal</span>
                      <span>{formatCOP(orderDetails.subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-[var(--border)] mt-2">
                      <span>Total</span>
                      <span>{formatCOP(orderDetails.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="mt-6 text-xl font-medium text-[var(--accent)]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                ¡Tu pizza te estará esperando en nuestro local! Gracias por tu compra.
              </motion.div>
              
              <Link href="/Menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    mt-6 px-6 py-3 
                    bg-[var(--brass-500)] 
                    hover:bg-[var(--brass-600)]
                    text-white rounded-full
                    flex items-center space-x-2
                    shadow-md
                  "
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Volver al Menú</span>
                </motion.button>
              </Link>
            </motion.div>
          ) : paymentStatus === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-12 text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <AlertCircle className="h-20 w-20 text-red-500" />
              </motion.div>
              
              <h2 className="text-2xl font-bold font-['Dancing_Script']">Error de Pago</h2>
              <p className="text-[var(--foreground-muted)] max-w-md">
                Ha ocurrido un error al procesar tu pago. Por favor, verifica los datos de tu tarjeta e inténtalo de nuevo.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPaymentStatus('idle')}
                className="
                  mt-4 px-6 py-3 
                  bg-[var(--brass-500)] 
                  hover:bg-[var(--brass-600)]
                  text-white rounded-full
                  shadow-md
                "
              >
                Intentar de nuevo
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="bg-[var(--card-background)] rounded-lg p-6 shadow-md sticky top-6">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-[var(--border)] font-['Dancing_Script']">
                    Resumen del Pedido
                  </h2>
                  
                  <div className="flex items-center mb-4 text-[var(--foreground-muted)]">
                    <MapPin className="h-5 w-5 mr-2" />
                    <p>Recoger en tienda</p>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    {orderDetails.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex justify-between text-sm text-[var(--foreground-muted)]">
                            <span>{item.quantity}x · {item.size}</span>
                            <span>{formatCOP(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-[var(--border)] space-y-2">
                    <div className="flex justify-between text-[var(--foreground-muted)]">
                      <span>Subtotal</span>
                      <span>{formatCOP(orderDetails.subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-[var(--border)]">
                      <span>Total</span>
                      <span>{formatCOP(orderDetails.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="bg-[var(--card-background)] rounded-lg p-6 shadow-md">
                  <h2 className="text-xl font-bold mb-6 font-['Dancing_Script']">Información de Pago</h2>
                  
                  <form onSubmit={processPayment} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-[var(--foreground-muted)]">Datos de la Tarjeta</h3>
                      
                      <div>
                        <label className="block text-sm mb-1" htmlFor="cardName">
                          Nombre en la tarjeta
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Nombre como aparece en la tarjeta"
                          className={`
                            w-full px-4 py-2 
                            bg-[var(--background)]
                            border ${formErrors.cardName ? 'border-red-500' : 'border-[var(--border)]'}
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                          `}
                        />
                        {formErrors.cardName && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.cardName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm mb-1" htmlFor="cardNumber">
                          Número de tarjeta
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className={`
                            w-full px-4 py-2 
                            bg-[var(--background)]
                            border ${formErrors.cardNumber ? 'border-red-500' : 'border-[var(--border)]'}
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                          `}
                        />
                        {formErrors.cardNumber && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-1" htmlFor="cardExpiry">
                            Fecha caducidad
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className={`
                              w-full px-4 py-2 
                              bg-[var(--background)]
                              border ${formErrors.cardExpiry ? 'border-red-500' : 'border-[var(--border)]'}
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                            `}
                          />
                          {formErrors.cardExpiry && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.cardExpiry}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm mb-1" htmlFor="cardCVC">
                            CVC/CVV
                          </label>
                          <input
                            type="text"
                            id="cardCVC"
                            name="cardCVC"
                            value={formData.cardCVC}
                            onChange={handleInputChange}
                            placeholder="123"
                            className={`
                              w-full px-4 py-2 
                              bg-[var(--background)]
                              border ${formErrors.cardCVC ? 'border-red-500' : 'border-[var(--border)]'}
                              rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                            `}
                          />
                          {formErrors.cardCVC && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.cardCVC}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-[var(--foreground-muted)]">Información de Contacto</h3>
                      
                      <div>
                        <label className="block text-sm mb-1" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          className={`
                            w-full px-4 py-2 
                            bg-[var(--background)]
                            border ${formErrors.email ? 'border-red-500' : 'border-[var(--border)]'}
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                          `}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm mb-1" htmlFor="phone">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Teléfono de contacto"
                          className={`
                            w-full px-4 py-2 
                            bg-[var(--background)]
                            border ${formErrors.phone ? 'border-red-500' : 'border-[var(--border)]'}
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                          `}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: 'var(--brass-600)' 
                      }}
                      whileTap={{ scale: 0.98 }}
                      disabled={paymentStatus === 'processing'}
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
                        text-lg
                      "
                      type="submit"
                    >
                      {paymentStatus === 'processing' ? (
                        <span>Procesando Pago...</span>
                      ) : (
                        <>
                          <span>Pagar {formatCOP(orderDetails.total)}</span>
                          <CreditCard className="h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Payment;