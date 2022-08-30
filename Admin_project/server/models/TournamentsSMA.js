const mongoose = require("mongoose");

const TournamentsSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: true,
    },
    tournamentAgeGroup: {
        type: String,
        required: true,
    },
    tournamentLocation: {
        type: String,
        required: true,
    },
    tournamentDate: {
        type: String,
        required: true,
    },
    tournamentTime: {
        type: String,
        required: true,
    },
    tournamentDescription: {
        type: String,
        required: true,
    },
    numberOfPlayers: {
        type: Number,
        required: true,
    },
    daysLeft: {
        type: Number,
        required: true,
    }
});

const Tournament = mongoose.model("tournamentsData", TournamentsSchema);
module.exports = Tournament;