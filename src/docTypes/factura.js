import { FieldSize, FieldType } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";
import requests from "../api/requests";

export let facturaFields = [
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
				name: "facturadoc.facturadate"
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
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		title: strings.itemreleased,
		placeholder: strings.fio,
		name: "itemreleaseddoc.itemreleasedfio"
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.inn,
		name: "itemreleaseddoc.itemreleasedtin",
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		}
	},
	{
		type: FieldType.LINE,
		size: FieldSize.FULL,
		title: strings.empowerment,
		columns: [
			{
				type: FieldType.INPUT,
				size: FieldSize.QUARTER,
				placeholder: strings.number,
				name: "facturaempowermentdoc.empowermentno"
			},
			{
				type: FieldType.DATE_PICKER,
				placeholder: strings.selectDate,
				size: FieldSize.QUERTER_THREE,
				name: "facturaempowermentdoc.empowermentdate"
			}
		]
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.fio,
		title: strings.agent,
		name: "facturaempowermentdoc.agentfio"
	},
	{
		type: FieldType.INPUT,
		size: FieldSize.FULL,
		placeholder: strings.inn,
		name: "facturaempowermentdoc.agenttin",
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		}
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
	branchcode: "",
	branchname: ""
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
	committentname: "",
	committenttin: "",
	committentvatregcode: "",
	exciserate: 0,
	excisesum: 0,
	serial: "",
	basesumma: 0,
	profitrate: 0
};

export let facturaDoc = {
	facturadoc: {
		facturano: "",
		facturadate: ""
	},
	oldfacturadoc: {
		facturaid: "",
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
	version: 1,
	facturatype: 0,
	singlesidedtype: 0,
	sellertin: "",
	buyertin: "",
	seller: JSON.parse(JSON.stringify(factureEntity)),
	buyer: JSON.parse(JSON.stringify(factureEntity)),
	productlist: {
		hasvat: false,
		hasexcise: false,
		hascommittent: false,
		hasmedical: false,
		hasdiscount: false,
		discountrate: 0,
		discountsum: 0,
		discountvatsum: 0,
		products: []
	}
};
