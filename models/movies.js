module.exports = function(sequelize, DataTypes){
	var Movie = sequelize.define("Movie", {
		title: {
			type: DataTypes.STRING,
		},
		category: {
			type: DataTypes.STRING,
		},

		notes: {
			type: DataTypes.STRING,
		},
		imdb_id: {
			type: DataTypes.STRING,
		}, 
		poster: {
			type: DataTypes.STRING,
		}

	});
	return Movie;
}