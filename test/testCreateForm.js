const assert = require('assert');
const { createForm } = require('../src/userDetailsForm.js');

describe('createForm', () => {
  it('Should check prompts of all given fields.', () => {
    const form = createForm();
    assert.equal(form.currentFieldPrompt(), 'Please enter your name:');
    form.fillField('Johny');
    assert.equal(form.currentFieldPrompt(), 'Please enter your dateOfBirth:');
    form.fillField('2022-05-31');
    assert.equal(form.currentFieldPrompt(), 'Please enter your hobbies:');
    form.fillField('hobby1, hobby2');
    assert.equal(form.currentFieldPrompt(), 'Please enter phone number:');
    form.fillField('1234567890');
    assert.equal(form.currentFieldPrompt(), 'Enter line 1 of address:');
    form.fillField('line1');
    assert.equal(form.currentFieldPrompt(), 'Enter line 2 of address:');
    form.fillField('line2');
  });

  it('Should throw error when name is less than 5 characters.', () => {
    const form = createForm();
    assert.throws(() => form.fillField('Joh'), {
      message: 'Invalid input.'
    });
  });

  it('Should throw error when dob is invalid.', () => {
    const form = createForm();
    form.fillField('ramesh');
    assert.throws(() => form.fillField('2001-a-23'), {
      message: 'Invalid input.'
    });
    assert.throws(() => form.fillField(''), {
      message: 'Invalid input.'
    });
    assert.throws(() => form.fillField(''), {
      message: 'Invalid input.'
    });
  });

  it('Should throw error when hobbies are empty.', () => {
    const form = createForm();
    form.fillField('ramesh');
    form.fillField('2001-05-31');

    assert.throws(() => form.fillField(''), {
      message: 'Invalid input.'
    });

  });

  it('Should throw error when mobile number invalid.', () => {
    const form = createForm();
    form.fillField('ramesh');
    form.fillField('2001-05-31');
    form.fillField('running');

    assert.throws(() => form.fillField('1234'), {
      message: 'Invalid input.'
    });

    assert.throws(() => form.fillField('1234567a90'), {
      message: 'Invalid input.'
    });

  });

  it('Should throw error when mobile number invalid.', () => {
    const form = createForm();
    form.fillField('ramesh');
    form.fillField('2001-05-31');
    form.fillField('running');
    form.fillField('1324567890');

    assert.throws(() => form.fillField(''), {
      message: 'Invalid input.'
    });
  });

  it('Should throw error when mobile number invalid.', () => {
    const form = createForm();
    form.fillField('ramesh');
    form.fillField('2001-05-31');
    form.fillField('running');
    form.fillField('1324567890');
    form.fillField('line1 of address');

    assert.throws(() => form.fillField(''), {
      message: 'Invalid input.'
    });
  });
});