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

const savePersonDetails = (details) => {
  const personObj = person(...details);
  fs.writeFileSync('person.json', JSON.stringify(personObj), 'utf8');
  console.log('Thank you');
  process.exit();
}

const dataCollector = () => {
  let promptIndex = 1;
  const formData = [];

  return (chunk) => {
    formData.push(chunk.replace('\n', ''));

    if (formData.length === 3) {
      savePersonDetails(formData);
    }

    process.stdout.write(getPrompt(promptIndex));
    promptIndex++;
  };

};

const main = () => {
  const createPerson = dataCollector();

  process.stdout.write(getPrompt(0));
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', createPerson);
};

main();
