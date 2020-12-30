const { execute } = require("@/utils/Request");
const { captureHttpStatusCode, getMessage } = require("@/utils/ResponseMessage");

let urlAPI = "http://localhost:3000/users";

class UsersService {
	constructor() {}

	logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
	}

	async login(username, password) {
		console.log("UsersService - login");
		let headers = {
			"Authorization": "Basic " + btoa(username + ":" + password)
		};
		let options = {
				method:"GET",
				headers
		}
		try {
      const response = await execute(
				urlAPI.concat("/login"),
				options
			);

      if (response.error) {
        const [matches] = captureHttpStatusCode(response.message);
        return { error: getMessage(matches) };
			}

			const { user } = response;

			if (user) {
				// store user details and basic auth credentials in local storage 
				// to keep user logged in between page refreshes
				user.authdata = window.btoa(username + ":" + password);
				localStorage.setItem("user", JSON.stringify(user));
			}

			return user;
    } catch (error) {
      const [matches] = captureHttpStatusCode(error.message);
      return { error: getMessage(matches) };
    }
	}
}

module.exports = UsersService;