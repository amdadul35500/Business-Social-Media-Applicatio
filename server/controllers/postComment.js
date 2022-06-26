const connection = require("../config/db");

const createComment = (req, res) => {
  const { userId, postId, comment } = req.body;
  const sqlInsert =
    "insert into comments(userId, postId, comment, createdAt) values(?,?,?,current_timestamp())";
  connection.query(sqlInsert, [userId, postId, comment], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send("comment posted!");
    }
  });
};

module.exports = {
  createComment,
};
