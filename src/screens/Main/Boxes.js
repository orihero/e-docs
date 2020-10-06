import React, { useEffect } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import { connect } from "react-redux";
import { prodUrl, url } from "../../api/configs";
import requests from "../../api/requests";
import images from "../../assets/images";
import Text from "../../components/common/Text";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import {
	documentsCountLoaded,
	documentsLoaded,
	hideMessage,
	hideModal,
	showMessage,
	showModal,
	userLoaded
} from "../../redux/actions";
import { boxTypes } from "../../redux/reducers/documents";

const { width: deviceWidth, height } = Dimensions.get("window");

const Main = ({
	navigation,
	user,
	doc,
	count,
	documentsCountLoaded,
	hideModal,
	showModal,
	userLoaded,
	documentsLoaded,
	settings
}) => {
	let getStats = async () => {
		showModal(strings.loading);
		try {
			let res = await requests.doc.getStats(
				user.token,
				settings.url.value ? url : prodUrl
			);
			documentsCountLoaded(res.json());
			hideModal();
		} catch (error) {
			hideModal();
			showMessage({ message: error.message, type: colors.killerRed });
			console.warn(error.response);
		}
	};

	const getProfile = async () => {
		showModal(strings.loadingProfile);
		try {
			let res = await requests.account.getProfile(
				user.token,
				settings.url.value ? url : prodUrl
			);
			let newRes = res.json();
			userLoaded(newRes);
			hideModal();
		} catch (error) {
			hideModal();
			showMessage({
				message: error.message,
				type: colors.killerRed
			});
		}
	};

	useEffect(() => {
		getStats();
		getProfile();
	}, []);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={styles.container}
		>
			<Text style={styles.title}>{strings.mainMenu}</Text>
			<View style={styles.gridWrapper}>
				<TouchableOpacity
					onPress={() => {
						documentsLoaded({
							data: [],
							boxType: boxTypes.IN
						});
						navigation.navigate("List", {
							title: strings.incoming
						});
					}}
				>
					<View style={styles.grid}>
						<View
							style={[
								styles.imageWrapper,
								{
									backgroundColor: colors.paleGreen
								}
							]}
						>
							<Image
								style={styles.image}
								source={images.downloadIcon}
							/>
						</View>
						<Text style={styles.name}>{strings.incoming}</Text>
						<Text style={styles.info}>
							{strings.newDocuments}{" "}
							<Text style={{ ...styles.info, fontWeight: "700" }}>
								{count.in.sended}
							</Text>
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						documentsLoaded({
							data: [],
							boxType: boxTypes.OUT
						});
						navigation.navigate("List", {
							title: strings.outgoing
						});
					}}
				>
					<View style={styles.grid}>
						<View
							style={[
								styles.imageWrapper,
								{
									backgroundColor: colors.mediumPurple
								}
							]}
						>
							<Image
								style={styles.image}
								source={images.uploadIcon}
							/>
						</View>
						<Text style={styles.name}>{strings.outgoing}</Text>
						<Text style={styles.info}>
							{strings.documentsWaiting}{" "}
							<Text style={{ ...styles.info, fontWeight: "700" }}>
								{count.out.deleted + count.out.drafts}
							</Text>
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={[styles.gridWrapper]}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Product");
					}}
				>
					<View style={styles.grid}>
						<View
							style={[
								styles.imageWrapper,
								{
									backgroundColor: colors.palePeachOrange
								}
							]}
						>
							<Image
								style={styles.image}
								source={images.shoppingCart}
							/>
						</View>
						<Text style={styles.name}>{strings.products}</Text>
						<Text style={styles.info}>
							{strings.activation} {strings.here}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.lightBlueBackground,
		paddingTop: 10
	},
	title: {
		color: colors.violetGrayText,
		fontWeight: "600",
		fontSize: 14,
		paddingVertical: 10,
		paddingLeft: 20,
		paddingBottom: 20
	},
	gridWrapper: {
		backgroundColor: colors.blueishBackground,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20
	},
	grid: {
		backgroundColor: colors.white,
		width: (deviceWidth - 60) / 2,
		borderColor: colors.grayBorder,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		elevation: 2,
		borderRadius: 5,
		paddingVertical: 40,
		shadowColor: colors.grayText,
		shadowOpacity: 0.4,
		shadowOffset: { height: 0, width: 0 },
		shadowRadius: 10
	},
	imageWrapper: {
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		borderRadius: 40,
		marginBottom: 5
	},
	image: {
		height: 30,
		width: 30
	},
	name: {
		color: colors.blackText,
		fontSize: 17,
		fontWeight: "600"
	},
	info: {
		fontSize: 12,
		color: colors.grayText,
		textAlign: "center"
	}
});

const mapStateToProps = state => {
	return {
		user: state.user,
		doc: state.documents,
		count: state.documents.count,
		settings: state.appState.settings
	};
};

const mapDispatchToProps = {
	hideModal,
	showModal,
	hideMessage,
	showMessage,
	documentsCountLoaded,
	documentsLoaded,
	userLoaded
};

let ConnectedMain = connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);

export default ConnectedMain;

/**
 * <View style={styles.gridWrapper}>
				<View style={styles.grid}>
					<TouchableWithoutFeedback
						onPress={() => {
							navigation.navigate("Product");
						}}
					>
						<>
							<View
								style={[
									styles.imageWrapper,
									{
										backgroundColor: colors.palewinterWizard
									}
								]}
							>
								<Image
									style={styles.image}
									source={images.tagIcon}
								/>
							</View>
							<Text style={styles.name}>
								{strings.subscription}
							</Text>
							<Text style={styles.info}>
								{strings.left} 16 {strings.days}
							</Text>
						</>
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.grid}>
					<View
						style={[
							styles.imageWrapper,
							{
								backgroundColor: colors.palePeachOrange
							}
						]}
					>
						<Image style={styles.image} source={images.bellIcon} />
					</View>
					<Text style={styles.name}>{strings.promoCodes}</Text>
					<Text style={styles.info}>
						{strings.activation} {strings.here}
					</Text>
				</View>
			</View>
			
 */
