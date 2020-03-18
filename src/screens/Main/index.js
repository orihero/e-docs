import React from 'react';
import {View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import images from '../../assets/images';
import Text from '../../components/Text';

const {width: deviceWidth, height} = Dimensions.get('window');

const Main = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <Text style={styles.title}>{strings.mainMenu}</Text>
            <View style={styles.gridWrapper}>
                <View style={styles.grid}>
                    <View
                        style={[
                            styles.imageWrapper,
                            {
                                backgroundColor: colors.paleGreen,
                            },
                        ]}>
                        <Image
                            style={styles.image}
                            source={images.downloadIcon}
                        />
                    </View>
                    <Text style={styles.name}>{strings.incoming}</Text>
                    <Text style={styles.info}>44 {strings.document}</Text>
                </View>
                <View style={styles.grid}>
                    <View
                        style={[
                            styles.imageWrapper,
                            {
                                backgroundColor: colors.mediumPurple,
                            },
                        ]}>
                        <Image
                            style={styles.image}
                            source={images.uploadIcon}
                        />
                    </View>
                    <Text style={styles.name}>{strings.outgoing}</Text>
                    <Text style={styles.info}>15 {strings.documents}</Text>
                </View>
            </View>
            <View style={styles.gridWrapper}>
                <View style={styles.grid}>
                    <View
                        style={[
                            styles.imageWrapper,
                            {
                                backgroundColor: colors.palewinterWizard,
                            },
                        ]}>
                        <Image style={styles.image} source={images.tagIcon} />
                    </View>
                    <Text style={styles.name}>{strings.subscription}</Text>
                    <Text style={styles.info}>
                        {strings.left} 16 {strings.days}
                    </Text>
                </View>
                <View style={styles.grid}>
                    <View
                        style={[
                            styles.imageWrapper,
                            {
                                backgroundColor: colors.palePeachOrange,
                            },
                        ]}>
                        <Image style={styles.image} source={images.bellIcon} />
                    </View>
                    <Text style={styles.name}>{strings.promoCodes}</Text>
                    <Text style={styles.info}>
                        {strings.activation} {strings.here}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    title: {
        color: colors.violetGrayText,
        fontWeight: '600',
        fontSize: 14,
        paddingVertical: 10,
        paddingLeft: 20,
        paddingBottom: 20,
    },
    gridWrapper: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    grid: {
        backgroundColor: colors.white,
        width: (deviceWidth - 60) / 2,
        borderColor: colors.grayBorder,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
        borderRadius: 5,
        paddingVertical: 30,
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 40,
        marginBottom: 5,
    },
    image: {
        height: 30,
        width: 30,
    },
    name: {
        color: colors.blackText,
        fontSize: 17,
        fontWeight: '600',
    },
    info: {
        fontSize: 12,
        color: colors.grayText,
    },
});

export default Main;
