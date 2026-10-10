const express = require("express");
const users = require("./users.js");
const cards = require("./cards.js");
const fs = require("fs");
const path = require("path");

const { PORT = 3000 } = process.env;

const app = express();

app.use("/", users);
