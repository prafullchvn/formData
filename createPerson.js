const fs = require('fs');
const { Form } = require('./form.js');

const validateName = (name) => {
  return name.length > 4;
};

const isNumber = value => {
  return !isNaN(+value);
}

const validateDob = (dobAsString) => {
  const dob = dobAsString.split('-');
  return (
    dob.length === 3 &&
    dob.every(partOfDob => isNumber(partOfDob))
  );
};

const validateHobbies = (hobbies) => {
  return hobbies !== '';
};

const formatHobbies = hobbies => {
  return hobbies.split(',');
};

const dataAccepter = (form) => {
  return (chunk) => {
    const isSaved = form.acceptInput(chunk.replace('\n', ''));

    if (!isSaved) {
      console.log('You have entered invalid value.');
    }

    if (form.isFormFinished()) {
      fs.writeFileSync(
        'person.json', JSON.stringify(form.getFormData()), 'utf8'
      );
      console.log('Thank YOU');
      process.exit();
    }

    console.log(form.currentLabel());
  };
};

const main = () => {
  const form = new Form();

  form.addInputField('name', 'Please enter your name:', validateName);
  form.addInputField('dob', 'Please enter your dateOfBirth:', validateDob);
  form.addInputField(
    'hobbies', 'Please enter hobbies:', validateHobbies, formatHobbies
  );
  console.log(form.currentLabel());

  const acceptData = dataAccepter(form);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', acceptData);
};

main();
