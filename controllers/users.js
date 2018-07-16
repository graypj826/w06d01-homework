const express = require("express");
const router = express.Router();

const User = require("../models/users")

router.get("/", (req, res) => {
	User.find({}, (err, allUsers) => {
		if(err){
			console.log(err)
		} else {
			res.render("users/index.ejs", {
				users : allUsers
			})
		}		
	}) 	
});

router.get("/new", (req, res) => {
	res.render("users/new.ejs")
})

router.get("/:id", (req, res) => {
	User.findByID(req.params.id, (err, foundUser) => {
		if (err){
			console.log(err)
		} else {
			res.render("user/show.ejs",{
				users : foundUser
			})
		}
	})
})

router.post("/", (req, res) => {
	User.create(req.body, (err, createdUser) =>{
		res.redirect("/users");
	})
})




module.exports = router;