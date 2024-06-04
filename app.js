// app.js

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const gameRoutes = require("./routes/games");
const errorHandler = require("./middlewares/errorHandler");
const roleMiddleware = require("./middlewares/roleMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const Game = require("./models/Game");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + "/views"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

require("dotenv").config();
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/games", gameRoutes);

app.get("/home", async (req, res) => {
  try {
    const games = await Game.find();
    res.render("main", { games });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/register", function (req, res) {
  let error = "";
  res.render("register", { error });
});

app.get("/login", function (req, res) {
  let error = "";
  res.render("login", { error });
});

app.get("/add", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => {
  res.render("add-game", { token: req.cookies.token });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.URL);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
