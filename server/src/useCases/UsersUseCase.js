const { optionsEmail } = require("../utils/OptionsSequelizeNormalize");

class UsersUseCases {
	constructor(Users) {
		this.Users = Users;
	}

	async getAll() {
		console.log("UsersUseCase - get All");
		const users = await this.Users.findAll();

		return users;
  }
	async create(data) {
    console.log("UsersUseCase - create");
		const verifyEmail = optionsEmail(data.email);

		const emailAlreadyExists = await this.Users.findOne(verifyEmail);

		if (emailAlreadyExists) return { error: true };

		const user = await this.Users.create(data);

		return user.dataValues;
	}
	async login(email, password) {
		console.log("UsersUseCase - login");
		const data = optionsEmail(email);
		const user = await this.Users.findOne(data);
		if (!user) return { error: true }
		if (user && !await user.correctPassword(password)) return { invalid: true };

		return user.dataValues;
	}
	async getId(data) {
		console.log("UsersUseCase - get");
		const primaryKey = data.user;

		const user = await this.Users.findByPk(primaryKey);

		return user.dataValues;
	}
}

module.exports = UsersUseCases;