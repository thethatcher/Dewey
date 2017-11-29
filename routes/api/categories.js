const router = require("express").Router();
const db = require("../../models");

router.route("/")
.get((req,res)=>{
	db.Category.findAll({})
	.then((dbResult)=>{
		res.json(dbResult);
	});
})
.post((req,res)=>{
	//looks for an existing category with the name input by user. creates a new category if an existing one is not found. 
		//adds an association between the returned Category and the user specified to the user_category_junction table.
	db.Category.findOrCreate({
		where:{name: req.body.name}
		,defaults:{safe: null}
	}).then((dbResult)=>{
		dbResult[0].addUser(req.body.username); 
		res.json(dbResult);
	});
});

router.route("/:id")
.get((req, res)=>{
	db.Category.find({
		where: {id: req.params.id}
	}).then((dbResult)=>{
		res.json(dbResult);
	})
})
.put((req, res)=>{
	db.Category.findOrCreate({
		where:{name: req.body.name}
		,defaults:{safe: null}
	}).then((dbResult)=>{
		//adds an association between the returned Category and the user specified to the user_category_junction table.
		dbResult[0].addUser(req.body.username);
		res.json(dbResult);
	})
});

router.route("/:id/:username")
.delete((req,res)=>{
	//disassociate the user with the category. do not delete it completely. 
	db.Category.findOne({where: {id:req.params.id}})
	.then((dbCategory)=>{
		db.User.findOne({where:{username: req.params.username}})
		.then((dbUser)=>{
			dbCategory.removeUser(dbUser)
			.then((dbResult)=> {res.json(dbResult)});
		});
	}); 
});


router.route("/safe")
.get((req,res)=>{
	db.Category.findAll({where: {safe: true}})
	.then((dbResult)=>{
		res.json(dbResult);
	});
});

module.exports = router;