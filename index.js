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


// FB API
server.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === '123654789') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token');    
    }
  });

server.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;
            // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
          receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'image':
        sendImageMessage(senderID);
        break;

      case 'button':
        sendButtonMessage(senderID);
        break;

      case 'generic':
        sendGenericMessage(senderID);
        break;

      case 'receipt':
        sendReceiptMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: "EAAOVKxMM5lwBANgYZAbSomThydHZCrQellRSutVKH7HRr6hB9R6gTo1VCbhMNSbGALg3TE7JDUelyD6YZAVROP2vKdAR8J3RXt8vEqQCZBGlliBGcmvxLcQ5KXcuar3QbCj4GtpMjGsLZBNSdWZBnNXfSCDgjMgtzZCsQZBHTVn7AgZDZD" },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  sendTextMessage(senderID, "Postback called");
}