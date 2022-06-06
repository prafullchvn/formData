const fs = require('fs');

const person = (name, dob, hobbiesAsString) => {
  const hobbies = hobbiesAsString.split(',');

  return {
    name,
    dob,
    hobbies
  };
}

const getPrompt = (index) => {
  const prompts = [
    'Please enter your name:',
    'Please enter your date of birth (yyyy-mm-dd):',
    'Please enter your hobbies:'
  ];

  return prompts[index];
}

const dataCollector = () => {
  let promptIndex = 1;
  const formData = [];
  return (chunk) => {
    formData.push(chunk.replace('\n', ''));
    console.log(getPrompt(promptIndex));
    promptIndex++;

    if (formData.length === 3) {
      const personObj = person(...formData);
      fs.writeFileSync('person.json', JSON.stringify(personObj), 'utf8');
      process.exit();
    }
  };
};

const main = () => {
  console.log(getPrompt(0));

  const getData = dataCollector();

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', getData);
  process.stdin.on('end', () => console.log('Thank You'));
};

main();
