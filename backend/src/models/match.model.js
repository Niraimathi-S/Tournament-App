const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Player = require('./player.model');
const Team = require('./team.model');
const Tournament = require('./tournament.model');

const MatchSchema = new mongoose.Schema({
  date: { type: String },
  teams: [
    {
      teamId: { type: String, ref: Team },
      isWinning: { type: Boolean },
      captainId: { type: ObjectId, ref: Player },
    },
  ],
  tournamentId: { type: ObjectId, ref: Tournament },
  isCompleted: { type: Boolean }
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
