import { createStore, combineReducers } from "redux";
import { user, appState, documents } from "./reducers";

export let configureStore = () => {
	let reducers = combineReducers({ user, appState, documents });
	return createStore(reducers);
};
