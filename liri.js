require("dotenv").config();

//add the code require to import the Key.js  and store it in a variable
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);