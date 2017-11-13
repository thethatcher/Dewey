const router = require("express").Router();
const db = require("../../models");

router.route("/")
// .get()
.post((req,res)=>{
	db.Transaction.create(req.body)
	.then((dbResult)=>{res.json(dbResult)});
})
module.exports = router;