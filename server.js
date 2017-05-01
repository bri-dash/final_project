// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var url = require('url');
var responses = new Array();
httpServer.listen(8080);


function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);

	fs.readFile(__dirname + parsedUrl.pathname,
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);

  	/*
  	res.writeHead(200);
  	res.end("Life is wonderful");
  	*/
}

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
	// We are given a websocket object in our function
	function (socket) {

		console.log("We have a new client: " + socket.id);

		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('answers', function(data) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'answers' ");

		responses.push(data);
		console.log(responses.length);


		});

		socket.on('finish', function(data) {
			var questiontotals = {
				"country" : 0,
				"chill" : 0,
				"party" : 0,
				"basic" : 0,
				"classic" : 0,
			}


		for(i=0; i<responses.length; i++) {
			switch(responses[i].question1) {
				case "1":
					questiontotals.country++;
					break;
				case "2":
					questiontotals.chill++;
					break;
				case "3":
					questiontotals.party++;
					break;
				case "4":
					questiontotals.basic++;
					break;
				case "4":
					questiontotals.classic++;
					break;
				default:
					console.log('Unknown answer');

			}
			switch(responses[i].question2) {
				case "1":
					questiontotals.basic++;
					break;
				case "2":
					questiontotals.classic++;
					break;
				case "3":
					questiontotals.party++;
					break;
				case "4":
					questiontotals.chill++;
					break;
				case "5":
					questiontotals.country++;
					break;
				default:
					console.log('Unknown answer');
			}

			switch(responses[i].question3) {
				case "1":
					questiontotals.chill++;
					break;
				case "2":
					questiontotals.party++;
					break;
				case "3":
					questiontotals.classic++;
					break;
				case "4":
					questiontotals.country++;
					break;
				case "5":
					questiontotals.basic++;
					break;
				default:
					console.log('Unknown answer');
			}

			switch(responses[i].question4) {
				case "1":
					questiontotals.party++;
					break;
				case "2":
					questiontotals.basic++;
					break;
				case "3":
					questiontotals.classic++;
					break;
				case "4":
					questiontotals.chill++;
					break;
				case "5":
					questiontotals.country++;
					break;
				default:
					console.log('Unknown answer');
			}

			switch(responses[i].question5) {
				case "1":
					questiontotals.basic++;
					break;
				case "2":
					questiontotals.country++;
					break;
				case "3":
					questiontotals.chill++;
					break;
				case "4":
					questiontotals.party++;
					break;
				case "5":
					questiontotals.classic++;
					break;
				default:
					console.log('Unknown answer');
			}
		 }
		 console.log("country: " + questiontotals.country);
		 console.log("party: " + questiontotals.party);
		 console.log("chill: " + questiontotals.chill);
		 console.log("basic: " + questiontotals.basic);
		 console.log("classic: " + questiontotals.classic);

		 var max = Math.max(questiontotals.country, questiontotals.party, questiontotals.chill, questiontotals.basic, questiontotals.classic);
		 console.log("The max is:" + max);
		 if(max == questiontotals.country){
			 //play country
			 socket.emit("playlisturl", {
				 "url":"https://www.youtube.com/watch?v=3ZcGKHC0Rh8"
			 });
			 console.log("Playing Country");
		 } else if(max == questiontotals.party){
			 //play party
			 socket.emit("playlisturl", {
				 "url":"https://open.spotify.com/user/spotify/playlist/37i9dQZF1DXcRXFNfZr7Tp"
			 });
			 console.log("Playing Party");
		 } else if(max == questiontotals.chill){
			 //play chill
			 socket.emit("playlisturl", {
				 "url":"https://open.spotify.com/user/spotify/playlist/37i9dQZF1DX5CdVP4rz81C"
			 });
			 console.log("Playing Chill");
		 } else if(max == questiontotals.basic){
			 //play basic
			 socket.emit("playlisturl", {
				 "url":"https://www.youtube.com/watch?v=3ZcGKHC0Rh8"
			 });
			 console.log("Playing Basic");
		 } else if(max == questiontotals.classic){
			 //play basic
			 socket.emit("playlisturl", {
				 "url":"https://open.spotify.com/view/decades-playlists"
			 });
			 socket.broadcast.emit("playlisturl", {
				 "url":"https://open.spotify.com/view/decades-playlists"
			 });
			 console.log("Playing Classic");
		 } else {
			 //ERROR YOU BROKE IT
			 console.log("Well now you've done it. Everything is on fire");
		 }

		});

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);
