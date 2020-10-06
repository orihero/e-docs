import Bugsnag from "@bugsnag/react-native";
import React from "react";
import { Platform, UIManager, LogBox } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import HeadUpMessage from "./src/components/common/HeadUpMessage";
import LoadingModal from "./src/components/containers/LoadingModal";
import { configureStore } from "./src/redux/configureStore";
import AppNavigator from "./src/routes/AppRouter";
import NavigationService from "./src/routes/NavigationService";

Bugsnag.start();

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

let store = configureStore();

let App = () => {
	// configureAxios(store);
	LogBox.ignoreLogs(["Warning:"]);
	LogBox.ignoreAllLogs();
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<AppNavigator
					ref={ref => NavigationService.setTopLevelNavigator(ref)}
				/>
				<LoadingModal />
				<HeadUpMessage />
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
