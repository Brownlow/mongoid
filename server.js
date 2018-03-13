// Require all the things
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

// Initialize express
var app = express();

// Public folder
app.use(express.static("public"));

// Connect Mongoose 
mongoose.connect('mongodb://localhost/mongoid');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection made')
});

var collections = ["scrapeData"];

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// Body Parser Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api_json"}))


//Routes
//require("./routes/app-routes.js")(app);

app.get('/', function(req, res){
    request('https://www.reddit.com/r/webdev', function(error, repsonse, html){

        var $ = cheerio.load(html);
        $('p.title').each(function(i, element){
            var title = $(element).text();
            var link = $(element).children().attr('href');

            db.scrapeData.insert({title:title, link:link})
        })
    });
    
    res.render("index", {thing: "thing"});
})

// Listen on Port 8000;
app.listen(8000, function(){
    console.log("App Running on port 8000")
});