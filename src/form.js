class Form {
  #fields;
  #fieldIndex;
  constructor(...fields) {
    this.#fields = fields;
    this.#fieldIndex = 0;
  }

  addField(field) {
    this.#fields.push(field);
  }

  #currentField() {
    return this.#fields[this.#fieldIndex];
  }

  fillField(response) {
    const field = this.#currentField();
    if (!field.isValid(response)) {
      throw new Error('Invalid input.');
    }
    field.fill(response);
    if (field.isFilled()) {
      this.#fieldIndex++;
    }
    return false;
  }

  isFormFinished() {
    return this.#fields.every(field => field.isFilled());
  }

  getResponses() {
    const responses = {};
    this.#fields.forEach(field => {
      const { name, response } = field.parse();
      responses[name] = response;
    });
    return responses;
  }

  currentFieldPrompt() {
    return this.#currentField().getPrompt();
  }
}

exports.Form = Form;
