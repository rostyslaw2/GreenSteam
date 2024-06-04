const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookie: ", token); // Log token from cookie

  if (!token) {
    return res.status(401).json({ message: "Необхідна автентифікація" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log("Decoded Token: ", decoded); // Log decoded token
    req.user = decoded;

    // Додаємо заголовок Authorization для подальшої обробки roleMiddleware
    req.headers.authorization = `Bearer ${token}`;

    next();
  } catch (error) {
    console.log("Token verification error: ", error); // Log token verification error
    return res.status(401).json({ message: "Недійсний токен" });
  }
};
