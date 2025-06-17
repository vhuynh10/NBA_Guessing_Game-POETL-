import React, {useEffect, useState } from 'react'
import GuessHolder from '../components/GuessHolder'
import TeamCard from '../components/TeamCard';
import axios from 'axios';
import {checkIfWinner, removeInvalidPlayers} from '../helper/helper';
import VictoryScreen from '../components/VictoryScreen';
import RuleScreen from '../components/RuleScreen';

export default function MainGame() {
  const [groupedPlayers, setGroupedPlayers] = useState({}); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [guess, setGuess] = useState(""); // State for the guess input
  const [guessResult, setGuessResult] = useState([]); // State to store the result of the guess
  const [gameId, setGameId] = useState(null); // State to store the current game ID
  const [playerMap, setPlayerMap] = useState(new Map()); // Map for valid player: name --> player obj
  const [victory, setVictory] = useState(false); //Boolean to show victory
  const [showRules, setShowRules] = useState(false); //Boolean to show rule set
  const [suggestions, setSuggestions] = useState([]); // Array that holds suggested players
  const [allNames, setAllNames] = useState([]);
  const [seconds, setSeconds] = useState(0); //Use state for timer
  const API_URL = import.meta.env.VITE_API_URL;


  const initializeGame = async () => {
    try {
      const playersResponse = await axios.get(`${API_URL}/api/gameRoutes/getPlayers`);
      setGroupedPlayers(playersResponse.data);

      const namesArray = [];
      const newPlayerMap = new Map();
      Object.values(playersResponse.data).forEach((teamPlayers) => {
        teamPlayers.forEach((player) => {
          newPlayerMap.set(player.name.toLowerCase(), player);
          namesArray.push(player.name);
        });
      });

      setPlayerMap(newPlayerMap);
      namesArray.sort((a, b) => a.localeCompare(b));
      setAllNames(namesArray);

      const gameResponse = await axios.get(`${API_URL}/api/gameRoutes/startGame`);
      setGameId(gameResponse.data.game_id);
      setGuess("");
      setGuessResult([]);
      setVictory(false);
      setShowRules(false);
      setSuggestions([]);
      setLoading(false);
      setSeconds(0);
    } catch (err) {
      console.error("Error initializing game:", err.message);
      setError("Failed to initialize game. Please try again later.");
      setLoading(false);
    }
  };

  // Timer effect: start timer on game start, stop on victory
  useEffect(() => {
    if (victory) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [victory]);

   useEffect(() => {
    initializeGame();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Show an error message if fetching fails
  }
  
  //Toggles showing the rules
  function toggleShowRule() {
    setShowRules(!showRules);
  }
  //Resets Suggestions after player selects one
  const handleSuggestionClick = (suggestion) => {
    setGuess(suggestion);
    setSuggestions([]);
  };

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

    if (!gameId) {
      alert("Game not initialized yet. Please wait...");
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/api/gameRoutes/guess`, {
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

       <h2 className="text-slate-600 text-4xl">Enter your Guess...</h2>

       <div className="flex flex-row items-center space-x-4 py-8">
        { !showRules && <button onClick={toggleShowRule}><i className="fa-regular fa-circle-question text-3xl hover:text-gray-600"></i></button>}
        <span className='flex flex-col justify-center relative'>
            <input type="text" value={guess} className=" border border-black rounded rounded-lg border-[2px] bg-white w-full text-[28px]" 
          onChange={(e) => {
            const inputValue = e.target.value;
             setGuess(inputValue);
              if (inputValue.length > 0) {
                const filtered = allNames.filter((name) =>
                name.toLowerCase().startsWith(inputValue.toLowerCase())
                );
                setSuggestions(filtered); // filtered contains original-cased names
              } else {
                setSuggestions([]);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGuess(guess); // Trigger guess on Enter key
              setGuess(""); // Clear the input field
            }
          }}
           onBlur={() => setTimeout(() => setSuggestions([]), 100)}
           onFocus={() => {
            if (guess.length > 0) {
              const filtered = allNames.filter((name) =>
              name.toLowerCase().startsWith(guess.toLowerCase())
            );
            setSuggestions(filtered);
          }
          }}
           ></input>
          {suggestions.length > 0 && (
          <ul className="absolute left-0 top-full z-10 w-full overflow-y-auto bg-white max-h-24 border border-gray-300 rounded shadow">
            {suggestions.map((suggestion, index) => (
              <li className="hover:bg-blue-200 px-2 py-1 cursor-pointer"key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
              </li>
              ))}
            </ul>
          )}
        </span>
        
      
        
        <button className="border border-4px border-[#C8102E] p-2 rounded rounded-lg text-[24px] text-white bg-[#FF474C] text-semibold hover:bg-[#A8DCAB] hover:border-[#2E6F40] cursor-pointer" onClick={() => {
          handleGuess(guess)
          setGuess("")
        }}>GUESS?</button>
       </div>

       <div className="w-[80%]">
          {showRules && <RuleScreen toggleShowRule={toggleShowRule}/>}
          {victory && <VictoryScreen onClose={() => setVictory(false)} onRestart={initializeGame} seconds={seconds} />}
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
