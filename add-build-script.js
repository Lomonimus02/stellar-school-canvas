
const fs = require('fs');
const path = require('path');

// Путь к package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Чтение существующего package.json
fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка при чтении package.json:', err);
    return;
  }

  // Парсинг JSON
  const packageJson = JSON.parse(data);

  // Добавление скрипта build:dev если его еще нет
  if (!packageJson.scripts['build:dev']) {
    packageJson.scripts['build:dev'] = 'vite build --mode development';
    console.log('Добавлен скрипт build:dev');
  } else {
    console.log('Скрипт build:dev уже существует');
  }

  // Запись обновленного package.json
  fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Ошибка при записи package.json:', err);
      return;
    }
    console.log('package.json успешно обновлен');
  });
});
