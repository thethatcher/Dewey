module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		username:{
			type:DataTypes.STRING
			,allowNull: false
			,validate: {
				len:[5]
			}
		}
	});

	User.associate = function(models){
		User.hasMany(models.Item,{});
		User.hasMany(models.Transaction,{});
		User.hasMany(models.Category,{});
	}

	return User;
}