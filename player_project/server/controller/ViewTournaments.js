const mongoose = require("mongoose");
const {Schema} =mongoose;
mongoose.Promise=global.Promise;


exports.viewTournaments = (req, res) => {

    const TournamentsTitleSchema =  Schema(//creating a schema for taking certain fileds from the Tournaments Page 
        {
            tournamentName://will be the tournament name            
            {
                type: String,

            },
            tournamentLocation: {//will be the tournament location 
                type: String,

            },
            tournamentDate: {//will be the tournament Date
                type: String,

            },
            tournamentTime: {//will be the time the tournament takes place
                type: String,

            },



            //const Tournaments = mongoose.model("tournamentsData",TournamentsSchema);
        });

    const viewTournaments = mongoose.model("tournamentsTitle", TournamentsTitleSchema);//saving the schema as a constant to find the specific fields/ data in the database collection(Documents) to display on the Register tournament button

    //const { tournamentName, tournamentLocation, tournamentDate, tournamentTime, numberOfPlayers, daysLeft } = req.body;


    viewTournaments.find({}, { tournamentName: 1, tournamentLocation: 1, tournamentDate: 1, tournamentTime: 1, _id: 0 }, (err, result) => {//finding the specific fields to display and either give an error or results 
        if (err) {
            res.send(err);//display the error 
        }
        res.send(result);//sends the results to the frontend to be displayed 
        console.log(result);//displays the results in the terminal console
    })
    module.exports = mongoose.model("tournamentsTitle", TournamentsTitleSchema);
};