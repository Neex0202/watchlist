module.exports = function(sequelize, DataTypes){
	var Movies = sequelize.define("Movie", {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},

		notes: {
			type: DataTypes.STRING,
			allowNull: true
		},
		imdb_id: {
			type: DataTypes.STRING,
			allowNull: false
		}, 
		poster: {
			type: DataTypes.STRING,
			allowNull: false
		}

	});
	return Movies;
}