const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = function (req, res, next) {
  //getting token from header
  const token = req.header("x-auth-token");
  //check jwtToken
  if (!token) return res.status(401).json({ msg: "authentication error" });
  //verify jwtToken
  try {
    const decoded = jwt.verify(token, process.env.jwtToken);
    req.user = decoded.payload.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
};
