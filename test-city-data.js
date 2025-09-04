const fs = require('fs');

// Read the city data file
const cityDataFile = fs.readFileSync('./src/lib/cityDataWithTimezone.ts', 'utf8');

// Extract the countries data (this is a simplified approach for testing)
const countriesDataMatch = cityDataFile.match(/export const countriesData: CountryData\[\] = \[([\s\S]*?)\];/);
if (!countriesDataMatch) {
  console.log('Could not find countriesData in the file');
  process.exit(1);
}

// This is a very simplified parser for testing purposes
// In a real test, we would import the actual data
console.log('Testing city data lookup...');

// Test case: Belgium and Brussels
console.log('Testing Belgium/Brussels...');
const hasBelgium = cityDataFile.includes('"name": "Belgium"') || cityDataFile.includes('name: "Belgium"');
const hasBrussels = cityDataFile.includes('"name": "Brussels"') || cityDataFile.includes('name: "Brussels"');

console.log('Belgium found:', hasBelgium);
console.log('Brussels found:', hasBrussels);

if (hasBelgium && hasBrussels) {
  console.log('✓ Test passed: Belgium and Brussels are present in the data');
} else {
  console.log('✗ Test failed: Missing Belgium or Brussels in the data');
}

// Test case: Check for duplicates
console.log('\nChecking for duplicate countries...');
const belgiumCount = (cityDataFile.match(/name.*Belgium/g) || []).length;
console.log('Number of Belgium entries:', belgiumCount);

if (belgiumCount === 1) {
  console.log('✓ Test passed: No duplicate Belgium entries found');
} else if (belgiumCount > 1) {
  console.log('✗ Test failed: Found duplicate Belgium entries');
} else {
  console.log('✗ Test failed: Belgium not found');
}