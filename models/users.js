const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Photo = require("./photos.js");


const userSchema = Schema({

	name: {type: String, required: true, unique: true},
	password: String,
	photos: [Photo.schema]

});

const User = mongoose.model("User", userSchema);
module.exports = User;