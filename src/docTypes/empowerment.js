import { FieldType, FieldSize } from "../components/generators/FieldsRenderer";
import strings from "../locales/strings";
import requests from "../api/requests";

export let empowermentFields = [
	{
		type: FieldType.INPUT,
		placeholder: strings.number,
		size: FieldSize.FULL,
		name: "empowermentdoc.empowermentno",
		title: strings.empowerment
	},
	{
		type: FieldType.DATE_PICKER,
		placeholder: strings.dateofexpire,
		size: FieldSize.HALF,
		name: "empowermentdoc.empowermentdateofexpire"
	},
	{
		type: FieldType.DATE_PICKER,
		size: FieldSize.HALF,
		placeholder: strings.dateofissue,
		name: "empowermentdoc.empowermentdateofissue"
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
		placeholder: strings.fio,
		size: FieldSize.FULL,
		name: "agent.fio",
		title: strings.agent
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.jobtitle,
		size: FieldSize.FULL,
		name: "agent.jobtitle"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "agent.agenttin",
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		}
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.passportnumber,
		size: FieldSize.FULL,
		name: "passport.number",
		title: strings.passport
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.issuedby,
		size: FieldSize.FULL,
		name: "passport.issuedby"
	},
	{
		type: FieldType.DATE_PICKER,
		placeholder: strings.dateofissue,
		size: FieldSize.FULL,
		name: "passport.dateofissue"
	},
	{
		type: FieldType.INPUT,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "sellertin",
		title: strings.buyer,
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad",
			disabled: true
		},
		disabled: true
	},
	{
		type: FieldType.AUTOCOMPLETE,
		placeholder: strings.inn,
		size: FieldSize.FULL,
		name: "buyertin",
		title: strings.seller,
		componentProps: {
			maxLength: 9,
			keyboardType: "number-pad"
		},
		fetch: requests.account.getProfileByTin,
		parent: "buyer"
	}
];

export let empowermentEntity = {
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
	vatregcode: ""
};

export let empowermentProduct = {
	ordno: 0,
	name: "",
	measureid: -1,
	count: 0
};

export let empowermentDoc = {
	empowermentdoc: {
		empowermentno: "",
		empowermentdateofissue: "",
		empowermentdateofexpire: ""
	},
	contractdoc: {
		contractno: "",
		contractdate: ""
	},
	agent: {
		fio: "",
		jobtitle: "",
		agenttin: "",
		passport: {
			number: "",
			issuedby: "",
			dateofissue: ""
		}
	},
	sellertin: "",
	buyertin: "",
	seller: empowermentEntity,
	buyer: empowermentEntity,
	productlist: {
		products: []
	}
};
