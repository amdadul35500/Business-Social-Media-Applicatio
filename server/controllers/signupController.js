const connection = require("../config/db");

const signup = (req, res) => {
  const sqlInsert =
    "INSERT INTO users(username, email, password, business, createdAt) values(?,?,SHA(?),?,CURRENT_TIMESTAMP())";

  const userInfo = {
    info: [
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.business,
    ],
  };

  connection.query(sqlInsert, [...userInfo.info], (error, result) => {
    if (result) {
      res.status(200).json(result);
    }

    if (error) {
      res.status(500).json(error);
    }
  });
};

module.exports = {
  signup,
};
