function getFullTeamName(teamName) {
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

export default getFullTeamName;