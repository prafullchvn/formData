const { Form } = require('./form.js');
const { Field } = require('./field.js');
const { MultiValueField } = require('./multiValueField.js');

const isLengthMoreThan4 = (name) => {
  return name.length > 4;
};

const isNumber = value => {
  return !isNaN(+value);
}

const validateDob = (dobAsString) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dobAsString);
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

const registerResponse = (form, response, callback, logger) => {
  try {
    form.fillField(response);
  } catch (error) {
    logger('You have entered invalid value.');
  }
  if (form.isFormFinished()) {
    callback('person.json', form.getResponses());
    return;
  }

  logger(form.currentFieldPrompt());
};

const createForm = () => {
  const form = new Form();

  const nameField = new Field(
    'name',
    'Please enter your name:',
    isLengthMoreThan4
  );
  const dobField = new Field('dob', 'Please enter your dateOfBirth:', validateDob);
  const hobbiesField = new Field(
    'hobbies',
    'Please enter your hobbies:',
    isNotEmpty,
    formatHobbies
  );
  const phoneNoField = new Field(
    'ph_no',
    'Please enter phone number:',
    validatePhoneNo
  );

  const addressField = new MultiValueField(
    'address',
    ['Enter line 1 of address:', 'Enter line 2 of address:'],
    isNotEmpty,
    (hobbies) => hobbies.join('\n')
  );

  form.addField(nameField);
  form.addField(dobField);
  form.addField(hobbiesField);
  form.addField(phoneNoField);
  form.addField(addressField);

  return form;
};

module.exports = { createForm, registerResponse };
