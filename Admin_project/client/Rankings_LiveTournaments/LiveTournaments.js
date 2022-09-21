import React from "react";
import { useState } from "react";
import LiveTournamentsData from "../Data/LiveTournaments.json";
import "./LiveTournaments.css";


const LiveTournaments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className="container">
            <input 
                type="text" 
                placeholder='Search Tournaments...' 
                class="form-control" 
                style={{ 
                    marginLeft: 400,
                    marginTop: 50, 
                    marginBottom: 20, 
                    width: "40%" }}
                onChange = {(ev) => {
                    setSearchTerm(ev.target.value);
                }}
                />
            <div className="table-container">
            <table className="table">
                <thead className= "thead">
                    <tr className="trHead">
                        <th className="th">Tournament Name</th>
                        <th className="th">City </th>
                        <th className="th">Location</th>
                        <th className="th">Date/Time</th>
                        <th className="th">Group</th>
                    </tr>
                </thead>
                <tbody className="tbody">
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
                        <tr className="trBody" key = {map.id}> 
                            <td className="td">{map.tournamentName}</td>
                            <td className="td">{map.city}</td>
                            <td className="td">{map.location}</td>
                            <td className="td">{map.dateTime}</td>
                            <td className="td">{map.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>    
  );
};

export default LiveTournaments;

