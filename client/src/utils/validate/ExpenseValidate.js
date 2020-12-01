let error = "";
let expense = "";

function isFieldsEmpty(payload) {
  if (!payload)
    error = "O campo Despesa deve ser preenchido.";
}

const removeExtraSpace = (payload) => payload.replace(/\s\s+/g, " ");

function checkLengthName(payload) {
  if (payload.length < 2)
    error = "Despesa deve conter no mínimo 2 caractres!";
  if(payload.length > 100)
    error = "Despesa deve conter no máximo 100 caractres!";
}

function validateFields(payload) {
  isFieldsEmpty(payload);
  if (!error.length) {
    expense = removeExtraSpace(payload);
    checkLengthName(payload);
  }
  return { expense, error };
}

exports.validateInputFormExpenses = (pyaload) => {
  error = "";
  expense = "";
  return validateFields(pyaload);
};
