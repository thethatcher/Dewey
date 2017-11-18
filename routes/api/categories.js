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
		dbResult[0].addUser(2); //TODO DELTA replace the '2' with the currently logged in user's ID
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
		dbResult[0].addUser(2); //TODO DELTA replace the '2' with the currently logged in user's ID
		res.json(dbResult);
	})
})
.delete((req,res)=>{
	res.json({});
});

router.route("/safe")
.get((req,res)=>{
	db.Category.findAll({where: {safe: true}})
	.then((dbResult)=>{
		res.json(dbResult);
	});
});

module.exports = router;