const express = require("express");
const router = express.Router();

const User = require("../models/users")
const Photos = require ("../models/photos")

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

router.get("/login", (req, res) => {
	res.render("users/login.ejs")
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

router.put("/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, createdUser) =>{
		res.redirect("/users");
	})
})

router.delete("/:id", (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, createdUser) =>{
		res.redirect("/users");
	})
})


module.exports = router;