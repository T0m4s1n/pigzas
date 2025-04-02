"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Users, Star, Clock, MapPin, Phone, UtensilsCrossed, Award, Leaf } from 'lucide-react';
import PizzaHeader from '../Header';
import PigzasBackground from '../Pizzabackground';

export default function AboutUs() {
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
      <PigzasBackground />
      <section className="container mx-auto px-6 py-32 min-h-screen">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <section className="flex items-center justify-center space-x-4 mb-4">
            <Pizza className="h-10 w-10 text-[var(--accent)]" />
            <h1 className="font-['Dancing_Script'] font-bold text-4xl text-[var(--foreground)]">
              Sobre Nosotros
            </h1>
          </section>
          <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">
            Nuestra Historia y Pasión
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Bienvenidos a Pigzas, donde la tradición italiana se encuentra con la innovación culinaria. 
            Desde nuestra apertura en 2025, nos hemos dedicado a crear pizzas artesanales que deleiten 
            y sorprendan a nuestros comensales.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center"
        >
          <section className="relative h-96 overflow-hidden rounded-xl shadow-lg">
            <img
              src="./pizzas.jpg"
              alt="Interior de Pigzas"
              className="w-full h-full object-cover"
            />
          </section>
          <section>
            <h3 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Nuestra Historia</h3>
            <p className="text-[var(--foreground-muted)] mb-4 leading-relaxed">
              Todo comenzó con una simple idea: traer la auténtica experiencia de la pizza italiana a nuestra 
              comunidad, pero con un toque único que reflejara nuestra identidad local.
            </p>
            <p className="text-[var(--foreground-muted)] mb-4 leading-relaxed">
              Fundada por el tomasin, amante de la gastronomía italiana, Pigzas nació de viajes por 
              Italia y años de experimentación con recetas tradicionales para adaptarlas a los gustos locales.
            </p>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              Hoy, nos enorgullece ser reconocidos como uno de los mejores restaurantes de pizza en la ciudad, 
              manteniendo siempre nuestra filosofía de calidad, frescura y servicio excepcional.
            </p>
          </section>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold mb-10 text-center text-[var(--foreground)]">
            Lo Que Nos Hace Especiales
          </h3>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurantFeatures.map((feature, index) => (
              <motion.section
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
                <section className="flex justify-center mb-4">
                  {feature.icon}
                </section>
                <h4 className="text-xl font-bold mb-3 text-[var(--foreground)]">{feature.title}</h4>
                <p className="text-[var(--foreground-muted)]">{feature.description}</p>
              </motion.section>
            ))}
          </section>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-20 bg-[var(--card-background)] rounded-xl shadow-lg p-8"
        >
          <h3 className="text-3xl font-bold mb-10 text-center text-[var(--foreground)]">
            Reconocimientos
          </h3>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.section
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col items-center text-center"
            >
              <Award className="h-16 w-16 text-[var(--accent)] mb-4" />
              <h4 className="text-xl font-bold mb-2 text-[var(--foreground)]">Mejor Pizza 2023</h4>
              <p className="text-[var(--foreground-muted)]">Galardonados con el premio a la mejor pizza artesanal de la región.</p>
            </motion.section>
            <motion.section
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-col items-center text-center"
            >
              <UtensilsCrossed className="h-16 w-16 text-[var(--accent)] mb-4" />
              <h4 className="text-xl font-bold mb-2 text-[var(--foreground)]">Excelencia Culinaria</h4>
              <p className="text-[var(--foreground-muted)]">Reconocidos por la asociación gastronómica por nuestra creatividad y sabor.</p>
            </motion.section>
            <motion.section
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-col items-center text-center"
            >
              <Leaf className="h-16 w-16 text-[var(--accent)] mb-4" />
              <h4 className="text-xl font-bold mb-2 text-[var(--foreground)]">Sostenibilidad</h4>
              <p className="text-[var(--foreground-muted)]">Certificación de prácticas sostenibles y uso responsable de ingredientes locales.</p>
            </motion.section>
          </section>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="bg-[var(--card-background)] rounded-xl shadow-lg p-8 text-center"
        >
          <h3 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Visítanos</h3>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <section className="flex flex-col items-center">
              <MapPin className="h-10 w-10 text-[var(--accent)] mb-3" />
              <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">Ubicación</h4>
              <p className="text-[var(--foreground-muted)]">Obonuco city</p>
            </section>
            <section className="flex flex-col items-center">
              <Clock className="h-10 w-10 text-[var(--accent)] mb-3" />
              <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">Horario</h4>
              <p className="text-[var(--foreground-muted)]">solo los miercoles</p>
              <p className="text-[var(--foreground-muted)]">de 7 a 10</p>
            </section>
            <section className="flex flex-col items-center">
              <Phone className="h-10 w-10 text-[var(--accent)] mb-3" />
              <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">Reservas</h4>
              <p className="text-[var(--foreground-muted)]">numeritonice</p>
              <p className="text-[var(--foreground-muted)]">reservas@pigzas.com</p>
            </section>
          </section>
        </motion.section>
      </section>
    </>
  );
}