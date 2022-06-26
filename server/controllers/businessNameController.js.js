const connection = require("../config/db");

const businessName = (req, res) => {
  const { category } = req.body;
  const { email } = req.query;

  const sqlUpdate = "UPDATE users SET businessName=? WHERE email=?;";
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
  businessName,
};
