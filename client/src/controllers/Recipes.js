const { execute } = require("../services/Request");

let urlAPI = "http://localhost:3000/recipes";
const headerGetOrDelete = (method) => ({
  method,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'
  },
  mode: "cors",
  cache: "default",
});
const headerSave = (method, recipe) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: "cors",
  cache: "no-cache",
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify(recipe),
});


class RecipesController {
  constructor() {}

  async update(payload) {
    try {
      const response = await execute(urlAPI.concat(`/${payload.id}`), headerSave("PUT", payload));
      if (response.error) return { error: response.error };
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }
  async remove(recipe) {
    try {
      const recipeRemove = await execute(urlAPI.concat(`/${recipe.id}`), headerGetOrDelete("DELETE"));
      if (recipeRemove.error) return { error: recipeRemove.error };
      return recipeRemove;
    } catch (error) {
      return { error: error.message };
    }
  }
  async getAll() {
    try {
      const recipes = await execute(urlAPI, headerGetOrDelete("GET"));
      if (recipes.error) return { error: recipes.error };
      return recipes;
    } catch (error) {
      return { error: error.message };
    }
  }
  async create(payload) {
    // console.log("payload", payload);
    // console.log("payload.description", payload.description);
    try {
      const newRecipe = await execute(urlAPI, headerSave("POST", payload));
      if (newRecipe.error) return { error: newRecipe.error };
      return newRecipe;
    } catch (error) {
      console.log("catch (create) - error.message", error.message);
      return error.message;
    }
  }
}

module.exports = RecipesController;
