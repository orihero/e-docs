import { createStore, combineReducers } from "redux";
import { user, appState } from "./reducers";

export let configureStore = () => {
	let reducers = combineReducers({ user, appState });
	return createStore(reducers);
};
