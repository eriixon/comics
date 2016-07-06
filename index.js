var express = require('express'),
    http = require('http'),
    port = process.env.PORT || 8080,
    server = express(),
    api = require('marvel-api'),
    config = require('./config.json'),
    JSData = require('js-data'),
    DSNedbAdapter = require('js-data-nedb');

server.use(express.static(__dirname + '/public'));

var store = new JSData.DS();
var adapter = new DSNedbAdapter();
store.registerAdapter('nedb', adapter, { default: true });

var Heroes = store.defineResource({
  name: 'hero',
  filepath: __dirname + '/data/heroes.db'
})

var marvel = api.createClient({
    publicKey: config.publicKey,
    privateKey: config.privateKey
});

var urlBase = "http://gateway.marvel.com:80/v1/public",
	comicsUrl = "/comics?format=comic&formatType=comic&noVariants=false&apikey=fdd93787da3c53e3ff3f0b877d8df680=479270933a18d0a5dbc60c4def569d731e92dac1",
	movieUrl = "";
	heroesUrl = "characters?nameStartsWith=cap&apikey=fdd93787da3c53e3ff3f0b877d8df680=479270933a18d0a5dbc60c4def569d731e92dac1";

server.get('/books', function(req, res){
    marvel.comics.findAll(100,100)
        .then(books => {res.send({books:books}), console.log(books)})
        .fail(console.error)
        .done();
})

server.get('/heroes', function(req, res){
    marvel.characters.findByName('thor')
    .then(heroes => {res.send({heroes:heroes}), console.log(heroes)})
    .fail(console.error)
    .done();
    // marvel.characters.findAll(100)
    //    .then(heroes => {res.send({heroes:heroes}), console.log(heroes)})
    //    .fail(console.error)
    //    .done();
})


server.listen(port, function(){
    console.log("Server is running on port " + port);
})
