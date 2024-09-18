const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      // Split the data into lines and filter out empty lines
      const lines = data.split('\n').filter((line) => line.trim() !== '');

      // If there's no valid data, return
      if (lines.length <= 1) {
        throw new Error('Cannot load the database');
      }

      // Remove the header line
      const header = lines.shift();

      // Initialize a map to store students by field
      const studentsByField = {};

      // Process each line to count students and group by field
      lines.forEach((line) => {
        const [firstname, lastname, age, field] = line.split(',');

        if (firstname && field) {
          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstname);
        }
      });

      // Log the total number of students
      const totalStudents = lines.length;
      console.log(`Number of students: ${totalStudents}`);

      // Log the number of students per field and the list of first names
      for (const [field, students] of Object.entries(studentsByField)) {
        console.log(
          `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`
        );
      }
    })
    .catch((err) => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
