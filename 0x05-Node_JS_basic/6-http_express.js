const express = require('express');

// Create an instance of the Express application
const app = express();

// Define a route for the root path "/"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Express server is listening on port 1245');
});

// Export the app for external use if necessary
module.exports = app;
