const { capitalizeFirstLetter } = require("../utils/CapitalizeText");
const { optionsId, optionsDescription } = require("../utils/OptionsSequelizeNormalize");

class ItemsController {
  constructor(Items) {
    this.Items = Items;
  }
  async update(request, response) {
    // const id = request.params.id;
    // const body = request.body;
    // const capitalizeDescription = capitalizeFirstLetter(body.description);
    // const payload = optionsId(id);
    // const verifyDescription = optionsDescription(capitalizeDescription);
    try {
      // const recipeAlreadyExists = await this.Expenses.findOne(verifyDescription);
      // if (recipeAlreadyExists) return response.status(409).json({ error: "Recipe already exists."});
      // await this.Expenses.update({ description: capitalizeDescription }, payload);
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
      const data = await this.Items.findAll();
      return response.status(200).send(data);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }
  async create(request, response) {
    console.log("Items create");
    const body = request.body;
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    const verifyDescription = optionsDescription(capitalizeDescription);
    try {
      const itemAlreadyExists = await this.Items.findOne(verifyDescription);
      if (itemAlreadyExists) return response.status(409).send({ error: "Item already exists."});
      body.description = capitalizeDescription;
      await this.Items.create(body);
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }

}

module.exports = ItemsController;
