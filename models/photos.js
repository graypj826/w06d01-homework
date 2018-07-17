const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photosSchema = new Schema(
{	
	title: String,
	img : String,

})

 const Photo = mongoose.model("Photo", photosSchema);

module.exports = Photo