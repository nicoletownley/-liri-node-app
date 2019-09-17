require("dotenv").config();

//add the code require to import the Key.js  and store it in a variable
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function getSpotifyTrack(songName) {
    
    if (songName === undefined){
        songName = "The Sign";
    }

    spotify.search(
        {
        type: "track",
        query: songName
    }, 
    function(err, data){
        console.log(err);
        return;
    }
    )

    spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
     
        // Do something with 'data'
    });
}

//getSpotifyTrack();

function getBands(artist){
    var userURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(userURL).then(
        function(response){
            var jsonData = response.data;
        
            // for (var i = 0;  jsonData.length; i++){
            //     console.log(jsonData[i]);
            // }

            console.log(jsonData);
        
        })

        

}

getBands("Post Malone");