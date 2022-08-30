import React, { useState, useEffect } from "react";
import "./EditTournamentsCard.css";
import Axios from "axios";

export const EditTournamentCard = () => {
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentAgeGroup, setTournamentAgeGroup] = useState("");
  const [tournamentLocation, setTournamentLocation] = useState("");
  const [tournamentDate, setTournamentDate] = useState("");
  const [tournamentTime, setTournamentTime] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState("");
  
  const [editedTournamentData, setEditedTournamentData] = useState("");
  
  const updateTournaments = (id) =>{
    Axios.put("http://localhost:3001/update", {id: id, newTournamentData: newTournamentData})
  }
  
  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      tournamentName: tournamentName,
      tournamentAgeGroup: tournamentAgeGroup,
      tournamentLocation: tournamentLocation,
      tournamentDate: tournamentDate,
      tournamentTime: tournamentTime,
      tournamentDescription: tournamentDescription,
    });
  };

  return (
    <div className="editTournamentsCard">
      <div className="titleFontColour">EditTournamentCard</div>
      <label>Tournament Name</label>
      <input
        type="text"
        onChange={(event) => {
          setEditedTournamentData(event.target.value);
        }}
      ></input>
      <label>Age Group</label>
      <input
        type="text"
        onChange={(event) => {
          setTournamentAgeGroup(event.target.value);
        }}
      ></input>{" "}
      {/*Change this to a drop down later*/}
      <label>Location</label>
      <input
        type="text"
        onChange={(event) => {
          setTournamentLocation(event.target.value);
        }}
      ></input>
      <label>Date</label>
      <input
        type="text"
        onChange={(event) => {
          setTournamentDate(event.target.value);
        }}
      ></input>
      <label>Time (hh:mm)</label>
      <input
        type="text"
        onChange={(event) => {
          setTournamentTime(event.target.value);
        }}
      ></input>
      <label>Description</label>
      <input
        type="text"
        onChange={(event) => {
          setTournamentDescription(event.target.value);
        }}
      ></input>

      <button onClick={()=> updateTournaments(val._id)}>Edit</button>
    </div>
  );
};
