// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    // Disable sessions to avoid KV binding requirement
    session: {
      enabled: false,
    },
  }),
  output: 'server',
  vite: {
    define: {
      global: 'globalThis',
    },
  },
});
