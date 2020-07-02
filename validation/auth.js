const {check} = require('express-validator')

const validator = [
  check('email','email is required').isEmail(),
  check('password','password is required').isLength({min:6})
]
module.exports = validator
