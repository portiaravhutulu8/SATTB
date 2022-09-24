const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema({
    playerID: {
        type: Number,
        
    },
    playerName: {
        type: String,
        
    },
    ageGroup: {
        type: String,
        
    },
    pts2018: {
        type: Number,
        
    },
    pts2019: {
        type: Number,
        
    },
    pts2020: {
        type: Number,
        
    },
    pts2022: {
        type: Number,
        
    },
});

module.exports  = mongoose.model("rankingsData", RankingSchema);
