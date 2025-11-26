import { Client, Account, Databases, ID, Query } from 'appwrite';

// Get configuration from environment variables
const getEnvVar = (key) => {
    if (typeof window !== 'undefined') {
        // Browser environment
        return window.env?.[key] || import.meta.env?.[key];
    } else {
        // Server environment
        return process.env[key];
    }
};

export const client = new Client()
    .setEndpoint(getEnvVar('VITE_APPWRITE_ENDPOINT') || 'https://cloud.appwrite.io/v1')
    .setProject(getEnvVar('VITE_APPWRITE_PROJECT_ID') || 'YOUR_PROJECT_ID');

export const account = new Account(client);
export const databases = new Databases(client);

// Appwrite Configuration
export const config = {
    projectId: getEnvVar('VITE_APPWRITE_PROJECT_ID') || 'YOUR_PROJECT_ID',
    databaseId: getEnvVar('VITE_APPWRITE_DATABASE_ID') || 'litterateur_db',
    collections: {
        users: 'users',
        orders: 'orders',
        menu_items: 'menu_items',
        referrals: 'referrals',
        tokens: 'tokens'
    }
};

// Authentication functions
export const auth = {
    // Create account with email and password
    async createAccount(email, password, name) {
        try {
            const user = await account.create(ID.unique(), email, password, name);
            return user;
        } catch (error) {
            console.error('Appwrite createAccount error:', error);
            throw error;
        }
    },

    // Login with email and password
    async login(email, password) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.error('Appwrite login error:', error);
            throw error;
        }
    },

    // Login with phone number
    async loginWithPhone(phone, password) {
        try {
            const session = await account.createPhoneSession(phone, password);
            return session;
        } catch (error) {
            console.error('Appwrite phone login error:', error);
            throw error;
        }
    },

    // Google OAuth login
    async loginWithGoogle() {
        try {
            const session = await account.createOAuth2Session('google', 
                'https://new-website-cloudflare.pages.dev/dashboard', 
                'https://new-website-cloudflare.pages.dev/login'
            );
            return session;
        } catch (error) {
            console.error('Appwrite Google login error:', error);
            throw error;
        }
    },

    // Get current logged in user
    async getCurrentUser() {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            console.error('Appwrite getCurrentUser error:', error);
            return null;
        }
    },

    // Logout user
    async logout() {
        try {
            await account.deleteSession('current');
            return true;
        } catch (error) {
            console.error('Appwrite logout error:', error);
            throw error;
        }
    },

    // Check if user is logged in
    async isLoggedIn() {
        try {
            const user = await this.getCurrentUser();
            return user !== null;
        } catch (error) {
            return false;
        }
    }
};

// Database functions
export const db = {
    // Create user profile
    async createUserProfile(userId, userData) {
        try {
            const userProfile = await databases.createDocument(
                config.databaseId,
                config.collections.users,
                userId,
                userData
            );
            return userProfile;
        } catch (error) {
            console.error('Appwrite createUserProfile error:', error);
            throw error;
        }
    },

    // Get user profile
    async getUserProfile(userId) {
        try {
            const userProfile = await databases.getDocument(
                config.databaseId,
                config.collections.users,
                userId
            );
            return userProfile;
        } catch (error) {
            console.error('Appwrite getUserProfile error:', error);
            return null;
        }
    },

    // Update user profile
    async updateUserProfile(userId, userData) {
        try {
            const userProfile = await databases.updateDocument(
                config.databaseId,
                config.collections.users,
                userId,
                userData
            );
            return userProfile;
        } catch (error) {
            console.error('Appwrite updateUserProfile error:', error);
            throw error;
        }
    },

    // Create order
    async createOrder(orderData) {
        try {
            const order = await databases.createDocument(
                config.databaseId,
                config.collections.orders,
                ID.unique(),
                orderData
            );
            return order;
        } catch (error) {
            console.error('Appwrite createOrder error:', error);
            throw error;
        }
    },

    // Get user orders
    async getUserOrders(userId) {
        try {
            const orders = await databases.listDocuments(
                config.databaseId,
                config.collections.orders,
                [Query.equal('userId', userId)]
            );
            return orders.documents;
        } catch (error) {
            console.error('Appwrite getUserOrders error:', error);
            return [];
        }
    }
};

export default { client, account, databases, auth, db, config };
