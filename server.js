const express = require ("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

require("./db/db");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));

const usersController = require("./controllers/users.js");

app.use("/users", usersController);


app.get("/", (req, res) =>{
	res.render("index.ejs")
})

app.listen(3000, () => {
	console.log ("Click Click")
})