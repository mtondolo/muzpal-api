'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mongodbUri = 'mongodb://mtondolo:l0k0!010@ds159624.mlab.com:59624/mt110179';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

app.use('/api/newsitems', require('./api/newsitems/routes/post_newsitem'));
app.use('/api/newsitems', require('./api/newsitems/routes/get_newsitems'));
app.use('/api/events', require('./api/events/routes/post_event'));
app.use('/api/events', require('./api/events/routes/get_events'));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

const server = app.listen(port, () => {
  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`API is  running at ${port}/`);
  }); 
});