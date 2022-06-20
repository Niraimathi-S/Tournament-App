const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Team = require('./team.model');

const TournamentSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  startDate: { type: String },
  minTeams: { type: Number },
  maxTeams: { type: Number },
  teams: [{ type: ObjectId, ref: Team }]
});

const Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;
