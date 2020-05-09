import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ActivityIndicator,
	TouchableOpacity
} from "react-native";
import {
	showModal,
	showMessage,
	hideModal
} from "../../redux/actions/appState";
import { connect } from "react-redux";
import { url } from "../../api/configs";
import Pdf from "react-native-pdf";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import requests from "../../api/requests";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

const PdfView = ({ user, showModal, navigation, showMessage, hideModal }) => {
	let docId = navigation.getParam("docId");
	let [baseFile, setBaseFile] = useState({});
	console.warn(docId);
	useEffect(() => {
		loadFile();
	}, []);

	const loadFile = async () => {
		showModal(strings.loadingPdf);
		try {
			let res = await requests.pdf.loadFile(user.token, docId);
			let newRes = res.json();
			setBaseFile(newRes.base64);
			console.warn(newRes.base64);
			hideModal();
		} catch (error) {
			hideModal();
			showMessage({
				message: error.response,
				type: colors.killerRed
			});
		}
	};

	const onBackPress = () => {
		navigation.goBack();
	};

	const onCopyPress = () => {};
	const onEditPress = () => {};
	const onSubscribePress = () => {};
	const onDeletePress = () => {};
	const onPrintPress = () => {};

	return (
		<View style={styles.container}>
			<View style={styles.topPanel}>
				<View style={styles.iconWrapper}>
					<TouchableOpacity onPress={onBackPress}>
						<View
							style={{
								backgroundColor: colors.white,
								padding: 8
							}}
						>
							<Feather
								name="arrow-left"
								color={colors.black}
								size={18}
							/>
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.right}>
					<View style={styles.iconWrapper}>
						<TouchableOpacity onPress={onCopyPress}>
							<View
								style={{
									backgroundColor: colors.white,
									padding: 8
								}}
							>
								<AntDesign
									name="copy1"
									color={colors.linearBlue1}
									size={18}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.iconWrapper}>
						<TouchableOpacity onPress={onEditPress}>
							<View
								style={{
									backgroundColor: colors.white,
									padding: 8
								}}
							>
								<AntDesign
									name="edit"
									color={colors.black}
									size={18}
									color={colors.gold}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.iconWrapper}>
						<TouchableOpacity onPress={onEditPress}>
							<View
								style={{
									backgroundColor: colors.white,
									padding: 8
								}}
							>
								<AntDesign
									name="notification"
									color={colors.black}
									size={18}
									color={colors.green}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.iconWrapper}>
						<TouchableOpacity onPress={onEditPress}>
							<View
								style={{
									backgroundColor: colors.white,
									padding: 8
								}}
							>
								<AntDesign
									name="delete"
									color={colors.black}
									size={18}
									color={colors.killerRed}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.iconWrapper}>
						<TouchableOpacity onPress={onEditPress}>
							<View
								style={{
									backgroundColor: colors.white,
									padding: 8
								}}
							>
								<AntDesign
									name="printer"
									color={colors.black}
									size={18}
									color={colors.blueish}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<Pdf
				source={{ uri: `data:application/pdf;base64,${baseFile}` }}
				onLoadComplete={(numberOfPages, filePath) => {
					console.warn(`number of pages: ${numberOfPages}`);
				}}
				onPageChanged={(page, numberOfPages) => {
					console.warn(`current page: ${page}`);
				}}
				onPressLink={uri => {
					console.warn(`Link presse: ${uri}`);
				}}
				onError={error => {
					showMessage({
						message: error.response,
						type: colors.killerRed
					});
				}}
				activityIndicator={e => {
					return (
						<View>
							<Text>asdas</Text>
						</View>
					);
				}}
				enablePaging
				style={styles.pdf}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center"
	},
	pdf: {
		flex: 1,
		backgroundColor: "white",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},
	topPanel: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 5,
		paddingLeft: 10,
		backgroundColor: colors.white,
		elevation: 10
	},
	right: {
		flexDirection: "row"
	},
	iconWrapper: {
		borderRadius: 40,
		overflow: "hidden",
		marginRight: 10,
		elevation: 4
	}
});

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchTopProps = {
	showModal,
	showMessage,
	hideModal
};

export default connect(
	mapStateToProps,
	mapDispatchTopProps
)(PdfView);
