import React from "react";
import { Platform, UIManager } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/routes/AppRouter";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

let App = () => {
	return (
		<SafeAreaProvider>
			<AppNavigator />
		</SafeAreaProvider>
	);
};

export default App;
