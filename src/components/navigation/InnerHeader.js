import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import Text from "../common/Text";
import SearchBar from "./SearchBar";
import { withNavigation } from "react-navigation";

const InnerHeader = ({ currentPage, setShowType, showTypes, navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View style={styles.titleWrapper}>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
					>
						<View style={styles.titleWrapper}>
							<Feather name="arrow-left" size={20} />
							<Text style={styles.title}>{currentPage}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View>
					{!!showTypes && (
						<RNPickerSelect
							useNativeAndroidPickerStyle={false}
							onValueChange={value => {
								setShowType(value);
							}}
							placeholder={{
								label: strings.all,
								value: ""
							}}
							placeholderTextColor={colors.darkViolet}
							items={showTypes}
							style={{
								...pickerSelectStyles
							}}
							Icon={() => (
								<View>
									<SimpleLineIcons
										name="arrow-down"
										size={15}
										style={{
											alignSelf: "center",
											transform: [{ rotate: "0deg" }]
										}}
									/>
								</View>
							)}
						>
							{/* <View style={{borderWidth: 1}}>
                                <Text>some</Text>
                            </View> */}
						</RNPickerSelect>
					)}
				</View>
			</View>
			<View style={styles.bottom}>
				<SearchBar />
				<View style={styles.iconWrapper}>
					<AntDesign
						name="filter"
						size={23}
						style={{
							color: colors.lightGrayText
						}}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		paddingHorizontal: 20
	},
	top: {
		justifyContent: "space-between",
		flexDirection: "row"
	},
	titleWrapper: {
		paddingVertical: 7,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.darkViolet,
		paddingHorizontal: 10
	},
	bottom: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	iconWrapper: {
		paddingHorizontal: 14,
		justifyContent: "center"
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputAndroid: {
		fontSize: 16,
		padding: 10,
		borderRadius: 4,
		backgroundColor: colors.white,
		color: colors.darkViolet,
		borderWidth: 0,
		textAlign: "right",
		marginRight: 10,
		fontFamily: "Rubik-Medium",
		paddingRight: 30,
		right: -20,
		width: 150
	},
	headlessAndroidContainer: {
		flexDirection: "row",
		position: "relative"
	},
	iconContainer: {
		top: 17
	}
});

export default withNavigation(InnerHeader);
