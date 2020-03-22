import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Text from '../../components/Text';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import CustomInput from '../../components/CustomInput';
import RectangleButton from '../../components/RectangleButton';
import {withNavigation} from 'react-navigation';

const Login = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{strings.welcome}</Text>
            <Text style={styles.desc}>{strings.loginInfo}</Text>
            <CustomInput
                inputType="text"
                textColor={colors.darkGrayBorder}
                placeholder={strings.enterLogin}
            />
            <CustomInput
                inputType="password"
                textColor={colors.darkGrayBorder}
                placeholder={strings.enterPassword}
            />
            <RectangleButton
                backColor={colors.jeansBlue}
                text={strings.startWorking}
                onPress={() => {
                    navigation.navigate('Main');
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 50,
        paddingHorizontal: 20,
        backgroundColor: colors.paleWhite,
        flex: 1,
    },
    title: {
        color: colors.darkViolet,
        textAlign: 'center',
        fontSize: 22,
        // fontFamily: 'Rubik-Bold',
        fontWeight: '600',
        paddingBottom: 20,
    },
    desc: {
        color: colors.paleBlueText,
        fontSize: 17,
        textAlign: 'center',
        paddingBottom: 40,
    },
});

export default withNavigation(Login);
