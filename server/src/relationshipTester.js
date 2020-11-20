const models = require("./models");
// const Capitals = models.Capitals;
const Recipe = models.Recipes;

Recipe.create({
  description: "salario"
})
.then((newRecipe) => {
  // The get() function allows you to recover only the DataValues of the object
  console.log(newRecipe.get())
})
.catch((err) => {
  console.log("Error while recipe creation : ", err)
})

// Capitals.bulkCreate([
//   {email: 'john-doe@domain.com', firstName: 'John',  lastName: 'DOE', companyId: 1},
//   {email: 'log_w@domain.com', firstName: 'Logan',  lastName: 'WOLVERINE', companyId: 1},
//   {email: 'john-connor@domain.com', firstName: 'John',  lastName: 'CONNOR', companyId: 1}
// ])
// .then((newCapitals) => {
//   console.log(newCapitals)
// })
// .catch((err) => {
//   console.log("Error while capitals creation : ", err)
// })

module.exports = {Recipe};