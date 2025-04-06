const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run the algorithm tests
function runAlgorithmTests() {
  console.log('Running algorithm tests...');
  
  // Create a temporary test runner file
  const testRunnerPath = path.join(__dirname, 'test-runner.js');
  const testRunnerContent = `
    // Import and run the algorithm tests
    require('./algorithm-tests.ts');
  `;
  
  fs.writeFileSync(testRunnerPath, testRunnerContent);
  
  // Execute the test runner with ts-node
  exec('npx ts-node ' + testRunnerPath, (error, stdout, stderr) => {
    if (error) {
      console.error('Error running tests:', error);
      console.error(stderr);
      return;
    }
    
    console.log('Test results:');
    console.log(stdout);
    
    // Clean up the temporary test runner file
    fs.unlinkSync(testRunnerPath);
  });
}

// Run the tests
runAlgorithmTests();
