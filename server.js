// Used to install series of NPM Packages

var express = require("express");
const fs = require('fs');
const path = require('path');
const { uuid } = require('uuidv4');

// creating an express server and sets initial port
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// links to route files
// require("./public/assets/js/routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// starts the server and shows as a console.log that the server is connected
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });