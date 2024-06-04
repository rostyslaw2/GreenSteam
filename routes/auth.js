//routes/auth.js

const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const gameController = require("../controllers/gameController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/add", roleMiddleware(["ADMIN"]), gameController.addGame);
router.get("/game/:id", gameController.getGameDetails);

module.exports = router;
