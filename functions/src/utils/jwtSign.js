const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

function jwtSign(id, name, email) {
  const payload = { sub: id, name, email };
  return jwt.sign(payload, config.secretJWT, { expiresIn: '15min' });
}
module.exports = { jwtSign };
