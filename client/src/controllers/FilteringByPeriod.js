const { execute, headerGetOrDelete } = require("../utils/Request");
const { captureHttpStatusCode, getMessage } = require("../utils/ResponseMessage");

let urlAPI = "http://localhost:3000/spends";

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
