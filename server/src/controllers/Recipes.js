const { capitalizeFirstLetter } = require("../utils/CapitalizeText");
const { optionsId, optionsDescription } = require("../utils/OptionsSequelizeNormalize");

class RecipesController {
  constructor(Recipes) {
    this.Recipes = Recipes;
  }

  async delete(request, response) {
    const id = request.params.id;
    const payload = optionsId(id);
    try {
      await this.Recipes.destroy(payload);
      return response.status(200).send({});
    } catch (error) {
      return response.status(200).send({ error: error.message });
    }
  }

  async update(request, response) {
    const id = request.params.id;
    const body = request.body;
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    const payload = optionsId(id);
    const verifyDescription = optionsDescription(capitalizeDescription);
    try {
      const recipeAlreadyExists = await this.Recipes.findOne(verifyDescription);
      if (recipeAlreadyExists) {
        return response.status(409).json({ error: "Recipe already exists."});
      }
      await this.Recipes.update({ description: capitalizeDescription }, payload);
      return response.status(200).send({});
    } catch (error) {
      return response.status(400).send({ error: error.message });
    }
  }

  async getAll(request, response) {
    try {
      const data = await this.Recipes.findAll();
      return response.status(200).send(data);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }

  async create(request, response) {
    console.log("create");
    const body = request.body;
    delete body.value;
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    const verifyDescription = optionsDescription(capitalizeDescription);
    try {
      const descriptionAlreadyExists = await this.Recipes.findOne(verifyDescription);
      if (descriptionAlreadyExists) return response.status(409).send({ error: "Recipe already exists."});

      await this.Recipes.create({ description: capitalizeDescription });
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}

module.exports = RecipesController;
