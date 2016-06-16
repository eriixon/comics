var express = require('expess'),
    http = require('http'),
    port = process.env.PORT || 8080,
    server = express();

server.use(express.static(__dirname + '/public'));


server.listen(port, function(){
    console.log("Server is ruuning on port " + port);
})
