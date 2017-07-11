var imdb = require("imdb-api");

module.exports= function(app){

	app.get('/imdb-search/:movie', function(req, res){

		imdb.search({
		  title: req.params.movie
		}, {
		  apiKey: '40e9cece'
		}).then(function(data) {
			res.json(data);
		}).catch(function(err) {
			console.log(err);
		});

	});
}


