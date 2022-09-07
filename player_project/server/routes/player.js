const express = require("express");
//const Player = require("../model/player.js");


const { validateUser, validate } = require("../middleware/fileValidator.js");
const { createPlayer, signin } = require("../controller/playerC.js");


const router = express.Router();

router.post("/create", validateUser, validate, createPlayer)
router.post("/signin", signin);
module.exports = router;