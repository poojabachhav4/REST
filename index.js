var express = require('express');
var bodyParser = require ('body-parser');
var mysql = require('mysql');
var cors = require('cors');

const app = express();
const router = require('./user.js')



app.use(express.json());

app.use(cors())
app.use(router)
const port = 3001;

app.use(bodyParser.urlencoded({ extended : false}))

app.use(bodyParser.json())

app.listen(port,() => console.log(`Listen to port ${port}`))
module.exports = app;