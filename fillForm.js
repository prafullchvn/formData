const fs = require('fs');
const { Form } = require('./src/form.js');
const { createForm, handleResponse } = require('./src/formLib.js');

const saveAsJson = (fileName, data) => {
  fs.writeFileSync(fileName, JSON.stringify(data), 'utf8');
  console.log('Thank YOU');
  process.exit();
};

const main = () => {
  const form = new Form();
  createForm(form);

  console.log(form.currentFieldPrompt());
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => handleResponse(form, chunk, saveAsJson, console.log));
};

main();