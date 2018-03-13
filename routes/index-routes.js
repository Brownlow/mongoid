// Main App route
var router = require('express').Router();

router.get('/', function(req, res){
    res.send("Hello Wizzorld");
})