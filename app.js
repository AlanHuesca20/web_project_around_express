const express = require('express');
const users = require('./users.js');
const cards = require('./cards.js');


const { PORT = 3000 } = process.env;

const app = express();

app.use('/', users);





