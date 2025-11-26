import { writable } from 'svelte/store';
import { Client, Account, Databases } from 'appwrite';

// Initialize the client
const client = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const user = writable(null);

export const checkAuth = async () => {
    try {
        const userAccount = await account.get();
        user.set(userAccount);
        return userAccount;
    } catch (error) {
        user.set(null);
        return null;
    }
};

export const login = async (email, password) => {
    try {
        await account.createEmailSession(email, password);
        const userAccount = await checkAuth();
        return { success: true, user: userAccount };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const register = async (email, password, name) => {
    try {
        await account.create('unique()', email, password, name);
        await login(email, password);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
        user.set(null);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Check auth status on app load
checkAuth();
