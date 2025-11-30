#!/usr/bin/env node

// Litmus Test for Cloudflare Pages Environment Variables
// This runs BEFORE the build to check if dashboard variables are configured

console.log('🔍 Cloudflare Dashboard Environment Variable Litmus Test');
console.log('='.repeat(60));

const requiredVars = ['brevo_MCP_key', 'JWT_SECRET'];
const optionalVars = ['APPWRITE_PROJECT_ID', 'APPWRITE_ENDPOINT', 'APPWRITE_DATABASE_ID'];
const missingVars = [];
const foundVars = [];

// Check required variables
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    missingVars.push(varName);
  } else {
    foundVars.push({
      name: varName,
      length: value.length,
      preview: value.substring(0, 10) + '...'
    });
  }
});

// Check optional variables (for comparison)
optionalVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`📊 ${varName}: ${value ? '✅ FOUND' : '❌ MISSING'} ${value ? `(${value.length} chars)` : ''}`);
});

console.log('\n🎯 REQUIRED VARIABLES ANALYSIS:');
console.log('-'.repeat(40));

if (missingVars.length > 0) {
  console.error(`❌ MISSING DASHBOARD VARIABLES: ${missingVars.join(', ')}`);
  console.error('\n🔧 SOLUTION:');
  console.error('1. Go to: https://dash.cloudflare.com/pages/new-website/settings/production#variables');
  console.error('2. Add these as "Secret" type variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}: [your-actual-value]`);
  });
  console.error('\n⚠️  This is a CLOUDFLARE DASHBOARD configuration issue, NOT a build directory issue.');
  process.exit(1);
} else {
  console.log('✅ ALL REQUIRED VARIABLES FOUND:');
  foundVars.forEach(v => {
    console.log(`   ${v.name}: ✅ (${v.length} chars) - ${v.preview}`);
  });
  console.log('\n🎉 Cloudflare dashboard variables are properly configured!');
  console.log('✅ Proceeding with build...');
}
