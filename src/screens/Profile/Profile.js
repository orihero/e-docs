import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import requests from "../../api/requests";
import CustomSwitch from "../../components/common/CustomSwitch";
import RectangleButton from "../../components/common/RectangleButton";
import Text from "../../components/common/Text";
import FieldsRenderer, {
	FieldSize,
	FieldType
} from "../../components/generators/FieldsRenderer";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import {
	setSettingsValue,
	showMessage,
	userLoggedOut
} from "../../redux/actions";
const messageList = [
	// {
	// 	id: 1,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "signed"
	// },
	// {
	// 	id: 2,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "rejected"
	// },
	// {
	// 	id: 3,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "received"
	// },
	// {
	// 	id: 4,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "signed"
	// },
	// {
	// 	id: 5,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "rejected"
	// },
	// {
	// 	id: 6,
	// 	name: 'OOO "FIDES"',
	// 	date: "16.02.2020",
	// 	amount: "1 450 000 сум",
	// 	mid: "123-20/20",
	// 	status: "received"
	// }
];

let fields = [
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		disabled: true,
		name: "tin"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		disabled: true,
		name: "name"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.phone,
		size: FieldSize.FULL,
		disabled: true,
		name: "mobile"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.workingPhone,
		size: FieldSize.FULL,
		disabled: true,
		name: "phone"
	},
	{
		type: FieldType.SELECT,
		placeholder: strings.bank,
		size: FieldSize.FULL,
		disabled: true,
		name: "bankId",
		fetch: requests.account.getBanks,
		map: (e, index) => ({
			label: e.nameRU,
			value: e.bankId
		})
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.account,
		size: FieldSize.FULL,
		disabled: true,
		name: "account"
	},
	{
		type: FieldType.SELECT,
		placeholder: strings.region,
		size: FieldSize.FULL,
		name: "regionId",
		fetch: requests.account.getRegions,
		map: (e, index) => ({
			label: e.nameRU,
			value: e.regionId
		}),
		disabled: true
	},
	{
		type: FieldType.SELECT,
		placeholder: strings.district,
		size: FieldSize.FULL,
		disabled: true,
		name: "districtId",
		fetch: requests.account.getDistricts,
		map: (e, index) => ({
			label: e.nameRU,
			value: e.districtId
		}),
		disabled: true
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.address,
		size: FieldSize.FULL,
		disabled: true,
		name: "address"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.oked,
		size: FieldSize.FULL,
		disabled: true,
		name: "oked"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.director,
		size: FieldSize.FULL,
		disabled: true,
		name: "director"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.accountant,
		size: FieldSize.FULL,
		disabled: true,
		name: "accountant"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.itemReleased,
		size: FieldSize.FULL,
		disabled: true,
		name: "itemReleased"
	},
	{
		type: FieldType.CHECKBOX,
		placeholder: strings.vat,
		size: FieldSize.FULL,
		disabled: true,
		title: strings.vat,
		name: "vat"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.vatRegCode,
		size: FieldSize.FULL,
		disabled: true,
		name: "vatRegCode"
	}
];

const Profile = ({
	user,
	dispatch,
	navigation,
	settings,
	setSettingsValue,
	showMessage,
	userLoggedOut
}) => {
	let logout = () => {
		userLoggedOut();
		navigation.navigate("Login");
	};

	const save = async () => {
		try {
			await AsyncStorage.setItem("@settings", JSON.stringify(settings));
			showMessage({
				type: colors.green,
				message: strings.savedSuccessfully
			});
		} catch (error) {}
	};

	console.log(
		`\n\n\n*********************\n*************`,
		{ settings },
		`******************\n***********\n\n`
	);

	return (
		<View style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					padding: 10,
					paddingVertical: Platform.OS === "android" ? 10 : 40
				}}
			>
				{!!user.tin && (
					<FieldsRenderer fields={fields} initialValue={user} />
				)}
				<View style={styles.settings}>
					<Text style={styles.title}>{strings.documentSettings}</Text>
					{!!settings &&
						Object.entries(settings).map((e, index) => {
							if (index >= Object.entries(settings).length - 1) {
								return null;
							}
							return (
								<View style={styles.switchWrapper} key={e[0]}>
									<Text style={styles.switchText}>
										{e[1].text}
									</Text>
									<CustomSwitch
										value={e[1].value}
										onValueChange={() => {
											let value = {
												text: e[1].text,
												value: !e[1].value
											};
											setSettingsValue({
												key: e[0],
												value
											});
										}}
									/>
								</View>
							);
						})}
				</View>
				<RectangleButton
					backColor={colors.paleGreen}
					text={strings.save}
					onPress={save}
					style={{
						marginTop: 20,
						marginHorizontal: 20
					}}
				/>
				<RectangleButton
					backColor={colors.jeansBlue}
					text={strings.logout}
					onPress={logout}
					style={{
						marginTop: 20,
						marginHorizontal: 20
					}}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	settings: { padding: 20 },
	container: {
		flex: 1,
		backgroundColor: colors.lightBlueBackground
	},
	cardWrapper: {
		flex: 1
	},
	title: {
		fontSize: 20,
		fontWeight: "bold"
	},
	switchWrapper: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 5
	}
});

const mapStateToProps = ({ user, appState }) => ({
	user,
	settings: appState.settings
});

const mapDispatchToProps = {
	setSettingsValue,
	showMessage,
	userLoggedOut
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
