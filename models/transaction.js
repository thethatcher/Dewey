var moment = require("moment");

module.exports = function(sequelize, DataTypes){
	var Transaction = sequelize.define("Transaction", {
		transaction_date: {
			type: DataTypes.DATE
			,defaultValue: moment().format('YYYY/MM/DD HH:mm:ss')
		},
		due_date: {
			type: DataTypes.DATE
			,defaultValue: moment().add(7, 'days').format('YYYY/MM/DD HH:mm:ss')
		},
		type:{
			type: DataTypes.ENUM
			,values: ['LEND','RETURN']
			,allowNull: false
		},
		item_condition: {
			type: DataTypes.TEXT
		},
		lendee: {
			type: DataTypes.STRING
		},
		//WhoAudit fields below. 
		modifiedby_user_id:{
			type:DataTypes.STRING
			,defaultValue: "root"
		}//timestamps input automatically by Sequelize. 
		// created_date:{
		// },
		// modified_Date:{
		// }
	});

	// Transaction.associate = function(models){
	// 	Transaction.belongsTo(models.User, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	});
	// }

	Transaction.associate = function(models){
		Transaction.belongsTo(models.Item, {
			foreignKey: {
				allowNull: false
			}
		});
		Transaction.belongsTo(models.Category,{
			foreignKey: {
				allowNull: false
			}
		});
		Transaction.belongsTo(models.User,{
			foreignKey: {
				allowNull: false
			}
		});
	}

	return Transaction;
}