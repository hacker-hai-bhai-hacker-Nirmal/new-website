// Create another test user in Appwrite
const endpoint = 'https://fra.cloud.appwrite.io/v1';
const projectId = '6900b1ed001604d8befb';
const apiKey = 'standard_2ea684a82e7b55511b056b2857a03bdc93996b398ad9214410aa6e0faed1bc6ebeb03138858213a9f51e1433c4cddc9908821350bf826103f9b26389e315801beb75c5104ef4bd2490b0565a8ff4b0bf4e3907f525114172f8e6e398aa5d24f924dc5b0c467f4885a38aa3b42c4d7c0262cdf8c9f38111772075e021c5359c75';

async function createNewTestUser() {
  try {
    const timestamp = Date.now();
    const userId = 'testuser-' + timestamp;
    const email = `testuser${timestamp}@litterateur.com`;
    
    console.log('🔨 Creating new test user...');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: TestUser123!`);
    console.log(`🆔 User ID: ${userId}`);
    
    const response = await fetch(`${endpoint}/users`, {
      method: 'POST',
      headers: {
        'X-Appwrite-Project': projectId,
        'X-Appwrite-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        email: email,
        password: 'TestUser123!',
        name: 'Test User ' + timestamp
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ New test user created successfully!');
      console.log('📧 Email:', email);
      console.log('🔑 Password: TestUser123!');
      console.log('👤 User ID:', result.$id);
      console.log('📝 Name:', result.name);
      console.log('📅 Created:', new Date(result.$createdAt).toLocaleString());
    } else {
      console.error('❌ Error creating user:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

createNewTestUser();
