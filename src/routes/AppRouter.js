import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import {createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Text from "../components/common/Text";
import Header from "../components/navigation/Header";
import colors from "../constants/colors";
import strings from "../locales/strings";
import Product from "../screens/product/Product";
import ConnectedMain from "../screens/main/Boxes";
import List from "../screens/main/List";
import PdfView from "../screens/main/PdfView";
import Checkout from "../screens/checkout/Checkout";
import Profile from "../screens/profile/Profile";
import Login from "../screens/auth/Login";
import Loader from "../screens/auth/Loader";
import Edit from "../screens/add/Edit";
import Add from "../screens/add/Add";
import Products from "../screens/add/Products";

const MainStack = createStackNavigator(
	{
		Main: {
			screen: ConnectedMain,
			navigationOptions: {
				header: () => <Header secondary={true} />
			}
		},
		List: {
			screen: List,
			navigationOptions: {
				header: () => <Header />
			}
		},
		PdfView: {
			screen: PdfView,
			navigationOptions: {
				headerShown: false
			}
		},
		Product: {
			screen: Product,
			navigationOptions: {
				header: () => <Header />
			}
		},
		Checkout: {
			screen: Checkout,
			navigationOptions: {
				header: () => <Header />
			}
		}
	},
	{
		// initialRouteName: "PdfView"
	}
);

const ProfileStack = createStackNavigator({
	Profile: {
		screen: Profile,
		navigationOptions: {
			header: () => <Header />
		}
	}
});

let NewDocumentStack = createStackNavigator({
	Add: {
		screen: Add,
		navigationOptions: {
			header: () => <Header />
		}
	},
	Products: {
		screen: Products,
		navigationOptions: {
			header: () => <Header />
		}
	},
	Edit: {
		screen: Edit,
		navigationOptions: {
			header: () => <Header />
		}
	}
});

const TabNavigator = createMaterialTopTabNavigator(
	{
		MainStack: {
			screen: MainStack,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					return <Feather name="home" size={22} color={tintColor} />;
				},
				tabBarLabel: ({ tintColor, focused }) => {
					return (
						<Text style={{ color: tintColor, fontSize: 10 }}>
							{strings.main}
						</Text>
					);
				}
			}
		},
		Add: {
			screen: NewDocumentStack,
			navigationOptions: {
				tabBarIcon: () => (
					<Ionicons
						name="ios-add-circle"
						color={colors.violet}
						size={55}
					/>
				),
				tabBarLabel: ({ tintColor, focused }) => {
					// return <View style={{paddingVertical: 20}} />;
				}
			}
		},
		ProfileStack: {
			screen: ProfileStack,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					return <Feather name="grid" size={22} color={tintColor} />;
				},
				tabBarLabel: ({ tintColor, focused }) => {
					return (
						<Text style={{ color: tintColor, fontSize: 10 }}>
							{strings.profile}
						</Text>
					);
				}
			}
		}
	},
	{
		initialRouteName: "MainStack",
		tabBarOptions: {
			activeTintColor: colors.flowerBlue,
			inactiveTintColor: colors.grayBorder,
			contentContainerStyle: {
				overflow: "visible",
				borderColor: "green"
			},
			indicatorStyle: {
				backgroundColor: "transparent"
			},
			iconStyle: {
				overflow: "visible",
				width: 50,
				justifyContent: "center",
				alignItems: "center"
			},
			tabStyle: {
				overflow: "visible",
				borderColor: "red",
				height: 60
			},
			style: {
				backgroundColor: "white",
				borderColor: "blue",
				overflow: "visible"
			},
			showIcon: true
		},
		tabBarPosition: "bottom",
		swipeEnabled: false,
		lazy: true
		// tabBarComponent: CustomFLoatingTabbar
	}
);

const LoginStack = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			header: () => <Header initial={true} />
		}
	}
});

const SwitchNavigator = createSwitchNavigator(
	{
		Loader,
		LoginStack,
		TabNavigator
	},
	{}
);

const AppNavigator = createAppContainer(SwitchNavigator);

export default AppNavigator;
