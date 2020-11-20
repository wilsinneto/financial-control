let errors = [];
let recipe = {};

function isFieldsEmpty(recipe) {
  if (!recipe)
    errors.push("O campo Receita deve ser preenchido.");
}

function removeExtraSpace(recipe) {
  recipe.replace(/\s+/g, " ");
}


function checkLengthName(recipe) {
  if (recipe.length < 2)
    errors.push("Recita deve conter no mínimo 2 caractres!");
  if(recipe.length > 100)
    errors.push("Recita deve conter no máximo 100 caractres!");
}


function validateFields(payload) {
  recipe = payload;
  isFieldsEmpty(recipe);
  if (!errors.length) {
    removeExtraSpace(recipe);
    checkLengthName(recipe);
  }
  return { recipe, errors };
}

exports.validateInputForm = (pyaload) => {
  errors = [];
  recipe = {};
  return validateFields(pyaload);
};
