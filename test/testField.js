const assert = require('assert');
const { Field } = require('../src/field');

describe('field', () => {
  it('Should return true if field is filled.', () => {
    const nameField = new Field('name', 'Enter name', () => true, x => x);
    nameField.fill('abc');
    assert.ok(nameField.isFilled());
  });

  it('Should return true on giving valid response.', () => {
    const nameField = new Field('name', 'name', x => x.length > 4, x => x);
    assert.ok(nameField.isValid('abcde'));
  });

  it('Should return parsed value.', () => {
    const nameField = new Field('name', 'name', x => true, x => x.split(','));
    nameField.fill('abc,def')
    assert.deepStrictEqual(
      nameField.parse(), { name: 'name', response: ['abc', 'def'] }
    );
  });

  it('Should return prompt of field.', () => {
    const nameField = new Field('name', 'prompt', x => true, x => x);
    assert.strictEqual(nameField.getPrompt(), 'prompt');
  });
});