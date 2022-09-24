const tournamentsData = require("../model/Tournaments ");

exports.titles= async (req,res) => 
{
    const tournamentTitle=await tournamentsData.find({}, { tournamentName: 1, tournamentLocation: 1, tournamentDate: 1, tournamentTime: 1, _id: 0 });
    if(tournamentTitle)
    {
        console.log(tournamentTitle);
    }
        
};