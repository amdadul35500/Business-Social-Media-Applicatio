const router = require("express").Router();
const multer = require("multer");
const { newPost } = require("../controllers/newPostController");
const { getAllPost } = require("../controllers/getAllPostController");
const { likes } = require("../controllers/likesController");
const { getLikes } = require("../controllers/getLikesController");
const { getParticularPost } = require("../controllers/getParticularPost");
const { getFollower } = require("../controllers/getNumberOfFollow");
const { getFollowing } = require("../controllers/getNumberOfFollowing");
const { createComment } = require("../controllers/postComment");
const { getComment } = require("../controllers/getComment");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/images");
  },
  filename: (req, file, cd) => {
    cd(null, req.body.name);
    req.filename = req.body.name;
  },
});
const upload = multer({ storage }).single("file");

// new post img upload in file system
router.post("/photoUpload", upload, (req, res) => {
  res.send("photo uploaded!");
});

// new post
router.post("/", newPost);

// get all post
router.get("/", getAllPost);

// get logged user all post
router.get("/:id", getParticularPost);

// insert row in likes table
router.post("/likes", likes);

// get row from tikes table
router.get("/likes/:postId", getLikes);

// get number of follower
router.get("/getFollow/:id", getFollower);

//  get number of following
router.get("/getFollowing/:id", getFollowing);

// create comment
router.post("/comment", createComment);

// get comment
router.get("/comment/:postId", getComment);

module.exports = router;
