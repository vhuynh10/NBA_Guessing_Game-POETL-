//Translates the team name to the full version based on the team name stored in the database
export function getFullTeamName(teamName) {
    switch (teamName) {
        case "Atlanta":
            return "Atlanta Hawks";
        case "Boston":
            return "Boston Celtics";
        case "Brooklyn":
            return "Brooklyn Nets";
        case "Charlotte":
            return "Charlotte Hornets";
        case "Chicago":
            return "Chicago Bulls";
        case "Cleveland":
            return "Cleveland Cavaliers";
        case "Dallas":
            return "Dallas Mavericks";
        case "Denver":
            return "Denver Nuggets";
        case "Detroit":
            return "Detroit Pistons";
        case "Golden State":
            return "Golden State Warriors";
        case "Houston":
            return "Houston Rockets";
        case "Indiana":
            return "Indiana Pacers";
        case "Los Angeles Clippers":
            return "Los Angeles Clippers";
        case "Los Angeles Lakers":
            return "Los Angeles Lakers";
        case "Memphis":
            return "Memphis Grizzlies";
        case "Miami":
            return "Miami Heat";
        case "Milwaukee":
            return "Milwaukee Bucks";
        case "Minnesota":
            return "Minnesota Timberwolves";
        case "New Orleans":
            return "New Orleans Pelicans";
        case "New York":
            return "New York Knicks";
        case "Oklahoma City":
            return "Oklahoma City Thunder";
        case "Orlando":
            return "Orlando Magic";
        case "Philadelphia":
            return "Philadelphia 76ers";
        case "Phoenix":
            return "Phoenix Suns";
        case "Portland":
            return "Portland Trail Blazers";
        case "Sacramento":
            return "Sacramento Kings";
        case "San Antonio":
            return "San Antonio Spurs";
        case "Toronto":
            return "Toronto Raptors";
        case "Utah":
            return "Utah Jazz";
        case "Washington":
            return "Washington Wizards";
        default:
            return teamName; // Return the input if no match is found
    }
}

// Returns the file path to the team's logo based on the team name stored in the database
export function getTeamLogo(teamName) {
    switch (teamName) {
        case "Atlanta":
            return "/assets/nba-atlanta-hawks-logo-480x480.png";
        case "Boston":
            return "/assets/nba-boston-celtics-logo-480x480.png";
        case "Brooklyn":
            return "/assets/nba-brooklyn-nets-logo-480x480.png";
        case "Charlotte":
            return "/assets/nba-charlotte-hornets-logo-480x480.png";
        case "Chicago":
            return "/assets/nba-chicago-bulls-logo-480x480.png";
        case "Cleveland":
            return "/assets/nba-Clevelan-Cavaliers-logo-2022-480x480.png";
        case "Dallas":
            return "/assets/nba-dallas-mavericks-logo-480x480.png";
        case "Denver":
            return "/assets/nba-denver-nuggets-logo-2018-480x480.png";
        case "Detroit":
            return "/assets/nba-detroit-pistons-logo-480x480.png";
        case "Golden State":
            return "/assets/nba-golden-state-warriors-logo-2020-480x480.png";
        case "Houston":
            return "/assets/nba-houston-rockets-logo-2020-300x300.png";
        case "Indiana":
            return "/assets/nba-indiana-pacers-logo-480x480.png";
        case "Los Angeles Clippers":
            return "/assets/NBA-LA-Clippers-logo-2024-480x480.png";
        case "Los Angeles Lakers":
            return "/assets/nba-los-angeles-lakers-logo-480x480.png";
        case "Memphis":
            return "/assets/nba-memphis-grizzlies-logo-480x480.png";
        case "Miami":
            return "/assets/nba-miami-heat-logo-480x480.png";
        case "Milwaukee":
            return "/assets/nba-milwaukee-bucks-logo-480x480.png";
        case "Minnesota":
            return "/assets/nba-minnesota-timberwolves-logo-480x480.png";
        case "New Orleans":
            return "/assets/nba-new-orleans-pelicans-logo-480x480.png";
        case "New York":
            return "/assets/nba-new-york-knicks-logo-480x480.png";
        case "Oklahoma City":
            return "/assets/nba-oklahoma-city-thunder-logo-480x480.png";
        case "Orlando":
            return "/assets/nba-orlando-magic-logo-480x480.png";
        case "Philadelphia":
            return "/assets/nba-philadelphia-76ers-logo-480x480.png";
        case "Phoenix":
            return "/assets/nba-phoenix-suns-logo-480x480.png";
        case "Portland":
            return "/assets/nba-portland-trail-blazers-logo-480x480.png";
        case "Sacramento":
            return "/assets/nba-sacramento-kings-logo-480x480.png";
        case "San Antonio":
            return "/assets/nba-san-antonio-spurs-logo-480x480.png";
        case "Toronto":
            return "/assets/nba-toronto-raptors-logo-2020-480x480.png";
        case "Utah":
            return "/assets/nba-utah-jazz-logo-2022-480x480.png";
        case "Washington":
            return "/assets/nba-washington-wizards-logo-480x480.png";
        default:
            return "/assets/react.svg"; // Fallback to React logo
    }
}

