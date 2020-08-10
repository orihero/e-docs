import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import requests from "../../api/requests";
import DefaultCheckbox from "../../components/common/DefaultCheckbox";
import colors from "../../constants/colors";
import strings from "../../locales/strings";
import RectangularInput from "../../components/common/RectangularInput";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import RectangleButton from "../../components/common/RectangleButton";

const Seller = ({ sellerTin, token, navigation }) => {
	const [seller, setSeller] = useState({});
	const [regions, setRegions] = useState([]);
	let effect = async () => {
		try {
			console.log({ sellerTin, token });
			let res = await requests.account.getSellerByTin(token, sellerTin);
			console.log({ seller: res.json() });
			setSeller(res.json());
			let regs = requests.account.getRegions();
		} catch (error) {
			console.warn(error);
		}
	};
	useEffect(() => {
		effect();
	}, []);
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<DefaultCheckbox
					disabled={true}
					isActive={seller.pickup}
					title={strings.pickup}
					style={{ marginVertical: 10 }}
				/>
				<DefaultCheckbox
					disabled={true}
					isActive={seller.delivery}
					title={strings.delivery}
					style={{ marginVertical: 10 }}
				/>
				<RectangularInput
					value={seller.description}
					placeholder={strings.sellerDescription}
					multiline={true}
					disabled={true}
				/>
				<RectangularInput
					value={seller.termsPayment}
					placeholder={strings.termsPayment}
					disabled={true}
					multiline={true}
				/>
				<RectangularInput
					value={seller.termsDelivery}
					placeholder={strings.termsDelivery}
					disabled={true}
					multiline={true}
				/>

				<RectangularInput
					value={seller.description}
					placeholder={strings.sellerDescription}
					disabled={true}
					multiline={true}
				/>
				<RectangleButton
					onPress={() => navigation.goBack()}
					text={strings.back}
					backColor={colors.killerRed}
					style={{
						startColor: "red",
						endColor: colors.killerRed,
						marginVertical: 10
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default connect(({ user }) => ({ token: user.token }))(
	withNavigation(Seller)
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		padding: 15
	}
});
