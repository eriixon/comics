var express = require('express'),
    http = require('http'),
    port = process.env.PORT || 8080,
    server = express();
    api = require('marvel-api');

server.use(express.static(__dirname + '/public'));

var marvel = api.createClient({
    publicKey: 'fdd93787da3c53e3ff3f0b877d8df680',
    privateKey: '479270933a18d0a5dbc60c4def569d731e92dac1'
});

var urlBase = "http://gateway.marvel.com:80/v1/public",
	comicsUrl = "/comics?format=comic&apikey=479270933a18d0a5dbc60c4def569d731e92dac1",
	movieUrl = "";
	heroesUrl = "";

server.get('/books', function(req, res){

    var books = marvel.comics.findAll()
    .then(console.log)
    .fail(console.error)
    .done();

    res.send(books);
})


server.listen(port, function(){
    console.log("Server is running on port " + port);
})
