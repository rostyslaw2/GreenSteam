const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const authHeader = req.headers.authorization;
      console.log("Authorization Header: ", authHeader); // Log the authorization header

      if (!authHeader) {
        return res.status(403).json({ message: "Користувач не авторизований" });
      }

      const token = authHeader.split(" ")[1];
      console.log("Token: ", token); // Log the token

      if (!token) {
        return res.status(403).json({ message: "Користувач не авторизований" });
      }

      const { roles: userRoles } = jwt.verify(token, secret);
      console.log("User Roles: ", userRoles); // Log the user roles

      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: "Недостатньо прав" });
      }

      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Користувач не авторизований" });
    }
  };
};
