class SpendsController {
  constructor(Expenses, Spends) {
    this.Expenses = Expenses;
    this.Spends = Spends;
  }
  async update(request, response) {
    const id = request.params.id;
    var { description, value, date } = request.body;
    const payload = { where: { id }};
    if (value === "" || value === undefined) value = "00.0";
    const verifyDescription = { where: { description: description }};
    try {
      const expenseAlreadyExists = await this.Expenses.findOne(verifyDescription);
      if (!expenseAlreadyExists) return response.status(409).send({ error: "Expense not exists."});
      const expenseId = expenseAlreadyExists.dataValues.id;
      await this.Spends.update({ value, date, expenseId }, payload);
      return response.status(200).send({});
    } catch (error) {
      return response.status(400).send({ error: error.message });
    }
  }
  async delete(request, response) {
    console.log("delete");
    const id = request.params.id;
    console.log("request.params.id", id);
    const payload = { where: { id } };
    try {
      await this.Spends.destroy(payload);
      return response.status(200).send({});
    } catch (error) {
      return response.status(200).send({ error: error.message });
    }
  }
  // verify this bellom method make sense
  async getAll(request, response) {
    try {
      const spends = await this.Spends.findAll();
      return response.status(200).send(spends);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }
  async getAllSpends(request, response) {
    try {
      const spends = await this.Spends.findAll({ include: "expenses" });
      return response.status(200).send(spends);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }
  async create(request, response) {
    console.log("Spends create");
    var { description, value, date } = request.body;
    if (value === "" || value === undefined) value = "00.0";
    try {
      const expense = await this.Expenses.findOne({ where: { description } });
      if (!expense) return response.status(404).send({ error: "Expenses not exists."});
      const expenseId = expense.dataValues.id;
      await this.Spends.create({ value, date, expenseId });
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}

module.exports = SpendsController;
