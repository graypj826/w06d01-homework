const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/photoSite");

mongoose.connection.on("connected", () =>{
	console.log("The camera loves you!")
});

mongoose.connection.on("error", () =>{
	console.log("I'm getting error realness")
});

mongoose.connection.on("disconnected", () =>{
	console.log("Sashay away")
})

