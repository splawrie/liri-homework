# liri-node-app

About

LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node 
app that takes in parameters and gives back data.

How it Works

Twitter

node liri.js my-tweets <insert Twitter handle>

This will show the last 20 tweets and when they were created in the terminal/bash window.

Spotify

node liri.js spotify-this-song <insert song title>

This will show the following information about the song in the terminal/bash window

    Artist
    The song's name
    A preview link of the song from Spotify
    The album that the song is from

If no song is provided then the program will default to "The Sign" by Ace of Base

Movies

node liri.js movie-this <insert movie title>

This will output the following information to the terminal/bash window:

    Title of the movie.
    Year the movie came out.
    IMDB Rating of the movie.
    Country where the movie was produced.
    Language of the movie.
    Plot of the movie.
    Actors in the movie.
    Rotten Tomatoes Rating.
    Rotten Tomatoes URL.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

Do What It Says

node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside random.txt and then use it to call one of LIRI's commands.

It is currently set to run spotify-this-song for "I Want it That Way,".
