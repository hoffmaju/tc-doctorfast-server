"use strict";
const http       = require('http');
const mongoose   = require('mongoose');

const api        = require('./src/api');
const config     = require('./src/config');

// Set the port to the API.
api.set('port', config.port);

//Create a http server based on Express
const server = http.createServer(api);


//Connect to the MongoDB database; then start the server
const conn1 = mongoose.createConnection(config.mongoURI);
exports.Appointment = conn1.model('Appointment', require('./src/models/Appointment'));
exports.Procedure   = conn1.model('Procedure', require('./src/models/Procedure'));

const conn2 = mongoose.createConnection('mongodb://localhost/procedureinformation');
exports.Information = conn2.model('Information', require('./src/models/Information'));
//mongoose
//   .connect(config.mongoURI)
//    .then(() => server.listen(config.port))
//    .catch(err => {
//        console.log('Error connecting to the database', err.message);
//        process.exit(err.statusCode);
//    });

server.listen(config.port)
server.on('listening', () => {
    console.log(`API is running in port ${config.port}`);
});

server.on('error', (err) => {
    console.log('Error in the server', err.message);
    process.exit(err.statusCode);
});

