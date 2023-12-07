const csv = require("fast-csv");
const fs = require("fs");

const { insertDataFileToDatabase } = require("../database/inserDataFiles");
const { getColumnNamesInDataBase } = require("../database/getFilesIdInDatabase");


const uploadCsv = async (path, fuente) => {
	let wrongRecordsArray = [];
	let recordsEnteredCount = 0;
	let recordsAlreadyInDatabase = 0;

	const columnNames = await getColumnNamesInDataBase(fuente);

	return new Promise(async (resolve, reject) => {
		let databaseInfo = {};
		let rowCount = 0;
		let rowsLog = {};

		let promises = [];

		let stream = fs.createReadStream(path);
		let csvDataColl = [];

		let fileStream = csv
			.parse()
			.on("data", (data) => {
				csvDataColl.push(data)
			})
			.on("end", async () => {
				csvDataColl.shift();
				if (csvDataColl.length === 0) {
					return response.status(400).json({ message: "El archivo CSV está vacío" });
				}

				const values = csvDataColl.map((row) => {
					const rowValues = row[0].split(';');
					const sanitizedRowValues = rowValues.map(value => (value.trim() === '' ? null : value.trim()));
					return [`${fuente}`, ...sanitizedRowValues];
				});


				values.map(async (element) => {
					promises.push((async () => {

						rowCount = values.length;
						const idValue = parseInt(fuente == 3 ? element[4] : element[1]);
						const mesValue = parseInt(element[4]);
						const flattenedValues = element.flatMap(row => row);
						const rowNumber = values.indexOf(element);

						//Funcion de insercion en la base de datos
						try {
							if (fuente != 4) {
								databaseInfo = await insertDataFileToDatabase(
									element,
									idValue,
									mesValue,
									columnNames,
									flattenedValues,
									rowNumber,
									fuente,
								);
								wrongRecordsArray = [...wrongRecordsArray, ...databaseInfo.wrongRecordsArray];;
								recordsEnteredCount = recordsEnteredCount +  databaseInfo.recordsEnteredCount;
								recordsAlreadyInDatabase = recordsAlreadyInDatabase +  databaseInfo.recordsAlreadyInDatabase;
							}
							else if (fuente == 4) {
								databaseInfo = await insertBaseDeCaracterizacionFileToDatabase(
									element,
									idValue,
									columnNames,
									flattenedValues,
									rowNumber,
									fuente,
								);
								wrongRecordsArray = [...wrongRecordsArray, ...databaseInfo.wrongRecordsArray];;
								recordsEnteredCount = recordsEnteredCount +  databaseInfo.recordsEnteredCount;
								recordsAlreadyInDatabase = recordsAlreadyInDatabase +  databaseInfo.recordsAlreadyInDatabase;
							}
						} catch (err) {
							console.error(`Error en el registro ${rowNumber}: ${err.message}`)
							wrongRecordsArray.push(element);
						}

					})());
				})

				await Promise.all(promises);
				rowsLog = {
					rowCount: rowCount,
					wrongRecordsArray: wrongRecordsArray,
					recordsEnteredCount: recordsEnteredCount,
					recordsAlreadyInDatabase: recordsAlreadyInDatabase,
				}
				resolve(rowsLog);
			})
			.on("error", (err) => {
				reject(err)
			});
		stream.pipe(fileStream);
	})
}

module.exports = {uploadCsv};