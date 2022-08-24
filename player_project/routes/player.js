const express = require('express');
const { createPlayer } = require('../controller/playerC');
const router = express.Router();


router.post('/create', createPlayer);
module.exports = router;