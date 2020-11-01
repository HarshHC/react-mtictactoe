import {RESET_ONLINE_MODE, UPDATE_ONLINE_MODE} from '../actiontypes'

const defaultOnlineMode = {
    active: false,
    code: -1111,
    thisPlayerIs: 0,
    connected: 0,
    joined: 0,
    chancesPlayed: 0,
    player1: "PLAYER 1",
    player2: "PLAYER 2",
    board: []
}

const OnlineReducer = (state = defaultOnlineMode, action) => {

    switch(action.type) {
        case UPDATE_ONLINE_MODE:
            return {
                active: action.payload.active,
                code: action.payload.code,
                thisPlayerIs: action.payload.thisPlayerIs,
                connected: action.payload.connected,
                joined: action.payload.joined,
                chancesPlayed: action.payload.chancesPlayed,
                player1: action.payload.player1,
                player2: action.payload.player2,
                board: action.payload.board.slice(),
            }
        case RESET_ONLINE_MODE:
            return defaultOnlineMode
        default:
            return state;
    }
}

export default OnlineReducer;