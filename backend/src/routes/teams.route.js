const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');

router.post('/', teamController.createTeam)
  .delete('/:id', teamController.deleteTeamById)
  .patch('/:id', teamController.updateTeamById)
  .get('/', teamController.getTeams)
  .get('/:id', teamController.getTeamById);

module.exports = router;
