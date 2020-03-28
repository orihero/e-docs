import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Text from "../components/common/Text";

// import {createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Main, Add, Profile } from "../screens";
import Header from "../components/navigation/Header";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../constants/colors";
import strings from "../locales/strings";
import CustomFloatingTabbar from "../components/navigation/CustomFloatingTabbar";

const MainStack = createStackNavigator({
	Main: {
		screen: Main,
		navigationOptions: {
			header: () => <Header secondary={true} />
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
		initialRouteName: "ProfileStack",
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
		tabBarComponent: CustomFloatingTabbar
	}
);

const SwitchNavigator = createSwitchNavigator(
	{
		// Loader,
		// AuthNavigator,
		// DrawerNavigator,
		TabNavigator
	},
	{}
);

const AppNavigator = createAppContainer(SwitchNavigator);

export default AppNavigator;
