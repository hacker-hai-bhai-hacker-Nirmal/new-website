// src/lib/authService.js
import { account, client } from './appwrite';
import { ID } from 'appwrite';

/**
 * Send OTP to user's email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response object
 */
export const sendOtp = async (email) => {
  try {
    // Create an email token (OTP flow)
    const response = await account.createEmailToken(
      ID.unique(), // User ID (will be created if not exists)
      email
    );

    return {
      success: true,
      userId: response.userId,
      message: 'OTP sent successfully. Please check your email.',
      expiresAt: response.expire // Expiration time
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      error: error.message || 'Failed to send OTP. Please try again.'
    };
  }
};

/**
 * Verify OTP and create session
 * @param {string} userId - User ID from sendOtp response
 * @param {string} secret - OTP from email
 * @returns {Promise<Object>} Response object
 */
export const verifyOtp = async (userId, secret) => {
  try {
    // Create session using the email token (OTP)
    const session = await account.createSession(userId, secret);
    
    // Store session in localStorage for persistence
    localStorage.setItem('appwriteSession', JSON.stringify({
      userId: session.userId,
      sessionId: session.$id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    }));

    return {
      success: true,
      sessionId: session.$id,
      userId: session.userId,
      message: 'OTP verified successfully!'
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      error: error.message || 'Invalid or expired OTP. Please try again.'
    };
  }
};

/**
 * Get current user session
 * @returns {Promise<Object>} Current session or null
 */
export const getCurrentSession = async () => {
  try {
    // Check localStorage first
    const storedSession = localStorage.getItem('appwriteSession');
    if (storedSession) {
      const sessionData = JSON.parse(storedSession);
      
      // Check if session is still valid
      if (new Date(sessionData.expiresAt) > new Date()) {
        // Verify with Appwrite
        const session = await account.getSession('current');
        return { success: true, session };
      } else {
        // Clear expired session
        localStorage.removeItem('appwriteSession');
      }
    }
    
    // Try to get current session from Appwrite
    const session = await account.getSession('current');
    if (session) {
      localStorage.setItem('appwriteSession', JSON.stringify({
        userId: session.userId,
        sessionId: session.$id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }));
      return { success: true, session };
    }
    
    return { success: false, error: 'No active session' };
  } catch (error) {
    return { success: false, error: 'No active session' };
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Response object
 */
export const logout = async () => {
  try {
    await account.deleteSession('current');
    localStorage.removeItem('appwriteSession');
    return { success: true, message: 'Logged out successfully' };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Check if user is logged in
 * @returns {boolean} True if logged in
 */
export const isLoggedIn = async () => {
  const session = await getCurrentSession();
  return session.success;
};

/**
 * Get current user details
 * @returns {Promise<Object>} User details or null
 */
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'User not found' };
  }
};

/**
 * Resend OTP to the same email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response object
 */
export const resendOtp = async (email) => {
  return sendOtp(email); // Same implementation as sendOtp
};

// Initialize Appwrite client for browser
if (typeof window !== 'undefined') {
  const endpoint = window.location.hostname === 'localhost' 
    ? 'http://localhost/v1' 
    : 'https://fra.cloud.appwrite.io/v1';
  
  client.setEndpoint(endpoint);
  client.setProject('6900b1ed001604d8befb');
}
