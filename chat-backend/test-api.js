// Simple test script to verify the backend API is working
const testAPI = async () => {
  const API_BASE_URL = 'http://localhost:3001';
  
  console.log('🧪 Testing ATS Checker Backend API...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Test chat endpoint
    console.log('\n2. Testing chat endpoint...');
    const chatResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What are the key elements of an ATS-friendly resume?',
        context: []
      })
    });
    
    if (chatResponse.ok) {
      const chatData = await chatResponse.json();
      console.log('✅ Chat response received:');
      console.log('Message:', chatData.message.substring(0, 100) + '...');
      console.log('Usage:', chatData.usage);
    } else {
      const errorData = await chatResponse.json();
      console.log('❌ Chat endpoint error:', errorData);
    }
    
  } catch (error) {
    console.log('❌ API test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('- Backend server is running (npm start)');
    console.log('- OpenAI API key is set in .env file');
    console.log('- Port 3001 is available');
  }
};

// Run the test
testAPI();