import { Platform } from "react-native";

export default sizes = {
	ICONS_SIZE: Platform.select({ android: 22, ios: 26 })
};
