const { capitalizeFirstLetter } = require("../utils/CapitalizeText");
const { optionsId, optionsDescription } = require("../utils/OptionsSequelizeNormalize");

class ExpensesController {
  constructor(Expenses) {
    this.Expenses = Expenses;
  }
  async update(request, response) {
    const id = request.params.id;
    const body = request.body;
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    const payload = optionsId(id);
    const verifyDescription = optionsDescription(capitalizeDescription);
    try {
      const recipeAlreadyExists = await this.Expenses.findOne(verifyDescription);
      if (recipeAlreadyExists) return response.status(409).json({ error: "Recipe already exists."});
      await this.Expenses.update({ description: capitalizeDescription }, payload);
      return response.status(200).send({});
    } catch (error) {
      return response.status(400).send({ error: error.message });
    }
  }
  async delete(request, response) {
    const id = request.params.id;
    const payload = optionsId(id);
    try {
      await this.Expenses.destroy(payload);
      return response.status(200).send({});
    } catch (error) {
      return response.status(200).send({ error: error.message });
    }
  }
  async getAll(request, response) {
    try {
      const expenses = await this.Expenses.findAll();
      return response.status(200).send(expenses);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }
  async create(request, response) {
    console.log("Create");
    const body = request.body;
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    const verifyDescription = optionsDescription(capitalizeDescription);
    try {
      const recipeAlreadyExists = await this.Expenses.findOne(verifyDescription);
      if (recipeAlreadyExists) return response.status(409).send({ error: "Recipe already exists."});
      await this.Expenses.create({ description: capitalizeDescription });
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }

}

module.exports = ExpensesController;
