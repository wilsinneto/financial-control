const express = require("express");
const usersRouter = require("./Users");
const itemsRouter = require("./Items");
const elementsRouter = require("./Elements");

const router = express.Router();

router.use("/items", itemsRouter);
router.use("/elements", elementsRouter);
router.use("/users", usersRouter);

module.exports = router;
