import axios from 'axios';
import * as cheerio from 'cheerio';
import supabase from '../config/supabaseClient.js';
import dotenv from 'dotenv';
dotenv.config();

// STEP 1: Scrape the teams' page to get team, division, and URL
const scrapeTeams = async () => {
    try {
        const teamsUrl = process.env.TEAMS_URL;
        const { data } = await axios.get(teamsUrl);
        const $ = cheerio.load(data);

        const teamsData = [];

        $('.division').each((_, divisionElement) => {
            const divisionName = $(divisionElement).find('strong').text().trim();
            const conference = ['Atlantic', 'Central', 'Southeast'].includes(divisionName) ? "Eastern" : "Western";

            $(divisionElement).find('a').each((_, teamElement) => {
                const teamName = $(teamElement).text().trim();
                const teamUrl = process.env.TEAM_URL+ $(teamElement).attr('href');

                teamsData.push({
                    teamName,
                    teamUrl,
                    division: divisionName,
                    conference
                });
            });
        });

        console.log("✅ Successfully scraped teams.");
        return teamsData;

    } catch (error) {
        console.error("❌ Failed to scrape teams:", error.message);
    }
};

// STEP 2: Scrape players from each team and attach division & conference info
const scrapePlayers = async (team) => {
    try {
        console.log(`🔍 Fetching data for ${team.teamName} from: ${team.teamUrl}`);
        const { data } = await axios.get(team.teamUrl);
        const $ = cheerio.load(data);

        const table = $('#roster tbody');
        if (table.length === 0) {
            console.log(`❌ No roster table found for ${team.teamName}.`);
            return [];
        }

        const players = [];
        table.find('tr').each((_, row) => {
            const $row = $(row);
            const player = {
                team: team.teamName,
                conference: team.conference,
                division: team.division,
                number: $row.find('th[data-stat="number"]').text().trim() || null,
                name: $row.find('td[data-stat="player"] a').text().trim() || null,
                position: $row.find('td[data-stat="pos"]').text().trim() || null,
                height: $row.find('td[data-stat="height"]').text().trim() || null,
            };

            players.push(player);
        });

        console.log(`✅ Scraped ${players.length} players for ${team.teamName}`);
        return players;

    } catch (error) {
        console.error(`❌ Failed to scrape players for ${team.teamName}:`, error.message);
        return [];
    }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const scrapeNBAData = async () => {
    const teams = await scrapeTeams();
    let allPlayers = [];

    for (const team of teams) {
        const players = await scrapePlayers(team);
        allPlayers = [...allPlayers, ...players];
        await sleep(15000);
    }

    // Insert players into Supabase
    try {
        const { data, error } = await supabase
            .from('players')
            .insert(allPlayers);

        if (error) {
            console.error('Error inserting data:', error);
            return;
        }

        console.log(`✅ Successfully inserted ${allPlayers.length} players into database`);
    } catch (error) {
        console.error('Failed to insert data:', error.message);
    }
};

// Run the full scraping process
export default scrapeNBAData;
