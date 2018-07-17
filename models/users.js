const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Photo = require("./photos");


const userSchema = Schema({

	name: {type: String, required: true, unique: true},
	password: String,
	photos: [],

});

const User = mongoose.model("User", userSchema);
module.exports = User;