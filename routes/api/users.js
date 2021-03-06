const router = require("express").Router();
const db = require("../../models");

//matches requestes to /api/users
router.route("/")
.get((req,res)=>{
	db.User.findAll({})
	.then((dbResults) =>{
		res.json(dbResults);
	});
})
.post((req, res) => {
	db.User.findOrCreate({
		where:{
			username: req.body.username
		},
		defaults:{nickname: req.body.username}
	}).then((dbResults) =>{
		//if this is true a new user was created. 
		if (dbResults[1]) {
			res.json(dbResults[0]);
		}
		//if false the username is taken, and the response has a message stating such.
		else{
			res.json({message:"Username already exists", user: dbResults[0]});
		}
	});
});

router.route("/items/:username/:categoryId")
.get((req,res)=>{
	db.Item.findAll({
		order: [["name","ASC"]],
		where: {UserUsername: req.params.username, CategoryId: req.params.categoryId} 
		,include: [{
        model: db.Transaction
        ,limit: 1
        ,order: [["updatedAt","DESC"]]
        }]
	})
	.then((dbItems)=>{
		res.json(dbItems);
	});
});

router.route("/categories/:username")
.get((req,res)=>{
	db.Category.findAll({
		order: [["name","ASC"]],
		include:[{model:db.User, where:{username: req.params.username}}]
	})
	.then((dbCategories)=>{res.json(dbCategories);});
});

//matches requests to /api/users/:username
router.route("/:username")
.get((req,res) =>{
	db.User.find({
		where:{username: req.params.username}
	}).then((dbResults)=>{
		res.json(dbResults);
	})
});
module.exports = router;