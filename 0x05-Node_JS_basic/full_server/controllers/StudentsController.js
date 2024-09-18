const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const databaseFile = process.argv[2];

    readDatabase(databaseFile)
      .then((students) => {
        let output = 'This is the list of our students\n';
        const fields = Object.keys(students).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        fields.forEach((field) => {
          const studentList = students[field].join(', ');
          output += `Number of students in ${field}: ${students[field].length}. List: ${studentList}\n`;
        });
        res.status(200).send(output.trim());
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const databaseFile = process.argv[2];
    const major = req.params.major;

    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    readDatabase(databaseFile)
      .then((students) => {
        if (students[major]) {
          const studentList = students[major].join(', ');
          res.status(200).send(`List: ${studentList}`);
        } else {
          res.status(200).send('List: ');
        }
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
