const jwt = require("jsonwebtoken");
const connection = require("../config/db");

const signin = async (req, res) => {
  const { email, password } = req.body;

  if ((email, password)) {
    const sqlGet = "select * from users where email=?";
    connection.query(sqlGet, email, (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result[0]) {
        const sqlPassEmail =
          "select * from users where email=? and password=SHA(?)";
        connection.query(sqlPassEmail, [email, password], (err2, result2) => {
          if (err2) {
            res.send(err2);
          }
          if (result2[0]) {
            const userObject = {
              username: result2[0].username,
              email: result2[0].email,
            };

            // generate token
            const token = jwt.sign(userObject, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRY,
            });

            res.status(200).json([result2[0], token]);
          } else {
            res.status(404).send("Worng password!");
          }
        });
      } else {
        res.status(404).send("Email is not valid!");
      }
    });
  } else {
    res.status(404).send("Please enter email and password!");
  }
};

module.exports = {
  signin,
};
