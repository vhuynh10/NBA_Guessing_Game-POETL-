import express from 'express';
import supabase from '../config/supabaseClient.js';
import validatePassword from '../utils/validatePassword.js';

const router = express.Router();

// Sign up route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        return res.status(400).json({ message: "Invalid password", errors: passwordValidation.errors });
    }

    try {
        // Register the user
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            return res.status(400).json({ message: "Error signing up", error: error.message });
        }

        if (!data.user) {
            return res.status(400).json({ message: "User registration failed" });
        }

        const userId = data.user.id;

        // Insert user stats(manual insertion, use supabase trigger in production)
        const { error: statsError } = await supabase
            .from('userstats')
            .insert([{ user_id: userId, gameswon: 0 }]);

        if (statsError) {
            console.error("Userstats insert error:", statsError.message);
            return res.status(400).json({ message: "Error creating user stats", error: statsError.message });
        }

        res.json({ message: "User registered successfully", user: data.user });

    } catch (err) {
        console.error("Server error:", err.message);
        res.status(503).json({ message: "Server error", error: err.message });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        //Logs the user in
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({ message: "Invalid email or password", error: error.message });
        }

        res.json({ message: "Login successful", session: data.session });

    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }
});

router.post("/getUser", async (req, res) => {
    // Extract the token from the Authorization header
    const { token } = req.body; 

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    try {
        // Use the current Supabase method to get user
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error) {
            console.error("Supabase token error:", error.message);
            return res.status(401).json({ message: "Invalid session token", error: error.message });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If the token is valid, return the user data
        res.json({ user });
    } catch (err) {
        console.error("Error verifying user session:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});
export default router;
