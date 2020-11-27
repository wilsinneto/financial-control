class CapitalsController {
  constructor(Recipes, Capitals) {
    this.Recipes = Recipes;
    this.Capitals = Capitals;
  }
  async update(request, response) {
    const id = request.params.id;
    var { description, value, date } = request.body;
    const payload = { where: { id }};
    if (value === "" || value === undefined) value = "00.0";
    const verifyRecipe = { where: { description: description }};
    try {
      const recipeAlreadyExists = await this.Recipes.findOne(verifyRecipe);
      if (!recipeAlreadyExists) return response.status(409).json({ error: "Recipe not exists."});
      const recipeId = recipeAlreadyExists.dataValues.id;
      await this.Capitals.update({ value, date, recipeId }, payload);
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
      await this.Capitals.destroy(payload);
      return response.status(200).send({});
    } catch (error) {
      return response.status(200).send({ error: error.message });
    }
  }
  // // verify this bellom method make sense
  // async getAll(request, response) {
  //   try {
  //     const capitals = await this.Capitals.findAll();
  //     return response.status(200).send(capitals);
  //   } catch (error) {
  //     return response.status(500).send({error: error.message});
  //   }
  // }
  async getAllCapitalsWithRecipes(request, response) {
    try {
      const capitals = await this.Capitals.findAll({ include: "recipes" });
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
      await this.Capitals.create({ value, date, recipeId });
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}

module.exports = CapitalsController;
