const mongoose = require("mongoose");

const TournamentsSchema = mongoose.Schema({
    tournamentName: {
        type: String,

    },
    tournamentAgeGroup: {
        type: String,

    },
    tournamentLocation: {
        type: String,

    },
    tournamentDate: {
        type: String,

    },
    tournamentTime: {
        type: String,

    },
    tournamentDescription: {
        type: String,

    },
    numberOfPlayers: {
        type: Number,

    },
    daysLeft: {
        type: Number,

    }
});

module.exports= mongoose.model("tournamentsData", TournamentsSchema);
