import axios from "axios";
import { url } from "./configs";

let requests = {
	auth: {
		login: credentials => axios.post(`${url}/loginpassword`, credentials),
		refreshToken: () => axios.get(`${url}/refresh`)
	}
};

export default requests;
