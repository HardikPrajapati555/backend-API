const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret"; // Replace with .env variable

const protect = (roles) => {
    return (req, res, next) => {
      const token = req.header('Authorization')?.replace('Bearer ', '');
  
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the secret key
        req.user = decoded;  // Attach the decoded user info to the request object
  
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ error: 'Forbidden' });
        }
  
        next();  // Continue to the next middleware or route handler
      } catch (err) {
        console.error('Token verification failed:', err);  // Log error in case of invalid token
        res.status(400).json({ error: 'Invalid token or expired' });
      }
    };
  };
module.exports = { protect };
