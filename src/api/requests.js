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
		validateToken: token =>
			instance.fetch("get", `${url}/token`, {
				Authorization: `Bearer ${token}`
			})
		// refreshToken: () => axios.get(`${url}/refresh`)
	},
	doc: {
		getStats: token =>
			instance.fetch("get", `${url}/documents/all/get/stats`, {
				Authorization: `Bearer ${token}`
			}),
		getDocuments: (token, page, limit, io) =>
			instance.fetch(
				"get",
				`${url}/documents?page=${page}&limit=${limit}&io=${io}`,
				{
					Authorization: `Bearer ${token}`
				}
			)
	},
	pdf: {
		loadFile: (token, docId) =>
			instance.fetch(
				"get",
				`${url}/documents/actWorkPerformed/${docId}/true/file`,
				{
					Authorization: `Bearer ${token}`
				}
			)
	},
	product: {
		getProducts: (token, page, limit) =>
			instance.fetch(
				"get",
				`${url}/items/market?page=${page}&limit=${limit}`,
				{
					Authorization: `Bearer ${token}`
				}
			)
	}
};

export default requests;
