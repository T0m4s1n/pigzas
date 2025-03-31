"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Users, Star, Clock, MapPin, Phone } from 'lucide-react';
import PizzaHeader from '../Header';

export default function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      name: "Tomasin",
      role: "Tomasin",
      image: "./chef1.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 2,
      name: "Tomasin",
      role: "Tomasin",
      image: "./chef2.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 3,
      name: "Tomasin",
      role: "Tomasin",
      image: "./chef3.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ];

  const restaurantFeatures = [
    {
      id: 1,
      title: "Ingredientes Premium",
      description: "Seleccionamos cuidadosamente los mejores ingredientes locales y de importación para garantizar sabores auténticos.",
      icon: <Star className="h-10 w-10 text-[var(--accent)]" />
    },
    {
      id: 2,
      title: "Tradición e Innovación",
      description: "Respetamos las recetas tradicionales italianas mientras exploramos nuevas combinaciones de sabores.",
      icon: <Pizza className="h-10 w-10 text-[var(--accent)]" />
    },
    {
      id: 3,
      title: "Servicio Excepcional",
      description: "Nuestro equipo está comprometido a brindarte una experiencia gastronómica inolvidable en cada visita.",
      icon: <Users className="h-10 w-10 text-[var(--accent)]" />
    }
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

      <PizzaHeader />

      <div className="container mx-auto px-6 py-32 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Pizza className="h-10 w-10 text-[var(--accent)]" />
            <h1 className="font-['Dancing_Script'] font-bold text-4xl text-[var(--foreground)]">
              Sobre Nosotros
            </h1>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">
            Nuestra Historia y Pasión
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Bienvenidos a Pigzas, donde la tradición italiana se encuentra con la innovación culinaria. 
            Desde nuestra apertura en 2010, nos hemos dedicado a crear pizzas artesanales que deleiten 
            y sorprendan a nuestros comensales.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center"
        >
          <div className="relative h-96 overflow-hidden rounded-xl shadow-lg">
            <img
              src="./restaurant.jpg"
              alt="Interior de Pigzas"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Nuestra Historia</h3>
            <p className="text-[var(--foreground-muted)] mb-4 leading-relaxed">
              Todo comenzó con una simple idea: traer la auténtica experiencia de la pizza italiana a nuestra 
              comunidad, pero con un toque único que reflejara nuestra identidad local.
            </p>
            <p className="text-[var(--foreground-muted)] mb-4 leading-relaxed">
              Fundada por la familia Rodríguez, amantes de la gastronomía italiana, Pigzas nació de viajes por 
              Italia y años de experimentación con recetas tradicionales para adaptarlas a los gustos locales.
            </p>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              Hoy, nos enorgullece ser reconocidos como uno de los mejores restaurantes de pizza en la ciudad, 
              manteniendo siempre nuestra filosofía de calidad, frescura y servicio excepcional.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold mb-10 text-center text-[var(--foreground)]">
            Lo Que Nos Hace Especiales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurantFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.5 + (index * 0.1),
                  type: "spring",
                  bounce: 0.2
                }}
                className="bg-[var(--card-background)] rounded-xl shadow-md p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-[var(--foreground)]">{feature.title}</h4>
                <p className="text-[var(--foreground-muted)]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold mb-10 text-center text-[var(--foreground)]">
            Nuestro Equipo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.7 + (index * 0.1),
                  type: "spring",
                  bounce: 0.2
                }}
                className="bg-[var(--card-background)] rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-1 text-[var(--foreground)]">{member.name}</h4>
                  <p className="text-[var(--accent)] font-medium mb-3">{member.role}</p>
                  <p className="text-[var(--foreground-muted)]">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-[var(--card-background)] rounded-xl shadow-lg p-8 text-center"
        >
          <h3 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Visítanos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <MapPin className="h-10 w-10 text-[var(--accent)] mb-3" />
              <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">Ubicación</h4>
              <p className="text-[var(--foreground-muted)]">Obonuco city</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-10 w-10 text-[var(--accent)] mb-3" />
              <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">Horario</h4>
              <p className="text-[var(--foreground-muted)]">Lunes a Domingo</p>
              <p className="text-[var(--foreground-muted)]">12:00 - 22:00</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-10 w-10 text-[var(--accent)] mb-3" />
              <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">Reservas</h4>
              <p className="text-[var(--foreground-muted)]">(+123) 456-7890</p>
              <p className="text-[var(--foreground-muted)]">reservas@pigzas.com</p>
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
              px-8 py-3 
              bg-[var(--brass-500)] 
              text-white  
              rounded-full 
              shadow-md
              hover:shadow-lg
              text-lg
              font-semibold
              mx-auto
            "
          >
            Reservar Mesa
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}