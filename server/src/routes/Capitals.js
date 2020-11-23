const express = require("express");
const router = express.Router();
const CapitalsController = require("../controllers/Capitals");
const { Recipes, Capitals } = require("../models");

const capitalsController = new CapitalsController(Recipes, Capitals);

router.get("/", (request, response) => capitalsController.getAll(request, response));
router.get("/recipes", (request, response) => capitalsController.getAllCapitalsWithRecipes(request, response));
router.post("/", (request, response) => capitalsController.create(request, response));
router.put("/:id", (request, response) => capitalsController.update(request, response));
router.delete("/:id", (request, response) => capitalsController.delete(request, response));

module.exports = router;
