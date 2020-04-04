import { USER_LOADED } from "../types";

const initialState = {
	settings: {},
	data: {}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOADED:
			return { ...state, ...payload };

		default:
			return state;
	}
};
