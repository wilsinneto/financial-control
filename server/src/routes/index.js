const express = require("express");
const recipeRouter = require("./Recipes");
const capitalsRouter = require("./Capitals");

const router = express.Router();

router.use("/recipes", recipeRouter);
router.use("/capitals", capitalsRouter);

module.exports = router;
