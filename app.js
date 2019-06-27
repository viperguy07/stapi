// reads .env files
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');




// Routes
const memberRoutes = require('./api/routes/members');

// Handle logging
app.use(morgan('dev'));
// Handle Body url encoded request
app.use(bodyParser.urlencoded({extended: false}));
// Handle Body JSON request
app.use(bodyParser.json());
// Enable All CORS Requests
app.use(cors());

// connect to mongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

app.use('/members', memberRoutes);

// Match nothing
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;
