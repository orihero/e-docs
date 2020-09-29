import axios from "axios";
import requests from "./requests";

export let url = "https://test.edocs.uz/v1.0.1";
export let prodUrl = "https://api.edocs.uz/v1.0.1";

export let configureAxios = store => {
	axios.interceptors.request.use(res => {
		let token = store.getState().user.token;
		if (token) {
			res.headers.Authorization = `Bearer ${token}`;
		}
		return res;
	});
	// let interceptor = axios.interceptors.response.use(
	// 	res => {
	// 		return Promise.resolve(res);
	// 	},
	// 	error => {
	// 		if (!error || !error.response || error.response.status !== 401) {
	// 			return Promise.reject(error);
	// 		}
	// 		axios.interceptors.response.eject(interceptor);
	// 		return requestsauth
	// 			.refreshToken({
	// 				refreshToken: store.getState().user.refreshToken
	// 			})
	// 			.then(res => {
	// 				error.response.config.headers = {
	// 					Authorization: `Bearer ${res.data.data}`
	// 				};
	// 				store.dispatch(userLoggedIn(res.data));
	// 				return axios(error.response.config);
	// 			})
	// 			.catch(response => {
	// 				return Promise.reject(response);
	// 			})
	// 			.finally(() => configureAxios(store));
	// 	}
	// );
};
