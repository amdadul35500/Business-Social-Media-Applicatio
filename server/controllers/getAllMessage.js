const connection = require("../config/db");

const getMessage = (req, res) => {
  const { senderId, receiverId } = req.params;
  console.log(senderId, receiverId);
  const sqlGet =
    "select * from message where senderId=? and receiverId=? or senderId=? and receiverId=?";
  connection.query(
    sqlGet,
    [senderId, receiverId, receiverId, senderId],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      console.log(result);
      if (result) {
        res.status(200).json(result);
      }
    }
  );
};

module.exports = {
  getMessage,
};
