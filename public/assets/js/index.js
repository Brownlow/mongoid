
$(document).ready(function(){
    // Scrape Data and return articles from DB
    $('#get-news').on('click', function(event){
        event.preventDefault();

        $.ajax({
            method: "GET",
            url: "/scrape" 
          })

        // Launch Alert Modal
        $('#myModal').modal()

    });

    // Save Article 
    $(document).on('click', '#save-article', function(event){
        event.preventDefault();
        // console.log("Above")
        var thisId = $(this).attr("data-id");
        // console.log(thisId)
        // console.log("AYO!")
        $.ajax({
            method: "GET",
            url: "articles/" + thisId
        })
    });

    // Save Note
    $('#save-comment').on('click', function(event){
        event.preventDefault();

        var id = $(this).attr("value");
        
	    var message = $("#comment-text").val().trim();
        console.log(message)     
        $.ajax({
            method: 'POST',
            message: 'message',
            url: "/note/" + id
        })
        
    })
});

 