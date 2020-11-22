class CapitalsController {
  constructor(Capitals) {
    this.Capitals = Capitals;
  }
  
  async create(request, response) {
    const body = request.body;
    console.log(body);
    return response.status(200).send({});
    // const verifyRecipe = { where: { description: capitalizeDescription }};
    // try {
    //   const recipeAlreadyExists = await this.Recipes.findOne(verifyRecipe);
    //   if (recipeAlreadyExists) return response.status(409).send({ error: "Recipe already exists."});

    //   await this.Recipes.create({ description: capitalizeDescription });
    //   return response.status(201).send({});
    // } catch (error) {
    //   return response.status(500).send({ error: error.message });
    // }
  }
}

module.exports = CapitalsController;