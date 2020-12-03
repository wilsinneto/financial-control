const { execute, headerGetOrDelete, headerSave } = require("../utils/Request");
const { captureHttpStatusCode, getMessage } = require("../utils/ResponseMessage");

let urlAPI = "http://localhost:3000/items";

class ItemsController {
  constructor() {}
  async update(item) {
    try {
      const response = await execute(urlAPI.concat(`/${item.id}`), headerSave("PUT", item));
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
  async remove(item) {
    try {
      const response = await execute(urlAPI.concat(`/${item.id}`), headerGetOrDelete("DELETE"));
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
  async create(item) {
    console.log("Controller - Items create");
    try {
      const response = await execute(urlAPI, headerSave("POST", item));
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

module.exports = ItemsController;
