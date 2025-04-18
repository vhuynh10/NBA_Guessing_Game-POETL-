import express from 'express';
import supabase from '../config/supabaseClient.js';

const router = express.Router();

// Route to fetch a random player using Math.random()
router.get('/startGame', async (req, res) => {
    try {
        // Fetch all available players
        const { data: players, error } = await supabase
            .from('players')
            .select('*')  // Select all columns for the player
            .eq('is_available', true);  // Only fetch players who are available

        if (error) {
            console.error('Error fetching players:', error.message);
            return res.status(500).json({ message: 'Error fetching players' });
        }

        if (!players || players.length === 0) {
            return res.status(404).json({ message: 'No available players found' });
        }

        // Step 2: Generate a random index using Math.random()
        const randomIndex = Math.floor(Math.random() * players.length);  // Generate random index
        
        // Step 3: Get the random player
        const randomPlayer = players[randomIndex];  // Select the player at the random index

        // Return the random player
        const { data: game, error: gameError } = await supabase
            .from('games')
            .insert([{ created_at: new Date() }])  // You can add more columns as needed
            .single();

        if (gameError) {
            console.error('Error creating game session:', gameError.message);
            return res.status(500).json({ message: 'Error creating game session' });
        }

        // Step 5: Return the game session details to confirm the game has started
        return res.json({
            message: 'Game started successfully!',
            game: game, // The game entry returned after insert
            player: randomPlayer
        });
        
    } catch (err) {
        console.error('Server error:', err.message);
        return res.status(503).json({ message: 'Server error', error: err.message });
    }
});

router.get('/getPlayers', async (req, res) => {
    try {
      const { data: players, error } = await supabase
        .from('players')
        .select('name, team, is_available') // Select specific columns
        .eq('is_available', true)
        .order('team', { ascending: true });
  
      if (error) {
        console.error('Error fetching players:', error.message);
        return res.status(500).json({ error: 'Error fetching players' });
      }
  
      // Group players by team
      const groupedByTeam = players.reduce((acc, player) => {
        if (!acc[player.team]) {
          acc[player.team] = [];
        }
        acc[player.team].push(player);
        return acc;
      }, {});
  
      res.json(groupedByTeam);
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(503).json({ error: 'Server error' });
    }
  });



export default router;
