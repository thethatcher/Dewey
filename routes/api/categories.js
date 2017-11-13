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
	db.Category.findOrCreate({
		where:{name: req.body.name}
		,defaults:{safe: null}
	}).then((dbResult)=>{
		dbResult[0].addUser(2); //TODO replace the '1' with the currently logged in user's ID
		res.json(dbResult);
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