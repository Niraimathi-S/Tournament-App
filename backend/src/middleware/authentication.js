const jwt = require('jsonwebtoken');
const config = process.env;
const skipUrls = ['/', '/user/register', '/user/login'];
const { Unauthorized, Forbidden } = require('../errorHandlers/customErrorClass.js');

/**
 * validates the token while logging
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const verifyToken = (req, res, next) => {
  if (skipUrls.includes(req.url)) {
    return next();
  } else {
    let token = req.headers['authorization'];
    token = token.replace('Bearer ', '');
    try {
      if (!token) {
        throw new Forbidden('A token is required for authentication');
      }
      jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
      throw new Unauthorized('Invalid Token');
    }
    return next();
  }
};

module.exports = { verifyToken };
