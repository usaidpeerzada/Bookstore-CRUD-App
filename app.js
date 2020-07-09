const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

var mongoDB = 'mongodb://127.0.0.1/bookstore-db';
// var mongoDB = 'mongodb+srv://admin-stark:stark123@cluster0-1k6in.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var bookRoutes = require('./routes/route');
app.use(bookRoutes);

app.listen(8080, function() {
    console.log("Server started on port 8080");
  });
