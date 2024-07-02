
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    
    extend: {

      colors: {
        primary: {
         50: 'var(--color-primary-50)',
         100: 'var(--color-primary-100)',
         200: 'var(--color-primary-200)',
         300: 'var(--color-primary-300)',
         400: 'var(--color-primary-400)',
         500: 'var(--color-primary-500)',
         600: 'var(--color-primary-600)',
         700: 'var(--color-primary-700)',
         800: 'var(--color-primary-800)',
         900: 'var(--color-primary-900)',
         950: 'var(--color-primary-950)',
        },
        secondary: {
         50: 'var(--color-secondary-50)',
         100: 'var(--color-secondary-100)',
         200: 'var(--color-secondary-200)',
         300: 'var(--color-secondary-300)',
         400: 'var(--color-secondary-400)',
         500: 'var(--color-secondary-500)',
         600: 'var(--color-secondary-600)',
         700: 'var(--color-secondary-700)',
         800: 'var(--color-secondary-800)',
         900: 'var(--color-secondary-900)',
         950: 'var(--color-secondary-950)',
        },
        accent: {
         50: 'var(--color-accent-50)',
         100: 'var(--color-accent-100)',
         200: 'var(--color-accent-200)',
         300: 'var(--color-accent-300)',
         400: 'var(--color-accent-400)',
         500: 'var(--color-accent-500)',
         600: 'var(--color-accent-600)',
         700: 'var(--color-accent-700)',
         800: 'var(--color-accent-800)',
         900: 'var(--color-accent-900)',
         950: 'var(--color-accent-950)',
        },
        fondo: 'var(--color-fondo)',
        primario: 'var(--color-primario)',
        secundario: 'var(--color-secundario)',
        menusup: 'var(--color-menusup)',
        drawer: 'var(--color-menulateral)',
        footer: 'var(--color-footer)'
        // accent: 'var(--color-accent)',
      }
      
    },
  },
  // plugins: [
  //   require('flowbite/plugin'),
  // ],
  plugins: [
    require('flowbite/plugin'),
    // function({ addUtilities }) {
    //   const newUtilities = {
    //     '.scrollbar-thin': {
    //       scrollbarWidth: 'thin',
    //       scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
    //       '&::-webkit-scrollbar': {
    //         width: '6px',
    //         height: '6px',
    //       },
    //       '&::-webkit-scrollbar-thumb': {
    //         backgroundColor: 'rgba(0, 0, 0, 0.2)',
    //         borderRadius: '3px',
    //       },
    //       '&::-webkit-scrollbar-thumb:hover': {
    //         backgroundColor: 'rgba(0, 0, 0, 0.3)',
    //       },
    //     },
    //     '.scrollbar-auto': {
    //       scrollbarWidth: 'auto',
    //       scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
    //       '&::-webkit-scrollbar': {
    //         width: 'auto',
    //         height: 'auto',
    //       },
    //       '&::-webkit-scrollbar-thumb': {
    //         backgroundColor: 'rgba(0, 0, 0, 0.2)',
    //         borderRadius: '3px',
    //       },
    //       '&::-webkit-scrollbar-thumb:hover': {
    //         backgroundColor: 'rgba(0, 0, 0, 0.3)',
    //       },
          
    //     },
    //     '.scrollbar-none': {
    //       scrollbarWidth: 'none',
    //       '&::-webkit-scrollbar': {
    //         display: 'none',
    //       },
    //     },
    //   }
    //   addUtilities(newUtilities, ['responsive'])
    // },
  ],
}
