const connection = require("../config/db");

const getParticularPost = (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM posts where userId=?";
  connection.query(sqlGet, id, (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result) {
      res.status(200).json(result);
    }
  });
};

module.exports = { getParticularPost };
