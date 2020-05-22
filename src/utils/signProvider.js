import { NativeModules } from "react-native";

let serial_number = "number";
let message = ``;

export let sign = append_pkcs7 => {
	let obj = {
		packageName: "uz.yt.eimzo",
		className: "uz.yt.eimzo.activity.MainActivity",
		serial_number,
		message: append_pkcs7 ? append_pkcs7 : message
	};
	return NativeModules.EImzo.createSign(obj);
};

export let attach = tst => {
	let obj = {
		packageName: "uz.yt.eimzo",
		className: "uz.yt.eimzo.activity.MainActivity",
		serial_number,
		tst
	};
	return NativeModules.EImzo.attachTimestamp(obj);
};

export let append = append_pkcs7 => {
	let obj = {
		packageName: "uz.yt.eimzo",
		className: "uz.yt.eimzo.activity.MainActivity",
		serial_number,
		append_pkcs7
	};
	return NativeModules.EImzo.appendSign(obj);
};

export default { sign };
