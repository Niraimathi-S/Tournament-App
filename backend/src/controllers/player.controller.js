const PlayerModel = require('../models/player.model');
const {
  BadRequest,
  NotFound,
  Conflict
} = require('../errorHandlers/customErrorClass.js');

/**
 * creates the new Player and stores it into the database
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Niraimathi S
 */
const createPlayer = async (req, res, next) => {
  try {
    const { firstName, lastName, age, category, email, gender } = req.body || {};
    console.log(req.body);
    if (!firstName || !age || !category || !email || !gender) {
      throw new BadRequest('firstName, age, category, email, gender fields are required');
    }

    if (await PlayerModel.findOne({ email })) {
      throw new Conflict('Player Already exist');
    }

    const player = await PlayerModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      age: age,
      category: category,
    });

    res.status(200).send(player);

  } catch (err) {
    next(err);
  }
}

/**
 * Gets a player Id from user and removes that player.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Niraimathi S
 */
const removePlayerById = async (req, res, next) => {
  try {
    const playerId = req?.params?.id;
    if (!playerId) throw new BadRequest('Player Id required');

    const response = await PlayerModel.findByIdAndDelete(playerId);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

/**
 * Gets a player details using player Id.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Niraimathi S
 */
const getPlayerById = async (req, res, next) => {
  const playerId = req?.params?.id;
  if (!playerId) throw new BadRequest('Player Id required');
  try {
    const player = await PlayerModel.findById(playerId);
    if (player) {
      res.status(200).send(player);
    } else {
      throw new NotFound('No such player Exist');
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Updates a player details using player Id. Updates only the allowed fields
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Niraimathi S
 */
const updatePlayerById = async (req, res, next) => {
  try {
    const data = {
      ...(req?.body?.firstName && { firstName: req.body.firstName }),
      ...(req?.body?.lastName && { lastName: req.body.lastName }),
      ...(req?.body?.age && { age: req.body.age }),
      ...(req?.body?.email && { email: req.body.email }),
      ...(req?.body?.gender && { gender: req.body.gender }),
      ...(req?.body?.category && { category: req.body.category })
    }
    const player = await PlayerModel.findByIdAndUpdate(
      req?.params?.id, data, { new: true });
    res.status(200).send(player);
  } catch (err) {
    next(err);

  }
}

/**
 * Gets all player details from the database. Gets the player details also using
 * regex Patterns of firstname, lastname and email.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Niraimathi S
 */
const getPlayers = async (req, res, next) => {
  try {
    const query = {
      ...(req?.query?.firstName && { firstName: new RegExp(req.query.firstName) }),
      ...(req?.query?.lastName && { lastName: new RegExp(req.query.lastName) }),
      ...(req?.query?.email && { email: new RegExp(req.query.email) }),
      ...(req?.query?.category && { category: req.query.category }),
      ...(req?.query?.gender && { gender: req.query.gender }),
      ...(req?.query?.age && { age: req.query.age })
    }

    const players = await PlayerModel.find(query,{projection: { _id: 0,"__v":0
     }});
    res.status(200).send(players);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPlayer,
  removePlayerById,
  getPlayers,
  updatePlayerById,
  getPlayerById
};
