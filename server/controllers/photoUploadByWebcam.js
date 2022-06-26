const connection = require("../config/db");

const photoUploadByWebcam = (req, res) => {
  const { email } = req.query;
  const { webcamurl } = req.body;
  const sqlUpdate = "UPDATE users SET profilePhoto=? WHERE email=?";
  connection.query(sqlUpdate, [webcamurl, email], (err, result) => {
    if (err) {
      req.send(err);
    }
    if (result) {
      res.status(200).send("Photo update successfully!");
    }
  });
};

module.exports = {
  photoUploadByWebcam,
};
