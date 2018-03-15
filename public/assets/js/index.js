
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

        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "articles/" + thisId
        })
    });

    // Save Note
    $('#save-comment').on('click', function(event){
        event.preventDefault();

        var id = $(this).attr("data-id");
        var message = $("#comment-text").val().trim();
        
        console.log(id)     
        $.ajax({
            method: 'POST',
            url: "/note/" + id
        })
        
    })
});

 