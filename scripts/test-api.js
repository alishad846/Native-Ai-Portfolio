
const fs = require('fs');
const path = require('path');

function getEnvKey() {
  const envPath = path.join(process.cwd(), '.env.local');
  const content = fs.readFileSync(envPath, 'utf8');
  const match = content.match(/MISTRAL_API_KEY=(.*)/);
  return match ? match[1].trim() : null;
}

async function testMistral() {
  const key = getEnvKey();
  if (!key) {
    console.log('MISTRAL_API_KEY not found in .env.local');
    return;
  }
  
  console.log(`Testing key: ${key.substring(0, 4)}...${key.substring(key.length - 4)}`);
  
  try {
    const response = await fetch('https://api.mistral.ai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${key}`,
      },
    });

    console.log(`Status: ${response.status}`);
    const body = await response.text();
    console.log(`Body Length: ${body.length}`);
    if (response.status !== 200) {
      console.log(`Body: ${body}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

testMistral();
