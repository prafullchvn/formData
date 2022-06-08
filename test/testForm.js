const assert = require('assert');
const { Form } = require('../src/form');

const identity = x => x;

describe('form', () => {
  it('Should return prompt of current field.', () => {
    const form = new Form();
    form.addInputField('name', 'Enter name', () => true, x => x)

    assert.strictEqual(form.currentFieldPrompt(), 'Enter name');
  });

  it('Should register response for current field.', () => {
    const form = new Form();
    form.addInputField('name', 'Enter name', () => true, x => x)

    assert.ok(form.acceptResponse('abc'));
    assert.deepStrictEqual(
      form.getResponses(form, 'abc', x => x),
      { name: 'abc' }
    );
  });

  it('Should return true when form is finished.', () => {
    const form = new Form();
    form.addInputField('name', 'Enter name', () => true, x => x)
    form.acceptResponse('abc');
    assert.ok(form.isFormFinished());
  });

  it('Should return submitted responses in form of object.', () => {
    const form = new Form();
    form.addInputField('name', 'Enter name', () => true, x => x)
    form.acceptResponse('abc');
    assert.deepStrictEqual(form.getResponses(), { name: 'abc' });
  });
});
