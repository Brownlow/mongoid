
$(document).ready(function(){
    // Scrape Data and return articles from DB
    $('#get-news').on('click', function(event){
        event.preventDefault();

        $.get('/', function(res, req){
            data: res
        });
    });
})

 