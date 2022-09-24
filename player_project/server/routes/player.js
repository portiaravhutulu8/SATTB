const express = require("express");
const Player = require("../model/player.js");


const { validateUser, validate } = require("../middleware/fileValidator.js");
const { createPlayer, signin } = require("../controller/playerC.js");
//const { details } = require("../controller/Tournaments.js");
//const {viewTournaments} =require("../controller/ViewTournaments.js");

const router = express.Router();

router.post("/create", validateUser, validate, createPlayer)//adding routes for file navigation and coding neatness,instead of clustering everything in one file 
router.post("/signin", signin);
//router.get("/tournaments",details);
//router.get("/viewtournaments", viewTournaments);
const tournamentsData = require("../model/Tournaments ");
const rankingsData = require("../model/Rankings")


router.get("/tournaments", async (req, res) => {
    tournamentsData.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
});

router.get("/rankings", async (req, res) => {
    rankingsData.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
        console.log(result);
    });
});

router.get("/profile", async (req, res) => {
    Player.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
        //console.log(result);
    });
});
router.get("/registeredTournaments", async (req, res) => {
    tournamentsData.findOne({tournamentName}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
        //console.log(result);
    });
});

module.exports = router;