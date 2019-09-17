require("dotenv").config();

//add the code require to import the Key.js  and store it in a variable
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

// switch statment to be able to use different look up functions based on taking in the different commands input in node (command terminal)

function searchStuff() {
    var inputStuff = process.argv[2];
    var lookThisUp = process.argv[3];
    var results;

    switch (inputStuff) {
        case "concert-this":
            concertThis(lookThisUp);
            break;
        case "spotify-this-song":
            spotifyThis(lookThisUp);
            break;
        case "movie-this":
            movieThis(lookThisUp);
            break;
        case "do-what-it-says":
            doWhatItSays(lookThisUp);
            break;
    }
}



function spotifyThis(lookThisUp) {

    if (lookThisUp === undefined) {
        lookThisUp = "The Sign";
    }

    spotify.search(
        {
            type: "track",
            query: lookThisUp,
            limit: 1
        }).then(response => {
            var song = response.tracks.items[0];
            var artArr = song.artists;
            var artist = artArr[0].name;
            if (artArr.length > 1) {
                for (let i = 1; i < artArr.length; i++) {
                    artist += " & " + artArr[i].name
                }
            }
            // spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
            //     if ( err ) {
            //         console.log('Error occurred: ' + err);
            //         return;
            //     }

            // Do something with 'data'

            var results = "\nArtist(s): " + artist + "\nSong Title: " + song.name + "\nPreview URL: " + song.preview_url + "\nAlbum: " + song.album.name
        console.log(results);
        logAction("spotify-this-song", lookThisUp, );
    }).catch(error => {
        console.log("Something went wrong\n" + error)
    })
}


//getSpotifyTrack();

function concertThis(lookThisUp) {
                var userURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

                axios.get(userURL).then(
                    function (response) {
                        var jsonData = response.data;

                        // for (var i = 0;  jsonData.length; i++){
                        //     console.log(jsonData[i]);
                        // }

                        console.log(jsonData);

                    })



            }

            

// getBands("Post Malone");