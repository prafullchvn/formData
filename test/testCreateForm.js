const assert = require('assert');
const { createForm } = require('../src/formLib');

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
    // const nameField = new Field('name', 'enter name', () => true, x => x);
    // const expectedForm = new Form(nameField);
  });
});