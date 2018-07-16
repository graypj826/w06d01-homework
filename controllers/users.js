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

router.get("/:id/edit", (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if (err){
			console.log(err)
		} else {
			res.render("users/edit.ejs",{
				user : foundUser
			})
		}
	})
})

router.get("/:id", (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if (err){
			console.log(err)
		} else {
			res.render("users/show.ejs",{
				user : foundUser
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