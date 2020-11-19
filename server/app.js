const express = require("express");
const router = express.Router();

const app = express();

app.use(express.json());

router.post("/recipes", (request) => {
  console.log("request.params:", request.params);
  console.log("request.body:", request.body);
});



module.exports = { app };