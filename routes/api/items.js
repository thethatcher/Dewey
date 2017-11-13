const router = require("express").Router();
const db = require("../../models");

router.route("/")
.get((req,res)=>{
	db.Item.findAll({
      where:{UserId: 1} //UserID will need to be replaced by the variable for the currently logged in user. 
      ,include: [{
        model: db.Transaction
        ,limit: 1
        ,order: [["updatedAt","DESC"]]
        }
        ,{
          model:db.Category
          ,attributes:["name","id"]
        }]
    }).then(function(dbItem) {
      res.json(dbItem);
    });
})
.post((req,res)=>{
  db.Item.create(req.body)
  .then((dbResult)=>{
    res.json(dbResult);
  });
})

//get and update a specific item.
// router.route("/:id")
// .get()
// .put()

module.exports = router;