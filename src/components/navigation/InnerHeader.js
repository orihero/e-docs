import React, { useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Picker } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import Text from "../common/Text";
import SearchBar from "./SearchBar";
import { withNavigation } from "react-navigation";
import CustomPicker from "../common/CustomPicker";

export let docTypes = [
	{
		label: strings.all,
		value: "all"
	},
	{
		label: strings.factura,
		value: "FACTURA"
	},
	{
		label: strings.empowerment,
		value: "EMPOWERMENT"
	},
	{
		label: strings.universal,
		value: "UNIVERSAL"
	},
	{
		label: strings.actWorkPerformed,
		value: "ACTWORKPERFORMED"
	},
	{
		label: strings.actGoodsAcceptance,
		value: "ACTGOODSACCEPTANCE"
	},
	{
		label: strings.waybill,
		value: "WAYBILL"
	},
	{
		label: strings.customerOrder,
		value: "CUSTOMERORDER"
	}
];
const InnerHeader = ({
	currentPage,
	setShowType,
	showTypes,
	navigation,
	onSearch,
	onFilter,
	showType,
	recursive,
	filter
}) => {
	let filterRef = useRef(null);

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
						<CustomPicker
							items={showTypes}
							placeholder={strings.all}
							onValueChange={setShowType}
							value={showType}
							recursive={recursive}
						/>
					)}
				</View>
			</View>
			<View style={styles.bottom}>
				<SearchBar value={filter} onSearch={onSearch} />
				<CustomPicker
					items={docTypes}
					onValueChange={value => {
						onFilter(value);
					}}
				>
					<View style={styles.iconWrapper}>
						<AntDesign
							name="filter"
							size={23}
							style={{
								color: colors.lightGrayText
							}}
						/>
					</View>
				</CustomPicker>
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
		flexDirection: "row",
		alignItems: "center"
	},
	titleWrapper: {
		paddingVertical: 7,
		flexDirection: "row",
		justifyContent: "space-between"
		// alignItems: "center"
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
		paddingTop: 6,
		paddingHorizontal: 14,
		justifyContent: "center"
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputAndroid: {
		fontSize: 14,
		padding: 10,
		backgroundColor: colors.white,
		color: colors.darkViolet,
		borderWidth: 0,
		marginRight: 10,
		width: "60%"
	},
	iconContainer: {
		top: 17
	}
});

export default withNavigation(InnerHeader);

// <RNPickerSelect
// 							useNativeAndroidPickerStyle={false}
// 							onValueChange={value => {
// 								setShowType(value);
// 							}}
// 							placeholder={{
// 								label: strings.all,
// 								value: "all"
// 							}}
// 							placeholderTextColor={colors.darkViolet}
// 							items={showTypes}
// 							style={pickerSelectStyles}
// 							Icon={() => (
// 								<View>
// 									<SimpleLineIcons
// 										name="arrow-down"
// 										size={15}
// 									/>
// 								</View>
// 							)}
// 						/>
