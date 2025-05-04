const jwt = require("jsonwebtoken");

const AuthMid = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1].trim();
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  } else {
    const decoded = jwt.verify(token, "gahsdjffeuwgfuabdhcbhjabfhabsch");
    console.log(decoded);
    req.user = decoded;
  }
  next();
};

module.exports = AuthMid;
