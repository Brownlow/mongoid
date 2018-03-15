
$(document).ready(function(){
    
    // Scrape Data and return articles from DB  ==============================================
    $('#get-news').on('click', function(event){
        event.preventDefault();

        $.ajax({
            method: "GET",
            url: "/scrape" 
          })

        // Launch Alert Modal
        $('#myModal').modal()

       // location.reload();

    });

    // Save Article  ==============================================
    $(document).on('click', '#save-article', function(event){
        event.preventDefault();

        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "articles/" + thisId,
            data: "true"
        })
        location.reload();
    });

    //Unsave Article  ==============================================
    $(document).on('click', '#unsave-article', function(event){
        event.preventDefault();

        var id = $(this).attr("data-id");

        $.ajax({
            method: 'GET',
            url: "articles/" + id
        })
        location.reload();
    })

    // Save Comment  ==============================================
    $(document).on('click','#save-comment', function(event){
        event.preventDefault();

        var id = $(this).attr("data-id");
        var message = $("#comment-text").val().trim();
        
        $.ajax({
            method: 'POST',
            data: { body: message },
            url: "/note/" + id
        })
        .then (function(data){
            console.log(data.body);

            //if(data.body){
                $("#comment-text").val(data.body);
            //};
        });  
    });
});

 