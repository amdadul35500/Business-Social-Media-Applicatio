const jwt = require("jsonwebtoken");

// auth guard to protect routes that need authentication
const checkLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      next();
    } catch (err) {
      res.status(500).json("Authentication failure!");
    }
  } else {
    res.status(401).send("Authetication failure!");
  }
};

module.exports = {
  checkLogin,
};
