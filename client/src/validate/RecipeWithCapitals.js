let errors = [];
let recipe = {};

function isFieldsEmpty(recipe) {
  if (!recipe.description)
    errors.push("Por favor, selecione uma receita.");
  if (recipe.date === Date)
    errors.push("O campo Data de recebimento deve ser preenchido.");
}

function validateFields(payload) {
  recipe = payload;
  isFieldsEmpty(recipe);
  return { recipe, errors };
}

exports.validateInputFormCapitals = (payload) => {
  errors = [];
  recipe = {};
  return validateFields(payload);
};
