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
  cache: "default",
  body: JSON.stringify(recipe)
});

const captureHttpStatusCode = (string) => string.match(/(\d+)/);
const getMessage = (status) => 
  ({
    404: "Receita não encontrado.",
    409: "Receita já existe.",
    500: "Error Interno",
  }[status] || "");

class RecipesController {
  constructor() {}

  async update(payload) {
    try {
      const response = await execute(urlAPI.concat(`/${payload.id}`), headerSave("PUT", payload));
      console.log("response.error", response.error);
      if (response.error) {
        const [matches] = captureHttpStatusCode(response.message);
        return { error: getMessage(matches) };
      }
      return response;
    } catch (error) {
      const [matches] = captureHttpStatusCode(error.message);
      return { error: getMessage(matches) };
    }
  }
  async remove(payload) {
    try {
      const response = await execute(urlAPI.concat(`/${payload.id}`), headerGetOrDelete("DELETE"));
      if (response.error) {
        const [matches] = captureHttpStatusCode(response.message);
        return { error: getMessage(matches) };
      }
      return response;
    } catch (error) {
      const [matches] = captureHttpStatusCode(error.message);
      return { error: getMessage(matches) };
    }
  }
  async getAll() {
    try {
      const response = await execute(urlAPI, headerGetOrDelete("GET"));
      if (response.error) {
        const [matches] = captureHttpStatusCode(response.message);
        return { error: getMessage(matches) };
      }
      return response;
    } catch (error) {
      const [matches] = captureHttpStatusCode(error.message);
      return { error: getMessage(matches) };
    }
  }
  async create(payload) {
    console.log("payload", payload);
    try {
      const response = await execute(urlAPI, headerSave("POST", payload));
      if (response.error) {
        const [matches] = captureHttpStatusCode(response.message);
        return { error: getMessage(matches) };
      }
      return response;
    } catch (error) {
      const [matches] = captureHttpStatusCode(error.message);
      return { error: getMessage(matches) };
    }
  }
}

module.exports = RecipesController;
