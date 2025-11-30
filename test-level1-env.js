// Level 1: Environment Variable Detection Test
console.log('🔍 LEVEL 1: Environment Variable Detection');
console.log('='.repeat(50));

// Test if process.env exists and has any variables
const envKeys = Object.keys(process.env);
console.log(`📊 Total environment variables found: ${envKeys.length}`);

// Show first 5 environment variables (for debugging)
console.log('📋 Sample environment variables:');
envKeys.slice(0, 5).forEach(key => {
  const value = process.env[key];
  console.log(`  ${key}: ${value ? 'EXISTS' : 'EMPTY'}`);
});

// Test our specific target variables
const targetVars = ['brevo_MCP_key', 'JWT_SECRET'];
console.log('\n🎯 Target Variables:');
targetVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`  ${varName}: ${value ? `EXISTS (${value.length} chars)` : 'MISSING/EMPTY'}`);
});

console.log('\n✅ Level 1 Complete - Moving to Level 2');
