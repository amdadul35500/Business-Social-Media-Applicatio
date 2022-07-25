const connection = require("../config/db");
const jwt = require("jsonwebtoken");

const googleSignin = (req, res) => {
  const { username, email, images, profileId } = req.body;
  const sqlQuery = "select * from users where email=?";
  connection.query(sqlQuery, email, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length === 0) {
      const sqlInsert =
        "insert into users(username, email, profilePhoto,password, createdAt) values(?,?,?,?,current_timestamp())";
      connection.query(
        sqlInsert,
        [username, email, images, profileId],
        (err, result) => {
          if (err) {
            res.send(err);
          }
          if (result) {
            const userObject = {
              username: username,
              email: email,
            };

            // generate token
            const token = jwt.sign(userObject, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRY,
            });
            res.status(200).send(["Post success", token]);
          }
        }
      );
    } else {
      const userObject = {
        username: username,
        email: email,
      };

      // generate token
      const token = jwt.sign(userObject, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });
      res.status(200).send(["Already exist this user!", token]);
    }
  });
};

module.exports = {
  googleSignin,
};
