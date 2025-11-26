# Manual Appwrite Setup for Litterateur Cafe

Since the automated script has compatibility issues, let's set up the database manually in your Appwrite dashboard.

## 🚀 Quick Manual Setup (5 minutes)

### 1. Go to Your Appwrite Dashboard
- URL: https://fra.cloud.appwrite.io/
- Project: Litterateur cafe
- Project ID: 6900b1ed001604d8befb

### 2. Create Database
1. In your dashboard, click **"Databases"** on the left
2. Click **"Create Database"**
3. **Database ID**: `main-db`
4. **Database Name**: `Litterateur Cafe Database`
5. Click **"Create"**

### 3. Create Collections

#### Collection 1: Users
1. Click **"Create Collection"**
2. **Collection ID**: `users`
3. **Collection Name**: `Users`
4. Add these attributes:

| Key | Type | Size | Required | Default |
|-----|------|------|----------|---------|
| name | string | 255 | ✅ | - |
| email | email | - | ❌ | - |
| phone | string | 20 | ❌ | - |
| tokens | integer | - | ✅ | 100 |
| referrals | integer | - | ✅ | 0 |
| currentDiscount | integer | - | ✅ | 20 |
| joinDate | datetime | - | ✅ | - |
| lastLogin | datetime | - | ✅ | - |
| referralCode | string | 20 | ❌ | - |

5. Click **"Create"**

#### Collection 2: Orders
1. Click **"Create Collection"**
2. **Collection ID**: `orders`
3. **Collection Name**: `Orders`
4. Add these attributes:

| Key | Type | Size | Required | Default |
|-----|------|------|----------|---------|
| userId | string | 255 | ✅ | - |
| items | string | 2000 | ✅ | - |
| totalAmount | integer | - | ✅ | - |
| discount | integer | - | ❌ | 0 |
| finalAmount | integer | - | ✅ | - |
| status | string | 50 | ✅ | pending |
| paymentMethod | string | 50 | ✅ | - |
| deliveryAddress | string | 500 | ❌ | - |
| orderDate | datetime | - | ✅ | - |
| estimatedDelivery | datetime | - | ❌ | - |

5. Click **"Create"**

#### Collection 3: Menu Items
1. Click **"Create Collection"**
2. **Collection ID**: `menu_items`
3. **Collection Name**: `Menu Items`
4. Add these attributes:

| Key | Type | Size | Required | Default |
|-----|------|------|----------|---------|
| name | string | 255 | ✅ | - |
| description | string | 1000 | ✅ | - |
| category | string | 100 | ✅ | - |
| price | integer | - | ✅ | - |
| image | string | 500 | ❌ | - |
| available | boolean | - | ✅ | true |
| bestseller | boolean | - | ✅ | false |
| new | boolean | - | ✅ | false |
| spicy | boolean | - | ✅ | false |
| prepTime | integer | - | ✅ | 15 |

5. Click **"Create"**

### 4. Add Sample Menu Items (Optional)
In the `menu_items` collection, click **"Create Document"** and add:

```json
{
  "name": "Artisan Croissant",
  "description": "Buttery, flaky perfection with premium French butter",
  "category": "Bakery",
  "price": 299,
  "image": "/images/croissant.jpg",
  "available": true,
  "bestseller": true,
  "new": false,
  "spicy": false,
  "prepTime": 10
}
```

Add a few more items if you like.

### 5. Enable Authentication
1. Click **"Auth"** on the left
2. In **"Settings"**, make sure **"Email/Password"** is enabled
3. Optionally enable **"Google OAuth"** if you want Google login

### 6. Test Your Setup
1. Go to: http://localhost:4321/login
2. Try signing up with a new account
3. Check if user data appears in the `users` collection
4. Try logging in and visiting the dashboard

## ✅ Verification Checklist

After setup, verify:
- [ ] Database `main-db` exists
- [ ] Collections `users`, `orders`, `menu_items` exist
- [ ] Email/password authentication is enabled
- [ ] Test signup works
- [ ] Test login works
- [ ] Dashboard shows user data

## 🎯 What's Next

Once manual setup is complete:
1. ✅ Test authentication flow
2. ✅ Deploy to production
3. ✅ Connect cart/orders to database
4. ✅ Add real-time features

## 🆘 Troubleshooting

**If you get "Database not found" error:**
- Check database ID is exactly `main-db`
- Make sure you're in the correct project

**If authentication fails:**
- Check Auth settings in Appwrite dashboard
- Verify email/password is enabled
- Check CORS settings (add localhost:4321)

**If dashboard shows no data:**
- Check if user profile was created in `users` collection
- Verify the database connection in browser console

Your Litterateur cafe website will have real authentication working once you complete these steps! 🚀
