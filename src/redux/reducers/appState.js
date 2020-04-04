import { HIDE_MODAL, SHOW_MODAL, SHOW_HEAD_UP, HIDE_HEAD_UP } from "../types";

const initialState = {
	modalVisible: false,
	message: "",
	headUpMessage: null,
	headUpType: ""
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SHOW_MODAL:
			return { message: payload, modalVisible: true };
		case SHOW_HEAD_UP:
			console.warn("SHOWING");
			return { headUpMessage: payload.message, headUpType: payload.type };
		case HIDE_HEAD_UP:
			return { headUpMessage: null, headUpType: "" };
		case HIDE_MODAL:
			return { message: "", modalVisible: false };
		default:
			return state;
	}
};
