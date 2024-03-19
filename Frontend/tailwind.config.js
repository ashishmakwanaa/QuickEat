/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        animation: {
          'slide-in-up': 'slide-in-up 0.8s ease-out',
        },
        
        keyframes: {
          'slide-in-up': {
            from: {
              transform: 'translateY(50px)',
              opacity: '0',
            },
            to: {
              transform: 'translateY(0)',
              opacity: '1',
            },
          },
        },
      },
    },
    plugins: [],
    
  }

  
  
  