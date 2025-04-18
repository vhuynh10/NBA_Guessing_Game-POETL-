import React, { use, useEffect, useState } from 'react'
import GuessHolder from '../components/GuessHolder'
import TeamCard from '../components/TeamCard';
import axios from 'axios';

export default function MainGame() {
  const [groupedPlayers, setGroupedPlayers] = useState({}); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/gameRoutes/getPlayers");
        setGroupedPlayers(response.data); // Store the fetched data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching players:", err.message);
        setError("Failed to fetch players. Please try again later.");
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Show an error message if fetching fails
  }
    


  return (
    <div className="generic-cream-bg flex flex-row space-y-4 mt-4">
       <h2 className="text-slate-500">Enter your Guess...</h2>
       <div className="flex flex-row space-x-4">
        <input type="string" className=" border border-black rounded rounded-lg border-[2px] bg-white w-100% text-[28px]"></input>
        <button className="border border-4px border-[#C8102E] p-2 rounded rounded-lg text-[24px] text-white bg-[#FF474C] text-semibold hover:bg-[#A8DCAB] hover:border-[#2E6F40] cursor-pointer">GUESS?</button>
       </div>
       <div>
          <GuessHolder/>
          <div className="grid grid-cols-4 gap-4">
          {Object.keys(groupedPlayers).map((teamName) => (
            <TeamCard key={teamName} teamName={teamName} players={groupedPlayers[teamName]} />
            ))}
          </div>
          
       </div>
    </div>
  )
}
