const { check, validationResult } = require("express-validator");
const connection = require("../config/db");

const addUserValidators = [
  check("username").isLength({ min: 1 }).withMessage("Name is required").trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        connection.query(
          `select * from users where email=?`,
          req.body.email,
          (err, res) => {
            if (err) {
              reject(new Error("Server Error"));
            }

            if (res.length > 0) {
              reject(new Error("E-mail already in use"));
            }

            resolve(true);
          }
        );
      });
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
  check("business")
    .isLength({ min: 1 })
    .withMessage("Business is required")
    .trim(),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).send(mappedErrors);
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
