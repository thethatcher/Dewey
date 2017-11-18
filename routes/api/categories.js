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
	//disassociate the user with the category. do not delete it completely. 
	db.Category.findOne({where: {id:req.params.id}})
	.then((dbResult)=>{
		console.log(dbResult);
		db.User.findOne({where:{id:2}}) //DELTA update 2 to be the dynamic userID.
		.then((dbUser)=>{ 
			dbResult.removeUser(dbUser)
			.then((dbResult)=>{res.json(dbResult)});
		});
		//delete all items and transactions assocaited to that category.
		db.Item.destroy({
			where:{UserId: 2, CategoryId: dbResult.id} //DELTA
		})
		.then((destroyResult)=>{res.json(destroyResult);});
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