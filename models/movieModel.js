module.exports = function(sequelize, DataTypes){
	var Movies = sequelize.define("Movie", {
		movie_name: {
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
		},
		date: {
			type: DataTypes.DATE, 
			allowNull: false
		}

	});
	return Movies;
}