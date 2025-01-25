import verifyToken from "../services/jwtService.js";

// Middleware to verify the token and authenticate the user
export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    const decoded = verifyToken.verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

// Middleware to check if the user is a super admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access Denied. Admins only." });
  }
  next();
};
