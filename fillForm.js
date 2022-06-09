const fs = require('fs');
const { createForm, registerResponse } = require('./src/userDetailsForm.js');

const saveAsJson = (fileName, data) => {
  fs.writeFileSync(fileName, JSON.stringify(data), 'utf8');
  console.log('Thank YOU');
  process.exit();
};

const main = () => {
  const form = createForm();

  console.log(form.currentFieldPrompt());
  process.stdin.setEncoding('utf8');
  process.stdin.on('data',
    (chunk) => {
      const inputs = chunk.trim().split('\n');
      inputs.forEach(
        input => registerResponse(form, input, saveAsJson, console.log)
      );
    }
  );
};

main();
