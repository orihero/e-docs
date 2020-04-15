import IntentLauncher from "react-native-intent-launcher";

let api_key =
	"B56DE9AB141B37099BD8000224D313B146845760B6E2C4FC4BDDFE67CD9A7E152ADCCB10751A58D9B025FB676EF7D16C5387F82639FB6D0AEDBA9698C028C310";
let serial_number = "number";
let message = `{
                    "tin":"566584586",
                    "fullName":"BARATOV BEGZOD RUSTAM O‘G‘LI",
                    "organization":"BARATOV BEGZOD RUSTAM O‘G‘LI"
                   }`;
/**
 *
 * @param append_pkcs7 Message ti sign
 * @returns Object : {pkcs7,result}
 */
export let sign = append_pkcs7 => {
	let obj = {
		packageName: "uz.yt.eimzo",
		className: "uz.yt.eimzo.activity.MainActivity",
		serial_number,
		api_key,
		message: append_pkcs7 ? append_pkcs7 : message
	};
	return IntentLauncher.startActivity(obj);
};
