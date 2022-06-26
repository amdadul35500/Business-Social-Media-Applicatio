const connection = require("../config/db");

const likes = (req, res) => {
  const { userId, postId, isLike } = req.body;
  const sqlFind = "select * from likes where userId=? and postId=?";
  connection.query(sqlFind, [userId, postId], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result[0]) {
      const sqlDrop = "DELETE FROM likes WHERE userId=? and postId=?";
      connection.query(sqlDrop, [userId, postId], (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result) {
          res.status(200).send("deleted successfully!");
        }
      });
    } else {
      const sqlInsert =
        "INSERT INTO likes(userId, postId, isLike, createdAt) values(?,?,?, CURRENT_TIMESTAMP())";
      connection.query(sqlInsert, [userId, postId, isLike], (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result) {
          res.status(200).send("inserted successfully!");
        }
      });
    }
  });
};

module.exports = {
  likes,
};
