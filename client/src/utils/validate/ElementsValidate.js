let errors = [];
let newElement = {};

function isFieldsEmpty(element) {
  console.log("element", element);
  if (!element.description)
    errors.push("Por favor, selecione uma despesa.");
  if (element.date === Date || element.date instanceof Date)
    errors.push("O campo Data de recebimento deve ser preenchido.");
}

function validateFields(element) {
  newElement = element;
  isFieldsEmpty(element);
  return { newElement, errors };
}

exports.validateInputFormElement = (element) => {
  errors = [];
  newElement = {};
  return validateFields(element);
};
