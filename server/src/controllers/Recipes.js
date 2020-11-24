function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class RecipesController {
  constructor(Recipes) {
    this.Recipes = Recipes;
  }

  async delete(request, response) {
    const id = request.params.id;
    const payload = { where: { id }};
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
    const payload = { where: { id }};
    const verifyRecipe = { where: { description: capitalizeDescription }}
    try {
      const recipeAlreadyExists = await this.Recipes.findOne(verifyRecipe);
      if (recipeAlreadyExists) {
        console.log("Recipe already exists.");
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
      const recipes = await this.Recipes.findAll();
      return response.status(200).send(recipes);
    } catch (error) {
      return response.status(500).send({error: error.message});
    }
  }

  async create(request, response) {
    console.log("Recipes - create");
    const body = request.body;
    console.log("body", body);
    const capitalizeDescription = capitalizeFirstLetter(body.description);
    const verifyRecipe = { where: { description: capitalizeDescription }};
    console.log("verifyRecipe", verifyRecipe);
    try {
      const recipeAlreadyExists = await this.Recipes.findOne(verifyRecipe);
      if (recipeAlreadyExists) return response.status(409).send({ error: "Recipe already exists."});

      await this.Recipes.create({ description: capitalizeDescription });
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}

module.exports = RecipesController;
