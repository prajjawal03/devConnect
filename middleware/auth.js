const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = async function (req, res, next) {
  //getting token from header
  const token = req.header("x-auth-token");
  //check jwtToken
  if (!token) return res.status(401).json({ msg: "authentication error" });
  //verify jwtToken
  try {
    await jwt.verify(token, config.get("JWTsecret"), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
};
