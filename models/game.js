//models/Game.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date },
  rating: { type: Number, default: 0 },
  downloadLink: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Game", gameSchema);
