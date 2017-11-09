module.exports = function(sequelize, DataTypes){
	var Item = sequelize.define("Item", {
		name:{
			type:DataTypes.STRING
			,allowNull: false
			,validate: {
				len:[1]
			}
		},
		description: {
			type:DataTypes.TEXT
			,allowNull:true
		},
		lent_out: {
			type: DataTypes.BOOLEAN
			,allowNull: false
			,defaultValue: false
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

	Item.associate = function(models){
		Item.hasMany(models.Transaction,{});
		Item.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
		Item.belongsTo(models.Category, {
			foreignKey: {
				allowNull: false
			}
		});
	}

	return Item;
}