const express = require('express');
const path = require('path');
const cors = require('cors');
// Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.

//Load a config files
require('./config/db');

const app = express();

//Including routes
const poll = require('./routes/poll');

//set public folder-
app.use(express.static(path.join(__dirname, 'public')));
//Express middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//enable CORS
app.use(cors());

//Using routes
app.use('/poll', poll);

//Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('The server is started');
});
