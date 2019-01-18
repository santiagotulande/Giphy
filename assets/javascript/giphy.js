var giphyArr= ["Dog", "Cat"]; //initial gihp array
    var positionArr=[0,1,2,3,4,5,6,7,8,9]; // array use to find the position of the data coming from URL
    console.log(giphyArr.length);
    
    function displayGiphy() {


$(".giphy-btn").click(function(){
  $("p").remove();
  $("img").remove();
  $("giphy-view").remove();
  //$("div").remove();
});

var GiphyVal = $(this).attr("data-name");
//var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NN3HgUr25xfdaeYVR9ADlZHIB6XlKWM9&q=Dog&limit=1&offset=0&rating=PG&lang=en";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NN3HgUr25xfdaeYVR9ADlZHIB6XlKWM9&q=" + GiphyVal + "&limit=10&offset=0&rating=PG&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);

    // Creating a div to hold giphy
    for(i=0; i<positionArr.length; i++){
    var giphyDiv = $("<div class='giphy'>");


// Stores the rating data
var rating = response.data[i].rating;


// Create an element to display rating
var rating1 = $("<p>").text("Rating: " + rating);

// Displaysthe rating
giphyDiv.append(rating1);

// Retrieving the URL for the image
//var imgURL = response.data[i].images.original_still.url;
var imgURL = response.data[i].images.downsized.url;

// Creating an element to hold the image
var imageGiphy = $("<img>").attr("src", imgURL);

/*$("<img>").click(function(){
 //   imgURL = response.data[i].images.downsized.url;
  //$("div").remove();
//});*/

// Appending the image
giphyDiv.append(imageGiphy);
//}

// Putting the entire movie above the previous movies
$("#giphy-view").prepend(giphyDiv);


}

});

}

// Function for displaying movie data
function renderButtons() {

// Deleting the movies prior to adding new movies
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-NewGiphy").empty();
// Looping through the array of movies
for (var i = 0; i < giphyArr.length; i++) {

// Then dynamicaly generating buttons for each movie in the array
// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
var a = $("<button>");
// Adding a class of movie-btn to our button
a.addClass("giphy-btn");
// Adding a data-attribute
a.attr("data-name", giphyArr[i]);
// Providing the initial button text
a.text(giphyArr[i]);
// Adding the button to the buttons-view div
$("#buttons-NewGiphy").append(a);
}
}

// This function handles events where a movie button is clicked
$("#add-giphy").on("click", function(event) {
event.preventDefault();

/*$('ul').on('click','.undo',function(e) {
    $(this).prev().remove(); 
    $(this).remove();   
});*/

// This line grabs the input from the textbox
var GiphyVal = $("#giphy-input").val().trim();

// Adding giphy from the textbox to our array
giphyArr.push(GiphyVal);

// Calling renderButtons which handles the processing of our movie array
renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".giphy-btn", displayGiphy);

// Calling the renderButtons function to display the intial buttons
renderButtons();