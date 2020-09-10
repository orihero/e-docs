import React, { Fragment, useEffect, useReducer, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import DocumentPicker from "react-native-document-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/SimpleLineIcons";
import RNFetchBlob from "rn-fetch-blob";
import colors from "../../constants/colors";
import { reducer, RESET, SET } from "../../utils/state";
import DefaultCheckbox from "../common/DefaultCheckbox";
import RectangularDatePicker from "../common/RectangularDatePicker";
import RectangularInput from "../common/RectangularInput";
import RectangularSelect from "../common/RectangularSelect";

export let FieldSize = {
	FULL: "full",
	HALF: "half",
	QUARTER: "quarter",
	QUERTER_THREE: "quarterThree"
};

export let FieldType = {
	INPUT: 1,
	SELECT: 2,
	COMPLEX: 3,
	LINE: 4,
	CHECKBOX: 5,
	FILE: 6,
	DATE_PICKER: 7,
	AUTOCOMPLETE: 8
};

const FieldsRenderer = ({ fields, footer: Footer, initialValue, token }) => {
	const [state, dispatch] = useReducer(reducer, initialValue || {});
	const [validations, setValidations] = useState();
	let initialItems = () =>
		fields.reduce((prev, current) => {
			if (
				current.type === FieldType.SELECT ||
				current.type === FieldType.AUTOCOMPLETE
			) {
				return {
					...prev,
					[current.name]:
						{ ...current, data: current.staticValue } || current
				};
			}
			return prev;
		}, {});

	const [items, dispatchItems] = useReducer(reducer, {}, initialItems);

	let fetchItems = () => {
		Object.keys(items).map(key => {
			if (typeof items[key].fetch === "function") {
				let param =
					items[key].fetchParamFromStateName &&
					items[items[key].fetchParamFromStateName].data &&
					items[items[key].fetchParamFromStateName].data[
						state[items[key].fetchParamFromStateName]
					]
						? items[items[key].fetchParamFromStateName].data[
								state[items[key].fetchParamFromStateName]
						  ].actualValue
						: null;
				if (items[key].fetchParamFromStateName && !param) {
					//* It means first render
					param = state[items[key].fetchParamFromStateName];
					if (!param) return;
				}
				items[key]
					.fetch(param)
					.then(res => {
						dispatchItems({
							type: SET,
							name: key,
							value: {
								...items[key],
								data: res.json().map(items[key].map)
							}
						});
					})
					.catch(err => {
						console.warn(err.response);
					});
			}
		});
	};
	useEffect(() => {
		fetchItems();
		//TODO Imrpove or change
		// if (setData && typeof setData === 'function') {
		//     setData(getSubmitData())
		// }
		// console./ warn(getSubmitData());
	}, [state]);
	let pickFile = async e => {
		try {
			const res = await DocumentPicker.pick({
				type: [DocumentPicker.types.allFiles]
			});
			let content = await RNFetchBlob.fs.readFile(res.uri, "base64");
			updateState(e.name, { ...res, base64: content });
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				// User cancelled the picker, exit any dialogs or menus and move on
			} else {
				throw err;
			}
		}
	};
	let updateState = (name, value) => {
		dispatch({ type: SET, name, value });
	};

	let resetData = () => {
		dispatch({ type: RESET, value: initialValue });
	};

	let getSubmitData = () => {
		let normalState = { ...state };
		Object.keys(normalState).forEach((key, i) => {
			//* Check if item is select
			if (items[key] && items[key].data) {
				normalState[key] =
					items[key].data[normalState[key]].actualValue;
			}
			//* Check if item should be an object
			if (key.indexOf(".") !== -1) {
				let parts = key.split(".");
				let obj = normalState[parts[0]] || {};
				normalState[parts[0]] = {
					...obj,
					[parts[1]]: normalState[key]
				};
				delete normalState[key];
			}
			if (
				items[key] &&
				items[key].visible &&
				items[key].type !== FieldType.AUTOCOMPLETE
			) {
				delete normalState[key];
			}
			//* Parse to corresponding dataType
			// console.warn(validations[key]);

			// if (validations[key]?.float) {
			// 	normalState[key] = parseFloat(normalState[key]);
			// }
			//TODO Validation
		});
		return normalState;
	};

	let renderFields = fields => {
		return fields.map((e, ind) => {
			if (e.visible === false) return null;
			let componentProps = e.componentProps || {};

			//* Note that on iOS this method isn't called when using keyboardType="phone-pad"
			let onSubmitEditing = async ({ nativeEvent: { text } }) => {
				console.log("SUBMITING");
				let res = (await e.fetch(token, text)).json();
				updateState(e.parent || "buyer", res);
				updateState(e.child || "buyername", res.name);
			};
			switch (e.type) {
				case FieldType.AUTOCOMPLETE: {
					return (
						<View key={e.name}>
							{!!e.title && (
								<Text style={styles.inputTitle}>{e.title}</Text>
							)}
							<RectangularInput
								disabled={e.disabled}
								onChange={val => updateState(e.name, val)}
								value={state[e.name]}
								placeholder={e.placeholder}
								keyboardType={
									e.validation?.float || e.validation?.integer
										? "number"
										: null
								}
								{...componentProps}
								{...{
									onSubmitEditing
								}}
							/>
						</View>
					);
				}
				case FieldType.CHECKBOX:
					return (
						<View
							key={e.name}
							style={{
								marginVertical: 15,
								...styles[e.size]
							}}
						>
							<DefaultCheckbox
								size={14}
								numberOfLines={1}
								isActive={state[e.name]}
								toggle={() =>
									updateState(e.name, !state[e.name])
								}
								title={e.title}
								disabled={e.disabled}
								{...componentProps}
							/>
						</View>
					);
				case FieldType.SELECT:
					if (!items[e.name]) {
						dispatchItems({
							type: SET,
							name: e.name,
							value:
								{
									...e,
									data: e.staticValue
								} || e
						});
					}
					if (e.size === FieldSize.FULL) {
						return (
							<View
								key={e.name}
								style={{
									marginVertical: 5
								}}
							>
								{!!e.title && (
									<Text style={styles.inputTitle}>
										{e.title}
									</Text>
								)}
								<RectangularSelect
									disabled={e.disabled}
									value={state[e.name]}
									items={
										items[e.name] ? items[e.name].data : []
									}
									onChange={val => {
										updateState(e.name, val);
									}}
									placeholder={e.placeholder}
									{...componentProps}
								/>
							</View>
						);
					}
					return (
						<View style={styles[e.size]} key={e.name}>
							{e.title && (
								<Text
									numberOfLines={1}
									style={styles.inputTitle}
								>
									{e.title}
								</Text>
							)}
							<RectangularSelect
								disabled={e.disabled}
								value={state[e.name]}
								items={items[e.name] ? items[e.name].data : []}
								onChange={val => {
									updateState(e.name, val);
								}}
								placeholder={e.placeholder}
								{...componentProps}
							/>
						</View>
					);
				case FieldType.DATE_PICKER:
					if (e.size === FieldSize.FULL) {
						return (
							<View key={e.name}>
								{!!e.title && (
									<Text style={styles.inputTitle}>
										{e.title}
									</Text>
								)}
								<RectangularDatePicker
									disabled={e.disabled}
									value={state[e.name]}
									onChange={val => updateState(e.name, val)}
									placeholder={e.placeholder}
									{...componentProps}
								/>
							</View>
						);
					}
					return (
						<View style={styles[e.size]} key={e.name}>
							{!!e.title && (
								<Text
									numberOfLines={1}
									style={styles.inputTitle}
								>
									{e.title}
								</Text>
							)}
							<RectangularDatePicker
								disabled={e.disabled}
								value={state[e.name]}
								onChange={val => updateState(e.name, val)}
								placeholder={e.placeholder}
								half={true}
								{...componentProps}
							/>
						</View>
					);
				case FieldType.INPUT:
					if (e.size === FieldSize.FULL) {
						return (
							<View key={e.name}>
								{!!e.title && (
									<Text style={styles.inputTitle}>
										{e.title}
									</Text>
								)}
								<RectangularInput
									disabled={e.disabled}
									onChange={val => updateState(e.name, val)}
									value={
										typeof state[e.name] === "number"
											? state[e.name].toString()
											: state[e.name]
									}
									placeholder={e.placeholder}
									keyboardType={
										e.validation?.float ||
										e.validation?.integer
											? "number"
											: null
									}
									{...componentProps}
								/>
							</View>
						);
					}
					return (
						<View key={e.name} style={styles[e.size]}>
							{!!e.title && (
								<Text
									numberOfLines={1}
									style={styles.inputTitle}
								>
									{e.title}
								</Text>
							)}
							<RectangularInput
								disabled={e.disabled}
								onChange={val => updateState(e.name, val)}
								value={
									typeof state[e.name] === "number"
										? state[e.name].toString()
										: state[e.name]
								}
								placeholder={e.placeholder}
								keyboardType={
									e.validation?.float || e.validation?.integer
										? "number-pad"
										: null
								}
								{...componentProps}
							/>
						</View>
					);
				case FieldType.COMPLEX:
					return (
						<Fragment key={e.name}>
							{!!e.title && (
								<Text style={styles.inputTitle}>{e.title}</Text>
							)}
							{e.rows &&
								e.rows.map((el, i) => {
									return (
										<View key={i} style={styles.row}>
											{renderFields(el)}
										</View>
									);
								})}
						</Fragment>
					);
				case FieldType.LINE:
					return (
						<Fragment key={ind}>
							{!!e.title && (
								<Text
									numberOfLines={1}
									style={styles.inputTitle}
								>
									{e.title}
								</Text>
							)}
							<View style={styles.row}>
								{renderFields(e.columns)}
							</View>
						</Fragment>
					);
				case FieldType.FILE:
					return (
						<View style={styles.row} key={e.name}>
							<TouchableWithoutFeedback
								onPress={() => pickFile(e)}
							>
								<View style={styles.filePicker}>
									<Text
										numberOfLines={1}
										style={[
											styles.inputTitle,
											{
												width: 140
											}
										]}
									>
										{state[e.name]
											? state[e.name].name
											: e.placeholder}
									</Text>
									<Icons name={"paper-clip"} size={20} />
								</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback
								onPress={() => updateState(e.name, null)}
							>
								<View style={styles.button}>
									{!!e.title && (
										<Text style={styles.inputTitle}>
											{e.title}
										</Text>
									)}
									<AntDesign
										name={"close"}
										size={20}
										color={colors.darkPink}
									/>
								</View>
							</TouchableWithoutFeedback>
						</View>
					);
				default:
					return null;
			}
		});
	};
	return (
		<View style={{ flex: 1 }}>
			{renderFields(fields)}
			{Footer && (
				<Footer
					getSubmitData={getSubmitData}
					getRawData={() => state}
					resetData={resetData}
				/>
			)}
		</View>
	);
};

