const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

const db = require("./models");

db.sequelize.sync().then(function(){
	// Start the API server
	app.listen(PORT, function() {
	  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	  db.User.create({username:"ryanThatcher"});
	});	
})
	
