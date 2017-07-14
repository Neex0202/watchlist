//Package dependencies

var express = require("express");
var bodyParser = require("body-parser");

var path = require("path");
var mysql = require("mysql");
var mysql2 = require("mysql2");

//Express App
var app = express();
var PORT = process.env.PORT || 9000;

//Requiring models for sync
var db = require("./models");
var imdb = require("imdb-api");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/imdb-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});