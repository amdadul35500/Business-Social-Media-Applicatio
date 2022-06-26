const router = require("express").Router();
const { updateUserInfo } = require("../controllers/updateUserInfoController");
const { businessName } = require("../controllers/businessNameController.js");
const { description } = require("../controllers/descriptionController");
const { uploadBusiness } = require("../controllers/uploadBusinessController");
const { profilePhotoUpdate } = require("../controllers/profilePhotoController");
const { upload } = require("../controllers/fileUploadController");
const { photoUploadByWebcam } = require("../controllers/photoUploadByWebcam");
const { getCurrentUser } = require("../controllers/getCurrentUserController");
const { getParticularUser } = require("../controllers/getParticularUser");
const { getAllUser } = require("../controllers/getAllUserController");
const { follow } = require("../controllers/followController");
const { checkFollowUnfollow } = require("../controllers/checkFollowUnfollow");
const { checkAddUser } = require("../controllers/checkAddUser");
const { addUser } = require("../controllers/addUserController");
const { profileUpdate } = require("../controllers/profileUpdate");
const { getLoggedUser } = require("../controllers/getLoggedUser");

// update category
router.put("/update/category/?", updateUserInfo);

// update business name
router.put("/update/businessname/?", businessName);

// update description
router.put("/update/description/?", description);

// update uploding business
router.put("/update/uploadbusiness/?", uploadBusiness);

// update profile photo by devices
router.put("/update/profilephoto/?", upload, profilePhotoUpdate);

// update profile photo by webcam
router.put("/update/profilephoto/webcam/?", photoUploadByWebcam);

// get logged user info
router.get("/currentUser/?", getCurrentUser);

// get a particular user
router.get("/oneUser/:id", getParticularUser);

// get all users
router.get("/", getAllUser);

// follow a user
router.post("/follow", follow);

// check follow or unfollow
router.get(
  "/checkFollowUnfollow/:followerId/:followingId",
  checkFollowUnfollow
);

//check add user or not add user
router.get(
  "/checkAddUser/:doAddToConversation/:beenAddToConversation",
  checkAddUser
);

// click to add or not add
router.get("/addUser/:doAddToConversation/:beenAddToConversation", addUser);

// update name email category desc
router.put("/profileUpdate", profileUpdate);

// get logged user
router.get("/loggedUser/:email", getLoggedUser);

module.exports = router;
//:beenAddToConversation
