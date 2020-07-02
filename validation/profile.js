const { check } = require("express-validator");

const validator = [
  check("skills", "skills is required").not().isEmpty(),
  check("status", "status is required").not().isEmpty(),
];

const exp_validator = [
  check("title", "title is required").not().isEmpty(),
  check("company", "company is required").not().isEmpty(),
];
module.exports = {
  validator,
  exp_validator,
};
