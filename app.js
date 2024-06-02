const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + "/views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Додано middleware для обробки URL-encoded даних

require("dotenv").config();
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let error = "";
  res.render("main", { error });
});
app.get("/register", function (req, res) {
  let error = "";
  res.render("register", { error });
});
app.get("/login", function (req, res) {
  let error = "";
  res.render("login", { error });
});

// Додано маршрут для обробки аутентифікації
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.URL}`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
