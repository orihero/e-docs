import React, { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import Pdf from "react-native-pdf";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import requests from "../../api/requests";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import {
	hideModal,
	showMessage,
	showModal
} from "../../redux/actions/appState";

const PdfView = ({ user, showModal, navigation, showMessage, hideModal }) => {
	let [baseFile, setBaseFile] = useState({});
	const [documentContent, setDocumentContent] = useState({});
	let document = navigation.getParam("document") || {};
	let { _id: docId } = document;
	useEffect(() => {
		loadFile();
		requests.doc
			.getContent(document.type, document._id, user.token)
			.then(res => {
				setDocumentContent(res.json());
			})
			.catch(e => showMessage(e.message));
	}, []);

	const loadFile = async () => {
		showModal(strings.loadingPdf);
		try {
			let res = await requests.pdf.loadFile(user.token, docId);
			let newRes = res.json();
			setBaseFile(newRes.base64);
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

	/**
	 ** Save the file to device's storage
	 */
	const onCopyPress = async () => {
		showModal(strings.loadingPdf);
		try {
			let fileName = `${RNFetchBlob.fs.dirs.DownloadDir}/${docId}.pdf`;
			let res = await RNFetchBlob.fs.writeFile(
				fileName,
				baseFile,
				"base64"
			);
			showMessage({
				type: colors.green,
				message: `${strings.downloadedSuccessfully}: ${fileName}`
			});
		} catch (error) {
			showMessage({ type: colors.killerRed, message: error.message });
		} finally {
			hideModal();
		}
	};
	const onEditPress = () => {
		alert("Not implemented");
	};
	const onSubscribePress = async () => {
		// showModal(strings.loading);
		// Вот логика подписания на сайте
		let pkcs7 = ""; // Результат подпcи
		console.log(documentContent);

		if (documentContent)
			if (this.docIO == "out" && this.docStatus == "drafts") {
				// если исходящий черновик
				pkcs7 = await this.signData(JSON.stringify(data)); // подписываем струку json
			} else if (
				this.docIO == "in" &&
				this.docStatus == "sended" &&
				this.docType == "empowerment"
			) {
				// если входящая доверенность подписывается агентом, получаем файл подписи с сервера и добавляем к ней подписть
				let agent = this.editedDocument.targetTins.find(
					obj => obj.side === "agent"
				);
				console.log("tin agent", this.userTin, agent);
				let sign = await this.getSignedFile({
					type: "empowerment",
					id: this.editedDocument._id,
					side: this.userTin == agent.tin ? "agent" : "seller"
				});
				if (!sign) return;
				pkcs7 = await this.appendSign(sign);
			} else if (this.docIO == "in" && this.docStatus == "sended") {
				// если любой входящий документ, добавляем подпись
				pkcs7 = await this.appendSign(this.editedDocument.sign);
			}
		if (pkcs7) {
			// если  все окей, отправляем на сервер
			await this.signDocument({
				type: this.docType,
				id: this.docId,
				pkcs7
			});
			this.getStats(this.docType);
		}
	};
	const onDeletePress = () => {};

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
						<TouchableOpacity onPress={onSubscribePress}>
							<View
								style={{
									backgroundColor: colors.white,
									padding: 8
								}}
							>
								<AntDesign
									name="checkcircleo"
									color={colors.black}
									size={18}
									color={colors.green}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.iconWrapper}>
						<TouchableOpacity onPress={onDeletePress}>
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
