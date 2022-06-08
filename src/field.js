class Field {
  #name;
  #prompt;
  #validator;
  #parser;
  #response;

  constructor(name, prompt, validator, parser) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = null;
  }

  isFilled() {
    return this.#response !== null;
  }

  fill(response) {
    return this.#response = response;
  }

  isValid(response) {
    return this.#validator(response);
  }

  parse() {
    return { name: this.#name, response: this.#response };
  }

  getPrompt() {
    return this.#prompt;
  }
}

module.exports = { Field };
