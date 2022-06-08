class MultiValueField {
  #name;
  #prompts;
  #validator;
  #parser;
  #responses;

  constructor(name, prompts, validator, parser = x => x) {
    this.#name = name;
    this.#prompts = prompts;
    this.#validator = validator;
    this.#parser = parser;
    this.#responses = [];
  }

  isFilled() {
    return this.#responses.length === this.#prompts.length;
  }

  fill(response) {
    return this.#responses.push(response);
  }

  isValid(response) {
    return this.#validator(response);
  }

  parse() {
    return { name: this.#name, response: this.#parser(this.#responses) };
  }

  getPrompt() {
    return this.#prompts[this.#responses.length];
  }
}

module.exports = { MultiValueField };
