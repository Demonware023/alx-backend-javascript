const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const fields = {};
      let totalStudents = 0;

      lines.slice(1).forEach((line) => {
        if (line) {
          totalStudents += 1;
          const student = line.split(',');
          const field = student[3];
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(student[0]);
        }
      });

      let result = `Number of students: ${totalStudents}\n`;
      for (const [field, students] of Object.entries(fields)) {
        result += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }
      resolve(result.trim());
    });
  });
}

module.exports = countStudents;
