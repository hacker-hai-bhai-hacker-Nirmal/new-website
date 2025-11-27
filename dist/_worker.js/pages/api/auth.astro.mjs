globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

// API endpoint for authentication
async function POST({ request }) {
  try {
    const { action, email, password, fullName, userId } = await request.json();
    
    // Initialize Appwrite on server
    const { Client, Account, ID, Databases } = await import('../../chunks/sdk_oS0JbZ-m.mjs');
    
    const client = new Client()
      .setEndpoint('https://fra.cloud.appwrite.io/v1')
      .setProject('6900b1ed001604d8befb');
    
    const account = new Account(client);
    const databases = new Databases(client);
    
    let result;
    
    if (action === 'login') {
      result = await account.createEmailPasswordSession(email, password);
    } else if (action === 'signup') {
      // Create Appwrite account
      result = await account.create(
        userId || ID.unique(),
        email,
        password,
        fullName
      );
      
      // Create user profile in custom collection
      try {
        const userProfile = await databases.createDocument(
          'main-db',
          'users',
          result.$id,
          {
            userId: result.$id,
            phoneNumber: '',
            fullName: fullName,
            email: email,
            referralCode: '',
            referredBy: '',
            referralCount: 0,
            tokenBalance: 0,
            totalSpent: 0,
            currentReferralDiscount: 20,
            currentTokenDiscount: 0
          }
        );
        console.log('User profile created:', userProfile);
      } catch (profileError) {
        console.error('Profile creation error:', profileError);
        // Continue even if profile creation fails
      }
    } else {
      throw new Error('Invalid action');
    }
    
    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Auth API error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Authentication failed' 
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
