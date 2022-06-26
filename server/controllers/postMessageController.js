const connection = require("../config/db");

const postMessage = (req, res) => {
  const { conversationId, text, senderId, receiverId } = req.body;

  global.io.emit("receive_message", req.body);

  const sqlPost =
    "INSERT INTO message(conversationId, text, senderId,receiverId, createdAt) values(?,?,?,?,current_timestamp())";
  connection.query(
    sqlPost,
    [conversationId, text, senderId, receiverId],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.status(200).send("Message posted!");
      }
    }
  );
};

module.exports = {
  postMessage,
};
