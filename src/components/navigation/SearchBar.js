import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import colors from "../../constants/colors";
import strings from "../../locales/strings";

const SearchBar = () => {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholderTextColor={colors.lightGrayText}
				placeholder={strings.searchPlaceholder}
			/>
			<EvilIcons name="search" size={32} color={colors.lightGrayText} />
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
