const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  // Extract the JWT token from the request header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // Verify the JWT token
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Attach the user object to the request for further use
    req.user = user;
    next(); // Continue processing the request
  });
}

module.exports = authenticateUser;
