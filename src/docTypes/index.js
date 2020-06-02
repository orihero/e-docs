import { FieldType } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";

export * from "./actGoodsAcceptance";
export * from "./actWorkPerformed";
export * from "./customerOrder";
export * from "./empowerment";
export * from "./factura";
export * from "./universal";
export * from "./waybill";

// export let generateFields = obj => {
// 	let fields = [];
// 	Object.keys(obj).map(key => {
// 		let temp = obj[key];
// 		switch (typeof temp) {
// 			case "string": {
// 				fields.push({
// 					type: FieldType.INPUT,
// 					title: strings.productReleased,
// 					placeholder: strings.productReleased,
// 					size: FieldSize.FULL,
// 					name: "productReleased",
// 					visible: docType === 2
// 				});
// 			}
// 		}
// 	});
// };
