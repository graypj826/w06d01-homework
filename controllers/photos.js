const express = require("express");
const router = express.Router();

const Photos = require("../models/photos");
const Users = require("../models/users")

router.get("/", (req, res) => {
	Photos.find({}, (err, allPhotos) => {
		if(err){
			console.log(err)
		} else {
			res.render("photos/index.ejs", {
			photos : allPhotos
			})
		}
	})
})


router.get("/new", (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		if (err){
			console.log(err)
		} else {
			Users.find({}, (err,allUsers) => {
				if (err){
					console.log(err)
				} else {
					res.render("photos/new.ejs", {
						
						photo : foundPhoto,
						users : allUsers
					})
				}
			})		
		}
	});
});

router.get("/:id/edit", (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		if (err){
			console.log(err)
		} else {
			Users.find({}, (err, allUsers) => {
				if (err){
					console.log(err)
				} else {
					Users.findOne({"photos._id": req.params.id}, (err, foundUser) =>{
						if(err){
							console.log(err)
						} else {
							res.render("photos/edit.ejs", { 
								photo : foundPhoto,
								allUsers : allUsers,
								foundUser : foundUser
							})
						}
					})	
				}
			})
			
		}
	})
});

router.get("/:id", (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		if (err){
			console.log(err)
		} else {
			Users.findOne({"photos._id": req.params.id},
				(err,foundUser) => {
				console.log()
				console.log(foundUser)
				if (err){
					console.log(err)
				} else {
					res.render("photos/show.ejs", {
						photo : foundPhoto,
						user : foundUser
					})
				}
			})		
		}
	});
});


// router.get("/:id/new", (req, res) => {
// 	Photos.findById(req.params.id, (err, foundPhoto) => {
// 		if (err){
// 			console.log(err)
// 		} else {
// 			res.render("photos/new.ejs", {
// 				photo : foundPhoto
// 			})
// 		}
// 	})
// })




router.put("/:id", (req, res) => {
	Photos.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPhoto) => {
		if (err){
			console.log(err)
		} else {
			Users.findOne({"photos._id":req.params.id}, (err, foundUser) =>{
				if(err){
					console.log(err)
				} else {
					foundUser.photos.id(req.params.id).remove();
					foundUser.photos.push(updatedPhoto);
					foundAuthor.save((err, data) =>
					{
						res.redirect("/photos/"+req.params.id);
					})
				}
			})
		}
	})
});


router.post("/", (req, res) => {
	Users.findById(req.body.userId, (err, foundUser) => {
		if (err){
			console.log(err)
		} else {
			Photos.create(req.body, (err, createdPhoto) => {
				if (err){
					console.log(err)
				} else {
					foundUser.photos.push(createdPhoto);
					foundUser.save((err, data) => {
						res.redirect("/photos");
					})
				}
			})
		}
	})
	
})

router.delete("/:id", (req, res) => {
	Photos.findByIdAndRemove(req.params.id, (err, removePhoto) => {
			Users.findOne({"photos._id": req.params.id}, (err, foundUser) =>{
					if (err){
						console.log(err)
					} else {
						foundUser.photos.id(req.params.id).remove();
						foundUser.save((err, data) => {
							res.redirect("/photos");
						})
					}
			})
			
	})
});



module.exports = router;