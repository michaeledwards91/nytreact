// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Require Click schema
var Article = require("./models/Article");
// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
var connectionUrl = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.connect(connectionUrl);
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {
	Article.find({}, function(err, data) {
		if (err) throw err;

		res.json(data);
	});
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/api/saved", function(req, res) {
	console.log(req.body);

	let entry = new Article({
		title: req.body.title,
		date: req.body.date,
		url: req.body.url
	});
	entry.save(function(err) {
		if (err) throw err;
		console.log("successfully saved?");
	});

});

app.delete("/api/saved", function(req, res) {
	console.log(req.body);

	Article.remove({_id: req.body._id}, function(err) {
		if (err) throw err;
		console.log("Successfully removed?");
	});
});


// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
