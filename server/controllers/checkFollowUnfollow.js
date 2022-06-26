const connection = require("../config/db");

const checkFollowUnfollow = (req, res) => {
  const { followerId, followingId } = req.params;
  if (followerId !== followingId) {
    const sqlCheck =
      "select * from followfollowing where followerId=? and followingId=?";
    connection.query(sqlCheck, [followerId, followingId], (err, result) => {
      if (err) {
        res.send(err);
      }
      console.log(result);
      if (result[0]) {
        res.status(200).send("follow");
      } else {
        res.status(200).send("unfollow");
      }
    });
  } else {
    res.send(" tow id is same");
  }
};
module.exports = { checkFollowUnfollow };
