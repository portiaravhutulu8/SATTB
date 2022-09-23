const tournamentsData = require("../model/Tournaments ");

exports.details=async (req,res) => {
    const tournamentDetails=await tournamentsData.find({});

    if(tournamentDetails)
    {
        console.log(tournamentDetails);
    }
};
