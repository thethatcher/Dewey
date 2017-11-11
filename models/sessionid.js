module.exports = function(sequelize, DataTypes){
	var Sessionid = sequelize.define("Sessionid", {
		sessionid: {
			type: DataTypes.STRING
			,allowNull: false
		}
	});

	// Sessionid.associate = function(models){
	// 	Sessionid.belongsTo(models.User,{});
	// }

	return Sessionid;
}