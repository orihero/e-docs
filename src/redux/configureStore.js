import { createStore, combineReducers } from "redux";
import { user, appState, documents, cart } from "./reducers";

export let configureStore = () => {
	let reducers = combineReducers({ user, appState, documents, cart });
	return createStore(reducers);
};
