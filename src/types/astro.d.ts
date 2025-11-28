// Global type declarations for Astro

declare global {
  namespace Astro {
    interface Locals {
      user?: import('../lib/sessionManager.js').UserSession;
      isAuthenticated?: boolean;
    }
  }
}

export {};
