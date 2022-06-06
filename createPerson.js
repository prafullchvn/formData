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

const saveAsJSON = (fileName, data) => {
  fs.writeFileSync(
    fileName, JSON.stringify(data), 'utf8'
  );
  console.log('Thank YOU');
  process.exit();
};

const getInputHandler = (form) => {
  console.log(form.currentLabel());
  return (chunk) => {
    const isSaved = form.acceptInput(chunk.replace('\n', ''));

    if (!isSaved) {
      console.log('You have entered invalid value.');
    }

    if (form.isFormFinished()) {
      saveAsJSON('person.json', form.getFormData());
    }

    console.log(form.currentLabel());
  };
};

const parseField = (formData, name, value) => {
  return formData[name] = value;
};

const parseAddress = (formData, name, value) => {
  let firstLine = formData[name] || '';
  firstLine = firstLine || firstLine + ',';
  return formData[name] = firstLine + value;
};

const main = () => {
  const form = new Form();

  form.addInputField(
    'name',
    'Please enter your name:',
    parseField,
    validateName
  );
  form.addInputField(
    'dob',
    'Please enter your dateOfBirth:',
    parseField,
    validateDob
  );
  form.addInputField(
    'hobbies',
    'Please enter hobbies:',
    parseField,
    isNotEmpty,
    formatHobbies
  );
  form.addInputField(
    'ph_no',
    'Please enter phone number:',
    parseField,
    validatePhoneNo
  );
  form.addInputField(
    'address',
    'Please enter address line 1:',
    parseAddress,
    isNotEmpty
  );
  form.addInputField(
    'address',
    'Please enter address line 2:',
    parseAddress,
    isNotEmpty
  );

  const handleInput = getInputHandler(form);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', handleInput);
};

main();
