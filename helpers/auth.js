const jwt = require('@hapi/jwt');
require('dotenv').config();

const generateToken = (payload) => {
  return jwt.token.generate(payload, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.token.decode(token);
    jwt.token.verify(decoded, process.env.JWT_SECRET);
    return decoded.payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};