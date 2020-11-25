let errors = [];
let expense = {};

function isFieldsEmpty(expense) {
  if (!expense.description)
    errors.push("Por favor, selecione uma despesa.");
  if (expense.date === Date || expense.date instanceof Date)
    errors.push("O campo Data de recebimento deve ser preenchido.");
}

function validateFields(payload) {
  expense = payload;
  isFieldsEmpty(expense);
  return { expense, errors };
}

exports.validateInputFormSpend = (payload) => {
  errors = [];
  expense = {};
  return validateFields(payload);
};
