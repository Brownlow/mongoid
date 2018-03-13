
$(document).ready(function(){
    $('#get-news').on('click', function(event){
        event.preventDefault();

        $.get('/', function(res, req){
            data: res
        });
    });
})

 