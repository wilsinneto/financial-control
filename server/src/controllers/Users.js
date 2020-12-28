const { sign } = require("../utils/jwt");

class UsersController {
	constructor(UsersUseCases) {
		this.UsersUseCases = UsersUseCases;
	}

	me(request, response) {
		console.log("UsersController - me");
		const auth = response.status(200).send(request.auth);

		return auth;
	}
	async getAll(_, response) {
		console.log("UsersController - get All");
		try {
			const users = await this.UsersUseCases.getAll();

			return response.status(200).send(users);
		} catch (error) {
			return response.status(400).send({ error: "Database not available." });
		}
	}
	async login(request, response) {
		console.log("UsersController - login");
		const [, hash] = request.headers.authorization.split(" ");
		const [email, secret] = Buffer.from(hash, "base64")
			.toString()
			.split(":");

		try {
			const result = await this.UsersUseCases.login(email, secret);

			if (result.error) return response.status(401).send({ error: "user not found." });
			if (result.invalid) return response.status(409).send({ error: "Invalid password." });

			const { password, ...user } = result;

			const token = sign({ user: user.id });

			return response.status(200).send({ user, token });
		} catch (error) {
			return response.status(400).send({ error: "Unable to log in." });
		}
	}
	async signup(request, response) {
		console.log("UsersController - signup");
		const data = request.body;
		try {
			const result = await this.UsersUseCases.create(data);

			if (result.error) return response.status(401).send({ error: "User already exists." });

			const { password, ...user } = result;

			const token = sign({ user: user.id });

			return response.status(201).send({ user, token });
		} catch (error) {
			return response.status(400).send({ error: "User not found" });
		}
	}
}

module.exports = UsersController;
