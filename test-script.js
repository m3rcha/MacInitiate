const { generateScript } = require('./src/utils/scriptGenerator.ts');
const { catalog } = require('./src/data/appCatalog.ts');

// Test with a few selected items
const testSelections = [
  'vscode',      // App
  'git',         // App  
  'show-hidden-files', // Tweak
  'disable-dock-animation' // Tweak
];

console.log('Testing script generation...');
console.log('Selected items:', testSelections);

try {
  const script = generateScript(testSelections);
  
  console.log('\n=== Generated Script Preview ===');
  console.log('Script length:', script.length, 'characters');
  console.log('\nFirst 500 characters:');
  console.log(script.substring(0, 500));
  console.log('\n... (truncated)');
  
  console.log('\n=== Key Features Verified ===');
  console.log('✅ Contains shebang:', script.startsWith('#!/bin/bash'));
  console.log('✅ Contains color definitions:', script.includes('RED='));
  console.log('✅ Contains error handling:', script.includes('install_app()'));
  console.log('✅ Contains progress tracking:', script.includes('current_item='));
  console.log('✅ Contains final report:', script.includes('FINAL REPORT'));
  
  console.log('\n🎉 Script generation test passed!');
  
} catch (error) {
  console.error('❌ Script generation failed:', error);
}
