const TeamModel = require('../models/team.model');
const {
  BadRequest,
  NotFound
} = require('../errorHandlers/customErrorClass.js');
const { ObjectId } = require('mongodb');
const Player = require('../models/player.model');

/**
 * Creating a new team and storing in the database
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const createTeam = async (req, res, next) => {
  try {
    const { name, maxSize, minSize } = req?.body || {};
    if (!name || !maxSize || !minSize) {
      throw new BadRequest('name, maxSize and minSize fields required');
    }
    const newTeam = await TeamModel.create({
      name: name,
      maxSize: maxSize,
      minSize: minSize,
    });
    if (newTeam) res.status(200).send(newTeam);
  } catch (err) {
    next(err);
  }
};

/**
 * Deleting the team record by id 
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S 
 */
const deleteTeamById = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    if (!id) throw new BadRequest('Id is required');
    const response = await TeamModel.findByIdAndDelete(id);
    if (response) res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

/**
 * To view all teams
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const getTeams = async (req, res, next) => {
  try {
    const query = {
      ...(req?.query?.name && { name: new RegExp(req.query.name) })
    }
    const response = await TeamModel.find(query).populate({
      path: 'players',
      model: Player, select: { 'firstName': 1, 'email': 1, 'age': 1, 'category': 1 }
    });
    if (response) res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

/**
 * updates team by id
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const updateTeamById = async (req, res, next) => {
  try {
    const id = req?.params?.id
    if (!id) throw new BadRequest('Id is required');
    const team = {
      ...(req?.body?.name && { name: req.body.name }),
      ...(req?.body?.minSize && { minSize: req.body.minSize }),
      ...(req?.body?.maxSize && { maxSize: req.body.maxSize }),
    }
    const players = req?.body?.players?.map?.(player => ObjectId(player)) || []
    const response = await TeamModel.findByIdAndUpdate(
      id,
      {
        $set: team,
        $addToSet: {
          players: { $each: players }
        }
      }, { new: true });
    if (response) res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

/**
 * To view team by id
 *   
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const getTeamById = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    if (!id) throw new BadRequest('Id is required');
    const team = await TeamModel.findById(id).populate({
      path: 'players',
      model: Player, select: { 'firstName': 1, 'email': 1, 'age': 1, 'category': 1 }
    });
    if (team) {
      res.status(200).send(team);
    } else {
      throw new NotFound(`team ${id} not found`);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTeam,
  deleteTeamById,
  updateTeamById,
  getTeams,
  getTeamById
};
