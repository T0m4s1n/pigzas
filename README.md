# 🍕 Pigzas

Una aplicación web moderna e interactiva para un servicio de entrega de pizzas construida con Next.js, React y Framer Motion.

## Características

- 💫 Interfaz elegante y animada con animaciones de Framer Motion
- 🌙 Soporte para temas claro/oscuro
- 🛒 Funcionalidad interactiva del carrito de compras
- 🍽️ Catálogo detallado de pizzas con descripciones
- 📱 Diseño totalmente responsive
- 💳 Proceso de pago con seguimiento de pedidos

## Stack Tecnológico

- **Next.js** - Framework de React para aplicaciones renderizadas en servidor
- **TypeScript** - Verificación de tipos estática
- **Framer Motion** - Biblioteca de animaciones
- **Lucide Icons** - iconos SVG
- **Tailwind CSS** - Framework CSS basado en utilidades

## Primeros Pasos

### Requisitos Previos

- Node.js (v16.x o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/yourusername/pigzas.git
   cd pigzas
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del Proyecto

```
pigzas/
├── .next                # Directorio de build de Next.js
├── app/                 # Directorio principal de la aplicación
│   ├── About/           # Página Acerca de
│   │   └── page.tsx
│   ├── Design/          # Página de Diseño
│   │   └── page.tsx
│   ├── Menu/            # Página de Menú
│   │   └── page.tsx
│   ├── Payment/         # Página de Pago
│   │   └── page.tsx
│   ├── globals.css      # Estilos globales
│   ├── Header.tsx       # Componente de cabecera
│   ├── Home.tsx         # Componente de página principal
│   ├── layout.tsx       # Componente de layout principal
│   ├── page.tsx         # Página principal
│   ├── Pizzabackground.tsx # Componente de fondo decorativo
│   ├── Shoppingcart.tsx # Funcionalidad del carrito de compras
│   └── themeutils.tsx   # Utilidades para el tema
├── node_modules/        # Dependencias
├── public/              # Archivos estáticos
├── .gitignore           # Configuración de Git
├── package-lock.json    # Bloqueo de versiones de dependencias
├── package.json         # Configuración del proyecto
├── tsconfig.json        # Configuración de TypeScript
├── README.md            # Este archivo
├── eslint.config.mjs    # Configuración de ESLint
├── postcss.config.mjs   # Configuración de PostCSS
├── next-env.d.ts        # Tipos para Next.js
└── next.config.ts       # Configuración de Next.js
```

## Despliegue

Esta aplicación puede desplegarse fácilmente en Vercel con unos pocos clics:

[![Desplegar con Vercel](https://vercel.com/button)](https://pigzas.vercel.app/)
