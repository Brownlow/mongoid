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
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mongoid');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection made')
});

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// Body Parser Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api_json"}));

// Require all models
var db = require("./models");

var newArticle = {};

app.get('/', function(req, res){
    request('https://www.reddit.com/r/webdev', function(error, repsonse, html){

        var $ = cheerio.load(html);
        $('p.title').each(function(i, element){
            var title = $(element).text();
            var link = $(element).children().attr('href');
            var author = $(element).siblings('.tagline').children('a').text();
            var date = $(element).siblings('.tagline').children('time').text();
            var saved = false;
        
            newArticle = {
                title:title,
                link:link,
                author:author,
                date:date,
                saved:saved
            };
            
            db.Article.create(newArticle)
            .then(function(dbArticle) {
                //console.log(dbArticle)
            })
            .catch(function(err) {
              return res.json(err);
            });      
        });
    });
    console.log("articles added");
    res.render("index", newArticle);
});


// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  db.Article.find({})
  .then(function(dbArticle){
    res.json(dbArticle)
  })
  .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
  });
});


// Route to get all articles marked as saved
app.get('/saved', function(req, res){

    db.Article.find({ saved: true })
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
          res.render("saved", dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    
});


// Listen on Port 8000;
app.listen(8000, function(){
    console.log("App Running on port 8000")
});