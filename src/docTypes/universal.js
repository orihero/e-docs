export let universalDoc = {
	doc: {
		docno: "", // номер документа
		docdate: "" // дата документа
	},
	contractdoc: {
		contractno: "", // договор номер
		contractdate: "" // договор дата
	},
	roumingId: "", // ИД Роуминга, должен быть получен из роуминга для сохранения сквозной уникальности документов между операторами
	ownertin: "", // Отправитель ИНН
	ownername: "", // Отправитель Наименование
	ownerrole: "", // Отправитель Роль, произвольный (Поставщик, Агент и т. д.)
	targettin: "", // Получатель ИНН
	targetname: "", // Получатель Наименование
	targetrole: "", // Получатель Роль
	target2tin: "", // (Не обязательный) Получатель 2 ИНН
	target2name: "", // (Не обязательный) Получатель 2 Наименование
	target2role: "", // (Не обязательный) Получатель 2 Роль
	target3tin: "", // (Не обязательный) Получатель 3 ИНН
	target3name: "", // (Не обязательный) Получатель 3 Наименование
	target3role: "", // (Не обязательный) Получатель 3 Роль
	type: "", // Системный Тип документа, заполняется программно, используется системой оператора для правильной обработки данных документа
	doctype: "", // Тип документа, произвольный, заполняется отправителем документа (Договор, Доп. соглашение и т. д.)
	data: "", // Произвольная структура данных в формате JSON
	productlist: {
		// Не обязательные Общие для всех документов поля, приведены в соответствие с стандартом роуминга
		hasvat: false, //
		totalsum: 0, //
		vatrate: 0, //
		totalvatsum: 0, //
		totalsumwithvat: 0, //
		products: "" // Произвольная структура дополнительных колонок в формате JSON
	},
	file: {
		// Данные файла
		filebase64: "", // Двоичные данные файла в Base64
		filename: "", // Имя файла
		filetype: "" // Формат файла (application/pdf, image/jpeg и т д.) Используется для правильного отображения документа
	}
};
