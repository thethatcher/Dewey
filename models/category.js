module.exports = function(sequelize, DataTypes){
	var Category = sequelize.define("Category", {
		name:{
			type:DataTypes.STRING
			,allowNull: false
			,validate: {
				len:[1]
			}
		},//WhoAudit fields below. 
		modifiedby_user_id:{
			type:DataTypes.STRING
			,defaultValue: "root"
		}//timestamps input automatically by Sequelize. 
		// created_date:{
		// },
		// modified_Date:{
		// }
	});

	Category.associate = function(models){
		Category.hasMany(models.Item,{});
		Category.hasMany(models.Transaction);
		Category.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	}

	return Category;
}