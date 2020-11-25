const { execute, headerGetOrDelete, headerSave } = require("../utils/Request");
const { captureHttpStatusCode, getMessage } = require("../utils/ResponseMessage");

let urlAPI = "http://localhost:3000/recipes";

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
