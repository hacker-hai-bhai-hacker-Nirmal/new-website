// Authentication and Redirection Utility

// Simple Appwrite client without external dependencies
class SimpleAppwriteClient {
  constructor() {
    this.endpoint = 'https://fra.cloud.appwrite.io/v1';
    this.projectId = '6900b1ed001604d8befb';
    this.apiKey = 'standard_2ea684a82e7b55511b056b2857a03bdc93996b398ad9214410aa6e0faed1bc6ebeb03138858213a9f51e1433c4cddc9908821350bf826103f9b26389e315801beb75c5104ef4bd2490b0565a8ff4b0bf4e3907f525114172f8e6e398aa5d24f924dc5b0c467f4885a38aa3b42c4d7c0262cdf8c9f38111772075e021c5359c75';
    this.headers = {
      'X-Appwrite-Project': this.projectId,
      'X-Appwrite-Key': this.apiKey,
      'Content-Type': 'application/json'
    };
  }

  async get(endpoint) {
    const response = await fetch(`${this.endpoint}${endpoint}`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include'
    });
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${this.endpoint}${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
      credentials: 'include'
    });
    return response.json();
  }

  async delete(endpoint) {
    const response = await fetch(`${this.endpoint}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include'
    });
    return response.json();
  }
}

// Initialize Appwrite client
const client = new SimpleAppwriteClient();

// Simple Account class
class Account {
  constructor(client) {
    this.client = client;
  }

  async get() {
    return this.client.get('/account');
  }

  async deleteSession(sessionId = 'current') {
    return this.client.delete(`/account/sessions/${sessionId}`);
  }
}

// Authentication helper functions
export const auth = {
  isLoggedIn: async () => {
    try {
      const account = new Account(client);
      await account.get();
      return true;
    } catch (error) {
      return false;
    }
  },
  
  getCurrentUser: async () => {
    try {
      const account = new Account(client);
      return await account.get();
    } catch (error) {
      return null;
    }
  },
  
  logout: async () => {
    try {
      const account = new Account(client);
      await account.deleteSession();
      return true;
    } catch (error) {
      return false;
    }
  }
};

// Page protection and redirection logic
export const pageProtection = {
  // Pages that require authentication
  protectedRoutes: [
    '/dashboard',
    '/checkout',
    '/rewards',
    '/admin',
    '/kitchen'
  ],

  // Pages that should redirect to dashboard if user is already logged in
  authOnlyRoutes: [
    '/login'
  ],

  // Check if current route requires authentication
  requiresAuth: (currentPath) => {
    return pageProtection.protectedRoutes.some(route => 
      currentPath.startsWith(route)
    );
  },

  // Check if current route is for non-authenticated users only
  authOnly: (currentPath) => {
    return pageProtection.authOnlyRoutes.some(route => 
      currentPath.startsWith(route)
    );
  },

  // Handle page redirection based on auth status
  handleRedirection: async () => {
    const currentPath = window.location.pathname;
    const isLoggedIn = await auth.isLoggedIn();

    // Redirect logic for protected routes
    if (pageProtection.requiresAuth(currentPath) && !isLoggedIn) {
      // Store intended destination for post-login redirect
      sessionStorage.setItem('intendedDestination', currentPath);
      window.location.href = '/login';
      return false;
    }

    // Redirect logic for auth-only routes
    if (pageProtection.authOnly(currentPath) && isLoggedIn) {
      // Get intended destination or default to dashboard
      const intendedDestination = sessionStorage.getItem('intendedDestination');
      sessionStorage.removeItem('intendedDestination');
      window.location.href = intendedDestination || '/dashboard';
      return false;
    }

    return true;
  },

  // Initialize page protection
  init: async () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', pageProtection.handleRedirection);
    } else {
      await pageProtection.handleRedirection();
    }
  }
};

// Navigation helper functions
export const navigation = {
  // Navigate to a page with optional authentication check
  navigate: (path, options = {}) => {
    const { checkAuth = true, replace = false } = options;
    
    if (checkAuth) {
      // Check if navigation requires authentication
      if (pageProtection.requiresAuth(path)) {
        sessionStorage.setItem('intendedDestination', path);
        window.location.href = '/login';
        return;
      }
    }

    if (replace) {
      window.location.replace(path);
    } else {
      window.location.href = path;
    }
  },

  // Safe navigation that handles authentication
  safeNavigate: async (path) => {
    const isLoggedIn = await auth.isLoggedIn();
    
    if (pageProtection.requiresAuth(path) && !isLoggedIn) {
      sessionStorage.setItem('intendedDestination', path);
      window.location.href = '/login';
      return;
    }

    if (pageProtection.authOnly(path) && isLoggedIn) {
      window.location.href = '/dashboard';
      return;
    }

    window.location.href = path;
  }
};

// Toast notification helper
export const showToast = (message, type = 'success', duration = 3000) => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, duration);
};

// Export default for easy importing
export default {
  auth,
  pageProtection,
  navigation,
  showToast
};
