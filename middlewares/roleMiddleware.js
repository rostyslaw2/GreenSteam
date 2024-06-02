const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
  if (req.method === "POST") {
    next();
  }
  try {
    const token = req.headers.authorization.split("")[1];
    if (!token) {
      return res
        .status(403)
        .json({ message: "У користувача недостатньо прав" });
    }
    const { roles: userRoles } = jwt.verify(token, secret);
    let hasRole = false;
    userRoles.forEach((role) => {
      if (roles.includes(role)) {
        hasRole = true;
      }
      if (!hasRole) {
        return res
          .status(403)
          .json({ message: "У користувача недостатньо прав" });
      }
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Недостатньо прав" });
  }
};
