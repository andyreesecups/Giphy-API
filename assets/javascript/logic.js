var topics = ["Penguins", "Mongoose", "Sea Otter", "Panda", "Seal"];
$(document).ready(function() {
    makeButtons();
    $("#submit").on("click", function(event) {
        //default of form makes the form refresh. By writing event.preventDefault, we prevent the form from doing it's 'default' of refreshing.
        event.preventDefault();
        // This line grabs the input from the searchbox
        var userSearch = $("#searchbar").val().trim();
        topics.push(userSearch);
        // Calling the makeButtons function to generate buttons for the userSearch
        makeButtons();

    });

    function makeButtons() {
        $("#buttonView").empty();
        for (var i = 0; i < topics.length; i++) {
            var buttonAppear = $("<button class='buttonAppear'>").text(topics[i]);
            //setting value of the attriute 'data-animal' = userSearch
            buttonAppear.attr("data-animal", topics[i]);
            $("#buttonView").append(buttonAppear);
        }



    }
    // This function displays the giphy's  
    function displayGifs() {

        // Emptying the "animalView" div 
        $("#animalView").empty();
        var animal = $(this).attr("data-animal");
        // Creating an AJAX call for the specific movie button being clicked
        // There is a limit of ten as you can see in the queryURL
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;

            // Loop through results
            for (var i = 0; i < results.length; i++) {
                // Create div to store animal gifs
                var animalDiv = $("<div>");
                var p = $("<p>");
                p.html("rating: " + results[i].rating);
                // Creating an image tag
                var animalImage = $("<img>");
                // Add class of "gif-image" to the element animalImage
                animalImage.addClass("gif-image");
                // Giving the image tag an src attribute of a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                // Create class inline-block to style animalDiv
                animalDiv.addClass("inline-block");
                // Appending the paragraph and animalImage I created to the "animalDiv"
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#animalView").prepend(animalDiv);
            }
        });
    }
    // This if/else statement is what makes the giphy's able to play and be paused -----------------------------------
    // If the data-state = "still" when user clicks, then turn to "animate"
    $("#animalView").on("click", ".gif-image", function() {
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            // Else make data-state = "still"
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", ".buttonAppear", displayGifs);
});
