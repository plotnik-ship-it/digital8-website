/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'electric-yellow': '#e1fe3f',
        'off-white': '#fefefe',
        'brand-dark': '#050505',
      },
    },
  },
  plugins: [],
};