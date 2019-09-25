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
            doWhatItSays();
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
            var artistsArr = song.artists;
            var artist = artistsArr[0].name;
            if (artistsArr.length > 1) {
                for (let i = 1; i < artistsArr.length; i++) {
                    artist += " & " + artistsArr[i].name
                }
            }
            var results = "\nArtist(s): " + artist + "\nSong Title: " + song.name + "\nPreview URL: " + song.preview_url + "\nAlbum: " + song.album.name
            console.log(results);
            logAction("spotify-this-song", lookThisUp, results);
        }).catch(error => {
            console.log("Could not spotify this song!\n" + error)
        })
}

function concertThis(lookThisUp) {
    axios.get("https://rest.bandsintown.com/artists/" + lookThisUp + "/events?app_id=codingbootcamp").then(response => {
        var results = "\n";
        for (obj in response.data) {
            var formattedDate = moment(response.data[obj].datetime).format("MM/DD/YYYY");
            if (response.data[obj].venue.region) {
                results += "Venue Name: " + response.data[obj].venue.name + "\nVenue Location: " + response.data[obj].venue.city + ", " + response.data[obj].venue.region + ", " + response.data[obj].venue.country + "\nEvent Date: " + formattedDate + "\n\n";
            } else {
                results += "Venue Name: " + response.data[obj].venue.name + "\nVenue Location: " + response.data[obj].venue.city + ", " + response.data[obj].venue.country + "\nEvent Date: " + formattedDate + "\n\n";
            }
        }
        console.log(results);
        logAction("concert-this", lookThisUp, results);
    }).catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data-----------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    })
}

function movieThis(lookThisUp) {
    if (!lookThisUp) {
        lookThisUp = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + lookThisUp + "&y=&plot=short&apikey=9d841dc7").then(response => {
        var movie = response.data
        var ratings = movie.Ratings;
        var rtRating = "No data provided";
        for (obj in ratings) {
            if (ratings[obj].Source === "Rotten Tomatoes") {
                rtRating = ratings[obj].Value;
            }
        }
        var results = "\nMovie Title: " + movie.Title + "\nYear Released: " + movie.Released + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " + rtRating + "\nProduced in: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nStarring: " + movie.Actors;

        console.log(results);
        logAction("movie-this", lookThisUp, results);
    })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data-----------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", (error, data) => {
        console.log(data);
        let contents = data.split(",");
        console.log(contents);
        if (error) throw console.log("Could not perform the random action!\n" + error);
        if (contents[0] === "concert-this") {
            concertThis(contents[1]);
        } else if (contents[0] === "spotify-this-song") {
            spotifyThis(contents[1]);
        } else if (contents[0] === "movie-this") {
            movieThis(contents[1]);
        }
    })
}


function logAction(inputStuff, lookThisUp, results) {
    fs.appendFile("log.txt", inputStuff + ": " + lookThisUp + "\n" + results + "\n\n", "utf8", (err) => {
        if (err)
            throw console.log("The 'data to append' was not appended to the file!\n" + err);
    })
}

searchStuff(); 

// // spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
// //     if ( err ) {
// //         console.log('Error occurred: ' + err);
// //         return;
// //     }

// // Do something with 'data'

// var results = "\nArtist(s): " + artist + "\nSong Title: " + song.name + "\nPreview URL: " + song.preview_url + "\nAlbum: " + song.album.name
// console.log(results);
// logAction("spotify-this-song", lookThisUp);
//     }).catch (error => {
//     console.log("Something went wrong\n" + error)
// })
// }


// //getSpotifyTrack();

// function getBands("artists") {
//                 var userURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

//                 axios.get(userURL).then(
//                     function (response) {
//                         var jsonData = response.data;

//                         // for (var i = 0;  jsonData.length; i++){
//                         //     console.log(jsonData[i]);
//                         // }

//                         console.log(jsonData);

//                     })



//             }



// getBands("Post Malone");