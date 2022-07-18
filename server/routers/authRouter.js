const router = require("express").Router();
const { signup } = require("../controllers/signupController");
const { signin } = require("../controllers/signinController");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/userValidator");
const { googleSignin } = require("../controllers/googleSigninController");

// google sign in
router.post("/signin/google", googleSignin);

// signup
router.post("/signup", addUserValidators, addUserValidationHandler, signup);

// signin
router.post("/signin", signin);

module.exports = router;
