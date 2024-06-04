// routes/game.js

const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const Game = require("../models/Game");

// Додати гру
router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  gameController.addGame
);

// Отримати гру за ID
router.get("/:id", async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Гру не знайдено" });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні гри", error });
  }
});

// Отримати всі ігри
router.get("/", gameController.getAllGames);

module.exports = router;
