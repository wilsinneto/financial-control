const express = require("express");
const router = express.Router();
const SpendsController = require("../controllers/Spends");
const { Expenses, Spends } = require("../models");

const spendsController = new SpendsController(Expenses, Spends);

router.get("/", (request, response) => spendsController.getAll(request, response));
router.get("/expenses", (request, response) => spendsController.getAllSpends(request, response));
router.post("/", (request, response) => spendsController.create(request, response));
router.put("/:id", (request, response) => spendsController.update(request, response));
router.delete("/:id", (request, response) => spendsController.delete(request, response));

module.exports = router;
