import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../constants/colors';

const RectangleButton = ({text, backColor, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: backColor,
                    },
                ]}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dimGreen,
        flex: 1,
        paddingVertical: 13,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Rubik-Medium',
        color: colors.white,
    },
});

export default RectangleButton;
