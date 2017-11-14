const router = require("express").Router();
const db = require("../../models");

router.route("/")
.get((req,res)=>{
	db.Transaction.findAll({})
	.then((dbResult)=>{
		res.json(dbResult);
	});
})
.post((req,res)=>{
	db.Transaction.create(req.body)
	.then((dbResult)=>{res.json(dbResult)});
});

router.route("/:id")
.get((req,res)=>{
	db.Transaction.findOne({where:{id: req.params.id}})
	.then((dbResult)=> {res.json(dbResult)});
});

//all transaction updates will be handled from the items routes. 

module.exports = router;