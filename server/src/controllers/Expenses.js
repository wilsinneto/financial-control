function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class ExpensesController {
  constructor(Expenses) {
    this.Expenses = Expenses;
  }
  async update(request, response) {
    const id = request.params.id;
    const body = request.body;
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    const payload = { where: { id }};
    const verifyDescription = { where: { description: capitalizeDescription }}
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
    const payload = { where: { id }};
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
    console.log("Expenses - create");
    const body = request.body;
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    const verifyDescription = { where: { description: capitalizeDescription }};
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
