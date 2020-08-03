import React, { ReactElement } from "react";
import {
	StyleSheet,
	Text,
	View,
	Animated,
	StyleProp,
	ViewStyle
} from "react-native";
import {
	TapGestureHandler,
	TapGestureHandlerStateChangeEvent,
	State
} from "react-native-gesture-handler";

export interface TouchableProps {
	children: ReactElement;
	onPress?: () => void;
	containerStyle?: StyleProp<ViewStyle>;
}

const Touchable = ({ children, onPress, containerStyle }: TouchableProps) => {
	let scale = new Animated.Value(1);
	let onHandlerStateChange = (event: TapGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.state === State.BEGAN) {
			Animated.spring(scale, {
				toValue: 0.8,
				useNativeDriver: true
			}).start();
			return;
		}
		Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start(
			() => {
				if (onPress) {
					onPress();
				}
			}
		);
	};
	return (
		<TapGestureHandler onHandlerStateChange={onHandlerStateChange}>
			<Animated.View style={[{ transform: [{ scale }] }, containerStyle]}>
				{children}
			</Animated.View>
		</TapGestureHandler>
	);
};

export default Touchable;

const styles = StyleSheet.create({});
