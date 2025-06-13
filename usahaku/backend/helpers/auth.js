const jwt = require('@hapi/jwt');
require('dotenv').config();

const generateToken = (payload) => {
  const token = jwt.token.generate(
    {
      aud: 'urn:audience',
      iss: 'urn:issuer',
      id_user: payload.id_user, // Buat payload langsung, jangan di-nest di `user`
      nama: payload.nama,
      id_umkm: payload.id_umkm
    },
    {
      key: process.env.JWT_SECRET,
      algorithm: 'HS256'
    }
  );
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.token.decode(token); // <- bukan jwt.verify
  return decoded.decoded.payload;
};

module.exports = {
  generateToken,
  verifyToken
};
