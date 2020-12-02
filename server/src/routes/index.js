const express = require("express");
const itemsRouter = require("./Items");

const router = express.Router();

router.use("/items", itemsRouter);

module.exports = router;
