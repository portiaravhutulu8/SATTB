const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema({
    playerID: {
        type: Number,
        required: true,
    },
    playerName: {
        type: String,
        required: true,
    },
    ageGroup: {
        type: String,
        required: true,
    },
    pts2018: {
        type: Number,
        required: true,
    },
    pts2019: {
        type: Number,
        required: true,
    },
    pts2020: {
        type: Number,
        required: true,
    },
    pts2022: {
        type: Number,
        required: true,
    },
});

const Ranakings = mongoose.model("rankingsData", RankingSchema);
module.exports = Ranakings;