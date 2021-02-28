const express = require("express");
const bodyParser = require("body-parser");
// const _ = require("lodash");
const mongoose = require("mongoose");
// const https = require("https");
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const request = require("request");

// create app
const app = express();

// set up body parser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// set the app view engine to ejs, this enables templates
app.set("view engine", "ejs");



mongoose.connect("mongodb+srv://benny:SpatialHistApp@cluster0.oorru.mongodb.net/database?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

const historicPlacesSchema = {
  'type': String,
  'geometry': {
    'type': String,
    'coordinates': [
      Number,
      Number
    ]
  },
  'properties': {
    'title': String,
    'significance': String,
    'type': String,
    'city': String,
    'State': String
  }
}

const Place = mongoose.model("places", historicPlacesSchema);

app.get("/", function(req, res) {
  Place.find({},function(err, places){
    res.render("home",{
      data: places
    });
  });



});














let port = process.env.PORT;
if (port ==null || port =="") {
  port = 3000;
}

app.listen(port, function(){
  console.log("Server has started successfully");
});
