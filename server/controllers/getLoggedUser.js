const connection = require("../config/db");

const getLoggedUser = (req, res) => {
  const { email } = req.params;
  const sqlGet = "select * from users where id=?";
  connection.query(sqlGet, email, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result[0]) {
      res.status(200).json(result[0]);
    }
  });
};

module.exports = {
  getLoggedUser,
};
