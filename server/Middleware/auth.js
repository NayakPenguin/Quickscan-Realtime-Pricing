const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // console.log(err);
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = authenticateJWT;
