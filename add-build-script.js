
const fs = require('fs');
const path = require('path');

// Read the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add the build:dev script if it doesn't exist
if (!packageJson.scripts['build:dev']) {
  packageJson.scripts['build:dev'] = 'vite build --mode development';
  console.log('Added build:dev script to package.json');
} else {
  console.log('build:dev script already exists in package.json');
}

// Write the updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('package.json updated successfully');
