let error = "";
let recipe = "";

function isFieldsEmpty(recipe) {
  if (!recipe)
    error = "O campo Receita deve ser preenchido.";
}

function removeExtraSpace(recipe) {
  return recipe.replace(/\s+/g, " ");
}


function checkLengthName(recipe) {
  if (recipe.length < 2)
    error = "Receita deve conter no mínimo 2 caractres!";
  if(recipe.length > 100)
    error = "Receita deve conter no máximo 100 caractres!";
}


function validateFields(payload) {
  recipe = payload;
  isFieldsEmpty(recipe);
  if (!error.length) {
    recipe = removeExtraSpace(recipe);
    checkLengthName(recipe);
  }
  return { recipe, error };
}

exports.validateInputFormRecipes = (pyaload) => {
  error = "";
  recipe = "";
  return validateFields(pyaload.description);
};
