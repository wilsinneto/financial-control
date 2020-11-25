let error = "";
let expense = "";

function isFieldsEmpty(expense) {
  if (!expense)
    error = "O campo Despesa deve ser preenchido.";
}

function removeExtraSpace(expense) {
  return expense.replace(/\s+/g, " ");
}


function checkLengthName(expense) {
  if (expense.length < 2)
    error = "Despesa deve conter no mínimo 2 caractres!";
  if(expense.length > 100)
    error = "Despesa deve conter no máximo 100 caractres!";
}


function validateFields(payload) {
  expense = payload;
  isFieldsEmpty(expense);
  if (!error.length) {
    expense = removeExtraSpace(expense);
    checkLengthName(expense);
  }
  return { expense, error };
}

exports.validateInputFormExpenses = (pyaload) => {
  error = "";
  expense = "";
  return validateFields(pyaload.description);
};
