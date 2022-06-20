const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NotFound, BadRequest, Conflict, InternalServerError } = require('../errorHandlers/customErrorClass.js');

/**
 * creates the new User and stores it into the database
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequest('firstName ,lastName, email and password are required');
    }


    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    if (user) res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

/**
 * validates the email & password and generated the token for authentication
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequest('email and password are required');
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '7d',
        }
      );
      user.token = token;
      console.log("connected");
      res.status(200).json({ email, token });
    } else {
      throw new NotFound('Invalid Credentials');
    }
  } catch (err) {
    next(err);
    // throw err;
  }
};

module.exports = { registerUser, loginUser };
