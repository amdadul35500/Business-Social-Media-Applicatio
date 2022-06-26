const connection = require("../config/db");

const createConversation = (req, res) => {
  const { doAddToConversation, beenAddToConversation } = req.body;
  const sqlPost =
    "INSERT INTO conversation(doAddToConversation, beenAddToConversation, createdAt) values(?,?,current_timestamp())";
  connection.query(
    sqlPost,
    [doAddToConversation, beenAddToConversation],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.status(200).send("conversation posted!");
      }
    }
  );
};

module.exports = {
  createConversation,
};
