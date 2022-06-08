const assert = require('assert');
const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');

const identity = x => x;

describe('form', () => {
  it('Should return prompt of current field.', () => {
    const nameField = new Field('name', 'Enter name', () => true, x => x);
    const form = new Form(nameField);

    assert.strictEqual(form.currentFieldPrompt(), 'Enter name');
  });

  it('Should register response for current field.', () => {
    const nameField = new Field('name', 'Enter name', () => true, x => x)
    const form = new Form(nameField);

    assert.ok(form.acceptResponse('abc'));
    assert.deepStrictEqual(
      form.getResponses(form, 'abc', x => x),
      { name: 'abc' }
    );
  });

  it('Should return true when form is finished.', () => {
    const nameField = new Field('name', 'Enter name', () => true, x => x)
    const form = new Form(nameField);

    form.acceptResponse('abc');
    assert.ok(form.isFormFinished());
  });

  it('Should return submitted responses in form of object.', () => {
    const nameField = new Field('name', 'Enter name', () => true, x => x)
    const form = new Form(nameField);
    form.acceptResponse('abc');
    assert.deepStrictEqual(form.getResponses(), { name: 'abc' });
  });
});
