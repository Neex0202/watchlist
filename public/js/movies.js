$(document).ready(function(){

	var searchContainer= $('.searchContainer');
	var futureContainer=  $('.futureBody');
	var currentContainer=  $('.currentBody');
	var finishedContainer=  $('.finishedBody');
	var chosenContainer= $(".chosenContainer");
	var chosenTitle= $(".chosenTitle"); 
	var chosenCategory= $(".chosenCategory");
	var chosenNotes= $(".chosenNotes");

	var addArray= [];

	$('#addMovie').on("click", function() {
	   $('#modelWindow').modal('show');
	});

	//christians help
	$("#searchTop").on("click", handleMovieFormSearch); 

	//dynamically adding event listeners to dynamically created buttons
	$(document.body).on('click', 'button#add', handleAdd);

	$("#modalSubmit").on("click", handleSubmit); 


	// $(".deleteButton").on("click", function(){

	// });

	// $(".updateButton").on("click", function(){

	// }); 

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
				// topSearch.push(createSearchContainer(results[i])); 
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
				addBtn.attr("id", "add"); 
				newSearchbody.append(addBtn); 
				topSearchDiv.append(newSearchbody);

				topSearchDiv.data("results", results[i]);

				topSearch.push(topSearchDiv);
			}
			searchContainer.append(topSearch); 
			
		}); 
	}; //end movieSearch 

	function handleAdd() {
		// event.preventDefault(); 

		//reset the array for hold the movie object
		addArray=[];

		alert("FUCK OFF BITCH ");
		console.log($(this));

		var currentPosition = $(this)
			.parent()
			.parent()
			.data("results")
		$(".searchContainer").hide(); 
		$(".chosenTitle").append("<b>Title: </b>");
		$(".chosenTitle").append("<br><b>" + currentPosition.title + "</b>");

		//DOM for category
		var newForm = $("<form>"); 
		var newFormClass = $("<div>").addClass("form-group");
		var label = $("<label for= 'category' >Select Catagory:</label>"); 
		var dropDown = $("<select class='form-control' id='category'>"); 
		var option = $("<option value='future'>What to Watch</option><option value='current'>Currently Watching</option><option value='finished'>Finished Watching</option>"); 

		dropDown.append(option); 
		label.append(dropDown); 
		newFormClass.append(label); 
		newForm.append(newFormClass); 
		chosenCategory.append(newForm); 

		//DOM for notes
		var newFormClass2 = $("<div>").addClass("form-group");
		var label2 = $("<label for= 'notes' >Notes:</label>"); 
		var textarea = $("<textarea rows='4' id='notes'></textarea>").addClass("form-control"); 

		label2.append(textarea); 
		newFormClass2.append(label2); 
		chosenNotes.append(newFormClass2); 

		//getting info for columns 
		var thePoster = currentPosition.poster;
		var theTitle = currentPosition.title;
		var theIMDBID = currentPosition.imdbid;
		var theCategory = $("#category").val(); 
		var theNotes = $("#notes").val(); 

		addArray.push(thePoster, theTitle, theIMDBID, theCategory, theNotes);

		// addArray=[];

		console.log(addArray);

		$(".modal-footer").css("display", "block"); 

	} // handleAdd

	function handleSubmit(event) {
		event.preventDefault(); 

		var newMovie = {
			title: addArray[1], 
			category: addArray[3],
			notes: addArray[4],
			imdb_id: addArray[2],
			poster: addArray[0]
		}; 

		console.log(newMovie);

		if (!addArray[3]) {
			return; 
		} else {
			submitMovie(newMovie); 
		} 

	} // handleSubmit 

	function submitMovie(Movie) {
		console.log("before ajax post");

		console.log(Movie);

		$.ajax({
			type: 'POST',
			url:'/api/movies',
			data: Movie
		}).done(function(){
			console.log("posted data");	
		})
	}

	//christian help
	function handleMovieFormSearch(event) {
		event.preventDefault();
		var searchMovie = $("#searchMovie").val().trim();
		movieSearch(searchMovie);
	}; //handleMovieFormSubmit

});

