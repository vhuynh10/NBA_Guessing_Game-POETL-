import React, {useEffect, useState } from 'react'
import GuessHolder from '../components/GuessHolder'
import TeamCard from '../components/TeamCard';
import axios from 'axios';
import {checkIfWinner, removeInvalidPlayers} from '../helper/helper';
import VictoryScreen from '../components/VictoryScreen';

export default function MainGame() {
  const [groupedPlayers, setGroupedPlayers] = useState({}); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [guess, setGuess] = useState(""); // State for the guess input
  const [guessResult, setGuessResult] = useState([]); // State to store the result of the guess
  const [gameId, setGameId] = useState(null); // State to store the current game ID
  const [playerMap, setPlayerMap] = useState(new Map()); // Map for valid player: name --> player obj
  const [victory, setVictory] = useState(false);

  
   // Fetch players and start the game
   useEffect(() => {
    const initializeGame = async () => {
      try {
        // Fetch players
        const playersResponse = await axios.get("http://localhost:5002/api/gameRoutes/getPlayers");
        setGroupedPlayers(playersResponse.data);
        
    
        // Convert players to a Map for quick lookup
        
        const newPlayerMap = new Map();
        Object.values(playersResponse.data).forEach((teamPlayers) => {
          teamPlayers.forEach((player) => newPlayerMap.set(player.name.toLowerCase(), player));
        });
        setPlayerMap(newPlayerMap);

        // Start the game
        const gameResponse = await axios.get("http://localhost:5002/api/gameRoutes/startGame");
        setGameId(gameResponse.data.game); // Store the game ID
        console.log("Game started with ID:", gameResponse.data.game);

        setLoading(false);
      } catch (err) {
        console.error("Error initializing game:", err.message);
        setError("Failed to initialize game. Please try again later.");
        setLoading(false);
      }
    };

    initializeGame();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Show an error message if fetching fails
  }
  
  //Validate the guess
  function validateGuess(guess) {
    const validGuess = guess.trim().toLowerCase();
    return playerMap.has(validGuess);
  }

  //Handle the guess
  const handleGuess = async (guess) => {
    if(!validateGuess(guess)) {
      alert("invalid guess")
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:5002/api/gameRoutes/guess", {
        playerName: guess,
        gameId: gameId,
      });
      
      // Process the result
      setGuessResult(prev => [...prev, response.data.result]);

      //Remove all invalid players
       setGroupedPlayers(prevGroupedPlayers =>
        removeInvalidPlayers(response.data.result, prevGroupedPlayers)
      );

      setVictory(checkIfWinner(response.data.result))


    } catch (err) {
      console.error("Error processing guess:", err.message);
      alert("Error processing guess: " + err.response?.data?.message || err.message);
    }
  };

  
  return (
    <div className="flex flex-col space-y-4 items-center w-full">
       <h2 className="text-slate-500">Enter your Guess...</h2>
       <div className="flex flex-row space-x-4">
        <input type="text" value={guess} className=" border border-black rounded rounded-lg border-[2px] bg-white w-full text-[28px]" 
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
          {victory && <VictoryScreen onClose={() => setVictory(false)} />}
          <GuessHolder guessResult={guessResult}/>
          <div className="grid grid-cols-5 gap-4 py-4">
          {Object.keys(groupedPlayers).filter(teamName => groupedPlayers[teamName].length > 0).map((teamName) => (
            <TeamCard key={teamName} teamName={teamName} players={groupedPlayers[teamName]} />
            ))}
          </div>
           
       </div>
    </div>
  )
}
