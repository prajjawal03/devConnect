const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const validator = require("../validation/auth");
const User = require("../models/User");

// @route      get api/auth
// @desc       get user
// @access     private
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user.id, "id");
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route      POST api/auth
// @desc       login user
// @access     public
router.post("/", validator, async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });

    const pass = await bcrypt.compare(password, user.password);
    console.log(pass);
    if (!pass)
      return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });

    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign({ payload }, process.env.jwtToken, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        id: user.id,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
