import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../constants/colors";
import NotificationCard from "../cards/NotificationCard";
import Text from "../common/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { hideNotification } from "../../redux/actions";
import requests from "../../api/requests";
import strings from "../../locales/strings";

const Header = ({ appState, user }) => {
	let [notification, setNotification] = useState("");
	let [title, setTitle] = useState("");
	let [inn, setInn] = useState("");
	let [avatar, setAvatar] = useState("");

	return (
		<LinearGradient
			start={{ x: 0, y: 0 }}
			end={{ x: 0.5, y: 1 }}
			colors={[
				colors.linearBlue1,
				colors.linearBlue2,
				colors.linearBlue3
			]}
			style={styles.container}
		>
			<SafeAreaView>
				<View style={styles.roundOne} />
				<View style={styles.roundTwo} />
				<View
					style={[
						styles.main,
						appState.notification && {
							paddingBottom: 15
						}
					]}
				>
					<View style={styles.titleWrapper}>
						<Text style={styles.title}>{user.name}</Text>
						{user.tin && (
							<Text style={styles.subTitle}>
								{strings.inn} {user.tin}
							</Text>
						)}
					</View>
					<View style={styles.imageWrapper}>
						{!!user.tin && (
							<Image
								style={styles.image}
								source={{
									uri:
										user.avatar && user.avatar
											? user.avatar
											: "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-512.png"
								}}
							/>
						)}
					</View>
				</View>
				{appState.notification ? (
					<View style={styles.secondary}>
						<NotificationCard hideNotification={hideNotification} />
					</View>
				) : (
					<></>
				)}
			</SafeAreaView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
		paddingHorizontal: 20
	},
	roundOne: {
		position: "absolute",
		padding: 90,
		borderRadius: 90,
		marginTop: -90,
		marginLeft: -50,
		backgroundColor: colors.transparent
	},
	roundTwo: {
		position: "absolute",
		padding: 45,
		borderRadius: 45,
		marginTop: -20,
		right: 0,
		marginRight: -10,
		backgroundColor: colors.transparent
	},
	main: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
		alignItems: "center"
	},
	titleWrapper: {
		maxWidth: 250
	},
	title: {
		fontSize: 17,
		color: colors.white,
		fontFamily: "Rubik-Regular"
	},
	subTitle: {
		fontSize: 14,
		color: colors.white,
		fontFamily: "Rubik-Regular"
	},
	imageWrapper: {
		height: 50,
		width: 50,
		borderRadius: 50
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 50
	},
	secondary: {
		paddingTop: 10
	}
});

let mapStateToProps = state => {
	return {
		appState: state.appState,
		user: state.user
	};
};
let mapDispatchToProps = {
	hideNotification
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
