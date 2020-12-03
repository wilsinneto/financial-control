const express = require("express");
const router = express.Router();
const ItemsUseCase = require("../useCases/ItemsUseCase");
const ItemsController = require("../controllers/Items");
const { Items } = require("../models");

const itemsUseCase = new ItemsUseCase(Items);
const itemsController = new ItemsController(itemsUseCase);

router.get("/", (request, response) => itemsController.getAll(request, response));
router.post("/", (request, response) => itemsController.create(request, response));
router.put("/:id", (request, response) => itemsController.update(request, response));
router.delete("/:id", (request, response) => itemsController.delete(request, response));

module.exports = router;
