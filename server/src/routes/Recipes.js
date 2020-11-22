const express = require("express");
const router = express.Router();
const RecipesController = require("../controllers/Recipes");
const CapitalsController = require("../controllers/Capitals");
const { Recipes, Capitals } = require("../models");

const recipesController = new RecipesController(Recipes);
const capitalsController = new CapitalsController(Capitals);

router.get("/", (request, response) => recipesController.getAll(request, response));
router.post("/", (request, response) => recipesController.create(request, response));
router.put("/:id", (request, response) => recipesController.update(request, response));
router.delete("/:id", (request, response) => recipesController.delete(request, response));
router.post("/capitals", (request, response) => capitalsController.create(request, response));

module.exports = router;