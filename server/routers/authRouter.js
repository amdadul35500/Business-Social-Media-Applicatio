const router = require("express").Router();
const { signup } = require("../controllers/signupController");
const { signin } = require("../controllers/signinController");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/userValidator");

// signup
router.post("/signup", addUserValidators, addUserValidationHandler, signup);

// signin
router.post("/signin", signin);

module.exports = router;
