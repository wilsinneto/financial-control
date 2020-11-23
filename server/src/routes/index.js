const express = require("express");
const recipesRouter = require("./Recipes");
const capitalsRouter = require("./Capitals");

const router = express.Router();

router.use("/recipes", recipesRouter);
router.use("/capitals", capitalsRouter);

module.exports = router;
