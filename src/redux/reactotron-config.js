import AsyncStorage from "@react-native-community/async-storage";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.use(reactotronRedux())
	.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
	.configure({ host: "192.168.100.78" }) // controls connection & communication settings
	.useReactNative() // add all built-in react native plugins
	.connect(); // let's connect!
export default reactotron;
