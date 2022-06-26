const connection = require("../config/db");

const newPost = (req, res) => {
  const { userId, img } = req.body;
  const sqlInsert =
    "INSERT INTO posts(userId, img, createdAt) values(?,?,CURRENT_TIMESTAMP())";
  connection.query(sqlInsert, [userId, img], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).send("New post inserted successfully!");
    }
  });
};

module.exports = {
  newPost,
};
