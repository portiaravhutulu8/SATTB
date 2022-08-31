import React from "react";
import { useState } from "react";
import LiveTournamentsData from "../Data/LiveTournaments.json";


const LiveTournaments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div class="container">
            <input 
                type="text" 
                placeholder='Search Tournaments...' 
                class="form-control" 
                style={{ 
                    marginTop: 50, 
                    marginBottom: 20, 
                    width: "40%" }}
                onChange = {(ev) => {
                    setSearchTerm(ev.target.value);
                }}
                />
            <table class="table table-bordered">
                <thead class= ".thead-dark">
                    <tr>
                        <th>Tournament Name</th>
                        <th>City </th>
                        <th>Location</th>
                        <th>Date/Time</th>
                        <th>Group</th>
                    </tr>
                </thead>
                <tbody>
                    {LiveTournamentsData.filter((value)=>{
                        if (searchTerm === "") { 
                            return value;
                        } else if (
                            value.tournamentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            value.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            value.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            value.dateTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            value.gender.toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                            return value;
                        }
                    }).map((map) => (
                        <tr key = {map.id}> 
                            <td>{map.tournamentName}</td>
                            <td>{map.city}</td>
                            <td>{map.location}</td>
                            <td>{map.dateTime}</td>
                            <td>{map.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>    
  );
};

export default LiveTournaments;

