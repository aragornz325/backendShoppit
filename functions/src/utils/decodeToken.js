const { getAuth } = require("firebase-admin/auth");
const boom = require("@hapi/boom");
const decodeToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length);
    const decoded = await getAuth().verifyIdToken(token);
    res.locals.decoded = decoded;
    next();
  } else {
    //Error
    throw boom.badRequest("You need a token");    
  }
}

module.exports = decodeToken