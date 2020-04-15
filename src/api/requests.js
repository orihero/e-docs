import axios from "axios";
import { url } from "./configs";

let requests = {
	auth: {
		login: credentials => axios.post(`${url}/register`, credentials),
		getAuthId: credentials =>
			axios.post(`https://api.edocs.uz/v1.0.1/authId/${credentials}`)
	}
};

export default requests;
