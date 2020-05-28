import React, { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Modal,
	TextInput
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
import { sign, append, attach } from "../../utils/signProvider";

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
			let res = await requests.pdf.loadFile(token, docId);
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
		alert("Not implemented");
	};
	const onSubscribePress = async () => {
		showModal(strings.loading);
		console.log(
			"SIGNING BEGINS",
			boxType == boxTypes.IN && status == docStatus.SENT
		);
		try {
			let signResult = ""; // Результат подпcи
			if (boxType === boxTypes.OUT && status === docStatus.DRAFTS) {
				// если исходящий черновик
				signResult = await sign(JSON.stringify(documentdata)); // подписываем струку json
			} else if (
				boxType == boxTypes.IN &&
				status == docStatus.SENT &&
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
				//Fetching timestamp from the server
				let timestampResponse = await requests.doc.getTimestamp({
					signatureHex: signResult.signature
				});
				console.log({
					timestampResponse: timestampResponse.json()
						.timestamp_token_64
				});

				//Attaching timestamp
				let attachedSign = await attach(
					timestampResponse.json().timestamp_token_64
				);
				// если  все окей, отправляем на сервер
				let signResponse = await requests.doc.signDocument(
					token,
					type,
					docId,
					{
						pkcs7: attachedSign.pkcs7
					}
				);
				//TODO implement getStats
				// this.getStats(documentContent.type);
				console.log(signResponse.json());
			}
		} catch (error) {
			console.log(error.message, error);
		} finally {
			hideModal();
		}
	};
	const onDeletePress = async () => {
		//Вот логика отклонения документа
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
			nameData = "Waybill";
		} else if (documentContent.type == "actWorkPerformed") {
			nameData = "Act";
		}
		signedData[nameData] = documentContent.data; // это та же структура которая создается при отправке документа, указана в файлах
		const signResult = await sign(JSON.stringify(signedData)); // подписываем
		console.log({ signResult });

		// if (signResult) {
		// 	// если все окей, отправляем на сервер
		// 	await requests.doc.rejectDocument(token, type, docId, {
		// 		pkcs7: signResult.pkcs7
		// 	});
		// }
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
						{/* <View style={styles.iconWrapper}>
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
					</View> */}
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
		paddingVertical: 5,
		paddingLeft: 10,
		backgroundColor: colors.white,
		elevation: 10,
		width: "100%"
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
		elevation: 4
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
