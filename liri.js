console.log('check liri.js is loading');

require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require('request');
var fs = require("fs");

//var Twitter = require('twitter');

//var spotify = require('spotify');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var getTweets = function() {
 
	var params = {screen_name: 'splawrie'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);
	    for(var i=0; i<tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(' ');
	    	console.log(tweets[i].text);
	    }
	  }
	});
}

var getArtistNames = function(artist) {
	return artist.name;
}

var getSpotify = function(songName) {
	if (!songName) {
		songName = 'The Sign by Ace of Base';
	}

	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 
	   var songs = data.tracks.items;
	   	for (var i=0; i<songs.length; i++) {
	   		console.log(i);
	   		console.log('artist(s): ' + songs[i].artists.map(
	   			getArtistNames));
	   		console.log('song name: ' + songs[i].name);
	   		console.log('preview song: ' + songs[i].preview_url);
	   		console.log('album: ' + songs[i].album.name);
		}
	});
}

var getMovie = function(movieName) {
	if (!movieName) {
		movieName = "Mr. Nobody"
	}
	
	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&&apikey=trilogy', function (error, response, body) {
	 	if (!error && response.statusCode === 200) {
	  		var movieInfo = JSON.parse(body);

	  		console.log('Title: ' + movieInfo.Title);
	  		console.log('Year: ' + movieInfo.Year);
	  		console.log('Rated: ' + movieInfo.Rated);
	  		console.log('Plot: ' + movieInfo.Plot);
	  		console.log('Actors: ' + movieInfo.Actors);
		}
	});
}

var doWhatItSays = function() {

	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) throw err;
		
		var dataArr = data.split(',');

		if (dataArr.length === 2)  {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr.length === 1) {
			pick(dataArr[0]);
		}
	});
}

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			getTweets();
			break;
		case 'spotify-this-song':
			getSpotify(functionData);
			break;
		case 'movie-this':
			getMovie(functionData);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
		console.log('LIRI does not know that');
	}
	console.log(caseData, functionData);
}

var runThis = function(argOne, argTwo) {
		pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

