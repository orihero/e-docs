import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import colors from "../../constants/colors";
import strings from "../../locales/strings";

const SearchBar = ({ onSearch }) => {
	let [searchKey, setSearchKey] = useState("");

	return (
		<View style={styles.container}>
			<TextInput
				value={searchKey}
				style={styles.input}
				placeholderTextColor={colors.lightGrayText}
				placeholder={strings.searchPlaceholder}
				onChangeText={text => {
					setSearchKey(text);
				}}
			/>
			<EvilIcons
				onPress={() => {
					if (!!searchKey) {
						onSearch(searchKey);
						setSearchKey("");
					}
				}}
				name="search"
				size={32}
				color={colors.lightGrayText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		paddingVertical: 5,
		paddingHorizontal: 10
	},
	input: {
		padding: 0,
		margin: 0,
		flex: 1,
		fontSize: 14,
		fontFamily: "Rubik-Regular"
	}
});

export default SearchBar;
