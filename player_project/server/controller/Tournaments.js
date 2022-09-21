const mongoose = require("mongoose");
const {Schema} =mongoose;
mongoose.Promise=global.Promise;
//const Tournaments = mongoose.model("tournamentsData");
//const TournamentsModel = require("../model/Tournaments.js");

exports.tournaments = (req, res) => {


    const TournamentsSchema = new Schema(//reusable code taken from the admin collecion to display the tournament details on the player side 
        {
            tournamentName:
            {
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

            },

            //const Tournaments = mongoose.model("tournamentsData",TournamentsSchema);
        });

    const Tournaments = mongoose.model("tournamentsData", TournamentsSchema);


    Tournaments.find({}, (err, result) => {//finding the documents in the collection(Turnament infromation description)
        if (err) {
            res.send(err);//sends error if finding the data is not scuuessful or programming error
        }
        res.send(result);//sending the data to the player frontend
        console.log(result);//displays the data in the terminal console if successful
    })

    module.exports = mongoose.model("tournamentsData", TournamentsSchema);



};



