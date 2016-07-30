var express = require('express'),
    http = require('http'),
    port = process.env.PORT || 8080,
    server = express(),
    api = require('marvel-api'),
    firebase = require("firebase"),
    config = require('config');


server.use(express.static(__dirname + '/public'));

firebase.initializeApp({
  serviceAccount: "config/ave_fb.json",
  databaseURL: "https://avengers-e29ec.firebaseio.com/",
  storageBucket: "avengers-e29ec.appspot.com"
});

// var imgRef = firebase.storage().ref('heroes/hulk.jpg')
// console.log(imgRef);

var db = firebase.database();
var all = db.ref();
var avengers = db.ref("avengers");
var xmen = db.ref("xmen");

var pubKey = config.get('publicKey'), 
    prKey = config.get('privateKey');

var marvel = api.createClient({
    publicKey: pubKey,
    privateKey: prKey
});

var urlBase = "http://gateway.marvel.com:80/v1/public",
	// comicsUrl = "/comics?format=comic&formatType=comic&noVariants=false&apikey=fdd93787da3c53e3ff3f0b877d8df680=479270933a18d0a5dbc60c4def569d731e92dac1",
	heroesUrl = "characters?nameStartsWith=cap&apikey=fdd93787da3c53e3ff3f0b877d8df680=479270933a18d0a5dbc60c4def569d731e92dac1";


server.get('/fbheroes', function (req, res){
    all.on("value", 
        function(snapshot) { res.send (snapshot.val())}, 
        function (errorObject) {console.log("The read failed: " + errorObject.code);}
    );
})


server.get('/heroes', function(req, res){
    var hname = req.query.hero;
    getHero(hname, function(hero){
    res.send(hero);

   xmen.child(hero[0].name).set({
        id: hero[0].id,
        name: hero[0].name,
        realName: "some",
        description: hero[0].description,
        img: hero[0].thumbnail.path + "." + hero[0].thumbnail.extension,
        physical: {
            height: "some",
            weight: "some",
            eyes: "some",
            hair: "some"
        },
        powers: "some",
        abilities: "some",
        groupAffiliations: "some",
        powergrid: {
            intelligence: 10,
            strength: 10,
            speed: 10,
            durability: 10,
            energy: 10,
            fighting: 10
        },
        weapons: "some",
        wiki: {
            comics: hero[0].comics.available,
            series: hero[0].series.available,
            stories: hero[0].stories.available,
            events: hero[0].events.available,
            detail: hero[0].urls[0].url,
            wiki: hero[0].urls[1].url,
            comiclink: hero[0].urls[2].url
        },
        });

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

server.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'YOUR_VERIFY_TOKEN') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token');    
    }
  });