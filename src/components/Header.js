import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import NotificationCard from '../components/cards/NotificationCard';
import Text from '../components/Text';

const Header = ({secondary}) => {
    let [notification, setNotification] = useState(secondary);

    return (
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 1}}
            colors={[
                colors.linearBlue1,
                colors.linearBlue2,
                colors.linearBlue3,
            ]}
            style={styles.container}>
            <View style={styles.roundOne} />
            <View style={styles.roundTwo} />
            <View
                style={[
                    styles.main,
                    notification && {
                        paddingBottom: 15,
                    },
                ]}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>ООО «Smart Business Lab»</Text>
                    <Text style={styles.subTitle}>ИНН 1375419735</Text>
                </View>
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={{
                            uri:
                                'https://66.media.tumblr.com/67267833f555724d485b3a4483799bd2/tumblr_nu3qqc8BZ71un5fc4o1_640.jpg',
                        }}
                    />
                </View>
            </View>
            {notification && (
                <View style={styles.secondary}>
                    <NotificationCard setNotification={setNotification} />
                </View>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    roundOne: {
        position: 'absolute',
        padding: 90,
        borderRadius: 90,
        marginTop: -90,
        marginLeft: -50,
        backgroundColor: colors.transparent,
    },
    roundTwo: {
        position: 'absolute',
        padding: 45,
        borderRadius: 45,
        marginTop: -20,
        right: 0,
        marginRight: -10,
        backgroundColor: colors.transparent,
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    titleWrapper: {
        maxWidth: 250,
    },
    title: {
        fontSize: 17,
        color: colors.white,
        fontFamily: 'Rubik-Regular',
    },
    subTitle: {
        fontSize: 14,
        color: colors.white,
        fontFamily: 'Rubik-Regular',
    },
    imageWrapper: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    secondary: {
        paddingTop: 10,
    },
});

export default Header;
