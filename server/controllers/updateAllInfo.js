const connection = require("../config/db");

const updateAll = (req, res) => {
  const { businessName, username, website, description, email, phonenumber } =
    req.body;
  const { id } = req.params;
  const sqlUpdate =
    "UPDATE users SET  businessName = ?, username = ?, email = ?,  description = ?, phonenumber = ?, website = ? WHERE id = ?";
  connection.query(
    sqlUpdate,
    [businessName, username, email, description, phonenumber, website, id],
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
            console.log(result);
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
