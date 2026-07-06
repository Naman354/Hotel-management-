# React + Vite
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

# Hotel — React + Vite

A small React app (Vite) that lists hotels and shows details for each property. Built with React, React Router and Tailwind CSS.

## Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure (important files)

- [src/main.jsx](src/main.jsx) — app entry
- [src/App.jsx](src/App.jsx) — routes and `HomePage` component
- [src/pages/HotelDetailsPage.jsx](src/pages/HotelDetailsPage.jsx) — hotel details view
- [src/components/HotelCard.jsx](src/components/HotelCard.jsx) — card used on the home page
- [src/components/Navbar.jsx](src/components/Navbar.jsx) — top navigation
- [src/services/hotelService.js](src/services/hotelService.js) — API / data helpers
- [src/index.css](src/index.css) — global and background styles
- [index.html](index.html) — inline fallback background for initial paint


## Tailwind CSS

This project uses Tailwind utilities in JSX. Edit global styles in [src/index.css](src/index.css) when you need custom gradients or overlays.

## Editing visuals

- To change the home background gradient, edit the `.home-page-background` rule in [src/index.css](src/index.css).
- To adjust card elevation, edit the shadow utilities in the JSX files mentioned above or add custom CSS classes if you need colored shadows or offsets.

