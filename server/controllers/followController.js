const connection = require("../config/db");

const follow = (req, res) => {
  const { followerId, followingId } = req.body;
  if (followerId !== followingId) {
    const sqlCheck =
      "select * from followfollowing where followerId=? and followingId=?";
    connection.query(sqlCheck, [followerId, followingId], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result[0]) {
        const sqlInsert =
          "DELETE FROM followfollowing WHERE followerId=? and followingId=?";
        connection.query(
          sqlInsert,
          [followerId, followingId],
          (err, result) => {
            if (err) {
              res.send(err);
            }
            if (result) {
              res.status(200).send("user has been unfollowed!");
            }
          }
        );
      } else {
        const sqlInsert =
          "insert into followfollowing(followerId, followingId, createdAt) values(?,?,current_timestamp())";
        connection.query(
          sqlInsert,
          [followerId, followingId],
          (err, result) => {
            if (err) {
              res.send(err);
            }
            if (result) {
              res.status(200).send("user has been followed!");
            }
          }
        );
      }
    });
  } else {
    res.status(404).send("you can't follow your self!");
  }
};

module.exports = {
  follow,
};
