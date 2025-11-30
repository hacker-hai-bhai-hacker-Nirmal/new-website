// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    // Enable platform proxy for better environment variable access
    platformProxy: {
      enabled: true,
    },
  }),
  output: 'static',
  vite: {
    define: {
      global: 'globalThis',
    },
    // Ensure environment variables are properly handled
    envPrefix: 'VITE_',
  },
});
