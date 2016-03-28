var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
process.env.NODE_ENV === "development"
// API Routes
var router = express.Router();

// temp taken
var tokenId = "yangbaiping123456" 
// Create a token (accessed at POST /api/tokens)
router.route('/tokens')
	
	.post(function(req, res) {
		//console.log(req);
		var endpointId = req.body.endpointId;
		
		console.log('Create new token using the Respoke API');
		
		console.log('POST /tokens endpointId: ', endpointId);

		res.json({
					token: tokenId
				});
	});

//Handle v1/session token
router.route('/session-tokens')
	
	.post(function(req, res) {

		var tokenId = req.body.tokenId;
		
		console.log('POST /v1/session-tokens endpointId: ', tokenId);

		res.json({
					token: tokenId
				});
	});

router.route('/webhooks')
	
	.post(function(req, res) {
		console.log(req);
	});

// Register our routes
app.use('/api', router);
app.use('/v1', router);
app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


// Socket IO.
io.on('connection', function(socket){
   console.log('Socket Conn Test.');
});

server.listen(port);

if(process.env.NODE_ENV === "development") {
	var fs = require('fs');
	
	var options = {
	  key: fs.readFileSync('./key.pem'),
	  cert: fs.readFileSync('./cert.pem')
	};
	
	https.createServer(options, app).listen(443);
}



