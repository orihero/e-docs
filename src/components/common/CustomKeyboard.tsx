import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";
import Touchable from "./Touchable";
import Icons from "react-native-vector-icons/Feather";

let keys = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"],
	["delete", "0", "check"]
];

const CustomKeyboard = ({ onPress = () => {} }) => {
	return (
		<View style={styles.container}>
			{keys.map((row, index) => {
				return (
					<View
						key={index}
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						{row.map((key, i) => {
							if (key.length > 1) {
								return (
									<Touchable
										key={i}
										onPress={() => onPress(key)}
										containerStyle={styles.centeredKey}
									>
										<View
											{...{ key: i }}
											style={styles.centeredKey}
										>
											<Icons
												name={key}
												size={20}
												color={colors.blue}
												style={{ alignSelf: "center" }}
											/>
										</View>
									</Touchable>
								);
							}
							return (
								<Touchable
									key={i}
									onPress={() => onPress(key)}
									containerStyle={styles.centeredKey}
								>
									<View
										{...{ key: i }}
										style={styles.centeredKey}
									>
										<Text style={styles.key}>{key}</Text>
									</View>
								</Touchable>
							);
						})}
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.extraLight
	},
	key: { textAlign: "center", textAlignVertical: "center", fontSize: 20 },
	centeredKey: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default CustomKeyboard;
