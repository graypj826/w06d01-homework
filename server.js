const express = require ("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

require("./db/db");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

const usersController = require("./controllers/users.js");

app.use("/users", usersController);

const photosController = require("./controllers/photos.js")

app.use("/photos", photosController);


app.get("/", (req, res) =>{
	res.render("index.ejs")
})

app.listen(3000, () => {
	console.log ("Click Click")
})