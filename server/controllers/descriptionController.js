const connection = require("../config/db");

const description = (req, res) => {
  const { category } = req.body;
  const { email } = req.query;

  const sqlUpdate = "UPDATE users SET description=? WHERE email=?;";
  connection.query(sqlUpdate, [category, email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.status(200).send("Updated successfully!");
    }
  });
};

module.exports = {
  description,
};
