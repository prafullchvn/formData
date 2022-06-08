const assert = require('assert');
const { handleResponse } = require('../src/formLib.js');
const { Form } = require('../src/form');

const identity = x => x;

describe('handleResponse', () => {
  it('Should return register response for one field.', () => {
    const form = new Form();
    form.addInputField('name', 'Enter name', () => true, x => x);

    let actualResponses = null;
    const callback = (fileName, responses) => actualResponses = responses;

    const response = 'abc';
    handleResponse(form, response, callback, identity);

    assert.deepStrictEqual(actualResponses, { name: 'abc' });
  });

  it('Should return register response for more than one field.', () => {
    const form = new Form();
    form.addInputField('name', 'Enter name', () => true, x => x);
    form.addInputField('dob', 'Enter dob', () => true, x => x);

    let actualResponses = null;
    const callback = (fileName, responses) => actualResponses = responses;

    handleResponse(form, 'abc', callback, identity);
    handleResponse(form, '2001', callback, identity);

    assert.deepStrictEqual(actualResponses, { name: 'abc', dob: '2001' });
  });

  it('Should print prompt for next field.', () => {
    const form = new Form();
    form.addInputField('name', 'Enter name', () => true, x => x);
    form.addInputField('dob', 'Enter dob', () => true, x => x);

    const expectedLog = ['Enter dob'];
    const actualLog = [];
    const logger = (log) => actualLog.push(log);

    let actualResponses = null;
    const callback = (fileName, responses) => actualResponses = responses;

    handleResponse(form, 'abc', callback, logger);
    handleResponse(form, '2001', callback, logger);

    assert.deepStrictEqual(actualResponses, { name: 'abc', dob: '2001' });
    assert.deepStrictEqual(actualLog, expectedLog);
  });

  it('Should print error message when name is invalid.', () => {
    const form = new Form();
    form.addInputField('name', 'Enter name', x => x.length > 4, x => x);
    form.addInputField('dob', 'Enter dob', x => x.length > 4, x => x);

    const expectedLog = ['You have entered invalid value.', 'Enter name'];
    const actualLog = [];
    const logger = (log) => actualLog.push(log);

    handleResponse(form, 'ab', identity, logger);

    assert.deepStrictEqual(actualLog, expectedLog);
  });
});
