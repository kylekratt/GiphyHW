var topics = [
    "Cats",
    "Video Games",
    "Anime",
    "Star Wars",
    "Zelda",
    "Mario",
    "Chess"
]
function displayButtons() {
    $("#button-array").empty();
    topics.forEach(function (element) {
        var newButton = $("<button>");
        newButton.attr("id", element);
        newButton.text(element);
        newButton.addClass("gif-link btn btn-dark mx-2 my-1 py-0");
        $("#button-array").append(newButton);
    })
    $(".gif-link").on('click', displayGifs);
}
$("#submit").on("click", function (event) {
    event.preventDefault();
    var newCat = $("#input").val().trim();
    topics.push(newCat);
    displayButtons();
})
function displayGifs() {
    var q = $(this).attr("id");
    var url = "https://api.giphy.com/v1/gifs/search?api_key=KgBAm5Fc4b6KqmACEjS7g6Uc9xxpJKIa&q=" + q + "&limit=10&lang=en";
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var gifArray = $("<div>");
        response.data.forEach(function (element) {
            var newDiv = $("<div>");
            newDiv.addClass("d-inline-block m-2 card border-dark rounded-0");
            var newGif = $("<img>");
            newGif.attr({ "src": element.images.fixed_height_still.url, "data-active": element.images.fixed_height.url, "data-still": element.images.fixed_height_still.url, "alt": element.title, "data-state": "still" });
            newGif.addClass("gif card-image-bottom");
            newDiv.append("<h4 class=\"card-header\">Rating: " + element.rating.toUpperCase() + "</h5>");
            newDiv.append(newGif);
            gifArray.append(newDiv);
        })
        $("#gif-container").prepend(gifArray);
        $(".gif").on("click", toggle);
    })
}
function toggle() {
    if ($(this).attr("data-state") == "still") {
        $(this).attr({ "src": $(this).attr("data-active"), "data-state": "active" })
    }
    else {
        $(this).attr({ "src": $(this).attr("data-still"), "data-state": "still" })
    }
}
displayButtons();