// Check users in Appwrite
const endpoint = 'https://fra.cloud.appwrite.io/v1';
const projectId = '6900b1ed001604d8befb';
const apiKey = 'standard_2ea684a82e7b55511b056b2857a03bdc93996b398ad9214410aa6e0faed1bc6ebeb03138858213a9f51e1433c4cddc9908821350bf826103f9b26389e315801beb75c5104ef4bd2490b0565a8ff4b0bf4e3907f525114172f8e6e398aa5d24f924dc5b0c467f4885a38aa3b42c4d7c0262cdf8c9f38111772075e021c5359c75';

async function checkUsers() {
  try {
    console.log('🔍 Checking users in Appwrite...');
    
    const response = await fetch(`${endpoint}/users`, {
      method: 'GET',
      headers: {
        'X-Appwrite-Project': projectId,
        'X-Appwrite-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Found ${result.total} users in the database:`);
      console.log('');
      
      if (result.users && result.users.length > 0) {
        result.users.forEach((user, index) => {
          console.log(`${index + 1}. 👤 ${user.name}`);
          console.log(`   📧 Email: ${user.email}`);
          console.log(`   🆔 ID: ${user.$id}`);
          console.log(`   📅 Created: ${new Date(user.$createdAt).toLocaleString()}`);
          console.log('');
        });
      } else {
        console.log('ℹ️ No users found in the database.');
      }
      
      // Check specifically for our test user
      const testUser = result.users?.find(user => user.email === 'test@litterateur.com');
      if (testUser) {
        console.log('🎯 Test user found!');
        console.log(`   📧 Email: ${testUser.email}`);
        console.log(`   🔑 You can use password: TestUser123!`);
        console.log(`   🆔 User ID: ${testUser.$id}`);
      } else {
        console.log('❌ Test user (test@litterateur.com) not found in the database.');
      }
      
    } else {
      console.error('❌ Error fetching users:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

checkUsers();
