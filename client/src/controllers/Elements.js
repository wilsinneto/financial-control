const { execute, headerGetOrDelete, headerSave } = require("../utils/Request");
const { captureHttpStatusCode, getMessage } = require("../utils/ResponseMessage");

let urlAPI = "http://localhost:3000/elements";

class ElementsController {
  constructor() {}
  async getPeriod(payload) {
    try {
      const response = await execute(
        urlAPI.concat(
          `/${payload.startDate}/${payload.endDate}`
        ), headerGetOrDelete("GET")
      );
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
  async update(element) {
    try {
      const response = await execute(urlAPI.concat(`/${element.id}`), headerSave("PUT", element));
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
  async remove(element) {
    try {
      const response = await execute(urlAPI.concat(`/${element.id}`), headerGetOrDelete("DELETE"));
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
  async create(element) {
    try {
      const response = await execute(urlAPI, headerSave("POST", element));
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

module.exports = ElementsController;