export const styles = StyleSheet.create({
	title: {
		fontSize: 26,
		fontWeight: "bold",
		marginBottom: 15
	},
	container: {
		padding: 15
	},
	inputTitle: {
		fontSize: 14,
		color: colors.gray,
		marginVertical: 10
	},
	row: {
		flexDirection: "row",
		marginVertical: 5
	},
	half: {
		flex: 1,
		paddingRight: 5,
		marginBottom: 7.5
	},
	quarter: {
		flex: 0.4,
		paddingRight: 5,
		marginBottom: 7.5
	},
	quarterThree: {
		flex: 0.6,
		paddingRight: 5,
		marginBottom: 7.5
	},
	filePicker: {
		flex: 0.6,
		borderStyle: "dashed",
		borderWidth: 1,
		borderRadius: 6,
		borderColor: colors.grayText,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		paddingVertical: 7.5,
		marginVertical: 15,
		marginRight: 10,
		alignItems: "center"
	},
	button: {
		flex: 0.4,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: colors.lightGray,
		marginVertical: 15,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	}
});

const mapStateToProps = ({ user: { token } }) => ({
	token
});

const mapDispatchToProps = {};

export default FieldsRenderer;

/**
 * let filterData = async text => {
						if (state[e.name]) {
							dispatch({ type: SET, name: e.name, value: "" });
							return;
						}
						let res = await e.fetch(text);
						dispatchItems({
							type: SET,
							name: e.name,
							value: res.data
						});
					};
					let autocompleteItem = ({ item }) => {
						return (
							<TouchableWithoutFeedback
								onPress={() => {
									dispatch({
										type: SET,
										name: e.name,
										value: item
									});
									dispatchItems({
										type: SET,
										name: e.name,
										value: []
									});
								}}
							>
								<Text
									style={{
										paddingVertical: 5,
										marginVertical: 5,
										borderRadius: 6,
										backgroundColor: colors.white,
										paddingHorizontal: 5
									}}
								>
									{item.tin} {item.name}
								</Text>
							</TouchableWithoutFeedback>
						);
					};
					return (
						<View>
							{!!e.title && (
								<Text style={styles.inputTitle}>{e.title}</Text>
							)}
							<View
								style={{
									borderRadius: 6,
									backgroundColor: colors.white,
									elevation: 4,
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<Autocomplete
									placeholder={e.placeholder}
									listContainerStyle={{
										borderWidth: 0,
										backgroundColor: colors.white
									}}
									listStyle={{
										borderWidth: 0,
										backgroundColor: colors.white
									}}
									containerStyle={{
										borderWidth: 0,
										padding: 8,
										backgroundColor: colors.white,
										borderRadius: 6
									}}
									style={{
										backgroundColor: colors.white
									}}
									inputContainerStyle={{
										borderWidth: 0
									}}
									data={[
										{
											tine: "Me",
											name: "you"
										}
									]}
									value={
										state[e.name]
											? state[e.name].tin +
											  " - " +
											  state[e.name].name
											: null
									}
									renderItem={autocompleteItem}
									onChangeText={filterData}
									{...componentProps}
								/>
							</View>
						</View>
					);
 */
