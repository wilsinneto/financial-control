const express = require("express");
const router = express.Router();
const RecipesController = require("../controllers/Recipes");
const { Recipes } = require("../models");

const recipesController = new RecipesController(Recipes);

router.get("/", (request, response) => recipesController.getAll(request, response));
router.post("/", (request, response) => recipesController.create(request, response));
router.put("/:id", (request, response) => recipesController.update(request, response));
router.delete("/:id", (request, response) => recipesController.delete(request, response));

module.exports = router;