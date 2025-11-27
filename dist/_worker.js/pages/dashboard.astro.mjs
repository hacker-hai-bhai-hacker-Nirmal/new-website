globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, l as renderScript, m as maybeRenderHead } from '../chunks/astro/server_C-K2zirC.mjs';
import { $ as $$Layout } from '../chunks/Layout_DVntI8GC.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-3nssi2tu": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["  ", `<div class="discount-banner" data-astro-cid-3nssi2tu> <div class="sparkle-effect" data-astro-cid-3nssi2tu>\u2728</div> <span data-astro-cid-3nssi2tu>\u{1F389} Launch Discount: Get Up to 60% Off! \u{1F389}</span> <div class="sparkle-effect" data-astro-cid-3nssi2tu>\u2728</div> </div> <header class="site-header" data-astro-cid-3nssi2tu> <div class="container" data-astro-cid-3nssi2tu> <a class="brand" href="/" data-astro-cid-3nssi2tu>Litterateur</a> <nav class="nav" data-astro-cid-3nssi2tu> <a href="/menu" data-astro-cid-3nssi2tu>Menu</a> <a href="/rewards" data-astro-cid-3nssi2tu>Rewards</a> <a class="cta" href="/dashboard" data-astro-cid-3nssi2tu>My Account</a> </nav> </div> </header> <main data-astro-cid-3nssi2tu> <section class="dashboard-section" data-astro-cid-3nssi2tu> <div class="container" data-astro-cid-3nssi2tu> <div class="dashboard-grid" data-astro-cid-3nssi2tu> <!-- User Profile Sidebar --> <div class="user-sidebar" data-astro-cid-3nssi2tu> <div class="profile-card" data-astro-cid-3nssi2tu> <div class="profile-avatar" data-astro-cid-3nssi2tu>\u{1F464}</div> <div class="profile-info" data-astro-cid-3nssi2tu> <h2 id="userName" data-astro-cid-3nssi2tu>Loading...</h2> <p id="userPhone" data-astro-cid-3nssi2tu>Loading...</p> <p id="userEmail" data-astro-cid-3nssi2tu>Loading...</p> </div> <button class="edit-profile-btn" data-astro-cid-3nssi2tu>\u270F\uFE0F Edit Profile</button> </div> <!-- Quick Stats --> <div class="stats-card" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>Your Stats</h3> <div class="stat-item" data-astro-cid-3nssi2tu> <div class="stat-icon" data-astro-cid-3nssi2tu>\u{1FA99}</div> <div class="stat-details" data-astro-cid-3nssi2tu> <div class="stat-value" id="userTokens" data-astro-cid-3nssi2tu>0</div> <div class="stat-label" data-astro-cid-3nssi2tu>Tokens</div> </div> </div> <div class="stat-item" data-astro-cid-3nssi2tu> <div class="stat-icon" data-astro-cid-3nssi2tu>\u{1F465}</div> <div class="stat-details" data-astro-cid-3nssi2tu> <div class="stat-value" data-astro-cid-3nssi2tu>8</div> <div class="stat-label" data-astro-cid-3nssi2tu>Referrals</div> </div> </div> <div class="stat-item" data-astro-cid-3nssi2tu> <div class="stat-icon" data-astro-cid-3nssi2tu>\u{1F3AF}</div> <div class="stat-details" data-astro-cid-3nssi2tu> <div class="stat-value" data-astro-cid-3nssi2tu>30%</div> <div class="stat-label" data-astro-cid-3nssi2tu>Current Discount</div> </div> </div> </div> <!-- Quick Actions --> <div class="quick-actions" data-astro-cid-3nssi2tu> <button class="action-btn" data-astro-cid-3nssi2tu>\u{1F6D2} View Cart</button> <button class="action-btn" data-astro-cid-3nssi2tu>\u{1F381} Redeem Tokens</button> <button class="action-btn" data-astro-cid-3nssi2tu>\u{1F4E4} Share Code</button> </div> </div> <!-- Main Content Area --> <div class="main-content" data-astro-cid-3nssi2tu> <!-- My Orders Section --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>My Orders</h2> <div class="orders-list" data-astro-cid-3nssi2tu> <div class="order-card" data-astro-cid-3nssi2tu> <div class="order-header" data-astro-cid-3nssi2tu> <div class="order-number" data-astro-cid-3nssi2tu>#ORD-2025-001</div> <div class="order-status preparing" data-astro-cid-3nssi2tu>Preparing</div> </div> <div class="order-items" data-astro-cid-3nssi2tu> <div class="order-item" data-astro-cid-3nssi2tu> <span class="item-emoji" data-astro-cid-3nssi2tu>\u{1F950}</span> <span class="item-name" data-astro-cid-3nssi2tu>Artisan Croissant \xD72</span> <span class="item-price" data-astro-cid-3nssi2tu>\u20B9598</span> </div> <div class="order-item" data-astro-cid-3nssi2tu> <span class="item-emoji" data-astro-cid-3nssi2tu>\u2615</span> <span class="item-name" data-astro-cid-3nssi2tu>Signature Blend Coffee \xD71</span> <span class="item-price" data-astro-cid-3nssi2tu>\u20B9199</span> </div> </div> <div class="order-tracking" data-astro-cid-3nssi2tu> <div class="tracking-progress" data-astro-cid-3nssi2tu> <div class="tracking-step completed" data-astro-cid-3nssi2tu> <div class="step-icon" data-astro-cid-3nssi2tu>\u{1F4DD}</div> <span data-astro-cid-3nssi2tu>Order Placed</span> </div> <div class="tracking-step completed" data-astro-cid-3nssi2tu> <div class="step-icon" data-astro-cid-3nssi2tu>\u{1F468}\u200D\u{1F373}</div> <span data-astro-cid-3nssi2tu>Preparing</span> </div> <div class="tracking-step" data-astro-cid-3nssi2tu> <div class="step-icon" data-astro-cid-3nssi2tu>\u{1F69A}</div> <span data-astro-cid-3nssi2tu>Out for Delivery</span> </div> <div class="tracking-step" data-astro-cid-3nssi2tu> <div class="step-icon" data-astro-cid-3nssi2tu>\u2705</div> <span data-astro-cid-3nssi2tu>Delivered</span> </div> </div> </div> <div class="order-footer" data-astro-cid-3nssi2tu> <div class="order-total" data-astro-cid-3nssi2tu>Total: \u20B9794</div> <button class="track-btn" data-astro-cid-3nssi2tu>Track Order</button> </div> </div> <div class="order-card" data-astro-cid-3nssi2tu> <div class="order-header" data-astro-cid-3nssi2tu> <div class="order-number" data-astro-cid-3nssi2tu>#ORD-2025-002</div> <div class="order-status delivered" data-astro-cid-3nssi2tu>Delivered</div> </div> <div class="order-items" data-astro-cid-3nssi2tu> <div class="order-item" data-astro-cid-3nssi2tu> <span class="item-emoji" data-astro-cid-3nssi2tu>\u{1F957}</span> <span class="item-name" data-astro-cid-3nssi2tu>Garden Fresh Salad \xD71</span> <span class="item-price" data-astro-cid-3nssi2tu>\u20B9349</span> </div> <div class="order-item" data-astro-cid-3nssi2tu> <span class="item-emoji" data-astro-cid-3nssi2tu>\u{1F36E}</span> <span class="item-name" data-astro-cid-3nssi2tu>Cr\xE8me Br\xFBl\xE9e \xD71</span> <span class="item-price" data-astro-cid-3nssi2tu>\u20B9249</span> </div> </div> <div class="order-footer" data-astro-cid-3nssi2tu> <div class="order-total" data-astro-cid-3nssi2tu>Total: \u20B9598</div> <button class="reorder-btn" data-astro-cid-3nssi2tu>\u{1F504} Order Again</button> </div> </div> </div> </div> <!-- Token History Section --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>Token History</h2> <div class="token-history" data-astro-cid-3nssi2tu> <div class="history-item" data-astro-cid-3nssi2tu> <div class="history-icon" data-astro-cid-3nssi2tu>\u2795</div> <div class="history-details" data-astro-cid-3nssi2tu> <div class="history-title" data-astro-cid-3nssi2tu>Earned from Order #ORD-2025-001</div> <div class="history-date" data-astro-cid-3nssi2tu>Today, 12:30 PM</div> </div> <div class="history-amount positive" data-astro-cid-3nssi2tu>+50 tokens</div> </div> <div class="history-item" data-astro-cid-3nssi2tu> <div class="history-icon" data-astro-cid-3nssi2tu>\u{1F381}</div> <div class="history-details" data-astro-cid-3nssi2tu> <div class="history-title" data-astro-cid-3nssi2tu>Redeemed for 5% discount</div> <div class="history-date" data-astro-cid-3nssi2tu>Yesterday, 6:45 PM</div> </div> <div class="history-amount negative" data-astro-cid-3nssi2tu>-100 tokens</div> </div> <div class="history-item" data-astro-cid-3nssi2tu> <div class="history-icon" data-astro-cid-3nssi2tu>\u2795</div> <div class="history-details" data-astro-cid-3nssi2tu> <div class="history-title" data-astro-cid-3nssi2tu>Referral bonus - User joined</div> <div class="history-date" data-astro-cid-3nssi2tu>2 days ago</div> </div> <div class="history-amount positive" data-astro-cid-3nssi2tu>+25 tokens</div> </div> <div class="history-item" data-astro-cid-3nssi2tu> <div class="history-icon" data-astro-cid-3nssi2tu>\u2795</div> <div class="history-details" data-astro-cid-3nssi2tu> <div class="history-title" data-astro-cid-3nssi2tu>Earned from Order #ORD-2025-002</div> <div class="history-date" data-astro-cid-3nssi2tu>3 days ago</div> </div> <div class="history-amount positive" data-astro-cid-3nssi2tu>+35 tokens</div> </div> </div> <button class="view-all-btn" data-astro-cid-3nssi2tu>View All History</button> </div> <!-- Referral Activity --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>Referral Activity</h2> <div class="referral-activity" data-astro-cid-3nssi2tu> <div class="referral-summary" data-astro-cid-3nssi2tu> <div class="summary-card" data-astro-cid-3nssi2tu> <div class="summary-icon" data-astro-cid-3nssi2tu>\u{1F465}</div> <div class="summary-content" data-astro-cid-3nssi2tu> <div class="summary-value" data-astro-cid-3nssi2tu>8</div> <div class="summary-label" data-astro-cid-3nssi2tu>Total Referrals</div> </div> </div> <div class="summary-card" data-astro-cid-3nssi2tu> <div class="summary-icon" data-astro-cid-3nssi2tu>\u{1F3AF}</div> <div class="summary-content" data-astro-cid-3nssi2tu> <div class="summary-value" data-astro-cid-3nssi2tu>30%</div> <div class="summary-label" data-astro-cid-3nssi2tu>Current Discount</div> </div> </div> <div class="summary-card" data-astro-cid-3nssi2tu> <div class="summary-icon" data-astro-cid-3nssi2tu>\u{1F4C8}</div> <div class="summary-content" data-astro-cid-3nssi2tu> <div class="summary-value" data-astro-cid-3nssi2tu>12</div> <div class="summary-label" data-astro-cid-3nssi2tu>To Next Tier</div> </div> </div> </div> <div class="recent-referrals" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>Recent Referrals</h3> <div class="referral-item" data-astro-cid-3nssi2tu> <div class="referral-avatar" data-astro-cid-3nssi2tu>\u{1F464}</div> <div class="referral-info" data-astro-cid-3nssi2tu> <div class="referral-name" data-astro-cid-3nssi2tu>User A</div> <div class="referral-date" data-astro-cid-3nssi2tu>Joined 2 days ago</div> </div> <div class="referral-status success" data-astro-cid-3nssi2tu>Active</div> </div> <div class="referral-item" data-astro-cid-3nssi2tu> <div class="referral-avatar" data-astro-cid-3nssi2tu>\u{1F464}</div> <div class="referral-info" data-astro-cid-3nssi2tu> <div class="referral-name" data-astro-cid-3nssi2tu>User B</div> <div class="referral-date" data-astro-cid-3nssi2tu>Joined 1 week ago</div> </div> <div class="referral-status success" data-astro-cid-3nssi2tu>Active</div> </div> </div> </div> </div> <!-- Preferences --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>Preferences</h2> <div class="preferences-grid" data-astro-cid-3nssi2tu> <div class="preference-card" data-astro-cid-3nssi2tu> <div class="preference-icon" data-astro-cid-3nssi2tu>\u{1F514}</div> <div class="preference-content" data-astro-cid-3nssi2tu> <h4 data-astro-cid-3nssi2tu>Notifications</h4> <p data-astro-cid-3nssi2tu>Order updates, special offers</p> <label class="switch" data-astro-cid-3nssi2tu> <input type="checkbox" checked data-astro-cid-3nssi2tu> <span class="slider" data-astro-cid-3nssi2tu></span> </label> </div> </div> <div class="preference-card" data-astro-cid-3nssi2tu> <div class="preference-icon" data-astro-cid-3nssi2tu>\u{1F4E7}</div> <div class="preference-content" data-astro-cid-3nssi2tu> <h4 data-astro-cid-3nssi2tu>Email Updates</h4> <p data-astro-cid-3nssi2tu>Weekly menu, promotions</p> <label class="switch" data-astro-cid-3nssi2tu> <input type="checkbox" checked data-astro-cid-3nssi2tu> <span class="slider" data-astro-cid-3nssi2tu></span> </label> </div> </div> <div class="preference-card" data-astro-cid-3nssi2tu> <div class="preference-icon" data-astro-cid-3nssi2tu>\u{1F4AC}</div> <div class="preference-content" data-astro-cid-3nssi2tu> <h4 data-astro-cid-3nssi2tu>SMS Alerts</h4> <p data-astro-cid-3nssi2tu>Delivery notifications</p> <label class="switch" data-astro-cid-3nssi2tu> <input type="checkbox" data-astro-cid-3nssi2tu> <span class="slider" data-astro-cid-3nssi2tu></span> </label> </div> </div> </div> </div> <!-- System Status / Deployment Verification --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>System Status</h2> <div class="status-card" data-astro-cid-3nssi2tu> <div class="status-header" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>\u{1F4CA} Deployment Information</h3> <span class="status-indicator online" id="deploymentStatus" data-astro-cid-3nssi2tu>Online</span> </div> <div class="status-details" data-astro-cid-3nssi2tu> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Worker:</span> <span class="status-value" data-astro-cid-3nssi2tu>new-website-cloudflare</span> </div> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Environment:</span> <span class="status-value" data-astro-cid-3nssi2tu>Production</span> </div> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Last Deployed:</span> <span class="status-value" id="lastDeployed" data-astro-cid-3nssi2tu>Loading...</span> </div> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Page Loaded:</span> <span class="status-value" id="pageLoaded" data-astro-cid-3nssi2tu>Loading...</span> </div> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Cache Status:</span> <span class="status-value" id="cacheStatus" data-astro-cid-3nssi2tu>Checking...</span> </div> </div> <div class="status-actions" data-astro-cid-3nssi2tu> <button class="refresh-btn" onclick="checkDeploymentStatus()" data-astro-cid-3nssi2tu>\u{1F504} Refresh Status</button> <button class="clear-cache-btn" onclick="clearCache()" data-astro-cid-3nssi2tu>\u{1F5D1}\uFE0F Clear Cache</button> </div> </div> </div> </div> </div> </div> </section> </main>  <div class="modal" id="editProfileModal" data-astro-cid-3nssi2tu> <div class="modal-content" data-astro-cid-3nssi2tu> <div class="modal-header" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>Edit Profile</h3> <button class="close-modal" id="closeModal" data-astro-cid-3nssi2tu>\xD7</button> </div> <form class="edit-profile-form" data-astro-cid-3nssi2tu> <div class="form-group" data-astro-cid-3nssi2tu> <label for="editName" data-astro-cid-3nssi2tu>Full Name</label> <input type="text" id="editName" value="John Doe" data-astro-cid-3nssi2tu> </div> <div class="form-group" data-astro-cid-3nssi2tu> <label for="editPhone" data-astro-cid-3nssi2tu>Phone Number</label> <input type="tel" id="editPhone" value="98765 43210" data-astro-cid-3nssi2tu> </div> <div class="form-group" data-astro-cid-3nssi2tu> <label for="editEmail" data-astro-cid-3nssi2tu>Email Address</label> <input type="email" id="editEmail" value="john@example.com" data-astro-cid-3nssi2tu> </div> <div class="form-group" data-astro-cid-3nssi2tu> <label for="editAddress" data-astro-cid-3nssi2tu>Default Address</label> <textarea id="editAddress" placeholder="Enter your default delivery address" data-astro-cid-3nssi2tu></textarea> </div> <div class="form-actions" data-astro-cid-3nssi2tu> <button type="button" class="cancel-btn" id="cancelEdit" data-astro-cid-3nssi2tu>Cancel</button> <button type="submit" class="save-btn" data-astro-cid-3nssi2tu>Save Changes</button> </div> </form> </div> </div> <script type="module">
    // Simple Appwrite client without external dependencies
    class SimpleAppwriteClient {
      constructor() {
        this.endpoint = 'https://fra.cloud.appwrite.io/v1';
        this.projectId = '6900b1ed001604d8befb';
        this.apiKey = '1d6cd6adc23d3c6dba6ca6a8536e0a90c65781f5104cc9dc707ca9718b68b3388cb29105a4cca27baf69714a9752100cb3c425bbd58f1a6ba52514f19b3c2f3a2fa50a68b239f8d963be5db2c651682031326b70ba21afa2b1f37763492144dcb586264908cdd64a9b63b5c9dc9b9e490072294a179e7061a220b7a8b2c5aba3';
        this.headers = {
          'X-Appwrite-Project': this.projectId,
          'X-Appwrite-Key': this.apiKey,
          'Content-Type': 'application/json'
        };
      }

      async get(endpoint) {
        const response = await fetch(\`\${this.endpoint}\${endpoint}\`, {
          method: 'GET',
          headers: this.headers,
          credentials: 'include'
        });
        return response.json();
      }

      async post(endpoint, data) {
        const response = await fetch(\`\${this.endpoint}\${endpoint}\`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(data),
          credentials: 'include'
        });
        return response.json();
      }

      async patch(endpoint, data) {
        const response = await fetch(\`\${this.endpoint}\${endpoint}\`, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(data),
          credentials: 'include'
        });
        return response.json();
      }

      async delete(endpoint) {
        const response = await fetch(\`\${this.endpoint}\${endpoint}\`, {
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
        return this.client.delete(\`/account/sessions/\${sessionId}\`);
      }
    }

    // Simple Databases class
    class Databases {
      constructor(client) {
        this.client = client;
      }

      async createDocument(databaseId, collectionId, documentId, data) {
        return this.client.post(\`/databases/\${databaseId}/collections/\${collectionId}/documents\`, {
          documentId,
          data
        });
      }

      async getDocument(databaseId, collectionId, documentId) {
        return this.client.get(\`/databases/\${databaseId}/collections/\${collectionId}/documents/\${documentId}\`);
      }

      async updateDocument(databaseId, collectionId, documentId, data) {
        return this.client.patch(\`/databases/\${databaseId}/collections/\${collectionId}/documents/\${documentId}\`, {
          data
        });
      }

      async listDocuments(databaseId, collectionId, queries = []) {
        const queryString = queries.length > 0 ? \`?\${queries.join('&')}\` : '';
        return this.client.get(\`/databases/\${databaseId}/collections/\${collectionId}/documents\${queryString}\`);
      }
    }

    const account = new Account(client);
    const databases = new Databases(client);
    
    // Simple Query utilities
    const Query = {
      equal: (attribute, value) => \`\${attribute}=\${encodeURIComponent(value)}\`
    };

    // Configuration
    const config = {
      databaseId: 'main-db',
      collections: {
        users: {
          id: 'users'
        }
      }
    };

    // Auth helper functions
    const auth = {
      isLoggedIn: async () => {
        try {
          await account.get();
          return true;
        } catch (error) {
          return false;
        }
      },
      
      getCurrentUser: async () => {
        try {
          return await account.get();
        } catch (error) {
          return null;
        }
      },
      
      logout: async () => {
        try {
          await account.deleteSession();
          return true;
        } catch (error) {
          return false;
        }
      }
    };

    // Database helper functions
    const db = {
      getUserProfile: async (userId) => {
        try {
          const response = await databases.listDocuments(
            config.databaseId,
            config.collections.users.id,
            [Query.equal('userId', userId)]
          );
          return response.documents[0] || null;
        } catch (error) {
          return null;
        }
      },

      createUserProfile: async (userId, profileData) => {
        try {
          return await databases.createDocument(
            config.databaseId,
            config.collections.users.id,
            \`user_\${userId}\`,
            {
              userId,
              fullName: profileData.name || '',
              email: profileData.email || '',
              phoneNumber: profileData.phone || '',
              referralCode: profileData.referralCode || '',
              referredBy: profileData.referredBy || '',
              referralCount: profileData.referrals || 0,
              tokenBalance: profileData.tokens || 0
            }
          );
        } catch (error) {
          throw error;
        }
      },

      updateUserProfile: async (userId, profileData) => {
        try {
          const existingProfile = await db.getUserProfile(userId);
          if (!existingProfile) {
            throw new Error('Profile not found');
          }
          
          return await databases.updateDocument(
            config.databaseId,
            config.collections.users.id,
            existingProfile.$id,
            {
              fullName: profileData.name,
              email: profileData.email,
              phoneNumber: profileData.phone
            }
          );
        } catch (error) {
          throw error;
        }
      },

      getUserOrders: async (userId) => {
        // Mock orders for now
        return [];
      }
    };

    // Load user data on page load
    document.addEventListener('DOMContentLoaded', async () => {
      try {
        // Check if user is logged in
        const isLoggedIn = await auth.isLoggedIn();
        if (!isLoggedIn) {
          showToast('Please login to access dashboard', 'error');
          setTimeout(() => {
            navigation.safeNavigate('/login');
          }, 1500);
          return;
        }

        // Get current user
        const user = await auth.getCurrentUser();
        if (!user) {
          showToast('Session expired. Please login again', 'error');
          setTimeout(() => {
            navigation.safeNavigate('/login');
          }, 1500);
          return;
        }

        // Get user profile
        let userProfile;
        try {
          userProfile = await db.getUserProfile(user.$id);
        } catch (error) {
          // Profile doesn't exist, create it
          userProfile = await db.createUserProfile(user.$id, {
            name: user.name || user.email || 'User',
            email: user.email || '',
            phone: user.phone || '',
            tokens: 100,
            referrals: 0,
            currentDiscount: 20,
            joinDate: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            referralCode: \`LITTERATEUR\${user.$id.slice(-6).toUpperCase()}\`
          });
        }

        // Update UI with user data
        document.getElementById('userName').textContent = userProfile.name || user.name || 'User';
        document.getElementById('userPhone').textContent = userProfile.phone || user.phone || 'Not provided';
        document.getElementById('userEmail').textContent = userProfile.email || user.email || 'Not provided';
        document.getElementById('userTokens').textContent = userProfile.tokens || 0;

        // Load user orders
        const orders = await db.getUserOrders(user.$id);
        updateOrderHistory(orders);

        // Load token transactions
        // TODO: Implement token transactions loading

        // Load referral activity
        // TODO: Implement referral activity loading

      } catch (error) {
        console.error('Dashboard load error:', error);
        showToast('Error loading dashboard data');
      }
    });

    // Update order history in UI
    function updateOrderHistory(orders) {
      const orderHistoryContainer = document.querySelector('.order-history');
      if (!orderHistoryContainer) return;

      if (orders.length === 0) {
        orderHistoryContainer.innerHTML = '<p class="no-orders">No orders yet. Start ordering to see your history here!</p>';
        return;
      }

      const ordersHTML = orders.slice(0, 5).map(order => \`
        <div class="order-item">
          <div class="order-header">
            <div class="order-info">
              <div class="order-id">Order #\${order.$id.slice(-8).toUpperCase()}</div>
              <div class="order-date">\${new Date(order.orderDate).toLocaleDateString()}</div>
            </div>
            <div class="order-status \${order.status}">\${order.status}</div>
          </div>
          <div class="order-details">
            <div class="order-items">\${JSON.parse(order.items || '[]').map(item => item.name).join(', ')}</div>
            <div class="order-amount">\u20B9\${order.finalAmount}</div>
          </div>
          <div class="order-actions">
            <button class="track-btn">Track Order</button>
            <button class="reorder-btn">Reorder</button>
          </div>
        </div>
      \`).join('');

      orderHistoryContainer.innerHTML = ordersHTML;

      // Add event listeners to new buttons
      document.querySelectorAll('.track-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          showToast('Opening order tracking...');
        });
      });

      document.querySelectorAll('.reorder-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          showToast('Items added to cart!');
          setTimeout(() => {
            window.location.href = '/menu';
          }, 1500);
        });
      });
    }
    // Edit Profile Modal
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const modal = document.getElementById('editProfileModal');
    const closeModal = document.getElementById('closeModal');
    const cancelEdit = document.getElementById('cancelEdit');

    editProfileBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    cancelEdit.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Form submission
    document.querySelector('.edit-profile-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        const user = await auth.getCurrentUser();
        const formData = new FormData(e.target);
        
        const updatedProfile = {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone')
        };
        
        await db.updateUserProfile(user.$id, updatedProfile);
        
        // Update UI
        document.getElementById('userName').textContent = updatedProfile.name;
        document.getElementById('userEmail').textContent = updatedProfile.email;
        document.getElementById('userPhone').textContent = updatedProfile.phone;
        
        showToast('Profile updated successfully!');
        modal.style.display = 'none';
      } catch (error) {
        console.error('Profile update error:', error);
        showToast('Error updating profile');
      }
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          const success = await auth.logout();
          if (success) {
            showToast('Logged out successfully!', 'success');
            setTimeout(() => {
              navigation.safeNavigate('/login');
            }, 1000);
          } else {
            showToast('Error logging out', 'error');
          }
        } catch (error) {
          console.error('Logout error:', error);
          showToast('Error logging out', 'error');
        }
      });
    }

    // Quick Actions
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        switch(action) {
          case '\u{1F6D2} View Cart':
            navigation.safeNavigate('/checkout');
            break;
          case '\u{1F381} Redeem Tokens':
            showToast('Opening token redemption...');
            break;
          case '\u{1F4E4} Share Code':
            showToast('Sharing your referral code...');
            break;
        }
      });
    });

    // Order Actions
    document.querySelectorAll('.track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Opening order tracking...');
      });
    });

    document.querySelectorAll('.reorder-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Items added to cart!');
        setTimeout(() => {
          window.location.href = '/menu';
        }, 1500);
      });
    });

    // View All History
    document.querySelector('.view-all-btn').addEventListener('click', () => {
      showToast('Loading full token history...');
    });

    // Toast notification
    function showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    // Phone number formatting
    document.getElementById('editPhone').addEventListener('input', (e) => {
      let value = e.target.value.replace(/\\s/g, '');
      if (value.length > 5 && value.length <= 10) {
        value = value.slice(0, 5) + ' ' + value.slice(5);
      }
      e.target.value = value;
    });
  <\/script>  `, " "], ["  ", `<div class="discount-banner" data-astro-cid-3nssi2tu> <div class="sparkle-effect" data-astro-cid-3nssi2tu>\u2728</div> <span data-astro-cid-3nssi2tu>\u{1F389} Launch Discount: Get Up to 60% Off! \u{1F389}</span> <div class="sparkle-effect" data-astro-cid-3nssi2tu>\u2728</div> </div> <header class="site-header" data-astro-cid-3nssi2tu> <div class="container" data-astro-cid-3nssi2tu> <a class="brand" href="/" data-astro-cid-3nssi2tu>Litterateur</a> <nav class="nav" data-astro-cid-3nssi2tu> <a href="/menu" data-astro-cid-3nssi2tu>Menu</a> <a href="/rewards" data-astro-cid-3nssi2tu>Rewards</a> <a class="cta" href="/dashboard" data-astro-cid-3nssi2tu>My Account</a> </nav> </div> </header> <main data-astro-cid-3nssi2tu> <section class="dashboard-section" data-astro-cid-3nssi2tu> <div class="container" data-astro-cid-3nssi2tu> <div class="dashboard-grid" data-astro-cid-3nssi2tu> <!-- User Profile Sidebar --> <div class="user-sidebar" data-astro-cid-3nssi2tu> <div class="profile-card" data-astro-cid-3nssi2tu> <div class="profile-avatar" data-astro-cid-3nssi2tu>\u{1F464}</div> <div class="profile-info" data-astro-cid-3nssi2tu> <h2 id="userName" data-astro-cid-3nssi2tu>Loading...</h2> <p id="userPhone" data-astro-cid-3nssi2tu>Loading...</p> <p id="userEmail" data-astro-cid-3nssi2tu>Loading...</p> </div> <button class="edit-profile-btn" data-astro-cid-3nssi2tu>\u270F\uFE0F Edit Profile</button> </div> <!-- Quick Stats --> <div class="stats-card" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>Your Stats</h3> <div class="stat-item" data-astro-cid-3nssi2tu> <div class="stat-icon" data-astro-cid-3nssi2tu>\u{1FA99}</div> <div class="stat-details" data-astro-cid-3nssi2tu> <div class="stat-value" id="userTokens" data-astro-cid-3nssi2tu>0</div> <div class="stat-label" data-astro-cid-3nssi2tu>Tokens</div> </div> </div> <div class="stat-item" data-astro-cid-3nssi2tu> <div class="stat-icon" data-astro-cid-3nssi2tu>\u{1F465}</div> <div class="stat-details" data-astro-cid-3nssi2tu> <div class="stat-value" data-astro-cid-3nssi2tu>8</div> <div class="stat-label" data-astro-cid-3nssi2tu>Referrals</div> </div> </div> <div class="stat-item" data-astro-cid-3nssi2tu> <div class="stat-icon" data-astro-cid-3nssi2tu>\u{1F3AF}</div> <div class="stat-details" data-astro-cid-3nssi2tu> <div class="stat-value" data-astro-cid-3nssi2tu>30%</div> <div class="stat-label" data-astro-cid-3nssi2tu>Current Discount</div> </div> </div> </div> <!-- Quick Actions --> <div class="quick-actions" data-astro-cid-3nssi2tu> <button class="action-btn" data-astro-cid-3nssi2tu>\u{1F6D2} View Cart</button> <button class="action-btn" data-astro-cid-3nssi2tu>\u{1F381} Redeem Tokens</button> <button class="action-btn" data-astro-cid-3nssi2tu>\u{1F4E4} Share Code</button> </div> </div> <!-- Main Content Area --> <div class="main-content" data-astro-cid-3nssi2tu> <!-- My Orders Section --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>My Orders</h2> <div class="orders-list" data-astro-cid-3nssi2tu> <div class="order-card" data-astro-cid-3nssi2tu> <div class="order-header" data-astro-cid-3nssi2tu> <div class="order-number" data-astro-cid-3nssi2tu>#ORD-2025-001</div> <div class="order-status preparing" data-astro-cid-3nssi2tu>Preparing</div> </div> <div class="order-items" data-astro-cid-3nssi2tu> <div class="order-item" data-astro-cid-3nssi2tu> <span class="item-emoji" data-astro-cid-3nssi2tu>\u{1F950}</span> <span class="item-name" data-astro-cid-3nssi2tu>Artisan Croissant \xD72</span> <span class="item-price" data-astro-cid-3nssi2tu>\u20B9598</span> </div> <div class="order-item" data-astro-cid-3nssi2tu> <span class="item-emoji" data-astro-cid-3nssi2tu>\u2615</span> <span class="item-name" data-astro-cid-3nssi2tu>Signature Blend Coffee \xD71</span> <span class="item-price" data-astro-cid-3nssi2tu>\u20B9199</span> </div> </div> <div class="order-tracking" data-astro-cid-3nssi2tu> <div class="tracking-progress" data-astro-cid-3nssi2tu> <div class="tracking-step completed" data-astro-cid-3nssi2tu> <div class="step-icon" data-astro-cid-3nssi2tu>\u{1F4DD}</div> <span data-astro-cid-3nssi2tu>Order Placed</span> </div> <div class="tracking-step completed" data-astro-cid-3nssi2tu> <div class="step-icon" data-astro-cid-3nssi2tu>\u{1F468}\u200D\u{1F373}</div> <span data-astro-cid-3nssi2tu>Preparing</span> </div> <div class="tracking-step" data-astro-cid-3nssi2tu> <div class="step-icon" data-astro-cid-3nssi2tu>\u{1F69A}</div> <span data-astro-cid-3nssi2tu>Out for Delivery</span> </div> <div class="tracking-step" data-astro-cid-3nssi2tu> <div class="step-icon" data-astro-cid-3nssi2tu>\u2705</div> <span data-astro-cid-3nssi2tu>Delivered</span> </div> </div> </div> <div class="order-footer" data-astro-cid-3nssi2tu> <div class="order-total" data-astro-cid-3nssi2tu>Total: \u20B9794</div> <button class="track-btn" data-astro-cid-3nssi2tu>Track Order</button> </div> </div> <div class="order-card" data-astro-cid-3nssi2tu> <div class="order-header" data-astro-cid-3nssi2tu> <div class="order-number" data-astro-cid-3nssi2tu>#ORD-2025-002</div> <div class="order-status delivered" data-astro-cid-3nssi2tu>Delivered</div> </div> <div class="order-items" data-astro-cid-3nssi2tu> <div class="order-item" data-astro-cid-3nssi2tu> <span class="item-emoji" data-astro-cid-3nssi2tu>\u{1F957}</span> <span class="item-name" data-astro-cid-3nssi2tu>Garden Fresh Salad \xD71</span> <span class="item-price" data-astro-cid-3nssi2tu>\u20B9349</span> </div> <div class="order-item" data-astro-cid-3nssi2tu> <span class="item-emoji" data-astro-cid-3nssi2tu>\u{1F36E}</span> <span class="item-name" data-astro-cid-3nssi2tu>Cr\xE8me Br\xFBl\xE9e \xD71</span> <span class="item-price" data-astro-cid-3nssi2tu>\u20B9249</span> </div> </div> <div class="order-footer" data-astro-cid-3nssi2tu> <div class="order-total" data-astro-cid-3nssi2tu>Total: \u20B9598</div> <button class="reorder-btn" data-astro-cid-3nssi2tu>\u{1F504} Order Again</button> </div> </div> </div> </div> <!-- Token History Section --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>Token History</h2> <div class="token-history" data-astro-cid-3nssi2tu> <div class="history-item" data-astro-cid-3nssi2tu> <div class="history-icon" data-astro-cid-3nssi2tu>\u2795</div> <div class="history-details" data-astro-cid-3nssi2tu> <div class="history-title" data-astro-cid-3nssi2tu>Earned from Order #ORD-2025-001</div> <div class="history-date" data-astro-cid-3nssi2tu>Today, 12:30 PM</div> </div> <div class="history-amount positive" data-astro-cid-3nssi2tu>+50 tokens</div> </div> <div class="history-item" data-astro-cid-3nssi2tu> <div class="history-icon" data-astro-cid-3nssi2tu>\u{1F381}</div> <div class="history-details" data-astro-cid-3nssi2tu> <div class="history-title" data-astro-cid-3nssi2tu>Redeemed for 5% discount</div> <div class="history-date" data-astro-cid-3nssi2tu>Yesterday, 6:45 PM</div> </div> <div class="history-amount negative" data-astro-cid-3nssi2tu>-100 tokens</div> </div> <div class="history-item" data-astro-cid-3nssi2tu> <div class="history-icon" data-astro-cid-3nssi2tu>\u2795</div> <div class="history-details" data-astro-cid-3nssi2tu> <div class="history-title" data-astro-cid-3nssi2tu>Referral bonus - User joined</div> <div class="history-date" data-astro-cid-3nssi2tu>2 days ago</div> </div> <div class="history-amount positive" data-astro-cid-3nssi2tu>+25 tokens</div> </div> <div class="history-item" data-astro-cid-3nssi2tu> <div class="history-icon" data-astro-cid-3nssi2tu>\u2795</div> <div class="history-details" data-astro-cid-3nssi2tu> <div class="history-title" data-astro-cid-3nssi2tu>Earned from Order #ORD-2025-002</div> <div class="history-date" data-astro-cid-3nssi2tu>3 days ago</div> </div> <div class="history-amount positive" data-astro-cid-3nssi2tu>+35 tokens</div> </div> </div> <button class="view-all-btn" data-astro-cid-3nssi2tu>View All History</button> </div> <!-- Referral Activity --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>Referral Activity</h2> <div class="referral-activity" data-astro-cid-3nssi2tu> <div class="referral-summary" data-astro-cid-3nssi2tu> <div class="summary-card" data-astro-cid-3nssi2tu> <div class="summary-icon" data-astro-cid-3nssi2tu>\u{1F465}</div> <div class="summary-content" data-astro-cid-3nssi2tu> <div class="summary-value" data-astro-cid-3nssi2tu>8</div> <div class="summary-label" data-astro-cid-3nssi2tu>Total Referrals</div> </div> </div> <div class="summary-card" data-astro-cid-3nssi2tu> <div class="summary-icon" data-astro-cid-3nssi2tu>\u{1F3AF}</div> <div class="summary-content" data-astro-cid-3nssi2tu> <div class="summary-value" data-astro-cid-3nssi2tu>30%</div> <div class="summary-label" data-astro-cid-3nssi2tu>Current Discount</div> </div> </div> <div class="summary-card" data-astro-cid-3nssi2tu> <div class="summary-icon" data-astro-cid-3nssi2tu>\u{1F4C8}</div> <div class="summary-content" data-astro-cid-3nssi2tu> <div class="summary-value" data-astro-cid-3nssi2tu>12</div> <div class="summary-label" data-astro-cid-3nssi2tu>To Next Tier</div> </div> </div> </div> <div class="recent-referrals" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>Recent Referrals</h3> <div class="referral-item" data-astro-cid-3nssi2tu> <div class="referral-avatar" data-astro-cid-3nssi2tu>\u{1F464}</div> <div class="referral-info" data-astro-cid-3nssi2tu> <div class="referral-name" data-astro-cid-3nssi2tu>User A</div> <div class="referral-date" data-astro-cid-3nssi2tu>Joined 2 days ago</div> </div> <div class="referral-status success" data-astro-cid-3nssi2tu>Active</div> </div> <div class="referral-item" data-astro-cid-3nssi2tu> <div class="referral-avatar" data-astro-cid-3nssi2tu>\u{1F464}</div> <div class="referral-info" data-astro-cid-3nssi2tu> <div class="referral-name" data-astro-cid-3nssi2tu>User B</div> <div class="referral-date" data-astro-cid-3nssi2tu>Joined 1 week ago</div> </div> <div class="referral-status success" data-astro-cid-3nssi2tu>Active</div> </div> </div> </div> </div> <!-- Preferences --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>Preferences</h2> <div class="preferences-grid" data-astro-cid-3nssi2tu> <div class="preference-card" data-astro-cid-3nssi2tu> <div class="preference-icon" data-astro-cid-3nssi2tu>\u{1F514}</div> <div class="preference-content" data-astro-cid-3nssi2tu> <h4 data-astro-cid-3nssi2tu>Notifications</h4> <p data-astro-cid-3nssi2tu>Order updates, special offers</p> <label class="switch" data-astro-cid-3nssi2tu> <input type="checkbox" checked data-astro-cid-3nssi2tu> <span class="slider" data-astro-cid-3nssi2tu></span> </label> </div> </div> <div class="preference-card" data-astro-cid-3nssi2tu> <div class="preference-icon" data-astro-cid-3nssi2tu>\u{1F4E7}</div> <div class="preference-content" data-astro-cid-3nssi2tu> <h4 data-astro-cid-3nssi2tu>Email Updates</h4> <p data-astro-cid-3nssi2tu>Weekly menu, promotions</p> <label class="switch" data-astro-cid-3nssi2tu> <input type="checkbox" checked data-astro-cid-3nssi2tu> <span class="slider" data-astro-cid-3nssi2tu></span> </label> </div> </div> <div class="preference-card" data-astro-cid-3nssi2tu> <div class="preference-icon" data-astro-cid-3nssi2tu>\u{1F4AC}</div> <div class="preference-content" data-astro-cid-3nssi2tu> <h4 data-astro-cid-3nssi2tu>SMS Alerts</h4> <p data-astro-cid-3nssi2tu>Delivery notifications</p> <label class="switch" data-astro-cid-3nssi2tu> <input type="checkbox" data-astro-cid-3nssi2tu> <span class="slider" data-astro-cid-3nssi2tu></span> </label> </div> </div> </div> </div> <!-- System Status / Deployment Verification --> <div class="content-section" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>System Status</h2> <div class="status-card" data-astro-cid-3nssi2tu> <div class="status-header" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>\u{1F4CA} Deployment Information</h3> <span class="status-indicator online" id="deploymentStatus" data-astro-cid-3nssi2tu>Online</span> </div> <div class="status-details" data-astro-cid-3nssi2tu> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Worker:</span> <span class="status-value" data-astro-cid-3nssi2tu>new-website-cloudflare</span> </div> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Environment:</span> <span class="status-value" data-astro-cid-3nssi2tu>Production</span> </div> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Last Deployed:</span> <span class="status-value" id="lastDeployed" data-astro-cid-3nssi2tu>Loading...</span> </div> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Page Loaded:</span> <span class="status-value" id="pageLoaded" data-astro-cid-3nssi2tu>Loading...</span> </div> <div class="status-item" data-astro-cid-3nssi2tu> <span class="status-label" data-astro-cid-3nssi2tu>Cache Status:</span> <span class="status-value" id="cacheStatus" data-astro-cid-3nssi2tu>Checking...</span> </div> </div> <div class="status-actions" data-astro-cid-3nssi2tu> <button class="refresh-btn" onclick="checkDeploymentStatus()" data-astro-cid-3nssi2tu>\u{1F504} Refresh Status</button> <button class="clear-cache-btn" onclick="clearCache()" data-astro-cid-3nssi2tu>\u{1F5D1}\uFE0F Clear Cache</button> </div> </div> </div> </div> </div> </div> </section> </main>  <div class="modal" id="editProfileModal" data-astro-cid-3nssi2tu> <div class="modal-content" data-astro-cid-3nssi2tu> <div class="modal-header" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>Edit Profile</h3> <button class="close-modal" id="closeModal" data-astro-cid-3nssi2tu>\xD7</button> </div> <form class="edit-profile-form" data-astro-cid-3nssi2tu> <div class="form-group" data-astro-cid-3nssi2tu> <label for="editName" data-astro-cid-3nssi2tu>Full Name</label> <input type="text" id="editName" value="John Doe" data-astro-cid-3nssi2tu> </div> <div class="form-group" data-astro-cid-3nssi2tu> <label for="editPhone" data-astro-cid-3nssi2tu>Phone Number</label> <input type="tel" id="editPhone" value="98765 43210" data-astro-cid-3nssi2tu> </div> <div class="form-group" data-astro-cid-3nssi2tu> <label for="editEmail" data-astro-cid-3nssi2tu>Email Address</label> <input type="email" id="editEmail" value="john@example.com" data-astro-cid-3nssi2tu> </div> <div class="form-group" data-astro-cid-3nssi2tu> <label for="editAddress" data-astro-cid-3nssi2tu>Default Address</label> <textarea id="editAddress" placeholder="Enter your default delivery address" data-astro-cid-3nssi2tu></textarea> </div> <div class="form-actions" data-astro-cid-3nssi2tu> <button type="button" class="cancel-btn" id="cancelEdit" data-astro-cid-3nssi2tu>Cancel</button> <button type="submit" class="save-btn" data-astro-cid-3nssi2tu>Save Changes</button> </div> </form> </div> </div> <script type="module">
    // Simple Appwrite client without external dependencies
    class SimpleAppwriteClient {
      constructor() {
        this.endpoint = 'https://fra.cloud.appwrite.io/v1';
        this.projectId = '6900b1ed001604d8befb';
        this.apiKey = '1d6cd6adc23d3c6dba6ca6a8536e0a90c65781f5104cc9dc707ca9718b68b3388cb29105a4cca27baf69714a9752100cb3c425bbd58f1a6ba52514f19b3c2f3a2fa50a68b239f8d963be5db2c651682031326b70ba21afa2b1f37763492144dcb586264908cdd64a9b63b5c9dc9b9e490072294a179e7061a220b7a8b2c5aba3';
        this.headers = {
          'X-Appwrite-Project': this.projectId,
          'X-Appwrite-Key': this.apiKey,
          'Content-Type': 'application/json'
        };
      }

      async get(endpoint) {
        const response = await fetch(\\\`\\\${this.endpoint}\\\${endpoint}\\\`, {
          method: 'GET',
          headers: this.headers,
          credentials: 'include'
        });
        return response.json();
      }

      async post(endpoint, data) {
        const response = await fetch(\\\`\\\${this.endpoint}\\\${endpoint}\\\`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(data),
          credentials: 'include'
        });
        return response.json();
      }

      async patch(endpoint, data) {
        const response = await fetch(\\\`\\\${this.endpoint}\\\${endpoint}\\\`, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(data),
          credentials: 'include'
        });
        return response.json();
      }

      async delete(endpoint) {
        const response = await fetch(\\\`\\\${this.endpoint}\\\${endpoint}\\\`, {
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
        return this.client.delete(\\\`/account/sessions/\\\${sessionId}\\\`);
      }
    }

    // Simple Databases class
    class Databases {
      constructor(client) {
        this.client = client;
      }

      async createDocument(databaseId, collectionId, documentId, data) {
        return this.client.post(\\\`/databases/\\\${databaseId}/collections/\\\${collectionId}/documents\\\`, {
          documentId,
          data
        });
      }

      async getDocument(databaseId, collectionId, documentId) {
        return this.client.get(\\\`/databases/\\\${databaseId}/collections/\\\${collectionId}/documents/\\\${documentId}\\\`);
      }

      async updateDocument(databaseId, collectionId, documentId, data) {
        return this.client.patch(\\\`/databases/\\\${databaseId}/collections/\\\${collectionId}/documents/\\\${documentId}\\\`, {
          data
        });
      }

      async listDocuments(databaseId, collectionId, queries = []) {
        const queryString = queries.length > 0 ? \\\`?\\\${queries.join('&')}\\\` : '';
        return this.client.get(\\\`/databases/\\\${databaseId}/collections/\\\${collectionId}/documents\\\${queryString}\\\`);
      }
    }

    const account = new Account(client);
    const databases = new Databases(client);
    
    // Simple Query utilities
    const Query = {
      equal: (attribute, value) => \\\`\\\${attribute}=\\\${encodeURIComponent(value)}\\\`
    };

    // Configuration
    const config = {
      databaseId: 'main-db',
      collections: {
        users: {
          id: 'users'
        }
      }
    };

    // Auth helper functions
    const auth = {
      isLoggedIn: async () => {
        try {
          await account.get();
          return true;
        } catch (error) {
          return false;
        }
      },
      
      getCurrentUser: async () => {
        try {
          return await account.get();
        } catch (error) {
          return null;
        }
      },
      
      logout: async () => {
        try {
          await account.deleteSession();
          return true;
        } catch (error) {
          return false;
        }
      }
    };

    // Database helper functions
    const db = {
      getUserProfile: async (userId) => {
        try {
          const response = await databases.listDocuments(
            config.databaseId,
            config.collections.users.id,
            [Query.equal('userId', userId)]
          );
          return response.documents[0] || null;
        } catch (error) {
          return null;
        }
      },

      createUserProfile: async (userId, profileData) => {
        try {
          return await databases.createDocument(
            config.databaseId,
            config.collections.users.id,
            \\\`user_\\\${userId}\\\`,
            {
              userId,
              fullName: profileData.name || '',
              email: profileData.email || '',
              phoneNumber: profileData.phone || '',
              referralCode: profileData.referralCode || '',
              referredBy: profileData.referredBy || '',
              referralCount: profileData.referrals || 0,
              tokenBalance: profileData.tokens || 0
            }
          );
        } catch (error) {
          throw error;
        }
      },

      updateUserProfile: async (userId, profileData) => {
        try {
          const existingProfile = await db.getUserProfile(userId);
          if (!existingProfile) {
            throw new Error('Profile not found');
          }
          
          return await databases.updateDocument(
            config.databaseId,
            config.collections.users.id,
            existingProfile.$id,
            {
              fullName: profileData.name,
              email: profileData.email,
              phoneNumber: profileData.phone
            }
          );
        } catch (error) {
          throw error;
        }
      },

      getUserOrders: async (userId) => {
        // Mock orders for now
        return [];
      }
    };

    // Load user data on page load
    document.addEventListener('DOMContentLoaded', async () => {
      try {
        // Check if user is logged in
        const isLoggedIn = await auth.isLoggedIn();
        if (!isLoggedIn) {
          showToast('Please login to access dashboard', 'error');
          setTimeout(() => {
            navigation.safeNavigate('/login');
          }, 1500);
          return;
        }

        // Get current user
        const user = await auth.getCurrentUser();
        if (!user) {
          showToast('Session expired. Please login again', 'error');
          setTimeout(() => {
            navigation.safeNavigate('/login');
          }, 1500);
          return;
        }

        // Get user profile
        let userProfile;
        try {
          userProfile = await db.getUserProfile(user.$id);
        } catch (error) {
          // Profile doesn't exist, create it
          userProfile = await db.createUserProfile(user.$id, {
            name: user.name || user.email || 'User',
            email: user.email || '',
            phone: user.phone || '',
            tokens: 100,
            referrals: 0,
            currentDiscount: 20,
            joinDate: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            referralCode: \\\`LITTERATEUR\\\${user.$id.slice(-6).toUpperCase()}\\\`
          });
        }

        // Update UI with user data
        document.getElementById('userName').textContent = userProfile.name || user.name || 'User';
        document.getElementById('userPhone').textContent = userProfile.phone || user.phone || 'Not provided';
        document.getElementById('userEmail').textContent = userProfile.email || user.email || 'Not provided';
        document.getElementById('userTokens').textContent = userProfile.tokens || 0;

        // Load user orders
        const orders = await db.getUserOrders(user.$id);
        updateOrderHistory(orders);

        // Load token transactions
        // TODO: Implement token transactions loading

        // Load referral activity
        // TODO: Implement referral activity loading

      } catch (error) {
        console.error('Dashboard load error:', error);
        showToast('Error loading dashboard data');
      }
    });

    // Update order history in UI
    function updateOrderHistory(orders) {
      const orderHistoryContainer = document.querySelector('.order-history');
      if (!orderHistoryContainer) return;

      if (orders.length === 0) {
        orderHistoryContainer.innerHTML = '<p class="no-orders">No orders yet. Start ordering to see your history here!</p>';
        return;
      }

      const ordersHTML = orders.slice(0, 5).map(order => \\\`
        <div class="order-item">
          <div class="order-header">
            <div class="order-info">
              <div class="order-id">Order #\\\${order.$id.slice(-8).toUpperCase()}</div>
              <div class="order-date">\\\${new Date(order.orderDate).toLocaleDateString()}</div>
            </div>
            <div class="order-status \\\${order.status}">\\\${order.status}</div>
          </div>
          <div class="order-details">
            <div class="order-items">\\\${JSON.parse(order.items || '[]').map(item => item.name).join(', ')}</div>
            <div class="order-amount">\u20B9\\\${order.finalAmount}</div>
          </div>
          <div class="order-actions">
            <button class="track-btn">Track Order</button>
            <button class="reorder-btn">Reorder</button>
          </div>
        </div>
      \\\`).join('');

      orderHistoryContainer.innerHTML = ordersHTML;

      // Add event listeners to new buttons
      document.querySelectorAll('.track-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          showToast('Opening order tracking...');
        });
      });

      document.querySelectorAll('.reorder-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          showToast('Items added to cart!');
          setTimeout(() => {
            window.location.href = '/menu';
          }, 1500);
        });
      });
    }
    // Edit Profile Modal
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const modal = document.getElementById('editProfileModal');
    const closeModal = document.getElementById('closeModal');
    const cancelEdit = document.getElementById('cancelEdit');

    editProfileBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    cancelEdit.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Form submission
    document.querySelector('.edit-profile-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        const user = await auth.getCurrentUser();
        const formData = new FormData(e.target);
        
        const updatedProfile = {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone')
        };
        
        await db.updateUserProfile(user.$id, updatedProfile);
        
        // Update UI
        document.getElementById('userName').textContent = updatedProfile.name;
        document.getElementById('userEmail').textContent = updatedProfile.email;
        document.getElementById('userPhone').textContent = updatedProfile.phone;
        
        showToast('Profile updated successfully!');
        modal.style.display = 'none';
      } catch (error) {
        console.error('Profile update error:', error);
        showToast('Error updating profile');
      }
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          const success = await auth.logout();
          if (success) {
            showToast('Logged out successfully!', 'success');
            setTimeout(() => {
              navigation.safeNavigate('/login');
            }, 1000);
          } else {
            showToast('Error logging out', 'error');
          }
        } catch (error) {
          console.error('Logout error:', error);
          showToast('Error logging out', 'error');
        }
      });
    }

    // Quick Actions
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        switch(action) {
          case '\u{1F6D2} View Cart':
            navigation.safeNavigate('/checkout');
            break;
          case '\u{1F381} Redeem Tokens':
            showToast('Opening token redemption...');
            break;
          case '\u{1F4E4} Share Code':
            showToast('Sharing your referral code...');
            break;
        }
      });
    });

    // Order Actions
    document.querySelectorAll('.track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Opening order tracking...');
      });
    });

    document.querySelectorAll('.reorder-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Items added to cart!');
        setTimeout(() => {
          window.location.href = '/menu';
        }, 1500);
      });
    });

    // View All History
    document.querySelector('.view-all-btn').addEventListener('click', () => {
      showToast('Loading full token history...');
    });

    // Toast notification
    function showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    // Phone number formatting
    document.getElementById('editPhone').addEventListener('input', (e) => {
      let value = e.target.value.replace(/\\\\s/g, '');
      if (value.length > 5 && value.length <= 10) {
        value = value.slice(0, 5) + ' ' + value.slice(5);
      }
      e.target.value = value;
    });
  <\/script>  `, " "])), maybeRenderHead(), renderScript($$result2, "C:/Users/nirma/Desktop/New Website/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts")) })}`;
}, "C:/Users/nirma/Desktop/New Website/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
