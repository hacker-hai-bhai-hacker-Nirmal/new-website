// Verify OTP and create session
export async function POST({ request }) {
  try {
    const { email, otp } = await request.json();
    
    if (!email || !otp) {
      return new Response(JSON.stringify({ 
        error: 'Email and OTP required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // For demo, we'll accept any 6-digit OTP
    // In production, verify against stored OTP in database
    const isValidOtp = otp.length === 6 && /^\d{6}$/.test(otp);
    
    if (!isValidOtp) {
      return new Response(JSON.stringify({ 
        error: 'Invalid OTP format' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Check if user exists in Appwrite, create if doesn't exist
    const { Client, Account, Databases } = await import('appwrite');
    
    const client = new Client()
      .setEndpoint('https://fra.cloud.appwrite.io/v1')
      .setProject('6900b1ed001604d8befb');

    const account = new Account(client);
    const databases = new Databases(client);

    let userRecord = null;
    
    try {
      // Try to get existing user
      // For demo, we'll create a simple user record
      const userId = email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      
      // Check if user profile exists
      try {
        userRecord = await databases.getDocument(
          'main-db',
          'users',
          userId
        );
      } catch (profileError) {
        // Create new user profile
        userRecord = await databases.createDocument(
          'main-db',
          'users',
          userId,
          {
            userId: userId,
            email: email,
            fullName: email.split('@')[0],
            phoneNumber: '',
            referralCode: '',
            referredBy: '',
            referralCount: 0,
            tokenBalance: 0,
            totalSpent: 0,
            currentReferralDiscount: 20,
            currentTokenDiscount: 0,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          }
        );
      }
      
    } catch (error) {
      console.error('User creation error:', error);
      // Continue with basic session even if user creation fails
    }

    // Create session response
    const sessionData = {
      user: {
        id: userRecord?.$id || email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(),
        email: email,
        name: userRecord?.fullName || email.split('@')[0],
        isLoggedIn: true
      },
      session: {
        token: 'demo-session-' + Date.now(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    };

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Login successful',
      user: sessionData.user,
      session: sessionData.session
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to verify OTP' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
