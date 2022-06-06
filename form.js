class Form {
  constructor() {
    this.fields = [];
    this.formData = {};
    this.fieldIndex = 0;
  }

  addInputField(name, label, parser, validator, formatter = x => x) {
    const field = { name, label, parser, validator, formatter };
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
    if (field.validator(data)) {
      field.parser(this.formData, field.name, data);
      this.nextQuestion();
      return true;
    }
    return false;
  }

  promptOfCurrentField() {
    return this.fields[this.fieldIndex].label;
  }

  isFormFinished() {
    return this.fieldIndex >= this.fields.length;
  }

  getFormData() {
    return this.formData;
  }

  currentLabel() {
    return this.currentField().label;
  }
}

exports.Form = Form;
