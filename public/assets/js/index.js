
$(document).ready(function(){

    // Get All Articles
    // $.get('/', function(res, req){
    //     data: res
    //     console.log(res)
    //     for (var i = 0; i < res.length; i++) {
    //         // Display the apropos information on the page
    //         $("#articles").append("<p data-id='" + res[i]._id + "'>" + res[i].title + "<br />" + res[i].link + "</p>");
    //       }
    // });


    // Scrape Data and return articles from DB
    $('#get-news').on('click', function(event){
        event.preventDefault();

        $.get('/', function(res, req){
            data: res

            // for (var i = 0; i < res.length; i++) {
            //     // Display the apropos information on the page
            //     $("#articles").append("<p data-id='" + res[i]._id + "'>" + res[i].title + "<br />" + res[i].link + "</p>");
            //   }
        });
    });
})

 