# Appwrite Setup Guide for Litterateur Cafe

This guide will help you set up Appwrite backend services for real user authentication and data storage.

## 🚀 Quick Setup

### 1. Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)
2. Click "Create Project"
3. Enter project name: `Litterateur Cafe`
4. Click "Create"

### 2. Get Your Project ID

1. In your Appwrite dashboard, go to **Settings**
2. Copy the **Project ID**
3. It looks like: `a1b2c3d4e5f6g7h8i9j0`

### 3. Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and replace:
   ```
   VITE_APPWRITE_PROJECT_ID=your_actual_project_id_here
   ```

3. Keep the other values as they are (they use defaults)

### 4. Set Up Database (Optional)

The database will be created automatically when users sign up, but you can pre-populate it:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the setup script:
   ```bash
   node scripts/setup-appwrite.js
   ```

This creates:
- ✅ Database: `litterateur_db`
- ✅ Collections: users, orders, menu_items, referrals, tokens
- ✅ Sample menu items
- ✅ Proper indexes and relationships

### 5. Configure Authentication

In your Appwrite dashboard:

1. Go to **Auth → Settings**
2. Enable the following providers:
   - ✅ **Email/Password** (enabled by default)
   - ✅ **Google OAuth** (for Google login)
   - ✅ **Phone** (for phone authentication)

3. For Google OAuth:
   - Get your Google OAuth credentials
   - Add Client ID and Client Secret

4. For Phone auth:
   - Enable SMS provider (Twilio recommended)
   - Add your Twilio credentials

### 6. Test the Integration

1. Start development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:4321/login`

3. Test authentication:
   - **Sign up** with email and password
   - **Sign in** with your credentials
   - Check if user profile is created in Appwrite dashboard

## 📊 Database Schema

### Users Collection
```json
{
  "name": "string (required)",
  "email": "email (unique)",
  "phone": "string (unique)",
  "tokens": "integer (default: 100)",
  "referrals": "integer (default: 0)",
  "currentDiscount": "integer (default: 20)",
  "joinDate": "datetime",
  "lastLogin": "datetime",
  "referralCode": "string (unique)"
}
```

### Orders Collection
```json
{
  "userId": "string (required)",
  "items": "string (JSON)",
  "totalAmount": "integer (required)",
  "discount": "integer (default: 0)",
  "finalAmount": "integer (required)",
  "status": "string (pending/preparing/ready/completed)",
  "paymentMethod": "string",
  "deliveryAddress": "string",
  "orderDate": "datetime",
  "estimatedDelivery": "datetime"
}
```

### Menu Items Collection
```json
{
  "name": "string (required)",
  "description": "string (required)",
  "category": "string (required)",
  "price": "integer (required)",
  "image": "string",
  "available": "boolean (default: true)",
  "bestseller": "boolean (default: false)",
  "new": "boolean (default: false)",
  "spicy": "boolean (default: false)",
  "prepTime": "integer (default: 15)"
}
```

## 🔧 Features Enabled

With Appwrite integration, your Litterateur Cafe website now has:

### ✅ Real User Authentication
- Email/Password login and signup
- Google OAuth integration
- Phone authentication (with SMS)
- Session management
- Password reset

### ✅ User Data Storage
- User profiles with tokens and rewards
- Order history tracking
- Referral system
- Token transactions

### ✅ Real-time Features
- Live order status updates
- User session persistence
- Cross-device synchronization

### ✅ Security
- Secure password hashing
- Session tokens
- API rate limiting
- Data encryption

## 🚀 Deployment

### For Production

1. **Environment Variables**: Set your production environment variables in your hosting platform
2. **CORS**: Add your domain to Appwrite CORS settings
3. **Webhooks**: Configure webhooks for real-time updates (optional)

### Cloudflare Pages

Add your environment variables in Cloudflare Pages dashboard:
1. Go to your project settings
2. Add `VITE_APPWRITE_PROJECT_ID` as an environment variable
3. Redeploy your site

## 🔍 Testing

### Manual Testing
1. Test user signup flow
2. Test login with different methods
3. Verify user data in Appwrite dashboard
4. Test password reset

### Automated Testing
```bash
# Run tests (if implemented)
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **"Project not found"**
   - Check your Project ID in `.env` file
   - Ensure project exists in Appwrite dashboard

2. **"Auth not enabled"**
   - Go to Auth → Settings in Appwrite dashboard
   - Enable required authentication methods

3. **"CORS errors"**
   - Add your domain to Appwrite CORS settings
   - Check API endpoint configuration

4. **"Database not found"**
   - Run the setup script: `node scripts/setup-appwrite.js`
   - Or create database manually in Appwrite dashboard

### Debug Mode

Enable debug logging in browser:
```javascript
// In browser console
localStorage.setItem('appwrite-debug', 'true');
```

## 📚 Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite JavaScript SDK](https://appwrite.io/docs/sdk/web)
- [Appwrite Authentication](https://appwrite.io/docs/authentication)

## 🎉 Next Steps

After setting up Appwrite:

1. ✅ Test authentication flow
2. ✅ Verify data storage
3. ✅ Test order creation
4. ✅ Set up payment integration
5. ✅ Configure email notifications
6. ✅ Add real-time features

Your Litterateur Cafe website now has a complete backend infrastructure! 🚀
