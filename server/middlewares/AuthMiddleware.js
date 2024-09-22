import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
   
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send("You are not authenticated! Token missing");
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("token is not valid  or expired ! ");
    req.userId = payload.userId;
    console.log("token verified")
    next();
  });
};
