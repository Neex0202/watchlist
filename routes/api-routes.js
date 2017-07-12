
var db = require('../models');

var imdb = require('imdb-api');

module.exports= function(app){

	//route to handle imdb get movie request
	app.get('/api/movies', function(req, res){
		console.log(db.Movie)
		db.Movie.findAll({}).then(function(data){
			console.log(data);
			res.json(data);
		})
	});

	app.post("/api/movies", function(req, res) {
		console.log(req.body);

		// console.log("title: " + req.body.title);
		// console.log("category:" + req.body.category)
		// console.log("notes:" + req.body.notes)
		// console.log("imdb_id" + req.body.imdb_id)
		// console.log("poster:" + req.body.poster)

		db.Movie.create({
			title: req.body.title,
			category: req.body.category,
			notes: req.body.notes,
			imdb_id: req.body.imdb_id,
			poster: req.body.poster
			
		}).then(function(data) {
			res.json(data);
		}).catch(function(err){
			console.log(err);
		});
	}); 

	app.put("/api/movies", function(req, res){

    db.Movie.update({
    	category: req.body.category,
    	notes: req.body.notes
    },

        {
            where: {
                imdb_id: req.body.imdb_id
            }

        }).then(function(data){
            res.json(data);
       	})
	});

	app.delete("/api/movies", function(req, res) {
		db.Movie.destroy({
			where: {
				imdb_id: req.body.imdb_id
			}
		}).then(function(data) {
			res.json(data); 
		});
	});
}//end module.exports