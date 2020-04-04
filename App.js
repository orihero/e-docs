import React from "react";
import { Platform, UIManager } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/routes/AppRouter";
import { configureStore } from "./src/redux/configureStore";
import { Provider } from "react-redux";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

let App = () => {
	let store = configureStore();
	let { modalVisible, message } = store.getState().appState;
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<AppNavigator />
				<LoadingModal {...{ modalVisible, message }} />
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
