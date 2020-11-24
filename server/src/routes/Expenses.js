const express = require("express");
const router = express.Router();
const ExpensesController = require("../controllers/Expenses");
const { Expenses } = require("../models");

const expensesController = new ExpensesController(Expenses);

router.get("/", (request, response) => expensesController.getAll(request, response));
router.post("/", (request, response) => expensesController.create(request, response));
router.put("/:id", (request, response) => expensesController.update(request, response));
router.delete("/:id", (request, response) => expensesController.delete(request, response));

module.exports = router;
