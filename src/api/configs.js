import axios from "axios";

export let url = "http://testapi.edocs.uz -";

export let configureAxios = () => {
	axios.interceptors.response.use(
		e => e,
		e => {
			console.log(e.message, "\n\n\nRESPONSE:\n\n\n", e.response);
			return Promise.reject(e);
		}
	);
};
