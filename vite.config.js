import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/', // Changed from './' to '/Portfolio/' for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure assets are properly handled
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep original names for specific files
          if (assetInfo.name === 'SandhyaResume.pdf' ||
              assetInfo.name === 'SummerTimeSadness.mp3' ||
              assetInfo.name?.startsWith('photo')) {
            return `assets/${assetInfo.name}`;
          }
          // Default naming for other assets
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  // Optimize asset handling
  assetsInclude: ['**/*.pdf', '**/*.mp3', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif'],
  // Development server configuration
  server: {
    port: 3000,
    open: true
  },
  // Preview server configuration
  preview: {
    port: 4173,
    open: true
  }
})