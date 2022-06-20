const TournamentModel = require('../models/tournament.model');
const MatchModel = require('../models/match.model');

const { BadRequest, NotFound } = require('../errorHandlers/customErrorClass.js');
const { ObjectId } = require('mongodb');
const Team = require('../models/team.model');
const { Combination } = require('js-combinatorics');

/**
 * Creating a new tournament and storing in the database
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const createTournament = async (req, res, next) => {
  try {
    const { name, startDate, minTeams, maxTeams } = req?.body || {};
    if (!name || !startDate || !minTeams || !maxTeams) {
      throw new BadRequest('name, startDate, minTeams and maxTeams fields required');
    }
    const newTournament = await TournamentModel.create({
      name: name,
      startDate: startDate,
      minTeams: minTeams,
      maxTeams: maxTeams
    });

    if (newTournament) res.status(200).send(newTournament);
  } catch (err) {
    next(err);
  }
};

/**
 * Deleting the tournament record by id 
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S 
 */
const deleteTournamentById = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    if (!id) throw new BadRequest('id is required');
    let response = await TournamentModel.findByIdAndDelete(id);
    if (response) res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

/**
 * To view all tournaments
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const getTournaments = async (req, res, next) => {
  try {
    const query = {
      ...(req?.query?.name && { name: new RegExp(req.query.name) })
    }
    const response = await TournamentModel.find(query).populate({
      path: 'teams',
      model: Team, select: { 'name': 1, 'teams': 1 }
    });
    if (response) res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

/**
 * update tournament by id
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const updateTournamentById = async (req, res, next) => {
  try {
    const id = req?.params?.id
    if (!id) throw new BadRequest('id is required');
    const tournament = {
      ...(req?.body?.name && { name: req.body.name }),
      ...(req?.body?.startDate && { startDate: req.body.startDate }),
      ...(req?.body?.minTeams && { minTeams: req.body.minTeams }),
      ...(req?.body?.maxTeams && { maxTeams: req.body.maxTeams })
    }
    const teams = req?.body?.teams?.map?.(team => ObjectId(team)) || [];
    const response = await TournamentModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: tournament,
        $addToSet: {
          teams: { $each: teams }
        }
      }, { new: true });
    if (response) res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

/**
 * To view tournament by id
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Santhosh S
 */
const getTournamentById = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    if (!id) throw new BadRequest('id is required');
    const tournament = await TournamentModel.findById(id).populate({
      path: 'teams',
      model: Team, select: { 'name': 1, 'teams': 1 }
    });
    if (tournament) {
      res.status(200).send(tournament);
    } else {
      throw new NotFound(`tournament ${id} not found`);
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Creats match fixtures for the tournament.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @author Niraimathi S
 */
const createMatches = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    if (!id) throw new BadRequest('id is required');
    const tournament = await TournamentModel.findById(id);

    if (!tournament) {
      throw new NotFound(`tournament ${id} not found`);
    }

    const { teams, maxTeams, minTeams, startDate } = tournament;
    if (teams.length < minTeams || teams.length > maxTeams) {
      throw new BadRequest(
        `Number of Teams participating in tournament should be within ${minTeams} and ${maxTeams}`);
    }
    matches = new Combination(teams, 2);
    matchSet = [...matches];
    fixtures = [];
    for (let index = 0; index < matchSet.length; index++) {
      const element = matchSet[index];
      fixtures.push({
        teams: [{
          teamId: element[0]
        }, {
          teamId: element[1]
        }],
        tournamentId: id,
        isCompleted: false
      })
    }
    const response = await MatchModel.insertMany(fixtures);
    if (response) {
      res.status(200).send(response);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTournament,
  deleteTournamentById,
  updateTournamentById,
  getTournaments,
  getTournamentById,
  createMatches
};
