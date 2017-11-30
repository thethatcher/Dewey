const router = require("express").Router();
const db = require("../../models");

router.route("/")
//the get route for items is deprecated by the /users/items/:username route.
.get((req,res)=>{
	db.Item.findAll({
      where:{UserUsername: req.params.username} 
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
        UserUsername: req.body.username 
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
})
.delete((req, res)=>{
  dbItem.destroy({where:{id: req.params.id}})
});

module.exports = router;