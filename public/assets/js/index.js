
$(document).ready(function(){
    // Scrape Data and return articles from DB
    $('#get-news').on('click', function(event){
        event.preventDefault();

        // Launch Alert Modal
        $('#myModal').modal()

    });

    // Save Article 
    $('#save-article').on('click', function(event){
        event.preventDefault();
        
        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/:id" + thisId
          })
    });
});

 