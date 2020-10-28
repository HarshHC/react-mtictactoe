import {UPDATE_PLAYERS} from '../actiontypes'

const defaultPlayers = {
    player1: "PLAYER 1",
    player2: "PLAYER 2",
    winner: 0
}

const PlayerReducer = (state = defaultPlayers, action) => {
    switch(action.type) {
        case UPDATE_PLAYERS:
            return {
                player1: action.payload.player1,
                player2: action.payload.player2,
                winner: action.payload.winner
            };
        default:
            return state;
    }
}

export default PlayerReducer;