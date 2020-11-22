class CapitalsController {
  constructor(Recipes, Capitals) {
    this.Recipes = Recipes;
    this.Capitals = Capitals;
  }
  // verify this bellom methods make sense
  async getAll(request, response) {
    try {
      const capitals = await this.Capitals.findAll();
      return response.status(200).send(capitals);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }
  async getAllCapitalsWithRecipes(request, response) {
    try {
      const capitals = await this.Recipes.findAll({ include: "received" });
      return response.status(200).send(capitals);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }
  async create(request, response) {
    console.log("create");
    var { description, value, date } = request.body;
    if (value === "" || value === undefined) value = "00.0";
    try {
      const recipe = await this.Recipes.findOne({ where: { description } });
      if (!recipe) return response.status(404).send({ error: "Recipe not exists."});
      const recipeId = recipe.dataValues.id;
      await this.Capitals.create({ value, data: date, recipeId });
      return response.status(201).send({});
    } catch (error) {
      console.log("error.message", error.message);
      return response.status(500).send({ error: error.message });
    }
  }
}

module.exports = CapitalsController;