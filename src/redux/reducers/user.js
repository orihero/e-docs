import { USER_LOADED, USER_LOGGED_IN } from "../types";
import { AsyncStorage } from "react-native";

const initialState = {
	settings: {},
	data: {}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOADED:
			return { ...state, ...payload };
		case USER_LOGGED_IN:
			let newState = { ...state, ...payload };
			AsyncStorage.setItem("@credentials", JSON.stringify(newState));
			return newState;
		default:
			return state;
	}
};
