import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	Linking,
	StyleSheet,
	TouchableWithoutFeedback,
	View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import FA from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import images from "../../assets/images";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import {
	hideNotification,
	setSettingsValue,
	showMessage
} from "../../redux/actions";
import NotificationCard from "../cards/NotificationCard";
import CustomSwitch from "../common/CustomSwitch";
import Text from "../common/Text";

let socials = [
	{
		name: "facebook-f",
		color: "white",
		link: "http://facebook.com/edocs.uz",
		size: 20,
		style: {
			marginHorizontal: 10
		},
		contentContainerStyle: {
			borderRadius: 20,
			backgroundColor: "black",
			borderRadius: 30,
			width: 40,
			height: 40,
			justifyContent: "center",
			marginHorizontal: 10,
			alignItems: "center"
		}
	},
	{
		name: "youtube-play",
		link:
			"https://www.youtube.com/playlist?list=PLgRiX5f7gPW8pIsb1A-baEVO0gVwFXFel",
		size: 20,
		color: "white",
		style: { marginHorizontal: 10 },
		contentContainerStyle: {
			borderRadius: 20,
			backgroundColor: "black",
			borderRadius: 30,
			width: 40,
			height: 40,
			justifyContent: "center",
			marginHorizontal: 10,
			alignItems: "center"
		}
	},
	{
		name: "instagram",
		color: "white",
		link: "http://instagram.com/edocs.uz/",
		size: 20,
		style: {},
		contentContainerStyle: {
			borderRadius: 20,
			backgroundColor: "black",
			borderRadius: 30,
			width: 40,
			height: 40,
			justifyContent: "center",
			alignItems: "center",
			marginHorizontal: 10
		}
	},
	{
		name: "telegram",
		link: "https://t.me/edocs_uz",
		size: 40,
		style: { marginHorizontal: 10 }
	}
];

const Header = ({ appState, user, setSettingsValue, showMessage }) => {
	const [modalVisible, setModalVisible] = useState(false);

	let toggleModal = () => setModalVisible(!modalVisible);

	useEffect(() => {
		console.log("CHANGE SETTINGS", appState.settings.url);
	}, [appState]);

	const save = value => {
		try {
			let item = JSON.stringify({
				...appState.settings,
				url: { ...appState.settings.url, value }
			});
			console.log("SETTING", appState.settings.url);
			AsyncStorage.setItem("@settings", item);
			showMessage({
				type: colors.green,
				message: strings.savedSuccessfully
			});
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<LinearGradient
			start={{ x: 0, y: 0 }}
			end={{ x: 0.5, y: 1 }}
			colors={[
				colors.linearBlue1,
				colors.linearBlue2,
				colors.linearBlue3
			]}
			style={styles.container}
		>
			<SafeAreaView forceInset={{ top: "always", bottom: "never" }}>
				<View style={styles.roundOne} />
				<View style={styles.roundTwo} />
				<View
					style={[
						styles.main,
						appState.notification && {
							paddingBottom: 15
						}
					]}
				>
					<View style={styles.titleWrapper}>
						<Text style={styles.title}>{user.name}</Text>
						{user.tin && (
							<Text style={styles.subTitle}>
								{strings.inn} {user.tin}
							</Text>
						)}
					</View>
					<View style={styles.imageWrapper}>
						<TouchableWithoutFeedback onPress={toggleModal}>
							<Image
								style={styles.image}
								source={images.logoRound}
							/>
						</TouchableWithoutFeedback>
					</View>
				</View>
				{appState.notification ? (
					<View style={styles.secondary}>
						<NotificationCard hideNotification={hideNotification} />
					</View>
				) : (
					<></>
				)}
				<Modal
					onBackButtonPress={toggleModal}
					isVisible={modalVisible}
					onBackdropPress={toggleModal}
				>
					<View style={styles.modalContainer}>
						<Image
							style={styles.modalImage}
							source={images.appImage}
						/>
						<Text
							onPress={() =>
								Linking.openURL("tel://+998933815454")
							}
							style={styles.phone}
						>
							+998 (93) 381-54-54
						</Text>
						<View style={styles.row}>
							{socials.map(e => (
								<TouchableWithoutFeedback
									onPress={() => Linking.openURL(e.link)}
								>
									<View style={e.contentContainerStyle}>
										<FA {...e} />
									</View>
								</TouchableWithoutFeedback>
							))}
						</View>
						<View style={styles.switchWrapper}>
							<Text style={styles.switchText}>
								{appState.settings.url.text}
							</Text>
							<CustomSwitch
								value={!!appState.settings.url.value}
								onValueChange={() => {
									let value = {
										text: appState.settings.url.text,
										value: !appState.settings.url.value
									};
									setSettingsValue({
										key: "url",
										value
									});
									save(value.value);
								}}
							/>
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	modalTitle: {
		fontSize: 17
	},
	phone: {
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		paddingVertical: 30
	},
	modalImage: {
		width: Dimensions.get("window").width - 100,
		height: (Dimensions.get("window").width - 100) / 2.97
	},
	modalContainer: {
		backgroundColor: colors.white,
		padding: 15,
		borderRadius: 8
	},
	container: {
		paddingVertical: 15,
		paddingHorizontal: 20
	},
	roundOne: {
		position: "absolute",
		padding: 90,
		borderRadius: 90,
		marginTop: -90,
		marginLeft: -50,
		backgroundColor: colors.transparent
	},
	roundTwo: {
		position: "absolute",
		padding: 45,
		borderRadius: 45,
		marginTop: -20,
		right: 0,
		marginRight: -10,
		backgroundColor: colors.transparent
	},
	main: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
		alignItems: "center"
	},
	titleWrapper: {
		maxWidth: 250
	},
	title: {
		fontSize: 17,
		color: colors.white,
		fontFamily: "Rubik-Regular"
	},
	subTitle: {
		fontSize: 14,
		color: colors.white,
		fontFamily: "Rubik-Regular"
	},
	imageWrapper: {
		height: 50,
		width: 50,
		borderRadius: 50
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 50
	},
	secondary: {
		paddingTop: 10
	},
	switchWrapper: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 20,
		justifyContent: "center"
	}
});

let mapStateToProps = state => {
	return {
		appState: state.appState,
		user: state.user
	};
};
let mapDispatchToProps = {
	hideNotification,
	setSettingsValue,
	showMessage
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
