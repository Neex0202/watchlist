$(document).ready(function(){

	var searchContainer= $('.searchContainer');
	var futureContainer=  $('.futureBody');
	var currentContainer=  $('.currentBody');
	var finishedContainer=  $('.finishedBody');
	var chosenContainer= $(".chosenContainer"); 

	$('#addMovie').on("click", function() {
	   $('#modelWindow').modal('show');
	});

	$("#searchTop").on("click", handleMovieFormSubmit); 

	// $("#movie-form").on("submit", handleMovieFormSubmit);

	// $("#modalSubmit").on("click", handleMovieFormSubmit);

	$(".deleteButton").on("click", function(){

	});

	$(".updateButton").on("click", function(){

	}); 

	function movieSearch(searchMovie){
		$.ajax({
			method: 'GET',
			url: '/imdb-search/' + searchMovie
		}).done(function(data){
			console.log(data.results);

			var results = data.results; 
			searchContainer.empty(); 
			var topSearch = []; 

			for (var i = 0; i < results.length; i++) {
				topSearch.push(createSearchContainer(results[i])); 
			}
			searchContainer.append(topSearch); 

			function createSearchContainer() {
				var topSearchDiv = $("<div>");
				topSearchDiv.addClass("panel panel-default");
				var newSearchbody = $("<div>");
				newSearchbody.addClass("panel-body"); 
				var newImg = $("<img src = " + results[i].poster + " alt= 'poster' height= '200px' width= '100px'>");
				newSearchbody.append(newImg); 
				var newTitle = $("<h3>"); 
				newTitle.text(results[i].title); 
				newSearchbody.append(newTitle); 
				var newYear = $("<p>"); 
				newYear.text(results[i].year); 
				newSearchbody.append(newYear);  

				var addBtn = $("<button>"); 
				addBtn.text("Add"); 
				addBtn.addClass("add"); 
				newSearchbody.append(addBtn); 
				topSearchDiv.append(newSearchbody);

				topSearchDiv.data("results", results[i]); 
				return topSearchDiv; 

			}; //createSearchContainer

			$(".add").on("click", handleAdd);

			function handleAdd(event) {
				var currentPosition = $(this)
					.parent()
					.parent()
					.data("results")
				$(".searchContainer").hide(); 
				$(".chosenContainer").text(currentPosition.title);
			}

		}); 
	}; //end movieSearch 

	function handleMovieFormSubmit(event) {
		event.preventDefault();
		var searchMovie = $("#searchMovie").val().trim();
		movieSearch(searchMovie);
	}; //handleMovieFormSubmit

});

