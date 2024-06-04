//controllers/gameController.js

const Game = require("../models/Game");
const multer = require("multer");
const path = require("path");

// Настройка сховища для загрузки файлів
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.addGame = [
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { title, genre, description, releaseDate, rating, downloadLink } =
        req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      if (!imageUrl) {
        return res.status(400).json({ message: "Image is required." });
      }

      const newGame = new Game({
        title,
        genre,
        description,
        releaseDate,
        rating,
        downloadLink,
        imageUrl,
      });

      const savedGame = await newGame.save();

      res
        .status(201)
        .json({ message: "Гру успішно добавлено!", game: savedGame });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка при додаванні гри", error });
    }
  },
];

exports.getGames = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Гру не знайдено" });
    }

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка при отриманні гри", error });
  }
};

exports.addGame = [
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { title, genre, description, releaseDate, rating, downloadLink } =
        req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      if (!imageUrl) {
        return res.status(400).json({ message: "Image is required." });
      }

      const newGame = new Game({
        title,
        genre,
        description,
        releaseDate,
        rating,
        downloadLink,
        imageUrl,
      });

      const savedGame = await newGame.save();

      res
        .status(201)
        .json({ message: "Гру успішно добавлено!", game: savedGame });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка при додаванні гри", error });
    }
  },
];

exports.getGames = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Гру не знайдено" });
    }

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка при отриманні гри", error });
  }
};

exports.getAllGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Помилка при отриманні списку ігор", error });
  }
};

exports.getGameDetails = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    // Рендеринг сторінки деталей гри з даними гри
    res.render("game-details", { game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting game details", error });
  }
};
