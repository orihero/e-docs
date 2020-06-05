import axios from "axios";
import { url } from "./configs";
import RNFetchBlob from "rn-fetch-blob";

export const instance = RNFetchBlob.config({
	trusty: true
});

export let requests = {
	auth: {
		login: credentials =>
			instance.fetch("post", `${url}/loginpassword`, credentials),
		validateToken: token =>
			instance.fetch("get", `${url}/token`, {
				Authorization: `Bearer ${token}`
			})
		// refreshToken: () => axios.get(`${url}/refresh`)
	},
	account: {
		getProfile: token =>
			instance.fetch("get", `${url}/profile`, {
				Authorization: `Bearer ${token}`
			})
	},
	doc: {
		getStats: token =>
			instance.fetch("get", `${url}/documents/all/get/stats`, {
				Authorization: `Bearer ${token}`
			}),
		getDocuments: (token, page, limit, io = "", status = "") =>
			instance.fetch(
				"get",
				`${url}/documents?page=${page}&limit=${limit}&io=${io}&status=${status}`,
				{
					Authorization: `Bearer ${token}`
				}
			),
		getContent: (type, id, token) =>
			instance.fetch("GET", `${url}/documents/${type}/${id}`, {
				Authorization: `Bearer ${token}`
			}),
		rejectDocument: (token, type, id, credentials) =>
			instance.fetch(
				"POST",
				`${url}/documents/${type}/${id}/reject`,
				{
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json"
				},
				JSON.stringify(credentials)
			),
		signDocument: (token, type, id, credentials) =>
			instance.fetch(
				"POST",
				`${url}/documents/${type}/${id}/sign`,
				{
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json"
				},
				JSON.stringify(credentials)
			),
		getSignedFile: (token, type, id, side) =>
			instance.fetch(
				"POST",
				`${url}/documents/${type}/${id}/${side}/signedfile`,
				{
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json"
				},
				JSON.stringify(credentials)
			),
		getTimestamp: credentials =>
			instance.fetch(
				"POST",
				`${url}/dsvs/gettimestamp`,
				{
					"Content-Type": "application/json"
				},
				JSON.stringify(credentials)
			),
		getMeasures: () => instance.fetch("GET", `${url}/measures/all`)
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
