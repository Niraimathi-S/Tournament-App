const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  maxSize: { type: Number },
  minSize: { type: Number },
  teamCaptain: { type: ObjectId },
  players: [{ type: ObjectId, ref: 'Player' }]
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
