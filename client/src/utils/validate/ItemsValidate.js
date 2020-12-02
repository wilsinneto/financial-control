let error = "";
let item = "";

function isFieldsEmpty(payload) {
  if (!payload)
    error = "O campo a baixo deve ser preenchido.";
}

const removeExtraSpace = (payload) => payload.replace(/\s\s+/g, " ");

function checkLengthName(payload) {
  if (payload.length < 2)
    error = "O campo a baixo deve conter no mínimo 2 caractres!";
  if(payload.length > 100)
    error = "O campo a baixo deve conter no máximo 100 caractres!";
}

function validateFields(payload) {
  isFieldsEmpty(payload);
  if (!error.length) {
    item = removeExtraSpace(payload);
    checkLengthName(payload);
  }
  return { item, error };
}

exports.validateInputFormItems = (pyaload) => {
  error = "";
  item = "";
  return validateFields(pyaload);
};
