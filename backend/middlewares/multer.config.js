const multer = require("multer");
const moment = require("moment");
const path = require("path");

//Multer config
let storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./uploads/");
    },
    filename:(request, file, callback) => {
		const selectedOption = request.get('selectedOption');
		console.log(selectedOption);
		const fileDate = moment().format("YYYY-MM-DD_HH-mm");
		let formatName = file.fieldname + "-" + selectedOption + "_" + fileDate + path.extname(file.originalname);

        callback(null, formatName);
    }
})
let upload = multer({
    storage: storage
});

module.exports = upload;