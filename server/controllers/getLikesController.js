const connection = require("../config/db");

const getLikes = (req, res) => {
  const { postId } = req.params;
  const sqlGet = "select * from likes where postId=?";
  connection.query(sqlGet, postId, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  getLikes,
};
