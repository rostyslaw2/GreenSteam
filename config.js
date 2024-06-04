//config.js
const express = require("express");
const app = express();
require("dotenv").config();

const secretWord = process.env.SECRET_KEY;

module.exports = {
  secret: secretWord,
};
