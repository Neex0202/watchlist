// HTML routes for client side navigation

// Dependencies

var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/movies", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/movies.html"));
    });

    app.get("/series", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/series.html"));
    });

    app.get("/games", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/games.html"));
    });

};