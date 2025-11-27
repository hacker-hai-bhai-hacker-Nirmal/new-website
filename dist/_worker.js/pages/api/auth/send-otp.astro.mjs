globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../../renderers.mjs';

// Send OTP to user's email
async function POST({ request }) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ 
        error: 'Valid email address required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in session/database (for demo, we'll use memory)
    // In production, store in Appwrite database with expiration
    const otpData = {
      email: email,
      otp: otp,
      created: new Date().toISOString(),
      expires: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
    };

    // For demo purposes, we'll simulate sending email
    // In production, use email service like SendGrid, Resend, etc.
    console.log('OTP Generated:', otpData);
    
    // TODO: Integrate with actual email service
    // Example with Resend:
    // const resend = new Resend('your-api-key');
    // await resend.emails.send({
    //   from: 'noreply@litterateur.com',
    //   to: email,
    //   subject: 'Your Litterateur Login Code',
    //   html: `<h2>Your login code is: ${otp}</h2><p>This code expires in 10 minutes.</p>`
    // });

    // For demo, return the OTP in response (REMOVE IN PRODUCTION)
    return new Response(JSON.stringify({ 
      success: true,
      message: 'OTP sent to your email',
      // REMOVE THIS IN PRODUCTION - for demo only
      otp: otp, 
      expires: otpData.expires
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to send OTP' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
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
