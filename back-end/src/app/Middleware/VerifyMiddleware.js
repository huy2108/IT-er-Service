const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token

  const jwtSecret = process.env.JWT_SECRET
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    // console.log(decoded)
    req.user = decoded; // Attach decoded user information to request object
    next();
  });
};

module.exports = verifyToken;