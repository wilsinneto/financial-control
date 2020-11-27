let error = "";
let recipe = "";

function isFieldsEmpty(payload) {
  if (!payload)
    error = "O campo Receita deve ser preenchido.";
}

function removeExtraSpace(payload) {
  return payload.replace(/\s+/g, " ");
}

function checkLengthName(payload) {
  if (payload.length < 2)
    error = "Receita deve conter no mínimo 2 caractres!";
  if(payload.length > 100)
    error = "Receita deve conter no máximo 100 caractres!";
}

function validateFields(payload) {
  isFieldsEmpty(payload);
  if (!error.length) {
    recipe = removeExtraSpace(payload);
    checkLengthName(recipe);
  }
  return { recipe, error };
}

exports.validateInputFormRecipes = (pyaload) => {
  error = "";
  recipe = "";
  return validateFields(pyaload.description);
};
