var db= require('../models');

module.exports= function(app){


//route to handle imdb get movie request

app.get('/api/movies', function(req, res){
	db.Movies.findAll({}).then(function(data){
		res.json(data);
	})
});

}