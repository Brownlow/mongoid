
$(document).ready(function(){
    // Scrape Data and return articles from DB
    $('#get-news').on('click', function(event){
        event.preventDefault();

        // Launch Alert Modal
        $('#myModal').modal()

        // $.get('/', function(res, req){
        //     data: res
        // });
    });

    // Save Article 
    $('#save-article').on('click', function(event){
        event.preventDefault();

        $.get('/article/_id', function(res, req){
            
        })


    })
})

 