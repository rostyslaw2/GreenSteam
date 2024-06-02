const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + "/views"));
app.use(express.json());

require("dotenv").config();

const start = async () => {
  try {
    await mongoose.connect(`${process.env.URL}`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
