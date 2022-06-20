const { ObjectId } = require('mongodb');
const { NotFound, BadRequest } = require('../errorHandlers/customErrorClass');
const MatchModel = require('../models/match.model');
const Player = require('../models/player.model');
const Team = require('../models/team.model');
const Tournament = require('../models/tournament.model');

/**
 * To get match details by id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @author Santhosh S
 */
const getMatchById = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    if (!id) throw new BadRequest('id is required');
    const match = await MatchModel.findById(id)
      .populate({
        path: 'tournamentId',
        model: Tournament,
        select: { name: 1 },
      })
      .populate({
        path: 'teams.teamId',
        model: Team,
        select: { name: 1 },
      })
      .populate({
        path: 'teams.captainId',
        model: Player,
        select: { firstName: 1, email: 1, category: 1 },
      });
    if (match) {
      res.status(200).send(match);
    } else {
      throw new NotFound(`match ${id} not found`);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * To get match result
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @author Santhosh S
 */
const matchResult = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    if (!id) throw new BadRequest('id is required');
    const teamId = req?.body?.teamId;
    const query = { _id: ObjectId(id), 'teams.teamId': teamId };
    const response = await MatchModel.findOneAndUpdate(query, {
      $set: { 'teams.$.isWinning': true, isCompleted: true },
    }, { new: true });
    if (response) {
      res.status(200).send(response);
    } else {
      throw new NotFound(`teamId ${teamId} not exists in match ${id} `);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  matchResult,
  getMatchById,
};
