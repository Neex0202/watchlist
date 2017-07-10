$(document).ready(function(){

	var searchContainer= $('.searchContainer');
	var futureContainer=  $('.futureBody')
	var currentContainer=  $('.currentBody')
	var finishedContainer=  $('.finishedBody')
	
	

	// var imdb= require('')

	$('#addMovie').on("click", function() {
	   $('#modelWindow').modal('show');
	});

	$("#movie-form").on("submit", handleMovieFormSubmit);
	

	$("#modalSubmit").on("click", handleMovieFormSubmit);

	function handleMovieFormSubmit(event) {
		event.preventDefault();
		//search movie ajax function
		var searchMovie = $("#searchMovie").val().trim();
		movieSearch(searchMovie);
	}

	$(".deleteButton").on("click", function(){

	});

	$(".updateButton").on("click", function(){

	});


	function movieSearch(searchMovie){
		console.log("sdjasjkdkaskjdh")
		$.ajax({
			method: 'GET',
			url: '/imdb-search/' + searchMovie
		}).done(function(data){
			console.log(data.results);
		})


	//take the data and pass it into models
	//we then put it into out database
		
	}


});

