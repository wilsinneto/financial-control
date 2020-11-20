const { execute } = require("../services/Request");

const urlAPI = "http://localhost:3000/recipes";

const headerOPERATOR = (method) => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  cache: "default",
});

// const headerSAVE = (method, user) => ({
//   method,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   mode: "cors",
//   cache: "no-cache",
//   redirect: "follow",
//   referrerPolicy: "no-referrer",
//   body: JSON.stringify(user),
// });


class RecipesController {
  constructor() {}

  async getAll() {
    try {
      return await execute(urlAPI, headerOPERATOR("GET"));
    } catch (error) {
      console.log("error.message",error.message);
      return error.message;
    }
  }

  // async create(user) {
  //   try {
  //     const result = await execute(urlAPI, headerSAVE("POST", user));
  //     if (!result.data) return false;
  //     return true;
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  // async remove(client) {
  //   return await execute(
  //     urlAPI.concat(`/${client.id}`),
  //     headerOPERATOR("DELETE")
  //   );
  // }

  // async update(client) {
  //   return await execute(
  //     urlAPI.concat(`/${client.id}`),
  //     headerSAVE("PUT", client)
  //   );
  // }
}

module.exports = RecipesController;
