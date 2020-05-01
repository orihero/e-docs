import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Text from "../components/common/Text";

// import {createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import {
	Main,
	Add,
	Profile,
	Login,
	Product,
	Checkout,
	Loader,
	List
} from "../screens";
import Header from "../components/navigation/Header";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../constants/colors";
import strings from "../locales/strings";
import CustomFLoatingTabbar from "../components/navigation/CustomFloatingTabbar";

const MainStack = createStackNavigator({
	Main: {
		screen: Main,
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
});

const ProfileStack = createStackNavigator({
	Profile: {
		screen: Profile,
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
			screen: Add,
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
		// initialRouteName: "ProfileStack",
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
		tabBarPosition: "bottom"
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
