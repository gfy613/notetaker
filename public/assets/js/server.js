// Used to install series of NPM Packages

var express = require("express");

// creating an express server and sets initial port
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// links to route files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// starts the server and shows as a console.log that the server is connected
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });