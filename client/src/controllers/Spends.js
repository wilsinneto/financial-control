const { execute } = require("../services/Request");

let urlAPI = "http://localhost:3000/spends";

const headerGetOrDelete = (method) => ({
  method,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'
  },
  mode: "cors",
  cache: "default",
});
const headerSave = (method, payload) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: "cors",
  cache: "no-cache",
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify(payload),
});

const captureHttpStatusCode = (status) => status.match(/(\d+)/);
const getMessage = (status) => 
  ({
    404: "Despesa não encontrado.",
    409: "Despesa já existe.",
    500: "Error Interno",
  }[status] || "");

class SpendsController {
  constructor() {}
  async update(payload) {
    try {
      const response = await execute(urlAPI.concat(`/${payload.id}`), headerSave("PUT", payload));
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
    console.log("remove payload", payload);
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
      const response = await execute(urlAPI.concat("/expenses"), headerGetOrDelete("GET"));
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

module.exports = SpendsController;
