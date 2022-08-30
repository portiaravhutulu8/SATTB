import React, { useState, useEffect } from "react";
import "./TournamentsCard.css";
import TournamentItem from "./TournamentItem";
import EditTournamentsCard from "../EditTournaments/EditTournamentsCard";
import Axios from "axios";

function TournamentsCard() {
  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      console.log(response);
      setTournamentList(response.data);
    });
  }, []);

  const deleteTournaments = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="tournamentsCard">
{/*      <div className="tournamentsTop">
        <input type={"text"}></input>
        <button>Add New Tournament</button>
  </div>*/}
      <div className="tournamentItem">
        {/*<TournamentItem></TournamentItem>*/}
        {tournamentList.map((val, key) => {
          return (
            <div key={key} className= "tournamentItem-singular">
              <div>
                <h1>{val.tournamentName}</h1>
                <h2>{val.tournamentLocation}</h2>
              </div>

              <div>
                <h1>{val.tournamentTime}</h1>
              </div>

              <div>
                <h1>{val.tournamentAgeGroup}</h1>
              </div>

              {/*<div>
                <h1>{val.tournamentDate}</h1>
              </div>*/}

              {/*<div>
                <h1>{val.tournamentDescription}</h1>
              </div>*/}

              <div>
                <button onClick={() => deleteTournaments(val._id)}>
                  Delete
                </button>
              </div>
              {/*<button>Start</button>*/}
              {/*<button >Edit</button>*/}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { TournamentsCard };
