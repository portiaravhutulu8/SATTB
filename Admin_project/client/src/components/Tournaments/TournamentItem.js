import React from "react";
import "./TournamentItem.css";

export default function TournamentItem() {
  return (
    <div className="tournament-item">
      <div className="tournament-details">
        <h1>Tournament Name</h1>
        <h2>Location</h2>
      </div>
      <div className="numberOfPlayers">No. Ply</div>
      <div className="daysleft">Days Left</div>
      {/* <div className="start">Start Button</div> */}
      <div className="edit">Edit Button</div> {/* Update (crUd)*/}
      <div className="delete">Delete Button</div> {/* delete (cruD)*/}
    </div>
  );
}
