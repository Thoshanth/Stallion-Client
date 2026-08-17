#!/usr/bin/env node

/**
 * Page Warming Script
 * This script visits all pages to trigger Next.js compilation and caching
 */

const http = require('http');
const https = require('https');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// List all pages that need to be pre-compiled
const pages = [
  // Public pages
  '/',
  '/about',
  '/contact',
  '/events', 
  '/branches',
  '/trainers',
  '/programs',
  '/pricing',
  '/faq',
  '/stallion-classic',
  '/stallion-extreme', 
  '/stallion-academy',
  
  // Admin pages  
  '/admin/login',
  '/admin',
  '/admin/trainers',
  '/admin/programs',
  '/admin/branches',
  '/admin/events',
  '/admin/reviews',
  '/admin/settings',
];

async function warmPage(path) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${path}`;
    const client = url.startsWith('https') ? https : http;
    
    console.log(`🔥 Warming: ${path}`);
    
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          console.log(`✅ ${path} - ${res.statusCode}`);
          resolve({ path, status: res.statusCode });
        } else {
          console.log(`⚠️  ${path} - ${res.statusCode}`);
          resolve({ path, status: res.statusCode, error: true });
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${path} - Error: ${err.message}`);
      resolve({ path, error: err.message });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`⏰ ${path} - Timeout`);
      resolve({ path, error: 'Timeout' });
    });
  });
}

async function warmAllPages() {
  console.log('🚀 Starting page warming...\n');
  
  const results = [];
  
  // Warm pages in batches to avoid overwhelming the server
  const batchSize = 5;
  for (let i = 0; i < pages.length; i += batchSize) {
    const batch = pages.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(warmPage));
    results.push(...batchResults);
    
    // Small delay between batches
    if (i + batchSize < pages.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Successfully warmed: ${results.filter(r => !r.error && r.status < 400).length}`);
  console.log(`⚠️  Warnings: ${results.filter(r => !r.error && r.status >= 400).length}`);
  console.log(`❌ Errors: ${results.filter(r => r.error).length}`);
  
  const errors = results.filter(r => r.error);
  if (errors.length > 0) {
    console.log('\n❌ Failed pages:');
    errors.forEach(e => console.log(`   ${e.path}: ${e.error || e.status}`));
  }
  
  console.log('\n🎉 Page warming complete!');
}

// Check if server is running
async function checkServer() {
  return new Promise((resolve) => {
    const client = BASE_URL.startsWith('https') ? https : http;
    const req = client.get(BASE_URL, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  console.log(`🌐 Checking server at ${BASE_URL}...`);
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Server is not running! Please start the server first:');
    console.log('   npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Server is running\n');
  await warmAllPages();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { warmAllPages, warmPage };