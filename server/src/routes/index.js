const express = require("express");
const recipesRouter = require("./Recipes");
const capitalsRouter = require("./Capitals");
const expensesRouter = require("./Expenses");

const router = express.Router();

router.use("/recipes", recipesRouter);
router.use("/capitals", capitalsRouter);
router.use("/expenses", expensesRouter);

module.exports = router;
