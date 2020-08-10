import { USER_LOADED, USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import AsyncStorage from "@react-native-community/async-storage";
import { userLoggedOut } from "../actions";

const initialState = {
	settings: {},
	//* Backend has user field
	user: {}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOADED:
			return { ...state, ...payload };
		case USER_LOGGED_IN:
			let newState = { ...state, ...payload };
			console.log({ newState });
			AsyncStorage.setItem("@credentials", JSON.stringify(newState));
			return newState;
		case USER_LOGGED_OUT: {
			console.log("LOGGED OUT");
			AsyncStorage.setItem("@credentials", "");
			return initialState;
		}
		default:
			return state;
	}
};
