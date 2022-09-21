const express = require("express");
//const Player = require("../model/player.js");


const { validateUser, validate } = require("../middleware/fileValidator.js");
const { createPlayer, signin } = require("../controller/playerC.js");
const { tournaments } = require("../controller/Tournaments.js");
const {viewTournaments} =require("../controller/ViewTournaments.js");

const router = express.Router();

router.post("/create", validateUser, validate, createPlayer)//adding routes for file navigation and coding neatness,instead of clustering everything in one file 
router.post("/signin", signin);
router.get("/tournaments", tournaments);
router.get("/viewtournaments", viewTournaments);

module.exports = router;