const connection = require("../config/db");

const getParticularUser = (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM users WHERE id=?";
  connection.query(sqlGet, id, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).json(result[0]);
    }
  });
};

module.exports = {
  getParticularUser,
};
