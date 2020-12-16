const { oneLessDate } = require("../utils/DateNormalize");
const {
  optionsId,
  optionsBetweenDate,
  optionsForUpdateElement,
  optionsDescription,
  sortByElements } = require("../utils/OptionsSequelizeNormalize");

class ElementsController {
  constructor(ElementsUseCases) {
    this.ElementsUseCases = ElementsUseCases;
  }

  async getPeriod(request, response) {
    console.log("Elements get period");
    var { startDate, endDate } = request.params;
    var oneLessStartDate = oneLessDate(startDate);
    try {
      const dates = optionsBetweenDate(oneLessStartDate, endDate);
      const data = await this.ElementsUseCases.getPeriod(dates)
      if (data.error) return response.status(404).send({ error: "Data not existe in this period."});
      return response.status(200).send(data);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }

  async update(request, response) {
    console.log("Elements update");
    const id = optionsId(request.params.id);
    const element = optionsForUpdateElement(request.body);
    if (element.value === "" || element.value === undefined) element.value = "00.0";
    const description = optionsDescription(element.description);
    try {
      const data = await this.ElementsUseCases.update(id, description, element);
      if (data.error) return response.status(404).send({ error: "Item not exists."});
      return response.status(200).send({});
    } catch (error) {
      return response.status(400).send({ error: error.message });
    }
  }
  async delete(request, response) {
    console.log("Elements delete");
    const id = optionsId(request.params.id);
    try {
      const data = await this.ElementsUseCases.delete(id);
      if (data.error) return response.status(404).send({ error: "Element not exists."});
      return response.status(200).send({});
    } catch (error) {
      return response.status(200).send({ error: error.message });
    }
  }
  async getAll(request, response) {
    console.log("Elements get All");
    const sort = sortByElements();
    try {
      const elements = await this.ElementsUseCases.getAll(sort);
      if (elements.error)
        return response.status(400).send({ error: "Error when filtering elements."});
      return response.status(200).send(elements);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }
  async create(request, response) {
    console.log("Elements create");
    var { description, value, date } = request.body;
    if (value === "" || value === undefined) value = "00.0";

    try {
      const data = await this.ElementsUseCases.create(description, value, date);
      if (data.error) return response.status(404).send({ error: "item not exists."});
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}

module.exports = ElementsController;
