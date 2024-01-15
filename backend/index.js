const express = require("express");
const path = require("path");
const cors = require("cors");

const routerApi = require("./routes");

//APP and Port
const app = express();
const port = 3080;

app.use(express.json());

// Cors Configuration
const whiteList = [
	//DEV
	"http://localhost:3000",
	"http://localhost:5173",
	"http://localhost:15106",
	"http://localhost:15105",

    "http://127.0.0.1:5173",
	"http://127.0.0.1:5500",
	"http://127.0.0.1:15106",

	//PROD
	"http://10.140.0.16:15105",
	"http://10.140.0.16:15106",
	"http://10.140.0.16:15107",
];
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("No permitido"));
        }
    }
}
app.use(cors(options));

app.use(express.static(path.join(__dirname, '../frontend/dist')));

routerApi(app);

app.get("/", (request, response) => {
	return response.send("Hola servidor backend para Bodega");
})



app.listen(port, (request, response) => {
    console.log("Esuchando en el puerto: " + port);
})