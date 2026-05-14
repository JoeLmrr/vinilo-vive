import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      open: false,
    },
    // Custom plugin to show Admin URL in terminal
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'show-admin-url',
        configureServer(server) {
          server.httpServer?.once('listening', () => {
            const address = server.httpServer?.address();
            if (address && typeof address !== 'string') {
              const port = address.port;
              setTimeout(() => {
                console.log(`\n  \x1b[33m\x1b[1m➜\x1b[0m  \x1b[1mAdmin Panel:\x1b[0m \x1b[36mhttp://localhost:${port}/admin/login\x1b[0m\n`);
              }, 100);
            }
          });
        }
      }
    ],
  };
});
