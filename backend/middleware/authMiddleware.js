// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded);  
    req.user = decoded; // attach user payload (id, role) to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {  
    expiresIn: "30d",
  });
};

export default authMiddleware;
