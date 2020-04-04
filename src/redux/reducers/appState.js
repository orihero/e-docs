import { HIDE_MODAL, SHOW_MODAL } from "../types";

const initialState = {
	modalVisible: false,
	message: ""
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SHOW_MODAL:
			return { message: payload, modalVisible: true };
		case HIDE_MODAL:
			return { message: "", modalVisible: false };
		default:
			return state;
	}
};
