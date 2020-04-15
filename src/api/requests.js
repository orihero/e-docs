import axios from "axios";
import { url } from "./configs";

let requests = {
	auth: {
		login: credentials => axios.post(`${url}/register`, credentials),
		getAuthId: credentials => axios.get(`${url}/authId/${credentials}`)
	}
};

export default requests;
