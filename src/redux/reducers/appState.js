import {
	HIDE_MODAL,
	SHOW_MODAL,
	SHOW_HEAD_UP,
	HIDE_HEAD_UP,
	SHOW_NOTIFICATION,
	HIDE_NOTIFICATION
} from "../types";

const initialState = {
	modalVisible: false,
	message: "",
	headUpMessage: null,
	headUpType: "",
	notification: false,
	notificationData: {}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SHOW_MODAL:
			return { ...state, message: payload, modalVisible: true };
		case SHOW_HEAD_UP:
			return {
				...state,
				headUpMessage: payload.message,
				headUpType: payload.type
			};
		case HIDE_HEAD_UP:
			return { ...state, headUpMessage: null, headUpType: "" };
		case HIDE_MODAL:
			return { ...state, message: "", modalVisible: false };
		case SHOW_NOTIFICATION:
			return {
				...state,
				notification: true,
				notificationData: payload.data
			};
		case HIDE_NOTIFICATION:
			return { ...state, notification: false, notificationData: {} };
		default:
			return state;
	}
};
