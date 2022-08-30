const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const TournamentsModel = require("./models/TournamentsSMA");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://SATTBadmin:ZomWCUeNbq2zthwH@sattb.zlfgb1t.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const tournamentName = req.body.tournamentName;
  const tournamentAgeGroup = req.body.tournamentAgeGroup;
  const tournamentLocation = req.body.tournamentLocation;
  const tournamentDate = req.body.tournamentDate;
  const tournamentTime = req.body.tournamentTime;
  const tournamentDescription = req.body.tournamentDescription;

  const Tournament = new TournamentsModel({
    tournamentName: tournamentName,
    tournamentAgeGroup: tournamentAgeGroup,
    tournamentLocation: tournamentLocation,
    tournamentDate: tournamentDate,
    tournamentTime: tournamentTime,
    tournamentDescription: tournamentDescription,
    numberOfPlayers: 100,
    daysLeft: 14,
  });

  try {
    await Tournament.save();
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const id = req.body.id;
  const editedTournamentName = req.body.editedTournamentName;
  {/*const editedTournamentAgeGroup = req.body.editedTournamentName;*/}
  
  try {
    await TournamentsModel.findById(id, (err, editedTournamentData) => {
      editedTournamentData.tournamentName = editedTournamentName;
      editedTournamentData.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  TournamentsModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await TournamentsModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server running on port 3001...");
});
