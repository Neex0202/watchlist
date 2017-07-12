$(document).ready(function(){

	var searchContainer= $('.searchContainer');

	var futureContainer=  $('.futureBody');

	var currentContainer=  $('.currentBody');

	var finishedContainer=  $('.finishedBody');

	var chosenContainer= $(".chosenContainer");

	var chosenTitle= $(".chosenTitle"); 

	var chosenCategory= $(".chosenCategory");

	var chosenNotes= $(".chosenNotes");

	var currentPosition;

	var addArray= [];


	$('#addMovie').on("click", function() {
	   $('#modelWindow').modal('show');
	});

	//christians help--- callback for ajax search on a specified movie
	$("#searchTop").on("click", handleMovieFormSearch); 

	//dynamically adding event listeners to dynamically created buttons
	$(document.body).on('click', 'button#add', handleAdd);

	$("#modalSubmit").on("click", handleSubmit);

	//run as soon as the page loads. this populates sections with movie form Database
	moviePopulator(); 

	// $(".deleteButton").on("click", function(){
	// });
	// $(".updateButton").on("click", function(){
	// }); 



	//ajax request to pull data from the database/server
	//Then calls function to populate it on the page
	function moviePopulator(){
	  $.ajax({
	      method: 'GET',
	      url: '/api/movies'
	  }).done(function(data){
	  		console.log("\nData from the server using moviePopulator() [pulling from our API]");
	      console.log(data);

	      $(".futureBody").empty();
	      //populate movies onto front end
	      for(var i = 0; i< data.length; i++){
	      	if(data[i].category =="future"){
	      		//populate into future section using .html
	      		$(".futureBody").append(data[i].title)
	      		// $(".futureBody").append('img src=')

	      	}
	      	else if(data[i].category=="current"){
	      		//populate into current section .html
	      	}
	      	else if(data[i].category=="watched"){
	      		//populate onto the watched section .html
	      	}
	      }
	  })
	}


	function movieSearch(searchMovie){
		$.ajax({
			method: 'GET',
			url: '/imdb-search/' + searchMovie
		}).done(function(data){

			console.log("\nAJAX RESPONSE");
			console.log(data.results);

			var results = data.results; 
			searchContainer.empty(); 
			var topSearch = []; 

			for (var i = 0; i < results.length; i++) {
				// topSearch.push(createSearchContainer(results[i])); 

				var topSearchDiv = $("<div>");
				topSearchDiv.addClass("panel panel-default");

				var newClass = topSearchDiv.addClass("newclass" + i);

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

				topSearchDiv.data('results', results[i]);

				// console.log($('.newClass1').data('results'));

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

		//button
		// console.log($(this));
		//shows that the button is type of object
		// console.log(typeof $(this))

		//target the selected div where the movie is stored. 'this' refers to the add button (which is an object!)
		//** 'this' always refers to the value of an object	(invoking object) **
	 	currentPosition = $(this)
			.parent()
			.parent()
			.data("results")		

		console.log("\nCURRENT MOVIE/ MOVIE THAT USER ADDED");
		console.log(currentPosition);

		// //select data-result 
		// var getBackMyJSON = $('.newclass1').data('results').title;
		// console.log(getBackMyJSON);

		$(".searchContainer").hide(); 
		$(".chosenTitle").append("<b>Title: </b>");
		$(".chosenTitle").append("<br><b>" + currentPosition.title + "</b>");

		//DOM for category
		var newForm = $("<form>"); 
		var newFormClass = $("<div>").addClass("form-group");
		var label = $("<label for= 'category' >Select Catagory:</label>"); 
		var dropDown = $("<select class='form-control' id='category'>"); 
		var option = $("<option value='future'>What to Watch</option><option value='current'>Currently Watching</option><option value='finished'>Finished Watching</option> </select>"); 

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

		$(".modal-footer").css("display", "block"); 

	} // handleAdd


	function handleSubmit(event) {
		event.preventDefault(); 

		//the 'this' points to the submit button since it is an object---we turned the submit button into a jquery object
		// console.log($(this));

		//getting info for columns 
		var thePoster = currentPosition.poster;
		var theTitle = currentPosition.title;
		var theIMDBID = currentPosition.imdbid;
		var theCategory = $("#category option:selected").val(); 
		var theNotes = $("#notes").val(); 

		console.log("The category is : " + theCategory);

		addArray.push(thePoster, theTitle, theIMDBID, theCategory, theNotes);
		
		//we don't need this array? We can pass in values from above into newMovie
		console.log("\nADDED COLUMN INFO TO ARRAY: AFTER USER CLICKS SUBMIT BUTTON")
		console.log(addArray);

		var newMovie = {
			title: addArray[1], 
			category: addArray[3],
			notes: addArray[4],
			imdb_id: addArray[2],
			poster: addArray[0]
		}; 

		console.log("\nNEW MOVIE OBJECT CREATED:")
		console.log(newMovie);

		if (!addArray[3]) {
			return; 
		} else {
			submitMovie(newMovie); 
		} 

	} // handleSubmit 


	function submitMovie(Movie) {
		console.log("before ajax post");
		$.ajax({
			type: 'POST',
			url:'/api/movies',
			data: Movie
		}).done(function(){
			console.log("posted data");	

			//redirects us back to the movies html
			// window.location.href = "/movies";

		})
	}//handle submitMovie

	//christians help
	function handleMovieFormSearch(event) {
		event.preventDefault();
		var searchMovie = $("#searchMovie").val().trim();
		movieSearch(searchMovie);
	}; //handleMovieFormSubmit

});

