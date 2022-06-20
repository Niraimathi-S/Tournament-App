const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournament.controller');

router.post('/', tournamentController.createTournament)
  .delete('/:id', tournamentController.deleteTournamentById)
  .patch('/:id', tournamentController.updateTournamentById)
  .get('/', tournamentController.getTournaments)
  .get('/:id', tournamentController.getTournamentById)
  .post('/:id/fixtures', tournamentController.createMatches);

module.exports = router;
