const {check} = require('express-validator')

const validator = [
  check('name','name is required').not().isEmpty(),
  check('email','email is required').isEmail(),
  check('password','password is required').isLength({min:6})
]
module.exports = validator
