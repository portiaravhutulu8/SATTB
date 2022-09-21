import React from "react";
import { useState } from "react";
import FemaleRankingsData from "../../../Data/FemaleRankings.json";
import './RankingsPages.css'



const FemaleRankings = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className="container">
            <h2>Female Rankings</h2>
            <input 
                type="text" 
                placeholder='Find Players...' 
                className="form-control" 
                style={{ 
                    marginTop: 50, 
                    marginBottom: 20, 
                    width: "40%" }}
                onChange = {(ev) => {
                    setSearchTerm(ev.target.value);
                }}
                />
            <div>
            <table className="table">
                <thead className= "thead">
                    <tr className="trHead">
                        <th className="th">Rank</th>
                        <th className="th">Player Name </th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {FemaleRankingsData.filter((value)=>{
                        if (searchTerm === "") { 
                            return value;
                        } else if (
                            value.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            value.LastName.toLowerCase().includes(searchTerm.toLowerCase())                            
                        ) {
                            return value;
                        }
                    }).map((map) => (
                        <tr className="trBody" key = {map.id}> 
                            <td className="td">{map.rank}</td>
                            <td className="td">{map.firstName} {map.LastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>    
  );
};

export default FemaleRankings;