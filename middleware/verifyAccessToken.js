const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
    const token = req.headers.authorization;
    const store = req.headers.store;
  if (!token || !store) {
    return res.status(401).json({ error: true, message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: true, message: 'Invalid access token' });
  }
};

module.exports = verifyAccessToken;
