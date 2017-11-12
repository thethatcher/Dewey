const router = require("express").Router();
const db = require("../../models");

router.route("/")
	.get((req,res)=>{
		db.User.find({})
			.then((dbResults) =>{
				res.json(dbResults);
			});
	});

module.exports = router;