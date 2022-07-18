const connection = require("../config/db");

const updateAll = (req, res) => {
  const { name, username, website, bio, gender, email, phonenumber } = req.body;
  const { id } = req.params;
  const sqlUpdate =
    "UPDATE users SET name = ?, username = ?, email = ?, gender = ?, bio = ?, phonenumber = ?, website = ? WHERE id = ?";
  connection.query(
    sqlUpdate,
    [name, username, email, gender, bio, phonenumber, website, id],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        const sqlFind = "select * from users where id = ?";
        connection.query(sqlFind, id, (err, result) => {
          if (err) {
            res.send(err);
          }
          if (result) {
            res.send(result[0]);
          }
        });
      }
    }
  );
};

module.exports = {
  updateAll,
};
