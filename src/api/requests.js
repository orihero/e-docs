import axios from "axios";
import { url } from "./configs";
import RNFetchBlob from "rn-fetch-blob";

export const instance = RNFetchBlob.config({
	trusty: true
});

let requests = {
	auth: {
		login: credentials =>
			instance.fetch("post", `${url}/loginpassword`, credentials),
		refreshToken: () => axios.get(`${url}/refresh`)
	},
	main: {
		getStats: token =>
			instance.fetch("get", `${url}/documents/all/get/stats`, {
				Authorization: `Bearer ${token}`
			})
	}
};

export default requests;
