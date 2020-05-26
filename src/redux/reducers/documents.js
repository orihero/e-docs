import { DOCUMENTS_COUNT_LOADED, DOCUMENTS_LOADED } from "../types";

let initialState = {
	boxType: -1,
	status: -1,
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
	}
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
			let { data, boxType, status } = payload;
			return { ...state, data, boxType, status };
		}
		default:
			return state;
	}
};
