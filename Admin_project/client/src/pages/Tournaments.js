import React from "react";
import {
  TournamentsCard,
  showAddNewTournament,
} from "../components/Tournaments/TournamentsCard";
import { CreateTournamentCard } from "../components/CreateTournaments/CreateTournamentsCard";
import { EditTournamentCard } from "../components/EditTournaments/EditTournamentsCard";
import "./Tournaments.css";

const Tournaments = () => {
  return (
    <div className="parent">
      <div className="child">
        <TournamentsCard></TournamentsCard>
      </div>
      <div className="child">
        <CreateTournamentCard></CreateTournamentCard>
      </div>
    </div>
  );
};

export default Tournaments;
