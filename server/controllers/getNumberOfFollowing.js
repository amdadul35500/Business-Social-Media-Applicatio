const connection = require("../config/db");

const getFollowing = (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from followfollowing where followingId=?";
  connection.query(sqlGet, id, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  getFollowing,
};
