const { capitalizeFirstLetter } = require("../utils/CapitalizeText");
const { optionsId } = require("../utils/OptionsSequelizeNormalize");

class ItemsController {
  constructor(ItemsUseCase) {
    this.ItemsUseCase = ItemsUseCase;
  }
  async update(request, response) {
    const id = request.params.id;
    const body = request.body;
    body.description = capitalizeFirstLetter(body.description);
    try {
      const data = await this.ItemsUseCase.update(body, optionsId(id));
      if (data.error) return response.status(404).send({ error: "Item not exists." });
      return response.status(200).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
  async delete(request, response) {
    const id = request.params.id;
    const payload = optionsId(id);
    try {
      await this.ItemsUseCase.delete(payload);
      return response.status(200).send({});
    } catch (error) {
      return response.status(200).send({ error: error.message });
    }
  }
  async getAll(request, response) {
    try {
      const data = await this.ItemsUseCase.getAll();
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send({error: error.message});
    }
  }
  async create(request, response) {
    console.log("Items create");
    const body = request.body;
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    body.description = capitalizeDescription;
    try {
      const data = await this.ItemsUseCase.create(body);
      if (data.error) return response.status(409).send({ error: "Items already exists." });
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }

}

module.exports = ItemsController;
