const connection = require("../config/db");

const profileUpdate = (req, res) => {
  const { username, email, description, email2 } = req.body;

  const sqlUpdate =
    "UPDATE users SET username=?, email=?, description=?  WHERE email=?";
  connection.query(
    sqlUpdate,
    [username, email, description, email2],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      console.log(result);
      if (result) {
        res.send("profile updated");
      }
    }
  );
};

module.exports = {
  profileUpdate,
};
