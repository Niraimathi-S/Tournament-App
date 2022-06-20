const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  email: { type: String, unique: true },
  gender: { type: String, enum: ['male', 'female', 'non-binary'] },
  category: { type: String, enum: ['batsman', 'bowler', 'wicket keeper', 'all rounder'] }
},{ versionKey: false });

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
