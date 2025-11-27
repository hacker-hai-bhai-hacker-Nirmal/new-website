// API endpoint to fetch profile users
export async function GET({ request }) {
  try {
    // Initialize Appwrite on server
    const { Client, Databases } = await import('appwrite');
    
    const client = new Client()
      .setEndpoint('https://fra.cloud.appwrite.io/v1')
      .setProject('6900b1ed001604d8befb');
    
    const databases = new Databases(client);
    
    // Get all profile users
    const response = await databases.listDocuments(
      'main-db',
      'users'
    );
    
    return new Response(JSON.stringify(response.documents || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Profile users API error:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to fetch profile users' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