export function removeInvalidPlayers(guessResult, groupedPlayers) {
    const {
        conference,
        division,
        height,
        number,
        position,
        team,
    } = guessResult;

    // Start with the original groupedPlayers
    let newGroupedPlayers = { ...groupedPlayers };

    // Filter By Conference
    Object.entries(newGroupedPlayers).forEach(([teamName, teamPlayers]) => {
        newGroupedPlayers[teamName] = conference.match
            ? teamPlayers.filter(player => player.conference === conference.value)
            : teamPlayers.filter(player => player.conference !== conference.value);
    });

    // Filter By Division
    Object.entries(newGroupedPlayers).forEach(([teamName, teamPlayers]) => {
        newGroupedPlayers[teamName] = division.match
            ? teamPlayers.filter(player => player.division === division.value)
            : teamPlayers.filter(player => player.division !== division.value);
    });

    // Filter By Team
    Object.entries(newGroupedPlayers).forEach(([teamName, teamPlayers]) => {
        newGroupedPlayers[teamName] = team.match
            ? teamPlayers.filter(player => player.team === team.value)
            : teamPlayers.filter(player => player.team !== team.value);
    });

    // Filter By Position
    Object.entries(newGroupedPlayers).forEach(([teamName, teamPlayers]) => {
        newGroupedPlayers[teamName] = position.match
            ? teamPlayers.filter(player => player.position === position.value)
            : teamPlayers.filter(player => player.position !== position.value);
    });

    //Filter By Number
    Object.entries(newGroupedPlayers).forEach(([teamName, teamPlayers]) => {
        if(number.direction === "match") {
             newGroupedPlayers[teamName] = teamPlayers.filter(player => player.number === number.value)
        } else if (number.direction === "higher") {
            newGroupedPlayers[teamName] = teamPlayers.filter(player => player.number > number.value)
        } else {
             newGroupedPlayers[teamName] = teamPlayers.filter(player => player.number < number.value)
        }
    });

    //Filter By Height
    Object.entries(newGroupedPlayers).forEach(([teamName, teamPlayers]) => {
        if(height.direction === "match") {
             newGroupedPlayers[teamName] = teamPlayers.filter(player => getHeightInInches(player.height) === getHeightInInches(height.value))
        } else if (height.direction === "higher") {
            newGroupedPlayers[teamName] = teamPlayers.filter(player => getHeightInInches(player.height) > getHeightInInches(height.value))
        } else {
             newGroupedPlayers[teamName] = teamPlayers.filter(player => getHeightInInches(player.height) < getHeightInInches(height.value))
        }
    });

    console.log(groupedPlayers);

    return newGroupedPlayers;
}

function getHeightInInches(height) {
    const [ft, inch] = height.split('-').map(Number);
  return ft * 12 + inch;
}


export function checkIfWinner(guessResult) {
    return (
        guessResult.name?.match === true &&
        guessResult.team?.match === true &&
        guessResult.conference?.match === true &&
        guessResult.division?.match === true &&
        guessResult.position?.match === true &&
        guessResult.number?.direction === "match" &&
        guessResult.height?.direction === "match"
    );
}

export function formatTime(totalSeconds) {
     const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
}


