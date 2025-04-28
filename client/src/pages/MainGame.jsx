import React, { use, useEffect, useState } from 'react'
import GuessHolder from '../components/GuessHolder'
import TeamCard from '../components/TeamCard';
import axios from 'axios';

export default function MainGame() {
  const [groupedPlayers, setGroupedPlayers] = useState({}); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [guess, setGuess] = useState("");

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
  
  function handleGuess(guess) {
    alert("You've sucessfully guessed " + guess);
  }


  return (
    <div className="generic-cream-bg flex flex-row space-y-4 mt-4">
       <h2 className="text-slate-500">Enter your Guess...</h2>
       <div className="flex flex-row space-x-4">
        <input type="string"value={guess} className=" border border-black rounded rounded-lg border-[2px] bg-white w-full text-[28px]" 
        onChange={(e) => {
        setGuess(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleGuess(guess); // Trigger guess on Enter key
            setGuess(""); // Clear the input field
          }
        }}></input>
        <button className="border border-4px border-[#C8102E] p-2 rounded rounded-lg text-[24px] text-white bg-[#FF474C] text-semibold hover:bg-[#A8DCAB] hover:border-[#2E6F40] cursor-pointer" onClick={() => {
          handleGuess(guess)
          setGuess("")
        }}>GUESS?</button>
       </div>
       <div>
       <table className="border-collapse w-full">
    <thead>
      <tr>
        <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Name</th>
        <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Team</th>
        <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Conference</th>
        <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Division</th>
        <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Position</th>
        <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Height</th>
        <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Age</th>
        <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Number</th>
      </tr>
    </thead>
          </table>
          <GuessHolder/>
          <div className="grid grid-cols-5 gap-4">
          {Object.keys(groupedPlayers).map((teamName) => (
            <TeamCard key={teamName} teamName={teamName} players={groupedPlayers[teamName]} />
            ))}
          </div>
          
       </div>
    </div>
  )
}
