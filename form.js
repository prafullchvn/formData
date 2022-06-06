class Form {
  constructor() {
    this.fields = [];
    this.formData = {};
    this.fieldIndex = 0;
  }

  addInputField(name, label, validator, formatter = x => x) {
    const field = { name, label, validator, formatter };
    this.fields.push(field);
  }

  currentField() {
    return this.fields[this.fieldIndex];
  }

  nextQuestion() {
    this.fieldIndex++;
    return this.fields[this.fieldIndex];
  }

  acceptInput(data) {
    const field = this.currentField()
    if (this.validator(data)) {
      this.formData[field.name] = field.formatter(data);
      return true;
    }
    return false;
  }

  promptOfCurrentField() {
    return this.fields[this.fieldIndex].label;
  }
}