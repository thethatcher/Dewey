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
		},
		lender_rating:{
			type: DataTypes.DOUBLE
		}
	});

	User.associate = function(models){
		User.hasMany(models.Item,{});
		User.hasMany(models.Transaction,{});
		User.belongsToMany(Category,{through: "user_category_junction"});
	}

	return User;
}