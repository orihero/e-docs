import React from "react";
import { Platform, UIManager } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/routes/AppRouter";
import { configureStore } from "./src/redux/configureStore";
import { Provider } from "react-redux";
import LoadingModal from "./src/components/containers/LoadingModal";
import HeadUpMessage from "./src/components/common/HeadUpMessage";
import { configureAxios } from "./src/api/configs";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

let App = () => {
	let store = configureStore();
	configureAxios();
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<AppNavigator />
				<LoadingModal />
				<HeadUpMessage />
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
