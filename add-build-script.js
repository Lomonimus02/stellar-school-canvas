
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');

fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading package.json:', err);
    return;
  }

  const packageJson = JSON.parse(data);

  if (!packageJson.scripts['build:dev']) {
    packageJson.scripts['build:dev'] = 'vite build --mode development';
    console.log('Added build:dev script');
  } else {
    console.log('build:dev script already exists');
  }

  fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing package.json:', err);
      return;
    }
    console.log('package.json successfully updated');
  });
});
