const connection = require("../config/db");

const getCurrentUser = (req, res) => {
  const { email } = req.query;
  const sqlGet = "SELECT * FROM users WHERE email=?";
  connection.query(sqlGet, email, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).json(result[0]);
    }
  });
};

module.exports = {
  getCurrentUser,
};
