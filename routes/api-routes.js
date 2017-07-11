var db= require('../models');

var imdb = require('imdb-api');

module.exports= function(app){


//route to handle imdb get movie request
app.get('/api/movies/', function(req, res){
	db.Movies.findAll({}).then(function(data){
		res.json(data);
	})
});

}


//click movies
//goes to movies html page.
//click button to add new movie..
//modal pops up

//search for a movie
	//when on click, redirect to a new route that handles the get for imbdb API. 
	//-.search npm
	//-populates the modal/page of results from api
	//-add movies button next to each movie result (this button has a data-value of the respeective movie ID and title)
	//-when we click add movie button, 
	//we store that movie into our database (using post and sequelize .create)
//pick a movie, and add category + personal notes


//front end js --- api(middle man) --database
