class Form {
  #fields;
  #formData;
  #fieldIndex;
  constructor() {
    this.#fields = [];
    this.#formData = {};
    this.#fieldIndex = 0;
  }

  addInputField(name, label, validator, formatter = x => x) {
    const field = { name, label, validator, formatter };
    this.#fields.push(field);
  }

  #currentField() {
    return this.#fields[this.#fieldIndex];
  }

  #nextField() {
    this.#fieldIndex++;
    return this.#fields[this.#fieldIndex];
  }

  acceptResponse(data) {
    const field = this.#currentField()
    if (field.validator(data)) {
      const presentValue = this.#formData[field.name];
      this.#formData[field.name] = field.formatter(data, presentValue);
      this.#nextField();
      return true;
    }
    return false;
  }

  isFormFinished() {
    return this.#fieldIndex >= this.#fields.length;
  }

  getResponses() {
    return this.#formData;
  }

  currentFieldPrompt() {
    return this.#currentField().label;
  }
}

exports.Form = Form;
