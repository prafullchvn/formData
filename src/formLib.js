
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
  // form.addInputField(
  //   'address',
  //   'Please enter address line 1:',
  //   isNotEmpty,
  //   formatAddress
  // );
};

module.exports = { createForm, handleResponse };
