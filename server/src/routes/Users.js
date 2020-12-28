const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/Users");
const UsersUseCase = require("../useCases/UsersUseCase");
const { Users } = require("../models");
const { verify } = require("../utils/jwt");

const usersUseCase = new UsersUseCase(Users);
const usersController = new UsersController(usersUseCase);


const authMiddleware = async (request, response, next) => {
	console.log("AuthMiddleware - authMiddleware");
	const [, token] = request.headers.authorization.split(" ");

	try {
		const payload = await verify(token);

		const result = await usersUseCase.getId(payload);

		if (!result) return response.status(401).send({ error: "User already exists." });
		
		const { password, ...user } = result;

		request.auth = user;

		next();
	} catch (error) {
		return response.status(401).send({ error });
	}
}

router.post("/", (request, response) => usersController.signup(request, response));
router.get("/login", (request, response) => usersController.login(request, response));
router.get("/", authMiddleware, (request, response) => usersController.getAll(request, response));
router.get("/me", authMiddleware, (request, response) => usersController.me(request, response));

module.exports = router;
