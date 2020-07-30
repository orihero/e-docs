import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
	PermissionsAndroid,
	Platform
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
import { boxTypes, docStatus } from "../../redux/reducers/documents";
import { append, attach, sign } from "../../utils/signProvider";

const PdfView = ({
	user,
	showModal,
	navigation,
	showMessage,
	hideModal,
	documents: { boxType, status, ...documents }
}) => {
	let [baseFile, setBaseFile] = useState({});
	const [comment, setComment] = useState("");
	const [documentContent, setDocumentContent] = useState({});
	let document = navigation.getParam("document") || {};
	let { _id: docId, type } = document;
	let { token } = user;
	useEffect(() => {
		loadFile();
		requests.doc
			.getContent(document.type, docId, token)
			.then(res => {
				setDocumentContent(res.json());
			})
			.catch(e => showMessage(e.message));
	}, []);

	const loadFile = async () => {
		showModal(strings.loadingPdf);
		try {
			let res = await requests.pdf.loadFile(token, docId, type);
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
		navigation.navigate("Edit", {
			document: documentContent,
			isCopy: true
		});
	};
	const requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				{
					title: "E-DOCS",
					message: strings.writeToStoragePermission,
					buttonNegative: strings.cancel,
					buttonPositive: strings.allow
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the camera");
			} else {
				console.log("Camera permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	};

	let onDownloadPress = async () => {
		showModal(strings.loadingPdf);
		await requestCameraPermission();
		try {
			let filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/`;
			let fileName = `${type}.${docId}.pdf`;
			let res = await RNFetchBlob.fs.writeFile(
				filePath + fileName,
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
		navigation.navigate("Edit", { document: documentContent });
	};
	/**
	 ** Sign the document
	 */
	const onSubscribePress = async () => {
		if (Platform.OS === "ios") {
			return;
		}
		showModal(strings.loading);
		console.log(
			"SIGNING BEGINS",
			boxType == boxTypes.IN && document.status == docStatus.SENT
		);
		try {
			let signResult = ""; // Результат подпcи
			console.log(
				"BOX TYPE ",
				boxType === boxTypes.OUT && document.status === docStatus.DRAFTS
			);
			console.log("SIGNING DATA", documentContent.data);
			if (
				boxType === boxTypes.OUT &&
				document.status === docStatus.DRAFTS
			) {
				// если исходящий черновик
				signResult = await sign(JSON.stringify(documentContent.data)); // подписываем струку json
			} else if (
				boxType == boxTypes.IN &&
				document.status == docStatus.SENT &&
				documentContent.type == "empowerment"
			) {
				// если входящая доверенность подписывается агентом, получаем файл подписи с сервера и добавляем к ней подписть
				let agent = documentContent.targetTins.find(
					obj => obj.side === "agent"
				);
				console.log("tin agent", user.tin, agent);
				let sign = await requests.doc.getSignedFile(
					"empowerment",
					docId,
					user.tin == agent.tin ? "agent" : "seller"
				);
				if (!sign) return;
				signResult = await append(sign);
			} else if (
				boxType == boxTypes.IN &&
				documentContent.status == docStatus.SENT
			) {
				// если любой входящий документ, добавляем подпись
				console.log("CALLING APPEND WITH:", documentContent.sign);

				try {
					signResult = await append(documentContent.sign);
				} catch (error) {
					console.log({ error });
				}
			}
			if (signResult) {
				console.log("GOT SIGN");
				//Fetching timestamp from the server
				let timestampResponse = await requests.doc.getTimestamp({
					signatureHex: signResult.signature
				});
				//Attaching timestamp
				let attachedSign = await attach(
					timestampResponse.json().timestamp_token_64
				);
				// если  все окей, отправляем на сервер
				let signResponse = (await requests.doc.signDocument(
					token,
					type,
					docId,
					{
						pkcs7: attachedSign.pkcs7
					}
				)).json();

				//TODO implement getStats
				// this.getStats(documentContent.type);
				hideModal();
				if (!signResponse.success) {
					showMessage({
						type: colors.killerRed,
						message: signResponse.errors.msg
					});
					console.log({ err: signResponse.errors.msg });
					return;
				}
				showMessage({
					type: colors.green,
					message: strings.signedSuccessfully
				});
				navigation.navigate("List", { reload: true });
			}
		} catch (error) {
			console.log(error);
			hideModal();
		}
	};
	//Вот логика отклонения документа
	const onDeletePress = async () => {
		if (Platform.OS === "ios") {
			return;
		}
		if (
			boxType === boxTypes.IN &&
			documentContent.status === docStatus.SENT
		) {
			if (!comment) {
				showMessage({
					type: colors.killerRed,
					message: strings.writeComment
				});
				return;
			}
			showModal(strings.loading);
			try {
				let signedData = {
					// структура, которая подписывается
					Notes: comment // комментарий
				};
				let nameData = "Data";
				if (documentContent.type == "factura") {
					nameData = "Factura";
				} else if (documentContent.type == "empowerment") {
					nameData = "Empowerment";
				} else if (documentContent.type == "waybill") {
					nameData = "Waybill";
				} else if (documentContent.type == "actGoodsAcceptance") {
					nameData = "actGoodsAcceptance";
				} else if (documentContent.type == "actWorkPerformed") {
					nameData = "Act";
				}
				signedData[nameData] = documentContent.data; // это та же структура которая создается при отправке документа, указана в файлах
				const signResult = await sign(JSON.stringify(signedData)); // подписываем
				if (signResult) {
					let timestampResponse = await requests.doc.getTimestamp({
						signatureHex: signResult.signature
					});
					//Attaching timestamp
					let attachedSign = await attach(
						timestampResponse.json().timestamp_token_64
					);
					// если все окей, отправляем на сервер
					let rejectResponse = (await requests.doc.rejectDocument(
						token,
						type,
						docId,
						{
							pkcs7: attachedSign.pkcs7
						}
					)).json();
					if (rejectResponse.errors) {
						console.log(rejectResponse.errors.msg);
					}
					hideModal();
					navigation.navigate("List", { reload: true });
					showMessage({
						type: colors.green,
						message: strings.rejectedSuccessfully
					});
				}
			} catch (error) {
				hideModal();
			}
		} else {
			showModal(strings.loading);
			try {
				const signResult = await sign(
					JSON.stringify(documentContent.data)
				);
				let delRes = (await requests.doc.delete(
					token,
					documentContent.type,
					documentContent._id,
					{ pkcs7: signResult.pkcs7 }
				)).json();
				console.warn(delRes);
				if (!delRes.success) {
					showMessage({
						type: colors.killerRed,
						message: delRes.errors.msg
					});
					return;
				}
				showMessage({
					type: colors.green,
					message: strings.deletedSuccessfully
				});
				navigation.navigate("List", { reload: true });
			} catch (error) {}
			return;
		}
	};

	let renderAccept =
		(documentContent.status === docStatus.SENT &&
			boxType === boxTypes.IN) ||
		(boxType === boxTypes.OUT &&
			documentContent.status === docStatus.DRAFTS);
	let renderReject =
		(documentContent.status === docStatus.SENT &&
			boxType === boxTypes.OUT) ||
		(documentContent.status === docStatus.SENT &&
			boxType === boxTypes.IN) ||
		(boxType === boxTypes.OUT &&
			documentContent.status === docStatus.DRAFTS);
	let { width, height } = Dimensions.get("window");
	let renderUniversal = () => {
		if (documentContent.type === "universal") {
			if (documentContent.data.file.filetype.split("/")[0] === "image") {
				return (
					<Image
						style={{ width, height }}
						source={{
							uri: `data:${
								documentContent.data.file.filetype
							};base64,${documentContent.data.file.filebase64}`
						}}
					/>
				);
			}
			return (
				<Pdf
					source={{
						uri: `data:${
							documentContent.data.file.filetype
						};base64,${documentContent.data.file.filebase64}`
					}}
					onError={error => {}}
					activityIndicator={e => {
						return <View />;
					}}
					enablePaging
					style={styles.pdf}
				/>
			);
		}
		return null;
	};
	return (
		<View style={styles.container}>
			<View style={styles.topPanel}>
				<View style={styles.panelContent}>
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
						{boxType === boxTypes.OUT && (
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
						)}
						{documentContent.status === docStatus.DRAFTS &&
							boxType === "out" && (
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
							)}
						{renderAccept && (
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
						)}
						{renderReject && (
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
						)}
						<View style={styles.iconWrapper}>
							<TouchableOpacity onPress={onDownloadPress}>
								<View
									style={{
										backgroundColor: colors.white,
										padding: 8
									}}
								>
									<AntDesign
										name="clouddownload"
										color={colors.black}
										size={18}
										color={colors.blueish}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<TextInput
					value={comment}
					onChangeText={setComment}
					placeholder={strings.comment}
					underlineColorAndroid={colors.blueish}
					style={styles.comment}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Pdf
						source={{
							uri: `data:application/pdf;base64,${baseFile}`
						}}
						onError={error => {}}
						activityIndicator={e => {
							return <View />;
						}}
						enablePaging
						style={styles.pdf}
					/>
					{renderUniversal()}
				</ScrollView>
			</View>
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
		paddingVertical: 5,
		paddingLeft: 10,
		backgroundColor: colors.white,
		elevation: 10,
		width: "100%",
		shadowColor: colors.black,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 5,
			width: 0
		}
	},
	panelContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	right: {
		flexDirection: "row"
	},
	iconWrapper: {
		borderRadius: 40,
		overflow: "hidden",
		marginRight: 10,
		elevation: 4,
		shadowColor: colors.black,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 5,
			width: 0
		}
	},
	comment: {
		marginTop: 15
	}
});

const mapStateToProps = ({ user, documents }) => ({ user, documents });

const mapDispatchTopProps = {
	showModal,
	showMessage,
	hideModal
};

export default connect(
	mapStateToProps,
	mapDispatchTopProps
)(PdfView);
