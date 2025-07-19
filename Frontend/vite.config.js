import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'tcms-texas-pi.vercel.app',
        secure:false,
      },
    },
  },
  plugins: [react(),
    tailwindcss(),
    svgr(),
  ],
})
