import { FieldSize, FieldType } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";
import requests from "../api/requests";

export let actGoodsAcceptanceFields = [
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.factura,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "facturadoc.facturano"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "actdoc.actdate"
			}
		]
	},
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.contract,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "contractdoc.contractno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "contractdoc.contractdate"
			}
		]
	},
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.contract,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "truckdoc.truckregno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "truckdoc.truckmodel"
			}
		]
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "sellertin",
		title: strings.seller,
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		}
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "sellername"
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "buyertin",
		title: strings.buyer,
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		},
		fetch: requests.account.getProfileByTin
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.name,
		size: FieldSize.FULL,
		name: "buyername"
	}
];

export let factureEntity = {
	name: "",
	account: "",
	bankid: "",
	address: "",
	mobile: "",
	workphone: "",
	oked: "",
	districtid: "",
	director: "",
	accountant: "",
	vatregcode: "",
	treasuryaccount: "",
	personalaccount: ""
};

export let facturaProduct = {
	ordno: 0,
	name: "",
	measureid: "0",
	count: 0,
	summa: 0,
	deliverysum: 0,
	vatrate: 0,
	vatsum: 0,
	deliverysumwithvat: 0,
	withoutvat: false,
	fuelrate: 0,
	fuelsum: 0,
	deliverysumwithfuel: 0,
	series: "",
	baseprice: 0,
	extracharge: 0
};

export let facturaDoc = {
	facturadoc: {
		facturano: "",
		facturadate: ""
	},
	contractdoc: {
		contractno: "",
		contractdate: ""
	},
	facturaempowermentdoc: {
		empowermentno: "",
		empowermentdateofissue: "",
		agentfio: "",
		agenttin: ""
	},
	itemreleaseddoc: {
		itemreleasedfio: "",
		itemreleasedtin: ""
	},
	sellertin: "",
	buyertin: "",
	seller: factureEntity,
	buyer: factureEntity,
	productlist: {
		hasvat: false,
		hasfuel: false,
		hasdiscount: false,
		hasseries: false,
		hasfarm: false,
		discountrate: 0,
		discountsum: 0,
		discountvatsum: 0,
		products: []
	}
};
