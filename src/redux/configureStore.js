import { createStore, combineReducers } from "redux";
import { user, appState, documents, cart } from "./reducers";
import Reactotron from "./reactotron-config";

export let configureStore = () => {
	let reducers = combineReducers({ user, appState, documents, cart });
	const store = createStore(reducers, Reactotron.createEnhancer());
	return store;
};
