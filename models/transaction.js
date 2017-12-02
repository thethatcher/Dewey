var moment = require("moment");

module.exports = function(sequelize, DataTypes){
	var Transaction = sequelize.define("Transaction", {
		lent_date: {
			type: DataTypes.DATE
			,defaultValue: moment().format('YYYY-MM-DD HH:mm:ss')

			
		},
		due_date: {
			type: DataTypes.DATE
			,defaultValue: moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss')
		},
		returned_date: {
			type: DataTypes.DATE
		},
		lent_condition:{
			type: DataTypes.TEXT
		},
		return_condition: {
			type: DataTypes.TEXT
		},
		borrower_rating: {
			type: DataTypes.INTEGER
			,validate: { min: 0, max: 5}
		},
		lender_rating: {
			type: DataTypes.INTEGER
			,validate: { min: 0, max: 5}
		},
		borrower: {
			type: DataTypes.STRING
		}
		
	});

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
			as: "lender_user"
			,foreignKey: {
				allowNull: false
			}
		});
	}

	return Transaction;
}