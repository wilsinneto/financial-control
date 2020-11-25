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

const captureHttpStatusCode = (status) => status.match(/(\d+)/);
const getMessage = (status) => 
  ({
    404: "Despesa não encontrado.",
    409: "Despesa já existe.",
    500: "Error Interno",
  }[status] || "");

class SpendsController {
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
}

module.exports = SpendsController;
