const connection = require("../config/db");

const uploadBusiness = (req, res) => {
  const { businessEmail, businessAddress, businessLanguage, businessCountry } =
    req.body;
  const { email } = req.query;
  const sqlUpdate =
    "UPDATE users SET businessEmail = ?, businessAddress=?, businessLanguage=?, businessCountry=?  WHERE email=?;";
  connection.query(
    sqlUpdate,
    [businessEmail, businessAddress, businessLanguage, businessCountry, email],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.status(200).send("Updated successfully!");
      }
    }
  );
};

module.exports = {
  uploadBusiness,
};
