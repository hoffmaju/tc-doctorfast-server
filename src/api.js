const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middleware');

const appointment  = require('./router/appointment');
const procedure  = require('./router/procedure');
const information  = require('./router/information');
const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Doctor Fast Backend'
    });
});


// API routes
api.use(appointment);
api.use(procedure);
api.use(information);

module.exports = api;