const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Get token from header
  console.log("===================JSONWEBTOKEN=====================");
  console.log(req.headers.authorization);

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    //Check if token exist
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization is denied" });
    }
    //Verify token
    try {
      const decoded = jwt.verify(token, "MyS3cr3t");
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token provided, authorization is denied" });
  }
};
