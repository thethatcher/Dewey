const router = require("express").Router();
const db = require("../../models");

router.route("/")
.get((req,res)=>{
	db.Item.findAll({
      where:{UserId: 1} //DELTA UserID will need to be replaced by the variable for the currently logged in user. 
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

//check items in 
router.route("/checkIn/:id")
.put((req,res)=>{
  db.Item.findOne({
      where:{
        UserId: 1 //DELTA UserID will need to be replaced by the variable for the currently logged in user. 
        ,id: req.params.id
      } 
      ,include: [{
        model: db.Transaction
        ,limit: 1
        ,order: [["updatedAt","DESC"]]
        }
        ,{
          model:db.Category
          ,attributes:["name","id"]
        }]
    }).then((dbItem) => {
      db.Transaction.update(req.body,
        {
        where: {id: dbItem.Transactions[0].id}
        }
        ).then((transactionUpdate)=>{
          db.Item.update({lent_out: false}, {where:{id: dbItem.id}})
          .then((checkInItem)=>{res.json(checkInItem);});
        })
    });
});

//get and update a specific item's name, description, etc...
router.route("/:id")
.get((req,res)=>{
  db.Transaction.findOne({where:{id: req.params.id}})
})
.put((req,res)=>{
  db.Transaction.update({
    where:{id: req.params.id}
    ,values: req.body
  });
});

router.route("/")
.get((req,res)=>{
	db.Item.findAll({})
	.then((dbResult)=>{
		res.json(dbResult);
	});
})
.post((req,res)=>{
	db.Item.findOrCreate({
		where:{name: req.body.name}
		,defaults:{safe: null}
	}).then((dbResult)=>{
		dbResult[0].addUser(2); //TODO replace the '1' with the currently logged in user's ID
		res.json(dbResult);
	});
});

router.route("/safe")
.get((req,res)=>{
	db.Item.findAll({where: {safe: true}})
	.then((dbResult)=>{
		res.json(dbResult);
	});
});


module.exports = router;