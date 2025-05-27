import getHeightToInches from './getHeightToInches.js';

const comparePlayerStats = (guessedPlayer, hiddenPlayer) => {
    const result = {
        team: {
            value: guessedPlayer.team,
            match: guessedPlayer.team === hiddenPlayer.team
        },
        conference: {
            value: guessedPlayer.conference,
            match: guessedPlayer.conference === hiddenPlayer.conference
        },
        division: {
            value: guessedPlayer.division,
            match: guessedPlayer.division === hiddenPlayer.division
        },
        name: {
            value: guessedPlayer.name,
            match: guessedPlayer.name === hiddenPlayer.name
        },
        position: {
            value: guessedPlayer.position,
            match: guessedPlayer.position === hiddenPlayer.position
        },
        height: {
            value: guessedPlayer.height,
            direction: getHeightToInches(guessedPlayer.height) === getHeightToInches(hiddenPlayer.height)
                ? 'match'
                : getHeightToInches(guessedPlayer.height) > getHeightToInches(hiddenPlayer.height)
                    ? 'lower'
                    : 'higher'
        },
        number: {
            value: guessedPlayer.number,
            direction: parseInt(guessedPlayer.number) === parseInt(hiddenPlayer.number)
                ? 'match'
                : parseInt(guessedPlayer.number) > parseInt(hiddenPlayer.number)
                    ? 'lower'
                    : 'higher'
        }
    };

    // Overall match: player name matches exactly
    result.match = result.name.match;

    return result;
};

export default comparePlayerStats;
