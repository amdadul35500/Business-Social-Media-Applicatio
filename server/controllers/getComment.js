const connection = require("../config/db");

const getComment = (req, res) => {
  const { postId } = req.params;
  const sqlGet = "select * from comments where postId=?";
  connection.query(sqlGet, postId, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

module.exports = { getComment };
