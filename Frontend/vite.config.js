import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://687b3c4eb820d0b78eb22cec--tcms-backend.netlify.app',
        secure:false,
      },
    },
  },
  plugins: [react(),
    tailwindcss(),
    svgr(),
  ],
})
