import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../constants/colors';

const CustomInput = ({inputType, placeholder, textColor}) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor={colors.lightGrayText}
                secureTextEntry={inputType != 'password' ? false : true}
                placeholder={placeholder}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: 7,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default CustomInput;
