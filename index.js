var express = require('express'),
    http = require('http'),
    port = process.env.PORT || 8080,
    server = express(),
    api = require('marvel-api'),
    firebase = require("firebase"),
    config = require('config');


server.use(express.static(__dirname + '/public'));



var pubKey = config.get('publicKey'), 
    prKey = config.get('privateKey');

var marvel = api.createClient({
    publicKey: pubKey,
    privateKey: prKey
});

var urlBase = "http://gateway.marvel.com:80/v1/public",
	// comicsUrl = "/comics?format=comic&formatType=comic&noVariants=false&apikey=fdd93787da3c53e3ff3f0b877d8df680=479270933a18d0a5dbc60c4def569d731e92dac1",
	// movieUrl = "";
	heroesUrl = "characters?nameStartsWith=cap&apikey=fdd93787da3c53e3ff3f0b877d8df680=479270933a18d0a5dbc60c4def569d731e92dac1";

server.get('/books', function(req, res){
    marvel.comics.findAll(100,100)
        .then(books => {res.send({books:books}), console.log(books)})
        .fail(console.error)
        .done();
})

var heroesList = ["Thor", "Iron Man", "Ant-Man", "Wasp", "Hulk"];

server.get('/heroes', function(req, res){
    getHero(req.query.hero, function(hero){
    res.send(hero)
    });
})

function getHero (hero, cb) {
    marvel.characters.findByName(hero)
        .then(res => {return cb(res.data)})
        .fail(console.error)
        .done();
}

server.listen(port, function(){
    console.log("Server is running on port " + port);
})
