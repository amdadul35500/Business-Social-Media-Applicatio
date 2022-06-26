const connection = require("../config/db");

const profilePhotoUpdate = (req, res) => {
  const { email } = req.query;
  const sqlUpdate = "UPDATE users SET profilePhoto=? WHERE email=?";
  connection.query(sqlUpdate, [req.filename, email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).send("Photo update successfully!");
    }
  });
};

module.exports = {
  profilePhotoUpdate,
};
