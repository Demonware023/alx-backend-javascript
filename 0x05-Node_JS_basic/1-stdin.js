// Display welcome message and ask for the user's name
console.log("Welcome to Holberton School, what is your name?");

// Capture the user's input from stdin
process.stdin.on('data', (data) => {
  // Trim any extra whitespace from input
  const name = data.toString().trim();
  
  // Display the user's name
  console.log(`Your name is: ${name}`);

  // Close the program after receiving the input
  process.exit();
});

// When the program is about to close, display the closing message
process.on('exit', () => {
  console.log('This important software is now closing');
});
