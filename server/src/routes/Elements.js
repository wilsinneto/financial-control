const express = require("express");
const router = express.Router();
const ElementsController = require("../controllers/Elements");
const ElementsUseCase = require("../useCases/ElementsUseCase");
const { Items, Elements } = require("../models");

const elementsUseCase = new ElementsUseCase(Items, Elements);
const elemensController = new ElementsController(elementsUseCase);

router.get("/:startDate/:endDate", (request, response) => elemensController.getPeriod(request, response));
router.get("/", (request, response) => elemensController.getAll(request, response));
router.post("/", (request, response) => elemensController.create(request, response));
router.put("/:id", (request, response) => elemensController.update(request, response));
router.delete("/:id", (request, response) => elemensController.delete(request, response));

module.exports = router;
