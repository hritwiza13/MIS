const fs = require('fs');
const indexPath = './build/index.html';

fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  const result = data.replace(/\/MIS\/ \//g, '/MIS/');

  fs.writeFile(indexPath, result, 'utf8', (err) => {
    if (err) {
      console.error('Error writing index.html:', err);
      return;
    }
    console.log('Successfully corrected paths in index.html');
  });
}); 