import express from 'express';
import supabase from '../config/supabaseClient.js';
import comparePlayerStats from '../utils/comparePlayerStats.js';

const router = express.Router();
const handleError = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

const successResponse = (res, data) => {
    return res.status(200).json(data);
};

// Route to fetch a random player using Math.random()
router.get('/startGame', async (req, res) => {
    try {

        // Check if the user is authenticated
        // If not, allow anonymous play
        const token = req.headers.authorization?.split(' ')[1]; 
        let userId = null;

        if (token) {
            const { data: { user }, error } = await supabase.auth.getUser(token);
            if (error) {
                console.warn('Invalid token:', error.message); // still allow anonymous play
            } else {
                userId = user.id;
            }
        }

        const { data: players, error } = await supabase
            .from('players')
            .select('*')
            .eq('is_available', true);

        if (error) {
            console.error('Error fetching players:', error.message);
            return handleError(res, 500, 'Error fetching players');
        }

        if (!players || players.length === 0) {
            return handleError(res, 404, 'No available players found');
        }

        //Select random player
        const randomIndex = Math.floor(Math.random() * players.length);
        const randomPlayer = players[randomIndex];

        const { data: game, error: gameError } = await supabase
            .from('games')
            .insert([{
                created_at: new Date(),
                hidden_player_id: randomPlayer.id,
                user_id: userId  
            }])
            .select() // so it returns inserted data
            .single();

        if (gameError) {
            console.error('Error creating game session:', gameError.message);
            return handleError(res, 500, 'Error creating game session');
        }

        return res.json({
            message: 'Game started successfully!',
            game: game.id,
            player: randomPlayer
        });

    } catch (err) {
        console.error('Server error:', err.message);
        return handleError(res, 503, 'Server error: ' + err.message);
    }
});

//Displays all the players on the homepage
router.get('/getPlayers', async (req, res) => {
    try {
        //Gets all players from players table
        const { data: players, error: playersError } = await supabase
            .from('players')
            .select('name, team, conference, division, number, position, height,is_available') 
            .eq('is_available', true)
            .order('team', { ascending: true }); //Lists players alphabetically by team(players not grouped by team yet)
        
        if (playersError) {
            return handleError(res, 500, 'Error fetching players');
        }
  
      // Group players by team using reduce 
      const groupedByTeam = players.reduce((acc, player) => {
        //If current players team is not in the accumulator, create a new array for that team
        if (!acc[player.team]) {
          acc[player.team] = [];
        }
        //Else, push the current player into the array for that team
        acc[player.team].push(player);
        return acc;
      }, {});
  
      return successResponse(res, groupedByTeam);
    } catch (err) {
      return handleError(res, 503, 'Server error');
    }
  });

// Route to handle player guesses: returns the guessed players atttributes and whether or not it matched
router.post('/guess', async (req, res) => {
    const { playerName, gameId } = req.body;

    if (!playerName || !gameId) {
        return handleError(res, 400, 'Missing playerName or gameId');
    }

    try {
        //Get hidden_player_id from games table
        const { data: gameData, error: gameError } = await supabase
            .from('games')
            .select('hidden_player_id, id, guess_count')
            .eq('id', gameId)
            .single();

        if (gameError || !gameData) {
            return handleError(res, 404, 'Game not found or Error fetching game data');
        }

        //Update guess count
        await supabase
            .from('games')
            .update({ guess_count: gameData.guess_count + 1 })
            .eq('id', gameId);

        const hiddenPlayerId = gameData.hidden_player_id;

        // Paralell fetch the guess and hidden player
        const [
            { data: guessedPlayer, error: guessedPlayerError },
            { data: hiddenPlayer, error: hiddenPlayerError }
        ] = await Promise.all([
            supabase
                .from('players')
                .select('id, name, height, number, position, team, division, conference')
                .eq('name', playerName)
                .single(),
            supabase
                .from('players')
                .select('height, number, position, team, division, conference, name')
                .eq('id', hiddenPlayerId)
                .single()
        ]);

        if (guessedPlayerError || !guessedPlayer) {
            return handleError(res, 404, 'Player not found');
        }

        if (hiddenPlayerError || !hiddenPlayer) {
            return handleError(res, 404, 'Hidden player not found');
        }

        //Compare guessed and hidden player
        const result = comparePlayerStats(guessedPlayer, hiddenPlayer);

        if (gameData.guess_count >= 5) {
            return handleError(res, 403, `Game Over: Guess limit reached: ${hiddenPlayer.name}`);
        }

        return successResponse(res, { result });

    } catch (err) {
        console.error('Error with guess logic:', err.message);
        return handleError(res, 500, 'Error processing guess');
    }
});

export default router;
