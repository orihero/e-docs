import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export interface PinCodeIndicatorProps {
	/**
	 * Count of indicators
	 */
	count: number;
	/**
	 * Count of active indicators
	 */
	activeCount: number;
}

const PinCodeIndicator = ({ activeCount, count }: PinCodeIndicatorProps) => {
	let arr = Array.from({ length: count }).fill("-");
	return (
		<View style={styles.container}>
			{arr.map((e, i) => {
				return (
					<View
						key={i}
						style={
							activeCount - 1 >= i
								? styles.activeCircle
								: styles.circle
						}
					/>
				);
			})}
		</View>
	);
};

let circleWidth = 16;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row"
	},
	circle: {
		width: circleWidth,
		height: circleWidth,
		borderRadius: circleWidth,
		margin: 10,
		borderWidth: 1,
		borderColor: colors.gray5
	},
	activeCircle: {
		width: circleWidth,
		height: circleWidth,
		borderRadius: circleWidth,
		backgroundColor: colors.blue,
		margin: 10
	}
});

export default PinCodeIndicator;
