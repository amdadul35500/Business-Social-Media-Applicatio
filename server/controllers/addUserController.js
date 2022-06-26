const connection = require("../config/db");

const addUser = (req, res) => {
  const { doAddToConversation, beenAddToConversation } = req.params;
  if (doAddToConversation !== beenAddToConversation) {
    const sqlAdd =
      "select * from conversation where doAddToConversation=? and beenAddToConversation=?";
    connection.query(
      sqlAdd,
      [doAddToConversation, beenAddToConversation],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result[0]) {
          res.send("conversation already added");
        } else {
          const sqlInsert =
            "insert into conversation(doAddToConversation, beenAddToConversation,createdAt) values(?,?,current_timestamp())";
          connection.query(
            sqlInsert,
            [doAddToConversation, beenAddToConversation],
            (err, result) => {
              if (err) {
                res.send(err);
              }
              if (result) {
                res.send("Conversation inserted!");
              }
            }
          );
        }
      }
    );
  } else {
    res.send("two id is same");
  }
};

module.exports = {
  addUser,
};
