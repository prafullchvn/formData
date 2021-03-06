class Field {
  #name;
  #prompt;
  #validator;
  #parser;
  #response;

  constructor(name, prompt, validator, parser = x => x) {
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
    this.#response = response;
  }

  isValid(response) {
    return this.#validator(response);
  }

  parse() {
    return { name: this.#name, response: this.#parser(this.#response) };
  }

  getPrompt() {
    return this.#prompt;
  }
}

module.exports = { Field };
