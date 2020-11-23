// function convertDate(inputDate) {
//   function pad(s) { return (s < 10) ? "0" + s : s; }
//   var date = new Date(inputDate);
//   return [date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate())].join("-");
// }

class CapitalsController {
  constructor(Recipes, Capitals) {
    this.Recipes = Recipes;
    this.Capitals = Capitals;
  }
  // verify this bellom method make sense
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
    console.log("description", description);
    console.log("date", date);
    const [dateFormated] = date.split("T");
    console.log("dateFormated", dateFormated);
    try {
      const recipe = await this.Recipes.findOne({ where: { description } });
      if (!recipe) return response.status(404).send({ error: "Recipe not exists."});
      const recipeId = recipe.dataValues.id;
      await this.Capitals.create({ value, data: dateFormated, recipeId });
      return response.status(201).send({});
    } catch (error) {
      return response.status(500).send({ error: error.message });
    }
  }
}

module.exports = CapitalsController;
