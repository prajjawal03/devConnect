const { check } = require("express-validator");

const validator = [check("text", "text is required").not().isEmpty()];
module.exports = validator;
