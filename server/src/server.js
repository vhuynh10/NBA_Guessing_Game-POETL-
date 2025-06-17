import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes.js';
import scrapeNBAData from '../scraper/newScraper.js';
import gameRoutes from '../routes/gameRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'https://nba-guessing-game-poetl-beta.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

// Import routes
app.use('/api/auth', authRoutes);
app.use('/api/gameRoutes', gameRoutes);
//scrapeNBAData();

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
}
);      

