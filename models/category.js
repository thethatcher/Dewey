module.exports = function(sequelize, DataTypes){
	var Category = sequelize.define("Category", {
		name:{
			type:DataTypes.STRING
			,allowNull: false
			,validate: {
				len:[1]
			}
		},
		safe: {
			type: DataTypes.BOOLEAN
		}
	});

	Category.associate = function(models){
		Category.hasMany(models.Item,{});
		Category.hasMany(models.Transaction);
		Category.belongsToMany(models.User, {through: "user_category_junction"});
	}

	return Category;
}