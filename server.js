// Require all the things
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require("morgan");

// Initialize express
var app = express();

// Public folder
app.use(express.static("public"));

// Connect Mongoose 
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Use morgan logger for logging requests
app.use(logger("dev"));

// mLab ??
var MONGODB_URI = "mongodb://heroku_cbp5hb5b:l3qvvdekq966ghouk989eropth@ds215709.mlab.com:15709/heroku_cbp5hb5b" || "mongodb://localhost/mongoid";

// Mongo - Mongoose
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

app.get("/", function(req, res) {
	db.Article.find({saved: false}, function(err, data) {
		if(data.length === 0) {
			res.render("placeholder", {
        message: "There's nothing scraped yet. Please click \"Scrape For Newest Articles\" for fresh and delicious news."
      });
		}
		else{
      res.render("index", {articles: data});
		}
	});
});

// Scrape Data
app.get('/scrape', function(req, res){
    request('https://www.reddit.com/r/webdev', function(error, repsonse, html){

        var $ = cheerio.load(html);
        $('p.title').each(function(i, element){
            //var img = $(element).parentsUntil('.thing').parentsUntil('.midcol').children('a.thumbnail').attr('class');
            var title = $(element).text();
            var link = $(element).children().attr('href');
            var author = $(element).siblings('.tagline').children('a').text();
            var date = $(element).siblings('.tagline').children('time').text();
            var saved = false;
        
            newArticle = {
                id:req.params.id,
                //img: img,
                title: title,
                link: link,
                author: author,
                date: date,
                saved: saved
            };
            
            db.Article.create(newArticle)
            .then(function(dbArticle) {

            })
            .catch(function(err) {
              return res.json(err);
            });      
        });
    });
    console.log("Scrape finished.");
		res.redirect("/");
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  db.Article.find({saved: false})
  .populate('note')
  .then(function(dbArticle){
    //res.json(dbArticle)
    res.redirect("/saved");
  })
  .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
  });
});

// Route to get all articles and mark them as saved
app.get('/articles/:id', function(req, res){
  
  db.Article.findOne({_id: req.params.id }).then(function(article){
    // console.log(article)
    if(!article.saved){
      db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {saved: true}})
      .then(function(dbArticle){
        console.log('article saved')
        res.redirect("/saved");
      })
      .catch(function(err){
        return res.json(err)
      })
    } else {
      console.log('unsaving it')
      db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {saved: false}})
      .then(function(dbArticle){
        console.log('article unsaved')
        res.redirect("/");
      })
      .catch(function(err){
        return res.json(err)
        console.log(err)
      });
    };
  });  
});

// Route to get all articles marked as saved
app.get('/saved', function(req, res){
    db.Article.find({ saved: true })
    .populate('note') 
    .then(function(dbArticle) {
      // View the added result in the console
      res.render("saved", {dbArticle});
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.post("/note/:id", function(req, res) {
  db.Note.create(req.body)
  .then(function(dbNote){
    return db.Article.findOneAndUpdate({_id: req.params.id}, { note: dbNote._id }, { new: true })
  })
  .then(function(dbNote){
    res.json(req.body)
  })
  .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
  });
});

var PORT = 8000 || process.env.PORT

// Listen on Port 8000;
app.listen(PORT, function(){
    console.log("App Running on port 8000")
});