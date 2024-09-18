const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(new Error('Cannot load the database'));
      }
      const lines = data.split('\n').filter(line => line);
      const studentsByField = {};
      lines.slice(1).forEach(line => {
        const [firstname, , , field] = line.split(',');
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstname);
      });
      resolve(studentsByField);
    });
  });
}

module.exports = readDatabase;
