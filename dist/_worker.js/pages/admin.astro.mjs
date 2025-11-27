globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C-K2zirC.mjs';
import { $ as $$Layout } from '../chunks/Layout_DVntI8GC.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-2zp6q64z": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<header class="admin-header" data-astro-cid-2zp6q64z> <div class="header-content" data-astro-cid-2zp6q64z> <div class="logo" data-astro-cid-2zp6q64z> <h1 data-astro-cid-2zp6q64z>Litterateur Admin</h1> </div> <div class="header-actions" data-astro-cid-2zp6q64z> <button class="refresh-btn" id="refreshData" data-astro-cid-2zp6q64z>\u{1F504} Refresh</button> <div class="admin-info" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Admin User</span> <button class="logout-btn" data-astro-cid-2zp6q64z>Logout</button> </div> </div> </div> </header> <div class="admin-layout" data-astro-cid-2zp6q64z> <!-- Sidebar Navigation --> <aside class="admin-sidebar" data-astro-cid-2zp6q64z> <nav class="sidebar-nav" data-astro-cid-2zp6q64z> <a href="#dashboard" class="nav-item active" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F4CA}</span> <span data-astro-cid-2zp6q64z>Dashboard Home</span> </a> <a href="#orders" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F4CB}</span> <span data-astro-cid-2zp6q64z>Orders</span> </a> <a href="#menu" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F37D}\uFE0F</span> <span data-astro-cid-2zp6q64z>Menu Items</span> </a> <a href="#delivery" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F69A}</span> <span data-astro-cid-2zp6q64z>Delivery Partners</span> </a> <a href="#customers" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F465}</span> <span data-astro-cid-2zp6q64z>Customers</span> </a> <a href="#analytics" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F4C8}</span> <span data-astro-cid-2zp6q64z>Analytics</span> </a> <a href="#settings" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u2699\uFE0F</span> <span data-astro-cid-2zp6q64z>Settings</span> </a> </nav> </aside> <!-- Main Content Area --> <main class="admin-main" data-astro-cid-2zp6q64z> <!-- Dashboard Home --> <section id="dashboard" class="content-section active" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>Dashboard Overview</h2> <!-- Key Metrics --> <div class="metrics-grid" data-astro-cid-2zp6q64z> <div class="metric-card" data-astro-cid-2zp6q64z> <div class="metric-icon" data-astro-cid-2zp6q64z>\u{1F4E6}</div> <div class="metric-content" data-astro-cid-2zp6q64z> <div class="metric-value" id="ordersToday" data-astro-cid-2zp6q64z>47</div> <div class="metric-label" data-astro-cid-2zp6q64z>Orders Today</div> <div class="metric-change positive" data-astro-cid-2zp6q64z>+12% from yesterday</div> </div> </div> <div class="metric-card" data-astro-cid-2zp6q64z> <div class="metric-icon" data-astro-cid-2zp6q64z>\u{1F4B0}</div> <div class="metric-content" data-astro-cid-2zp6q64z> <div class="metric-value" id="revenueToday" data-astro-cid-2zp6q64z>\u20B918,450</div> <div class="metric-label" data-astro-cid-2zp6q64z>Revenue Today</div> <div class="metric-change positive" data-astro-cid-2zp6q64z>+8% from yesterday</div> </div> </div> <div class="metric-card" data-astro-cid-2zp6q64z> <div class="metric-icon" data-astro-cid-2zp6q64z>\u{1F465}</div> <div class="metric-content" data-astro-cid-2zp6q64z> <div class="metric-value" id="activeUsers" data-astro-cid-2zp6q64z>312</div> <div class="metric-label" data-astro-cid-2zp6q64z>Active Users</div> <div class="metric-change positive" data-astro-cid-2zp6q64z>+5% from last hour</div> </div> </div> <div class="metric-card" data-astro-cid-2zp6q64z> <div class="metric-icon" data-astro-cid-2zp6q64z>\u{1F69A}</div> <div class="metric-content" data-astro-cid-2zp6q64z> <div class="metric-value" id="deliveryTime" data-astro-cid-2zp6q64z>28min</div> <div class="metric-label" data-astro-cid-2zp6q64z>Avg Delivery Time</div> <div class="metric-change negative" data-astro-cid-2zp6q64z>+3min from target</div> </div> </div> </div> <!-- Quick Actions --> <div class="quick-actions-section" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Quick Actions</h3> <div class="quick-actions" data-astro-cid-2zp6q64z> <button class="action-btn primary" data-astro-cid-2zp6q64z>\u{1F4CB} View All Orders</button> <button class="action-btn secondary" data-astro-cid-2zp6q64z>\u{1F37D}\uFE0F Add Menu Item</button> <button class="action-btn secondary" data-astro-cid-2zp6q64z>\u{1F69A} Manage Delivery</button> <button class="action-btn secondary" data-astro-cid-2zp6q64z>\u{1F4CA} Generate Report</button> </div> </div> <!-- Live Orders Feed --> <div class="live-orders-section" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Live Orders Feed</h3> <div class="orders-feed" id="ordersFeed" data-astro-cid-2zp6q64z> <div class="order-item new" data-astro-cid-2zp6q64z> <div class="order-time" data-astro-cid-2zp6q64z>2 mins ago</div> <div class="order-details" data-astro-cid-2zp6q64z> <div class="order-number" data-astro-cid-2zp6q64z>#ORD-2025-048</div> <div class="order-customer" data-astro-cid-2zp6q64z>John Doe</div> <div class="order-items" data-astro-cid-2zp6q64z>\u{1F950}\xD72, \u2615\xD71</div> <div class="order-total" data-astro-cid-2zp6q64z>\u20B9794</div> </div> <div class="order-status-badge new" data-astro-cid-2zp6q64z>NEW</div> </div> <div class="order-item" data-astro-cid-2zp6q64z> <div class="order-time" data-astro-cid-2zp6q64z>5 mins ago</div> <div class="order-details" data-astro-cid-2zp6q64z> <div class="order-number" data-astro-cid-2zp6q64z>#ORD-2025-047</div> <div class="order-customer" data-astro-cid-2zp6q64z>Jane Smith</div> <div class="order-items" data-astro-cid-2zp6q64z>\u{1F957}\xD71, \u{1F36E}\xD71</div> <div class="order-total" data-astro-cid-2zp6q64z>\u20B9598</div> </div> <div class="order-status-badge preparing" data-astro-cid-2zp6q64z>PREPARING</div> </div> <div class="order-item" data-astro-cid-2zp6q64z> <div class="order-time" data-astro-cid-2zp6q64z>8 mins ago</div> <div class="order-details" data-astro-cid-2zp6q64z> <div class="order-number" data-astro-cid-2zp6q64z>#ORD-2025-046</div> <div class="order-customer" data-astro-cid-2zp6q64z>Bob Wilson</div> <div class="order-items" data-astro-cid-2zp6q64z>\u{1F969}\xD71, \u{1F377}\xD71</div> <div class="order-total" data-astro-cid-2zp6q64z>\u20B91,248</div> </div> <div class="order-status-badge ready" data-astro-cid-2zp6q64z>READY</div> </div> </div> </div> <!-- Charts Section --> <div class="charts-section" data-astro-cid-2zp6q64z> <div class="chart-container" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Revenue Overview</h3> <div class="chart-placeholder" data-astro-cid-2zp6q64z> <div class="chart-icon" data-astro-cid-2zp6q64z>\u{1F4C8}</div> <p data-astro-cid-2zp6q64z>Revenue graph showing daily, weekly, monthly trends</p> <div class="chart-mock" data-astro-cid-2zp6q64z> <div class="bar" style="height: 60%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 80%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 45%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 90%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 70%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 85%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 95%" data-astro-cid-2zp6q64z></div> </div> </div> </div> <div class="chart-container" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Top Selling Items</h3> <div class="chart-placeholder" data-astro-cid-2zp6q64z> <div class="chart-icon" data-astro-cid-2zp6q64z>\u{1F37D}\uFE0F</div> <p data-astro-cid-2zp6q64z>Bar chart showing most popular menu items</p> <div class="top-items" data-astro-cid-2zp6q64z> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Artisan Croissant</span> <div class="bar-fill" style="width: 90%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>234</span> </div> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Signature Coffee</span> <div class="bar-fill" style="width: 85%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>198</span> </div> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Garden Salad</span> <div class="bar-fill" style="width: 70%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>156</span> </div> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Grilled Ribeye</span> <div class="bar-fill" style="width: 65%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>142</span> </div> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Chocolate Lava Cake</span> <div class="bar-fill" style="width: 55%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>98</span> </div> </div> </div> </div> </div> </section> <!-- Orders Management --> <section id="orders" class="content-section" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>Orders Management</h2> <div class="orders-table-container" data-astro-cid-2zp6q64z> <table class="orders-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>Order ID</th> <th data-astro-cid-2zp6q64z>Customer</th> <th data-astro-cid-2zp6q64z>Items</th> <th data-astro-cid-2zp6q64z>Total</th> <th data-astro-cid-2zp6q64z>Status</th> <th data-astro-cid-2zp6q64z>Time</th> <th data-astro-cid-2zp6q64z>Actions</th> </tr> </thead> <tbody data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>#ORD-2025-048</td> <td data-astro-cid-2zp6q64z>John Doe</td> <td data-astro-cid-2zp6q64z>\u{1F950}\xD72, \u2615\xD71</td> <td data-astro-cid-2zp6q64z>\u20B9794</td> <td data-astro-cid-2zp6q64z><span class="status-badge new" data-astro-cid-2zp6q64z>New</span></td> <td data-astro-cid-2zp6q64z>2 mins ago</td> <td data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>View</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Process</button> </td> </tr> <tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>#ORD-2025-047</td> <td data-astro-cid-2zp6q64z>Jane Smith</td> <td data-astro-cid-2zp6q64z>\u{1F957}\xD71, \u{1F36E}\xD71</td> <td data-astro-cid-2zp6q64z>\u20B9598</td> <td data-astro-cid-2zp6q64z><span class="status-badge preparing" data-astro-cid-2zp6q64z>Preparing</span></td> <td data-astro-cid-2zp6q64z>5 mins ago</td> <td data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>View</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Update</button> </td> </tr> <tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>#ORD-2025-046</td> <td data-astro-cid-2zp6q64z>Bob Wilson</td> <td data-astro-cid-2zp6q64z>\u{1F969}\xD71, \u{1F377}\xD71</td> <td data-astro-cid-2zp6q64z>\u20B91,248</td> <td data-astro-cid-2zp6q64z><span class="status-badge ready" data-astro-cid-2zp6q64z>Ready</span></td> <td data-astro-cid-2zp6q64z>8 mins ago</td> <td data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>View</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Assign</button> </td> </tr> </tbody> </table> </div> </section> <!-- Menu Management --> <section id="menu" class="content-section" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>Menu Management</h2> <div class="menu-controls" data-astro-cid-2zp6q64z> <button class="action-btn primary" data-astro-cid-2zp6q64z>+ Add New Item</button> <div class="filter-controls" data-astro-cid-2zp6q64z> <select class="filter-select" data-astro-cid-2zp6q64z> <option data-astro-cid-2zp6q64z>All Categories</option> <option data-astro-cid-2zp6q64z>Breakfast</option> <option data-astro-cid-2zp6q64z>Lunch</option> <option data-astro-cid-2zp6q64z>Dinner</option> <option data-astro-cid-2zp6q64z>Beverages</option> <option data-astro-cid-2zp6q64z>Desserts</option> </select> <input type="text" class="search-input" placeholder="Search menu items..." data-astro-cid-2zp6q64z> </div> </div> <div class="menu-grid" data-astro-cid-2zp6q64z> <div class="menu-item-card" data-astro-cid-2zp6q64z> <div class="item-image" data-astro-cid-2zp6q64z>\u{1F950}</div> <div class="item-details" data-astro-cid-2zp6q64z> <h4 data-astro-cid-2zp6q64z>Artisan Croissant</h4> <p data-astro-cid-2zp6q64z>Buttery, flaky perfection with premium French butter</p> <div class="item-price" data-astro-cid-2zp6q64z>\u20B9299</div> <div class="item-category" data-astro-cid-2zp6q64z>Breakfast</div> <div class="item-status" data-astro-cid-2zp6q64z> <span class="status-badge active" data-astro-cid-2zp6q64z>Available</span> <span class="badge bestseller" data-astro-cid-2zp6q64z>Bestseller</span> </div> </div> <div class="item-actions" data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>Edit</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Toggle</button> </div> </div> <div class="menu-item-card" data-astro-cid-2zp6q64z> <div class="item-image" data-astro-cid-2zp6q64z>\u2615</div> <div class="item-details" data-astro-cid-2zp6q64z> <h4 data-astro-cid-2zp6q64z>Signature Blend Coffee</h4> <p data-astro-cid-2zp6q64z>Single-origin beans with chocolate and caramel notes</p> <div class="item-price" data-astro-cid-2zp6q64z>\u20B9199</div> <div class="item-category" data-astro-cid-2zp6q64z>Beverages</div> <div class="item-status" data-astro-cid-2zp6q64z> <span class="status-badge active" data-astro-cid-2zp6q64z>Available</span> <span class="badge bestseller" data-astro-cid-2zp6q64z>Bestseller</span> </div> </div> <div class="item-actions" data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>Edit</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Toggle</button> </div> </div> </div> </section> <!-- Customers Management --> <section id="customers" class="content-section" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>Customers Management</h2> <div class="customers-controls" data-astro-cid-2zp6q64z> <div class="customer-stats" data-astro-cid-2zp6q64z> <div class="stat-card" data-astro-cid-2zp6q64z> <div class="stat-value" id="totalAuthUsers" data-astro-cid-2zp6q64z>0</div> <div class="stat-label" data-astro-cid-2zp6q64z>Authentication Users</div> </div> <div class="stat-card" data-astro-cid-2zp6q64z> <div class="stat-value" id="totalProfileUsers" data-astro-cid-2zp6q64z>0</div> <div class="stat-label" data-astro-cid-2zp6q64z>Profile Users</div> </div> <div class="stat-card" data-astro-cid-2zp6q64z> <div class="stat-value" id="newUsersToday" data-astro-cid-2zp6q64z>0</div> <div class="stat-label" data-astro-cid-2zp6q64z>New Today</div> </div> </div> <button class="action-btn primary" id="refreshUsers" data-astro-cid-2zp6q64z>\u{1F504} Refresh Users</button> </div> <div class="customers-tabs" data-astro-cid-2zp6q64z> <button class="tab-btn active" data-tab="auth-users" data-astro-cid-2zp6q64z>Authentication Users</button> <button class="tab-btn" data-tab="profile-users" data-astro-cid-2zp6q64z>Profile Users</button> <button class="tab-btn" data-tab="all-users" data-astro-cid-2zp6q64z>All Users</button> </div> <!-- Authentication Users Table --> <div id="auth-users" class="tab-content active" data-astro-cid-2zp6q64z> <div class="table-container" data-astro-cid-2zp6q64z> <table class="users-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>User ID</th> <th data-astro-cid-2zp6q64z>Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Registration Date</th> <th data-astro-cid-2zp6q64z>Status</th> <th data-astro-cid-2zp6q64z>Actions</th> </tr> </thead> <tbody id="authUsersTableBody" data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <td colspan="6" class="loading-row" data-astro-cid-2zp6q64z>Loading authentication users...</td> </tr> </tbody> </table> </div> </div> <!-- Profile Users Table --> <div id="profile-users" class="tab-content" data-astro-cid-2zp6q64z> <div class="table-container" data-astro-cid-2zp6q64z> <table class="users-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>User ID</th> <th data-astro-cid-2zp6q64z>Full Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Phone</th> <th data-astro-cid-2zp6q64z>Token Balance</th> <th data-astro-cid-2zp6q64z>Total Spent</th> <th data-astro-cid-2zp6q64z>Actions</th> </tr> </thead> <tbody id="profileUsersTableBody" data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <td colspan="7" class="loading-row" data-astro-cid-2zp6q64z>Loading profile users...</td> </tr> </tbody> </table> </div> </div> <!-- All Users Combined View --> <div id="all-users" class="tab-content" data-astro-cid-2zp6q64z> <div class="combined-users-container" data-astro-cid-2zp6q64z> <div class="users-summary" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Users Summary</h3> <div class="summary-grid" id="usersSummary" data-astro-cid-2zp6q64z> <div class="summary-item" data-astro-cid-2zp6q64z> <span class="summary-label" data-astro-cid-2zp6q64z>Auth Users Only:</span> <span class="summary-value" id="authOnlyCount" data-astro-cid-2zp6q64z>0</span> </div> <div class="summary-item" data-astro-cid-2zp6q64z> <span class="summary-label" data-astro-cid-2zp6q64z>Profile Users Only:</span> <span class="summary-value" id="profileOnlyCount" data-astro-cid-2zp6q64z>0</span> </div> <div class="summary-item" data-astro-cid-2zp6q64z> <span class="summary-label" data-astro-cid-2zp6q64z>Complete Users:</span> <span class="summary-value" id="completeUsersCount" data-astro-cid-2zp6q64z>0</span> </div> </div> </div> <div class="table-container" data-astro-cid-2zp6q64z> <table class="users-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>User ID</th> <th data-astro-cid-2zp6q64z>Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Has Profile</th> <th data-astro-cid-2zp6q64z>Registration</th> <th data-astro-cid-2zp6q64z>Status</th> <th data-astro-cid-2zp6q64z>Actions</th> </tr> </thead> <tbody id="allUsersTableBody" data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <td colspan="7" class="loading-row" data-astro-cid-2zp6q64z>Loading all users...</td> </tr> </tbody> </table> </div> </div> </div> </section> <!-- Other sections would be similar... --> </main> </div> <script>
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items and sections
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Show corresponding section
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
        }
      });
    });

    // Refresh data
    document.getElementById('refreshData').addEventListener('click', () => {
      showToast('Refreshing dashboard data...');
      
      // Simulate data refresh
      setTimeout(() => {
        // Update metrics with random changes
        const ordersToday = document.getElementById('ordersToday');
        const currentOrders = parseInt(ordersToday.textContent);
        ordersToday.textContent = currentOrders + Math.floor(Math.random() * 3);
        
        const revenueToday = document.getElementById('revenueToday');
        const currentRevenue = parseInt(revenueToday.textContent.replace('\u20B9', '').replace(',', ''));
        revenueToday.textContent = '\u20B9' + (currentRevenue + Math.floor(Math.random() * 1000)).toLocaleString();
        
        showToast('Data refreshed successfully!');
      }, 1500);
    });

    // Live orders simulation
    function addNewOrder() {
      const ordersFeed = document.getElementById('ordersFeed');
      const orderNames = ['Alice Johnson', 'Charlie Brown', 'Diana Prince', 'Edward Norton', 'Fiona Green'];
      const orderItems = ['\u{1F950}\xD71', '\u2615\xD72', '\u{1F957}\xD71', '\u{1F969}\xD71', '\u{1F36E}\xD72'];
      
      const newOrder = document.createElement('div');
      newOrder.className = 'order-item new';
      newOrder.innerHTML = \`
        <div class="order-time">Just now</div>
        <div class="order-details">
          <div class="order-number">#ORD-2025-\${Math.floor(Math.random() * 1000)}</div>
          <div class="order-customer">\${orderNames[Math.floor(Math.random() * orderNames.length)]}</div>
          <div class="order-items">\${orderItems[Math.floor(Math.random() * orderItems.length)]}</div>
          <div class="order-total">\u20B9\${Math.floor(Math.random() * 1000) + 200}</div>
        </div>
        <div class="order-status-badge new">NEW</div>
      \`;
      
      ordersFeed.insertBefore(newOrder, ordersFeed.firstChild);
      
      // Remove the 'new' class after 5 seconds
      setTimeout(() => {
        newOrder.classList.remove('new');
      }, 5000);
      
      // Keep only last 5 orders
      while (ordersFeed.children.length > 5) {
        ordersFeed.removeChild(ordersFeed.lastChild);
      }
    }

    // Simulate new orders every 10 seconds
    setInterval(addNewOrder, 10000);

    // Quick actions
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        showToast(\`Executing: \${action}\`);
      });
    });

    // Toast notification
    function showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    // Auto-refresh metrics every 30 seconds
    setInterval(() => {
      const activeUsers = document.getElementById('activeUsers');
      const currentUsers = parseInt(activeUsers.textContent);
      const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
      activeUsers.textContent = Math.max(250, currentUsers + change);
    }, 30000);

    // Users Management Functionality
    let authUsers = [];
    let profileUsers = [];

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(targetTab).classList.add('active');
      });
    });

    // Load users data
    async function loadUsersData() {
      try {
        // Load authentication users
        const authResponse = await fetch('/api/users/auth');
        if (authResponse.ok) {
          authUsers = await authResponse.json();
        }

        // Load profile users
        const profileResponse = await fetch('/api/users/profile');
        if (profileResponse.ok) {
          profileUsers = await profileResponse.json();
        }

        updateUsersDisplay();
      } catch (error) {
        console.error('Error loading users:', error);
        showToast('Error loading users data');
      }
    }

    // Update users display
    function updateUsersDisplay() {
      // Update stats
      document.getElementById('totalAuthUsers').textContent = authUsers.length;
      document.getElementById('totalProfileUsers').textContent = profileUsers.length;
      
      // Calculate new users today (simplified)
      const today = new Date().toDateString();
      const newAuthUsers = authUsers.filter(user => 
        new Date(user.$createdAt).toDateString() === today
      ).length;
      document.getElementById('newUsersToday').textContent = newAuthUsers;

      // Update authentication users table
      updateAuthUsersTable();
      
      // Update profile users table
      updateProfileUsersTable();
      
      // Update all users combined view
      updateAllUsersTable();
    }

    // Update authentication users table
    function updateAuthUsersTable() {
      const tbody = document.getElementById('authUsersTableBody');
      
      if (authUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No authentication users found</td></tr>';
        return;
      }

      tbody.innerHTML = authUsers.map(user => \`
        <tr>
          <td>\${user.$id}</td>
          <td>\${user.name || 'N/A'}</td>
          <td>\${user.email}</td>
          <td>\${new Date(user.$createdAt).toLocaleDateString()}</td>
          <td><span class="status-badge \${user.status ? 'active' : 'inactive'}">\${user.status ? 'Active' : 'Inactive'}</span></td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('\${user.$id}', 'auth')">View</button>
          </td>
        </tr>
      \`).join('');
    }

    // Update profile users table
    function updateProfileUsersTable() {
      const tbody = document.getElementById('profileUsersTableBody');
      
      if (profileUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No profile users found</td></tr>';
        return;
      }

      tbody.innerHTML = profileUsers.map(user => \`
        <tr>
          <td>\${user.userId}</td>
          <td>\${user.fullName}</td>
          <td>\${user.email || 'N/A'}</td>
          <td>\${user.phoneNumber || 'N/A'}</td>
          <td>\${user.tokenBalance || 0}</td>
          <td>\u20B9\${(user.totalSpent || 0).toLocaleString()}</td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('\${user.userId}', 'profile')">View</button>
            <button class="action-btn-small" onclick="editUserProfile('\${user.userId}')">Edit</button>
          </td>
        </tr>
      \`).join('');
    }

    // Update all users combined table
    function updateAllUsersTable() {
      const tbody = document.getElementById('allUsersTableBody');
      
      // Create a map of profile users by userId
      const profileMap = new Map(profileUsers.map(user => [user.userId, user]));
      
      // Combine data
      const allUsers = authUsers.map(authUser => {
        const profile = profileMap.get(authUser.$id);
        return {
          ...authUser,
          hasProfile: !!profile,
          profile: profile
        };
      });

      // Update summary counts
      const authOnly = allUsers.filter(user => !user.hasProfile).length;
      const profileOnly = profileUsers.filter(profile => 
        !authUsers.find(auth => auth.$id === profile.userId)
      ).length;
      const completeUsers = allUsers.filter(user => user.hasProfile).length;

      document.getElementById('authOnlyCount').textContent = authOnly;
      document.getElementById('profileOnlyCount').textContent = profileOnly;
      document.getElementById('completeUsersCount').textContent = completeUsers;

      if (allUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No users found</td></tr>';
        return;
      }

      tbody.innerHTML = allUsers.map(user => \`
        <tr>
          <td>\${user.$id}</td>
          <td>\${user.name || (user.profile?.fullName) || 'N/A'}</td>
          <td>\${user.email}</td>
          <td>
            <span class="status-badge \${user.hasProfile ? 'complete' : 'incomplete'}">
              \${user.hasProfile ? '\u2705 Complete' : '\u274C Missing'}
            </span>
          </td>
          <td>\${new Date(user.$createdAt).toLocaleDateString()}</td>
          <td><span class="status-badge \${user.status ? 'active' : 'inactive'}">\${user.status ? 'Active' : 'Inactive'}</span></td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('\${user.$id}', 'combined')">View</button>
            \${!user.hasProfile ? \`<button class="action-btn-small" onclick="createProfile('\${user.$id}')">Create Profile</button>\` : ''}
          </td>
        </tr>
      \`).join('');
    }

    // Refresh users button
    document.getElementById('refreshUsers').addEventListener('click', () => {
      showToast('Refreshing users data...');
      loadUsersData();
    });

    // User action functions
    function viewUserDetails(userId, type) {
      showToast(\`Viewing details for user \${userId} (\${type})\`);
      // TODO: Implement user details modal
    }

    function editUserProfile(userId) {
      showToast(\`Editing profile for user \${userId}\`);
      // TODO: Implement profile editing modal
    }

    function createProfile(userId) {
      showToast(\`Creating profile for user \${userId}\`);
      // TODO: Implement profile creation modal
    }

    // Load users on page load
    loadUsersData();
  <\/script>  `], [" ", `<header class="admin-header" data-astro-cid-2zp6q64z> <div class="header-content" data-astro-cid-2zp6q64z> <div class="logo" data-astro-cid-2zp6q64z> <h1 data-astro-cid-2zp6q64z>Litterateur Admin</h1> </div> <div class="header-actions" data-astro-cid-2zp6q64z> <button class="refresh-btn" id="refreshData" data-astro-cid-2zp6q64z>\u{1F504} Refresh</button> <div class="admin-info" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Admin User</span> <button class="logout-btn" data-astro-cid-2zp6q64z>Logout</button> </div> </div> </div> </header> <div class="admin-layout" data-astro-cid-2zp6q64z> <!-- Sidebar Navigation --> <aside class="admin-sidebar" data-astro-cid-2zp6q64z> <nav class="sidebar-nav" data-astro-cid-2zp6q64z> <a href="#dashboard" class="nav-item active" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F4CA}</span> <span data-astro-cid-2zp6q64z>Dashboard Home</span> </a> <a href="#orders" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F4CB}</span> <span data-astro-cid-2zp6q64z>Orders</span> </a> <a href="#menu" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F37D}\uFE0F</span> <span data-astro-cid-2zp6q64z>Menu Items</span> </a> <a href="#delivery" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F69A}</span> <span data-astro-cid-2zp6q64z>Delivery Partners</span> </a> <a href="#customers" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F465}</span> <span data-astro-cid-2zp6q64z>Customers</span> </a> <a href="#analytics" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u{1F4C8}</span> <span data-astro-cid-2zp6q64z>Analytics</span> </a> <a href="#settings" class="nav-item" data-astro-cid-2zp6q64z> <span class="nav-icon" data-astro-cid-2zp6q64z>\u2699\uFE0F</span> <span data-astro-cid-2zp6q64z>Settings</span> </a> </nav> </aside> <!-- Main Content Area --> <main class="admin-main" data-astro-cid-2zp6q64z> <!-- Dashboard Home --> <section id="dashboard" class="content-section active" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>Dashboard Overview</h2> <!-- Key Metrics --> <div class="metrics-grid" data-astro-cid-2zp6q64z> <div class="metric-card" data-astro-cid-2zp6q64z> <div class="metric-icon" data-astro-cid-2zp6q64z>\u{1F4E6}</div> <div class="metric-content" data-astro-cid-2zp6q64z> <div class="metric-value" id="ordersToday" data-astro-cid-2zp6q64z>47</div> <div class="metric-label" data-astro-cid-2zp6q64z>Orders Today</div> <div class="metric-change positive" data-astro-cid-2zp6q64z>+12% from yesterday</div> </div> </div> <div class="metric-card" data-astro-cid-2zp6q64z> <div class="metric-icon" data-astro-cid-2zp6q64z>\u{1F4B0}</div> <div class="metric-content" data-astro-cid-2zp6q64z> <div class="metric-value" id="revenueToday" data-astro-cid-2zp6q64z>\u20B918,450</div> <div class="metric-label" data-astro-cid-2zp6q64z>Revenue Today</div> <div class="metric-change positive" data-astro-cid-2zp6q64z>+8% from yesterday</div> </div> </div> <div class="metric-card" data-astro-cid-2zp6q64z> <div class="metric-icon" data-astro-cid-2zp6q64z>\u{1F465}</div> <div class="metric-content" data-astro-cid-2zp6q64z> <div class="metric-value" id="activeUsers" data-astro-cid-2zp6q64z>312</div> <div class="metric-label" data-astro-cid-2zp6q64z>Active Users</div> <div class="metric-change positive" data-astro-cid-2zp6q64z>+5% from last hour</div> </div> </div> <div class="metric-card" data-astro-cid-2zp6q64z> <div class="metric-icon" data-astro-cid-2zp6q64z>\u{1F69A}</div> <div class="metric-content" data-astro-cid-2zp6q64z> <div class="metric-value" id="deliveryTime" data-astro-cid-2zp6q64z>28min</div> <div class="metric-label" data-astro-cid-2zp6q64z>Avg Delivery Time</div> <div class="metric-change negative" data-astro-cid-2zp6q64z>+3min from target</div> </div> </div> </div> <!-- Quick Actions --> <div class="quick-actions-section" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Quick Actions</h3> <div class="quick-actions" data-astro-cid-2zp6q64z> <button class="action-btn primary" data-astro-cid-2zp6q64z>\u{1F4CB} View All Orders</button> <button class="action-btn secondary" data-astro-cid-2zp6q64z>\u{1F37D}\uFE0F Add Menu Item</button> <button class="action-btn secondary" data-astro-cid-2zp6q64z>\u{1F69A} Manage Delivery</button> <button class="action-btn secondary" data-astro-cid-2zp6q64z>\u{1F4CA} Generate Report</button> </div> </div> <!-- Live Orders Feed --> <div class="live-orders-section" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Live Orders Feed</h3> <div class="orders-feed" id="ordersFeed" data-astro-cid-2zp6q64z> <div class="order-item new" data-astro-cid-2zp6q64z> <div class="order-time" data-astro-cid-2zp6q64z>2 mins ago</div> <div class="order-details" data-astro-cid-2zp6q64z> <div class="order-number" data-astro-cid-2zp6q64z>#ORD-2025-048</div> <div class="order-customer" data-astro-cid-2zp6q64z>John Doe</div> <div class="order-items" data-astro-cid-2zp6q64z>\u{1F950}\xD72, \u2615\xD71</div> <div class="order-total" data-astro-cid-2zp6q64z>\u20B9794</div> </div> <div class="order-status-badge new" data-astro-cid-2zp6q64z>NEW</div> </div> <div class="order-item" data-astro-cid-2zp6q64z> <div class="order-time" data-astro-cid-2zp6q64z>5 mins ago</div> <div class="order-details" data-astro-cid-2zp6q64z> <div class="order-number" data-astro-cid-2zp6q64z>#ORD-2025-047</div> <div class="order-customer" data-astro-cid-2zp6q64z>Jane Smith</div> <div class="order-items" data-astro-cid-2zp6q64z>\u{1F957}\xD71, \u{1F36E}\xD71</div> <div class="order-total" data-astro-cid-2zp6q64z>\u20B9598</div> </div> <div class="order-status-badge preparing" data-astro-cid-2zp6q64z>PREPARING</div> </div> <div class="order-item" data-astro-cid-2zp6q64z> <div class="order-time" data-astro-cid-2zp6q64z>8 mins ago</div> <div class="order-details" data-astro-cid-2zp6q64z> <div class="order-number" data-astro-cid-2zp6q64z>#ORD-2025-046</div> <div class="order-customer" data-astro-cid-2zp6q64z>Bob Wilson</div> <div class="order-items" data-astro-cid-2zp6q64z>\u{1F969}\xD71, \u{1F377}\xD71</div> <div class="order-total" data-astro-cid-2zp6q64z>\u20B91,248</div> </div> <div class="order-status-badge ready" data-astro-cid-2zp6q64z>READY</div> </div> </div> </div> <!-- Charts Section --> <div class="charts-section" data-astro-cid-2zp6q64z> <div class="chart-container" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Revenue Overview</h3> <div class="chart-placeholder" data-astro-cid-2zp6q64z> <div class="chart-icon" data-astro-cid-2zp6q64z>\u{1F4C8}</div> <p data-astro-cid-2zp6q64z>Revenue graph showing daily, weekly, monthly trends</p> <div class="chart-mock" data-astro-cid-2zp6q64z> <div class="bar" style="height: 60%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 80%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 45%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 90%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 70%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 85%" data-astro-cid-2zp6q64z></div> <div class="bar" style="height: 95%" data-astro-cid-2zp6q64z></div> </div> </div> </div> <div class="chart-container" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Top Selling Items</h3> <div class="chart-placeholder" data-astro-cid-2zp6q64z> <div class="chart-icon" data-astro-cid-2zp6q64z>\u{1F37D}\uFE0F</div> <p data-astro-cid-2zp6q64z>Bar chart showing most popular menu items</p> <div class="top-items" data-astro-cid-2zp6q64z> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Artisan Croissant</span> <div class="bar-fill" style="width: 90%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>234</span> </div> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Signature Coffee</span> <div class="bar-fill" style="width: 85%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>198</span> </div> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Garden Salad</span> <div class="bar-fill" style="width: 70%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>156</span> </div> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Grilled Ribeye</span> <div class="bar-fill" style="width: 65%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>142</span> </div> <div class="item-bar" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>Chocolate Lava Cake</span> <div class="bar-fill" style="width: 55%" data-astro-cid-2zp6q64z></div> <span data-astro-cid-2zp6q64z>98</span> </div> </div> </div> </div> </div> </section> <!-- Orders Management --> <section id="orders" class="content-section" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>Orders Management</h2> <div class="orders-table-container" data-astro-cid-2zp6q64z> <table class="orders-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>Order ID</th> <th data-astro-cid-2zp6q64z>Customer</th> <th data-astro-cid-2zp6q64z>Items</th> <th data-astro-cid-2zp6q64z>Total</th> <th data-astro-cid-2zp6q64z>Status</th> <th data-astro-cid-2zp6q64z>Time</th> <th data-astro-cid-2zp6q64z>Actions</th> </tr> </thead> <tbody data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>#ORD-2025-048</td> <td data-astro-cid-2zp6q64z>John Doe</td> <td data-astro-cid-2zp6q64z>\u{1F950}\xD72, \u2615\xD71</td> <td data-astro-cid-2zp6q64z>\u20B9794</td> <td data-astro-cid-2zp6q64z><span class="status-badge new" data-astro-cid-2zp6q64z>New</span></td> <td data-astro-cid-2zp6q64z>2 mins ago</td> <td data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>View</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Process</button> </td> </tr> <tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>#ORD-2025-047</td> <td data-astro-cid-2zp6q64z>Jane Smith</td> <td data-astro-cid-2zp6q64z>\u{1F957}\xD71, \u{1F36E}\xD71</td> <td data-astro-cid-2zp6q64z>\u20B9598</td> <td data-astro-cid-2zp6q64z><span class="status-badge preparing" data-astro-cid-2zp6q64z>Preparing</span></td> <td data-astro-cid-2zp6q64z>5 mins ago</td> <td data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>View</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Update</button> </td> </tr> <tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z>#ORD-2025-046</td> <td data-astro-cid-2zp6q64z>Bob Wilson</td> <td data-astro-cid-2zp6q64z>\u{1F969}\xD71, \u{1F377}\xD71</td> <td data-astro-cid-2zp6q64z>\u20B91,248</td> <td data-astro-cid-2zp6q64z><span class="status-badge ready" data-astro-cid-2zp6q64z>Ready</span></td> <td data-astro-cid-2zp6q64z>8 mins ago</td> <td data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>View</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Assign</button> </td> </tr> </tbody> </table> </div> </section> <!-- Menu Management --> <section id="menu" class="content-section" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>Menu Management</h2> <div class="menu-controls" data-astro-cid-2zp6q64z> <button class="action-btn primary" data-astro-cid-2zp6q64z>+ Add New Item</button> <div class="filter-controls" data-astro-cid-2zp6q64z> <select class="filter-select" data-astro-cid-2zp6q64z> <option data-astro-cid-2zp6q64z>All Categories</option> <option data-astro-cid-2zp6q64z>Breakfast</option> <option data-astro-cid-2zp6q64z>Lunch</option> <option data-astro-cid-2zp6q64z>Dinner</option> <option data-astro-cid-2zp6q64z>Beverages</option> <option data-astro-cid-2zp6q64z>Desserts</option> </select> <input type="text" class="search-input" placeholder="Search menu items..." data-astro-cid-2zp6q64z> </div> </div> <div class="menu-grid" data-astro-cid-2zp6q64z> <div class="menu-item-card" data-astro-cid-2zp6q64z> <div class="item-image" data-astro-cid-2zp6q64z>\u{1F950}</div> <div class="item-details" data-astro-cid-2zp6q64z> <h4 data-astro-cid-2zp6q64z>Artisan Croissant</h4> <p data-astro-cid-2zp6q64z>Buttery, flaky perfection with premium French butter</p> <div class="item-price" data-astro-cid-2zp6q64z>\u20B9299</div> <div class="item-category" data-astro-cid-2zp6q64z>Breakfast</div> <div class="item-status" data-astro-cid-2zp6q64z> <span class="status-badge active" data-astro-cid-2zp6q64z>Available</span> <span class="badge bestseller" data-astro-cid-2zp6q64z>Bestseller</span> </div> </div> <div class="item-actions" data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>Edit</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Toggle</button> </div> </div> <div class="menu-item-card" data-astro-cid-2zp6q64z> <div class="item-image" data-astro-cid-2zp6q64z>\u2615</div> <div class="item-details" data-astro-cid-2zp6q64z> <h4 data-astro-cid-2zp6q64z>Signature Blend Coffee</h4> <p data-astro-cid-2zp6q64z>Single-origin beans with chocolate and caramel notes</p> <div class="item-price" data-astro-cid-2zp6q64z>\u20B9199</div> <div class="item-category" data-astro-cid-2zp6q64z>Beverages</div> <div class="item-status" data-astro-cid-2zp6q64z> <span class="status-badge active" data-astro-cid-2zp6q64z>Available</span> <span class="badge bestseller" data-astro-cid-2zp6q64z>Bestseller</span> </div> </div> <div class="item-actions" data-astro-cid-2zp6q64z> <button class="action-btn-small" data-astro-cid-2zp6q64z>Edit</button> <button class="action-btn-small" data-astro-cid-2zp6q64z>Toggle</button> </div> </div> </div> </section> <!-- Customers Management --> <section id="customers" class="content-section" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>Customers Management</h2> <div class="customers-controls" data-astro-cid-2zp6q64z> <div class="customer-stats" data-astro-cid-2zp6q64z> <div class="stat-card" data-astro-cid-2zp6q64z> <div class="stat-value" id="totalAuthUsers" data-astro-cid-2zp6q64z>0</div> <div class="stat-label" data-astro-cid-2zp6q64z>Authentication Users</div> </div> <div class="stat-card" data-astro-cid-2zp6q64z> <div class="stat-value" id="totalProfileUsers" data-astro-cid-2zp6q64z>0</div> <div class="stat-label" data-astro-cid-2zp6q64z>Profile Users</div> </div> <div class="stat-card" data-astro-cid-2zp6q64z> <div class="stat-value" id="newUsersToday" data-astro-cid-2zp6q64z>0</div> <div class="stat-label" data-astro-cid-2zp6q64z>New Today</div> </div> </div> <button class="action-btn primary" id="refreshUsers" data-astro-cid-2zp6q64z>\u{1F504} Refresh Users</button> </div> <div class="customers-tabs" data-astro-cid-2zp6q64z> <button class="tab-btn active" data-tab="auth-users" data-astro-cid-2zp6q64z>Authentication Users</button> <button class="tab-btn" data-tab="profile-users" data-astro-cid-2zp6q64z>Profile Users</button> <button class="tab-btn" data-tab="all-users" data-astro-cid-2zp6q64z>All Users</button> </div> <!-- Authentication Users Table --> <div id="auth-users" class="tab-content active" data-astro-cid-2zp6q64z> <div class="table-container" data-astro-cid-2zp6q64z> <table class="users-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>User ID</th> <th data-astro-cid-2zp6q64z>Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Registration Date</th> <th data-astro-cid-2zp6q64z>Status</th> <th data-astro-cid-2zp6q64z>Actions</th> </tr> </thead> <tbody id="authUsersTableBody" data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <td colspan="6" class="loading-row" data-astro-cid-2zp6q64z>Loading authentication users...</td> </tr> </tbody> </table> </div> </div> <!-- Profile Users Table --> <div id="profile-users" class="tab-content" data-astro-cid-2zp6q64z> <div class="table-container" data-astro-cid-2zp6q64z> <table class="users-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>User ID</th> <th data-astro-cid-2zp6q64z>Full Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Phone</th> <th data-astro-cid-2zp6q64z>Token Balance</th> <th data-astro-cid-2zp6q64z>Total Spent</th> <th data-astro-cid-2zp6q64z>Actions</th> </tr> </thead> <tbody id="profileUsersTableBody" data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <td colspan="7" class="loading-row" data-astro-cid-2zp6q64z>Loading profile users...</td> </tr> </tbody> </table> </div> </div> <!-- All Users Combined View --> <div id="all-users" class="tab-content" data-astro-cid-2zp6q64z> <div class="combined-users-container" data-astro-cid-2zp6q64z> <div class="users-summary" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>Users Summary</h3> <div class="summary-grid" id="usersSummary" data-astro-cid-2zp6q64z> <div class="summary-item" data-astro-cid-2zp6q64z> <span class="summary-label" data-astro-cid-2zp6q64z>Auth Users Only:</span> <span class="summary-value" id="authOnlyCount" data-astro-cid-2zp6q64z>0</span> </div> <div class="summary-item" data-astro-cid-2zp6q64z> <span class="summary-label" data-astro-cid-2zp6q64z>Profile Users Only:</span> <span class="summary-value" id="profileOnlyCount" data-astro-cid-2zp6q64z>0</span> </div> <div class="summary-item" data-astro-cid-2zp6q64z> <span class="summary-label" data-astro-cid-2zp6q64z>Complete Users:</span> <span class="summary-value" id="completeUsersCount" data-astro-cid-2zp6q64z>0</span> </div> </div> </div> <div class="table-container" data-astro-cid-2zp6q64z> <table class="users-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>User ID</th> <th data-astro-cid-2zp6q64z>Name</th> <th data-astro-cid-2zp6q64z>Email</th> <th data-astro-cid-2zp6q64z>Has Profile</th> <th data-astro-cid-2zp6q64z>Registration</th> <th data-astro-cid-2zp6q64z>Status</th> <th data-astro-cid-2zp6q64z>Actions</th> </tr> </thead> <tbody id="allUsersTableBody" data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <td colspan="7" class="loading-row" data-astro-cid-2zp6q64z>Loading all users...</td> </tr> </tbody> </table> </div> </div> </div> </section> <!-- Other sections would be similar... --> </main> </div> <script>
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items and sections
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Show corresponding section
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
        }
      });
    });

    // Refresh data
    document.getElementById('refreshData').addEventListener('click', () => {
      showToast('Refreshing dashboard data...');
      
      // Simulate data refresh
      setTimeout(() => {
        // Update metrics with random changes
        const ordersToday = document.getElementById('ordersToday');
        const currentOrders = parseInt(ordersToday.textContent);
        ordersToday.textContent = currentOrders + Math.floor(Math.random() * 3);
        
        const revenueToday = document.getElementById('revenueToday');
        const currentRevenue = parseInt(revenueToday.textContent.replace('\u20B9', '').replace(',', ''));
        revenueToday.textContent = '\u20B9' + (currentRevenue + Math.floor(Math.random() * 1000)).toLocaleString();
        
        showToast('Data refreshed successfully!');
      }, 1500);
    });

    // Live orders simulation
    function addNewOrder() {
      const ordersFeed = document.getElementById('ordersFeed');
      const orderNames = ['Alice Johnson', 'Charlie Brown', 'Diana Prince', 'Edward Norton', 'Fiona Green'];
      const orderItems = ['\u{1F950}\xD71', '\u2615\xD72', '\u{1F957}\xD71', '\u{1F969}\xD71', '\u{1F36E}\xD72'];
      
      const newOrder = document.createElement('div');
      newOrder.className = 'order-item new';
      newOrder.innerHTML = \\\`
        <div class="order-time">Just now</div>
        <div class="order-details">
          <div class="order-number">#ORD-2025-\\\${Math.floor(Math.random() * 1000)}</div>
          <div class="order-customer">\\\${orderNames[Math.floor(Math.random() * orderNames.length)]}</div>
          <div class="order-items">\\\${orderItems[Math.floor(Math.random() * orderItems.length)]}</div>
          <div class="order-total">\u20B9\\\${Math.floor(Math.random() * 1000) + 200}</div>
        </div>
        <div class="order-status-badge new">NEW</div>
      \\\`;
      
      ordersFeed.insertBefore(newOrder, ordersFeed.firstChild);
      
      // Remove the 'new' class after 5 seconds
      setTimeout(() => {
        newOrder.classList.remove('new');
      }, 5000);
      
      // Keep only last 5 orders
      while (ordersFeed.children.length > 5) {
        ordersFeed.removeChild(ordersFeed.lastChild);
      }
    }

    // Simulate new orders every 10 seconds
    setInterval(addNewOrder, 10000);

    // Quick actions
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        showToast(\\\`Executing: \\\${action}\\\`);
      });
    });

    // Toast notification
    function showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    // Auto-refresh metrics every 30 seconds
    setInterval(() => {
      const activeUsers = document.getElementById('activeUsers');
      const currentUsers = parseInt(activeUsers.textContent);
      const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
      activeUsers.textContent = Math.max(250, currentUsers + change);
    }, 30000);

    // Users Management Functionality
    let authUsers = [];
    let profileUsers = [];

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(targetTab).classList.add('active');
      });
    });

    // Load users data
    async function loadUsersData() {
      try {
        // Load authentication users
        const authResponse = await fetch('/api/users/auth');
        if (authResponse.ok) {
          authUsers = await authResponse.json();
        }

        // Load profile users
        const profileResponse = await fetch('/api/users/profile');
        if (profileResponse.ok) {
          profileUsers = await profileResponse.json();
        }

        updateUsersDisplay();
      } catch (error) {
        console.error('Error loading users:', error);
        showToast('Error loading users data');
      }
    }

    // Update users display
    function updateUsersDisplay() {
      // Update stats
      document.getElementById('totalAuthUsers').textContent = authUsers.length;
      document.getElementById('totalProfileUsers').textContent = profileUsers.length;
      
      // Calculate new users today (simplified)
      const today = new Date().toDateString();
      const newAuthUsers = authUsers.filter(user => 
        new Date(user.$createdAt).toDateString() === today
      ).length;
      document.getElementById('newUsersToday').textContent = newAuthUsers;

      // Update authentication users table
      updateAuthUsersTable();
      
      // Update profile users table
      updateProfileUsersTable();
      
      // Update all users combined view
      updateAllUsersTable();
    }

    // Update authentication users table
    function updateAuthUsersTable() {
      const tbody = document.getElementById('authUsersTableBody');
      
      if (authUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No authentication users found</td></tr>';
        return;
      }

      tbody.innerHTML = authUsers.map(user => \\\`
        <tr>
          <td>\\\${user.$id}</td>
          <td>\\\${user.name || 'N/A'}</td>
          <td>\\\${user.email}</td>
          <td>\\\${new Date(user.$createdAt).toLocaleDateString()}</td>
          <td><span class="status-badge \\\${user.status ? 'active' : 'inactive'}">\\\${user.status ? 'Active' : 'Inactive'}</span></td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('\\\${user.$id}', 'auth')">View</button>
          </td>
        </tr>
      \\\`).join('');
    }

    // Update profile users table
    function updateProfileUsersTable() {
      const tbody = document.getElementById('profileUsersTableBody');
      
      if (profileUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No profile users found</td></tr>';
        return;
      }

      tbody.innerHTML = profileUsers.map(user => \\\`
        <tr>
          <td>\\\${user.userId}</td>
          <td>\\\${user.fullName}</td>
          <td>\\\${user.email || 'N/A'}</td>
          <td>\\\${user.phoneNumber || 'N/A'}</td>
          <td>\\\${user.tokenBalance || 0}</td>
          <td>\u20B9\\\${(user.totalSpent || 0).toLocaleString()}</td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('\\\${user.userId}', 'profile')">View</button>
            <button class="action-btn-small" onclick="editUserProfile('\\\${user.userId}')">Edit</button>
          </td>
        </tr>
      \\\`).join('');
    }

    // Update all users combined table
    function updateAllUsersTable() {
      const tbody = document.getElementById('allUsersTableBody');
      
      // Create a map of profile users by userId
      const profileMap = new Map(profileUsers.map(user => [user.userId, user]));
      
      // Combine data
      const allUsers = authUsers.map(authUser => {
        const profile = profileMap.get(authUser.$id);
        return {
          ...authUser,
          hasProfile: !!profile,
          profile: profile
        };
      });

      // Update summary counts
      const authOnly = allUsers.filter(user => !user.hasProfile).length;
      const profileOnly = profileUsers.filter(profile => 
        !authUsers.find(auth => auth.$id === profile.userId)
      ).length;
      const completeUsers = allUsers.filter(user => user.hasProfile).length;

      document.getElementById('authOnlyCount').textContent = authOnly;
      document.getElementById('profileOnlyCount').textContent = profileOnly;
      document.getElementById('completeUsersCount').textContent = completeUsers;

      if (allUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No users found</td></tr>';
        return;
      }

      tbody.innerHTML = allUsers.map(user => \\\`
        <tr>
          <td>\\\${user.$id}</td>
          <td>\\\${user.name || (user.profile?.fullName) || 'N/A'}</td>
          <td>\\\${user.email}</td>
          <td>
            <span class="status-badge \\\${user.hasProfile ? 'complete' : 'incomplete'}">
              \\\${user.hasProfile ? '\u2705 Complete' : '\u274C Missing'}
            </span>
          </td>
          <td>\\\${new Date(user.$createdAt).toLocaleDateString()}</td>
          <td><span class="status-badge \\\${user.status ? 'active' : 'inactive'}">\\\${user.status ? 'Active' : 'Inactive'}</span></td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('\\\${user.$id}', 'combined')">View</button>
            \\\${!user.hasProfile ? \\\`<button class="action-btn-small" onclick="createProfile('\\\${user.$id}')">Create Profile</button>\\\` : ''}
          </td>
        </tr>
      \\\`).join('');
    }

    // Refresh users button
    document.getElementById('refreshUsers').addEventListener('click', () => {
      showToast('Refreshing users data...');
      loadUsersData();
    });

    // User action functions
    function viewUserDetails(userId, type) {
      showToast(\\\`Viewing details for user \\\${userId} (\\\${type})\\\`);
      // TODO: Implement user details modal
    }

    function editUserProfile(userId) {
      showToast(\\\`Editing profile for user \\\${userId}\\\`);
      // TODO: Implement profile editing modal
    }

    function createProfile(userId) {
      showToast(\\\`Creating profile for user \\\${userId}\\\`);
      // TODO: Implement profile creation modal
    }

    // Load users on page load
    loadUsersData();
  <\/script>  `])), maybeRenderHead()) })}`;
}, "C:/Users/nirma/Desktop/New Website/src/pages/admin.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
