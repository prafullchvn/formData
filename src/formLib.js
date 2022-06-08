const { Field } = require('./field.js');

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


const handleResponse = (form, response, callback, logger) => {
  const formattedChunk = response.replace('\n', '');
  const saved = form.acceptResponse(formattedChunk);

  if (!saved) {
    logger('You have entered invalid value.');
  }

  if (form.isFormFinished()) {
    callback('person.json', form.getResponses());
    return;
  }

  logger(form.currentFieldPrompt());
};

const createForm = (form) => {
  const nameField = new Field(
    'name',
    'Please enter your name:',
    validateName
  );
  const dobField = new Field('dob', 'Please enter your dateOfBirth:', validateDob);
  const hobbiesField = new Field(
    'hobbies',
    'Please enter hobbies:',
    isNotEmpty,
    formatHobbies
  );
  const phoneNoField = new Field(
    'ph_no',
    'Please enter phone number:',
    validatePhoneNo
  );
  form.addField(nameField);
  form.addField(dobField);
  form.addField(hobbiesField);
  form.addField(phoneNoField);
  // form.addInputField(
  //   'address',
  //   'Please enter address line 1:',
  //   isNotEmpty,
  //   formatAddress
  // );
};

module.exports = { createForm, handleResponse };
