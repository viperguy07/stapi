const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// reads .env files
require('dotenv').config();

// modules
const test = require('./controllers/test');

// connect to mongoDB
mongoose.connect(process.env.DB_PASS, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

const app = express();
app.use(bodyparser.json());
app.use(cors());

// sends message
app.get('/', (req,res) => { 
    res.send('st API');
});

// test route for posting
app.post('/test', (req,res) => {
    test.testPost(req, res, mongoose);
});

app.listen(process.env.PORT || 5001, () => {
    console.log('running on port 5001..');
});