const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

router.post('/:id/result', matchController.matchResult)
  .get('/:id', matchController.getMatchById);

module.exports = router;
