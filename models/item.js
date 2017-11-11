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
		}
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