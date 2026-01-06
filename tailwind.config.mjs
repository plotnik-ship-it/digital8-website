/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#050505',
        'brand-primary': '#e1fe3f',
        'off-white': '#f7f7f7',
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
