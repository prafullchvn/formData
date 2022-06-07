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

const isNotEmpty = (value) => {
  return value !== '';
};

const validatePhoneNo = (phoneNo) => {
  return (
    isNumber(phoneNo) &&
    phoneNo.length === 10
  );
};

const formatHobbies = hobbies => {
  return hobbies.split(',');
};

const formatAddress = (address, presentAddress) => {
  const line1 = presentAddress || '';
  return (line1 + '\n' + address).trim();
};

const saveAsJson = (fileName, data) => {
  fs.writeFileSync(fileName, JSON.stringify(data), 'utf8');
  console.log('Thank YOU');
  process.exit();
};

const getInputHandler = (form) => {
  console.log(form.currentLabel());
  return (chunk) => {
    const formattedChunk = chunk.replace('\n', '');
    const saved = form.acceptInput(formattedChunk);

    if (!saved) {
      console.log('You have entered invalid value.');
    }

    if (form.isFormFinished()) {
      saveAsJson('person.json', form.getFormData());
    }

    console.log(form.currentLabel());
  };
};

const main = () => {
  const form = new Form();

  form.addInputField(
    'name',
    'Please enter your name:',
    validateName
  );
  form.addInputField('dob', 'Please enter your dateOfBirth:', validateDob);
  form.addInputField(
    'hobbies',
    'Please enter hobbies:',
    isNotEmpty,
    formatHobbies
  );
  form.addInputField('ph_no', 'Please enter phone number:', validatePhoneNo);
  form.addInputField(
    'address',
    'Please enter address line 1:',
    isNotEmpty,
    formatAddress
  );
  form.addInputField(
    'address',
    'Please enter address line 2:',
    isNotEmpty,
    formatAddress
  );

  const handleInput = getInputHandler(form);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', handleInput);
};

main();
