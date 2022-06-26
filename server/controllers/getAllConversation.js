const connection = require("../config/db");

const getConversation = (req, res) => {
  const { currentUserId } = req.params;
  const sqlGet = "select * from conversation where doAddToConversation=?";
  connection.query(sqlGet, currentUserId, (err, result) => {
    if (err) {
      res.send(err);
    }
    console.log();
    if (result) {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  getConversation,
};
