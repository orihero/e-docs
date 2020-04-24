import axios from "axios";
import { url } from "./configs";
import RNFetchBlob from "rn-fetch-blob";

let requests = {
	auth: {
		login: credentials =>
			RNFetchBlob.config({ trusty: true }).fetch(
				"post",
				`${url}/loginpassword`,
				credentials
			),
		refreshToken: () => axios.get(`${url}/refresh`)
	},
	main: {
		getStats: () => axios.get(`${url}`)
	}
};

export default requests;
