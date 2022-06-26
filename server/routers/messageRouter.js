const router = require("express").Router();
const {
  createConversation,
} = require("../controllers/createConversationController");
const { getConversation } = require("../controllers/getAllConversation");
const { postMessage } = require("../controllers/postMessageController");
const { getMessage } = require("../controllers/getAllMessage");

// create conversation
router.post("/conversation", createConversation);

// get all conversation
router.get("/conversation/:currentUserId", getConversation);

// post message
router.post("/", postMessage);

// get selected conversation messages
router.get("/:senderId/:receiverId", getMessage);

module.exports = router;
