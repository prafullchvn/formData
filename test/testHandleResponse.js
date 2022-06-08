const assert = require('assert');
const { registerResponse } = require('../src/formLib.js');
const { Form } = require('../src/form');
const { Field } = require('../src/field.js');
const { MultiValueField } = require('../src/multiValueField.js');

const identity = x => x;

describe('handleResponse', () => {
  it('Should return register response for one field.', () => {
    const nameField = new Field('name', 'Enter name', () => true, x => x)
    const form = new Form(nameField);

    let actualResponses = null;
    const callback = (fileName, responses) => actualResponses = responses;

    const response = 'abc';
    registerResponse(form, response, callback, identity);

    assert.deepStrictEqual(actualResponses, { name: 'abc' });
  });

  it('Should return register response for more than one field.', () => {
    const nameField = new Field('name', 'Enter name', () => true, x => x);
    const dobField = new Field('dob', 'Enter dob', () => true, x => x);
    const form = new Form(nameField, dobField);

    let actualResponses = null;
    const callback = (fileName, responses) => actualResponses = responses;

    registerResponse(form, 'abc', callback, identity);
    registerResponse(form, '2001', callback, identity);

    assert.deepStrictEqual(actualResponses, { name: 'abc', dob: '2001' });
  });

  it('Should print prompt for next field.', () => {
    const nameField = new Field('name', 'Enter name', () => true, x => x);
    const dobField = new Field('dob', 'Enter dob', () => true, x => x);
    const form = new Form(nameField, dobField);

    const expectedLog = ['Enter dob'];
    const actualLog = [];
    const logger = (log) => actualLog.push(log);

    let actualResponses = null;
    const callback = (fileName, responses) => actualResponses = responses;

    registerResponse(form, 'abc', callback, logger);
    registerResponse(form, '2001', callback, logger);

    assert.deepStrictEqual(actualResponses, { name: 'abc', dob: '2001' });
    assert.deepStrictEqual(actualLog, expectedLog);
  });

  it('Should print error message when name is invalid.', () => {
    const isMoreThan4 = x => x.length > 4
    const nameField = new Field('name', 'Enter name', isMoreThan4, identity);
    const dobField = new Field('dob', 'Enter dob', x => x, identity);
    const form = new Form(nameField, dobField);

    const expectedLog = ['You have entered invalid value.', 'Enter name'];
    const actualLog = [];
    const logger = (log) => actualLog.push(log);

    registerResponse(form, 'ab', identity, logger);

    assert.deepStrictEqual(actualLog, expectedLog);
  });

  it('Should give hobbies split by comma.', () => {
    const isMoreThan4 = x => x.length > 4
    const hobbiesField = new Field(
      'hobbies', 'Enter hobbies', x => x, x => x.split(',')
    );
    const form = new Form(hobbiesField);

    let actualResponses = null;
    const callback = (_, x) => actualResponses = x;
    registerResponse(form, 'running,walking', callback, identity);

    assert.deepStrictEqual(actualResponses, { hobbies: ['running', 'walking'] });
  });

  it('Should give two line of address separated by new line.', () => {
    const hobbiesField = new MultiValueField(
      'address', ['line1', 'line2'], () => true, x => x.join('\n')
    );
    const form = new Form(hobbiesField);

    let actualResponses = null;
    const callback = (_, x) => actualResponses = x;
    registerResponse(form, 'line1', callback, identity);
    registerResponse(form, 'line2', callback, identity);

    assert.deepStrictEqual(actualResponses, { address: 'line1\nline2' });
  });
});
