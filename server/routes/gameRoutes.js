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
        const token = req.headers.authorization?.split(' ')[1];
        let userStatsId = null;

        if (token) {
            const { data: { user }, error: authError } = await supabase.auth.getUser(token);
            if (authError || !user) {
                console.warn('Invalid token or failed to fetch user:', authError?.message);
            } else {
                console.log('Authenticated Supabase UID:', user.id);

                // Get the userstats.id WHERE userstats.user_id = Supabase UID
                const { data: userStats, error: statsError } = await supabase
                    .from('userstats')
                    .select('id')
                    .eq('user_id', user.id)
                    .maybeSingle(); // Only one entry expected

                if (statsError) {
                    console.warn('User not found in userstats table:', statsError.message);
                } else {
                    userStatsId = userStats.id;
                }
            }
        }

        // Get a random available player
        const { data: players, error: playersError } = await supabase
            .from('players')
            .select('*')
            .eq('is_available', true);

        if (playersError || !players || players.length === 0) {
            return res.status(404).json({ message: 'No available players found' });
        }

        const randomPlayer = players[Math.floor(Math.random() * players.length)];

        // Insert game with userStatsId or null
        const { data: newGame, error: insertError } = await supabase
            .from('games')
            .insert([{
                created_at: new Date(),
                hidden_player_id: randomPlayer.id,
                user_id: userStatsId  // can be null for anonymous
            }])
            .select()
            .single();

        if (insertError) {
            console.error('Error creating game:', insertError.message);
            return res.status(500).json({ message: 'Failed to start game' });
        }

        return res.json({
            message: 'Game started successfully!',
            game_id: newGame.id,
            hidden_player: randomPlayer,
            userstats_id: userStatsId ?? null
        });

    } catch (err) {
        console.error('Unexpected error:', err.message);
        return res.status(500).json({ message: 'Unexpected server error' });
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
        // First verify if guessed player exists
        const { data: guessedPlayer, error: guessedPlayerError } = await supabase
            .from('players')
            .select('id, name, height, number, position, team, division, conference')
            .eq('name', playerName)
            .single();

        if (guessedPlayerError || !guessedPlayer) {
            return handleError(res, 404, 'Player not found');
        }
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

        // Get hidden player data
        const { data: hiddenPlayer, error: hiddenPlayerError } = await supabase
            .from('players')
            .select('height, number, position, team, division, conference, name')
            .eq('id', gameData.hidden_player_id)
            .single();

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

router.post('/logout', async (req, res) => {
    try {
        // Optional: Check if user is authenticated (recommended)
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return handleError(res, 401, 'No authentication token provided');
        }

        const { error } = await supabase.auth.signOut();
        
        if (error) {
            return handleError(res, 500, 'Error during logout');
        }

        return successResponse(res, { message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err.message);
        return handleError(res, 503, 'Server error during logout');
    }
});

export default router;
