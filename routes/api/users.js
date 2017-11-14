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
		defaults:{nickname: req.body.nickname}
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

router.route("/items")
.get((req,res)=>{
	db.Item.findAll({
		where: {userId: 1} //DELTA need to add the dynamic userID variable here.
	})
	.then((dbItems)=>{
		res.json(dbItems);
	});
});

router.route("/categories")
.get(req,res)=>{
	db.Category.findAll({
		where:{userId: 1 }//DELTA need to add the dynamic userID variable here. 
	})
	.then((dbCategories)=>{res.json(dbCategories);});
}

//matches requests to /api/users/:id
router.route("/:id")
.get((req,res) =>{
	db.User.find({
		where:{id: req.params.id}
	}).then((dbResults)=>{
		res.json(dbResults);
	})
});
module.exports = router;