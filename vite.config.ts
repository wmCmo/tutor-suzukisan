import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/ojad': {
        target: 'https://www.gavo.t.u-tokyo.ac.jp',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ojad/, '/ojad'),
      },
    },
  },
});
