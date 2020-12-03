let error = "";
let newItem = "";

function isFieldsEmpty(item) {
  if (!item)
    error = "O campo a baixo deve ser preenchido.";
}

const removeExtraSpace = (item) => item.replace(/\s\s+/g, " ");

function checkLengthName(item) {
  if (item.length < 2)
    error = "O campo a baixo deve conter no mínimo 2 caractres!";
  if(item.length > 100)
    error = "O campo a baixo deve conter no máximo 100 caractres!";
}

function validateFields(item) {
  isFieldsEmpty(item);
  if (!error.length) {
    newItem = removeExtraSpace(item);
    checkLengthName(item);
  }
  return { newItem, error };
}

exports.validateInputFormItems = (item) => {
  error = "";
  newItem = "";
  return validateFields(item);
};
