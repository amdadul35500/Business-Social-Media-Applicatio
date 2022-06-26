const connecttion = require("../config/db");

const checkAddUser = (req, res) => {
  const { doAddToConversation, beenAddToConversation } = req.params;
  const sqlCheck =
    "select * from conversation where doAddToConversation=? and beenAddToConversation=?";
  connecttion.query(
    sqlCheck,
    [doAddToConversation, beenAddToConversation],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result[0]) {
        res.send("Added");
      } else {
        res.send("NotAdded");
      }
    }
  );
};

module.exports = {
  checkAddUser,
};
