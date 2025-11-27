// Create test user in Appwrite
const endpoint = 'https://fra.cloud.appwrite.io/v1';
const projectId = '6900b1ed001604d8befb';
const apiKey = 'standard_2ea684a82e7b55511b056b2857a03bdc93996b398ad9214410aa6e0faed1bc6ebeb03138858213a9f51e1433c4cddc9908821350bf826103f9b26389e315801beb75c5104ef4bd2490b0565a8ff4b0bf4e3907f525114172f8e6e398aa5d24f924dc5b0c467f4885a38aa3b42c4d7c0262cdf8c9f38111772075e021c5359c75';

async function createTestUser() {
  try {
    const response = await fetch(`${endpoint}/users`, {
      method: 'POST',
      headers: {
        'X-Appwrite-Project': projectId,
        'X-Appwrite-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 'test-user-' + Date.now(),
        email: 'test@litterateur.com',
        password: 'TestUser123!',
        name: 'Test User'
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Test user created successfully!');
      console.log('📧 Email: test@litterateur.com');
      console.log('🔑 Password: TestUser123!');
      console.log('👤 User ID:', result.$id);
      console.log('📝 Name:', result.name);
    } else {
      console.error('❌ Error creating user:', result);
      
      // If user already exists, that's fine for testing
      if (result.code === 400 && result.message.includes('already exists')) {
        console.log('ℹ️ User already exists. You can use these credentials:');
        console.log('📧 Email: test@litterateur.com');
        console.log('🔑 Password: TestUser123!');
      }
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

createTestUser();
