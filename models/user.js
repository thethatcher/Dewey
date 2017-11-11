module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		username:{
			type:DataTypes.STRING
			,allowNull: false
			,validate: {
				len:[4]
			}
		},
		nickname:{
			type: DataTypes.STRING
			},
		borrower_rating: {
			type: DataTypes.DOUBLE
			,validate: {max: 5, min: 0}
		},
		lender_rating:{
			type: DataTypes.DOUBLE
			,validate: {max: 5, min: 0}
		}
	});

	User.associate = function(models){
		User.hasMany(models.Item,{});
		User.hasMany(models.Transaction,{});
		User.hasMany(models.Sessionid, {});
		User.belongsToMany(models.Category,{through: "user_category_junction"});
	}

	return User;
}