const express = require("express");
const recipeRouter = require("./Recipes");
// const capitalsRoute = require("./Capitals");

const router = express.Router();

router.use("/recipes", recipeRouter);
// router.use("/capitals", capitalsRoute);

module.exports = router;
