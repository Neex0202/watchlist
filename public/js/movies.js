$(document).ready(function(){

	var searchContainer= $('.searchContainer');
	var futureContainer=  $('.futureBody');
	var currentContainer=  $('.currentBody');
	var finishedContainer=  $('.finishedBody');
	var chosenContainer= $(".chosenContainer");
	var chosenTitle= $(".chosenTitle"); 
	var chosenCategory= $(".chosenCategory");
	var chosenNotes= $(".chosenNotes");

	$('#addMovie').on("click", function() {
	   $('#modelWindow').modal('show');
	});

	$("#searchTop").on("click", handleMovieFormSearch); 

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
				event.preventDefault(); 
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
				var theIMDBID = currentPosition.imdbid
				var theCategory = $("#category"); 
				var theNotes = $("#notes"); 

				$(".modal-footer").css("display", "block"); 

				$("#modalSubmit").on("click", handleSubmit); 

				function handleSubmit(event) {
					event.preventDefault(); 

					var newMovie = {
						title: theTitle, 
						category: theCategory.val(), 
						notes: theNotes.val().trim(),
						imdb_id: theIMDBID,
						poster: thePoster
					}; 

					console.log(newMovie);

					if (!theCategory.val() || !theNotes.val().trim()) {
						return; 
					} else {
						submitPost(newMovie); 
					} 

					function submitPost(Post) {
						$.post("/api/movies", Post);
					}

				} // handleSubmit 

			} // handleAdd

		}); 
	}; //end movieSearch 

	function handleMovieFormSearch(event) {
		event.preventDefault();
		var searchMovie = $("#searchMovie").val().trim();
		movieSearch(searchMovie);
	}; //handleMovieFormSubmit

});

