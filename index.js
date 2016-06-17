var express = require('express'),
    http = require('http'),
    port = process.env.PORT || 8080,
    server = express();
    api = require('marvel-api');
    config = require('./config.json')

server.use(express.static(__dirname + '/public'));

var marvel = api.createClient({
    publicKey: config.publicKey,
    privateKey: config.privateKey
});

var urlBase = "http://gateway.marvel.com:80/v1/public",
	comicsUrl = "/comics?format=comic&apikey=479270933a18d0a5dbc60c4def569d731e92dac1",
	movieUrl = "";
	heroesUrl = "";

server.get('/books', function(req, res){

    marvel.comics.findAll()
    .then(function(a,b){
        console.log(a,b)
        res.send({a:a, b:b})
    })
    .fail(console.error)
    .done();

    // res.send(books);
})


server.listen(port, function(){
    console.log("Server is running on port " + port);
})
