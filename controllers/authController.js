//controllers/authController.js

const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      if (!username || !password || !email) {
        return res.status(400).json({ message: "Всі поля є обов'язковими" });
      }
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Користувач з таким іменем вже існує" });
      }
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res
          .status(400)
          .json({ message: "Користувач з таким email вже існує" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        email,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "Користувач успішно зареєстрований" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Помилка реєстрації" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Всі поля є обов'язковими" });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Користувача не знайдено" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неправильний пароль" });
      }
      const token = generateAccessToken(user._id, user.roles);
      console.log("Generated Token: ", token); // Log generated token
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.redirect("/home");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Помилка входу" });
    }
  }
}

module.exports = new authController();
