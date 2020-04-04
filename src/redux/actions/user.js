import { USER_LOGGED_IN, USER_LOADED, USER_LOGGED_OUT } from "../types";

export const userLoggedIn = payload => ({
	type: USER_LOGGED_IN,
	payload
});

export const userLoaded = payload => ({
	type: USER_LOADED,
	payload
});

export const userLoggedOud = () => ({
	type: USER_LOGGED_OUT
});
