const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');

router.post('/', playerController.createPlayer)
  .delete('/:id', playerController.removePlayerById)
  .patch('/:id', playerController.updatePlayerById)
  .get('/', playerController.getPlayers)
  .get('/:id', playerController.getPlayerById);

module.exports = router;
