import { DOCUMENTS_COUNT_LOADED, DOCUMENTS_LOADED } from "../types";
import strings from "../../locales/strings";

let initialState = {
	boxType: -1,
	status: "all",
	data: [],
	count: {
		in: {
			sended: -1,
			deleted: -1,
			drafts: -1,
			downloaded: -1
		},
		out: {
			sended: -1,
			drafts: -1,
			deleted: -1,
			downloaded: -1
		}
	},
	page: 1,
	limit: 20,
	filter: "",
	type: ""
};

export const docStatus = {
	DRAFTS: "drafts",
	SENT: "sended",
	SIGNED: "signed",
	REJECTED: "rejected",
	DELETED: "deleted"
};

export const boxTypes = {
	IN: "in",
	OUT: "out"
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case DOCUMENTS_COUNT_LOADED:
			return { ...state, count: payload };
		case DOCUMENTS_LOADED: {
			let { data, boxType, status, ...rest } = payload;
			return { ...state, data, boxType, status, ...rest };
		}
		default:
			return state;
	}
};
