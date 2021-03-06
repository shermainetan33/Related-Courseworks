const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

var check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    res.status(401).send();
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  
  jwt.verify(token, JWT_SECRET.key, { algorithms: ["HS256"] }, (error, decodedToken) => {
    if (error) {
      res.status(403).send();
      console.log(decodedToken)
      return;
    }
    else {
      req.decodedToken = decodedToken;
      console.log(decodedToken)

      // req.userid = decodedToken.userid; //decode the userid and store in req for use

      // req.type = decodedToken.type; //decode the role and store in req for use
      next();
    }
  });
};
module.exports=check;