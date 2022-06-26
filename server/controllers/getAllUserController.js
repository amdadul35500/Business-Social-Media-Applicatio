const connection = require("../config/db");

const getAllUser = (req, res) => {
  const sqlGet = "select * from users";
  connection.query(sqlGet, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  getAllUser,
};
