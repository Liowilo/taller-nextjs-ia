// Tailwind CSS v4 se conecta a Next.js como un plugin de PostCSS.
// Ya no hace falta tailwind.config.js: la configuración vive en globals.css.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
