const express = require("express");
const itemsRouter = require("./Items");
const elementsRouter = require("./Elements");

const router = express.Router();

router.use("/items", itemsRouter);
router.use("/elements", elementsRouter);

module.exports = router;
